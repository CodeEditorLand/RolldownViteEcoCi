// @ts-ignore
import preact from "@preact/preset-vite";
import { defineConfig } from "rolldown-vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact() as any],
});
