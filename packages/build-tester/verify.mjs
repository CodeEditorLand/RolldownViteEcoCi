import { chromium } from "playwright";
import assert from "node:assert";

/**
 * @param {import("playwright").Page} page
 */
export function verify(page, assert = default_assert) {
	return assert(page);
}

/**
 * @param {import("playwright").Page} page
 * */
async function default_assert(page) {
	let content = await (
		await page.waitForSelector("#app > div > h1")
	).innerText();

	assert(content.includes("Vite"));
}

export const customAssertMap = {
	"lit-js": async (page) => {
		let content = await (
			await page.waitForSelector("body > my-element > h1")
		).innerText();
		assert(content.includes("Vite"));
	},
	"lit-ts": async (page) => {
		let content = await (
			await page.waitForSelector("body > my-element > h1")
		).innerText();
		assert(content.includes("Vite"));
	},
	"preact-js": async (page) => {
		let content = await (await page.waitForSelector("#app > h1")).innerText();
		assert(content.includes("Vite"));
	},
	"preact-ts": async (page) => {
		let content = await (await page.waitForSelector("#app > h1")).innerText();
		assert(content.includes("Vite"));
	},
	"vue-js": async (page) => {
		let content = await (await page.waitForSelector("#app > h1")).innerText();
		assert(content.includes("Vite"));
	},
	"vue-ts": async (page) => {
		let content = await (await page.waitForSelector("#app > h1")).innerText();
		assert(content.includes("Vite"));
	},
	"react-jsx": async (page) => {
		let content = await (await page.waitForSelector("#root > h1")).innerText();
		assert(content.includes("Vite"));
	},
	"react-tsx": async (page) => {
		let content = await (await page.waitForSelector("#root > h1")).innerText();
		assert(content.includes("Vite"));
	},
	"solid-js": async (page) => {
		let content = await (await page.waitForSelector("#root > h1")).innerText();
		assert(content.includes("Vite"));
	},
	"solid-ts": async (page) => {
		let content = await (await page.waitForSelector("#root > h1")).innerText();
		assert(content.includes("Vite"));
	},
	"svelte-js": async (page) => {
		let content = await (
			await page.waitForSelector("#app > main > h1")
		).innerText();
		assert(content.includes("Vite"));
	},
	"svelte-ts": async (page) => {
		let content = await (
			await page.waitForSelector("#app > main > h1")
		).innerText();
		assert(content.includes("Vite"));
	},
};
