// @ts-ignore
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig, Plugin } from "rolldown-vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte() as Plugin],
});
