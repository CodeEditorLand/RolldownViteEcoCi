import vue from "@vitejs/plugin-vue";
import { defineConfig, Plugin } from "rolldown-vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue() as Plugin],
});
