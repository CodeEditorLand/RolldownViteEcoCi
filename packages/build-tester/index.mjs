// @ts-check
import { spawn } from "node:child_process";
import * as path from "node:path";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import treeKill from "tree-kill";
import { customAssertMap, verify } from "./verify.mjs";
const __dirname = fileURLToPath(new URL(".", import.meta.url));

const appDir = path.resolve(__dirname, "../../apps");
const list = fs.readdirSync(appDir);

const urlRegex = /http:\/\/(?:www\.)?[a-zA-Z0-9-]+\:\d+/g

// ignore app list
const ignoreList = ["qwik-jsx", "qwik-tsx"];
const includeList = process.argv.slice(2);
console.log(`includeList: `, includeList)

let hasError = false;
for (let appName of list) {
	if (ignoreList.includes(appName)) {
		console.warn(`Ignoring ${appName}`);
		continue;
	}
  if (includeList.length > 0 && !includeList.includes(appName)) {
		console.warn(`Ignoring ${appName} since it is not included`);
    continue;
  }
	let abPath = path.resolve(appDir, appName);
	let err;
	try {
		await runInApp(abPath, appName);
	} catch (e) {
		err = e;
		hasError = true;
	} finally {
		if (err) {
			console.error(`Error: ${err} when executed ${appName}`, err);
		} else {
			console.log(`Case-${appName} : Success`);
		}
	}
}

if (hasError) {
	process.exit(-1);
}

/**
 * @param {string} dirPath
 * @param {string} caseName
 *
 * */
function runInApp(dirPath, caseName) {
	return new Promise((resolve, reject) => {
		const p = spawn("npm", ["run", "preview"], {
			stdio: "inherit",
			cwd: dirPath,
		});

		let data = "";

    setTimeout(() => {
        runTest()
    }, 2000)
		async function runTest() {
			let exitCode = p.exitCode;
			let err;
			try {
				await testInBrowser();
			} catch (e) {
				err = e;
				exitCode = -1;
			} finally {
				cleanUp(exitCode, () => {
					if (err) {
						reject(err);
					} else {
						resolve(undefined);
					}
				});
			}
		}

		async function testInBrowser() {
			const browser = await chromium.launch();
			const page = await browser.newPage();

			await page.goto("http://localhost:4173/");

			try {
				await verify(page, customAssertMap[caseName]);
			} catch (err) {
				throw new Error(err);
			} finally {
				await browser.close();
			}

			// Teardown
		}

		function cleanUp(exitCode, cb) {
			// @ts-ignore
			treeKill(p.pid, cb);
		}
	});
}
