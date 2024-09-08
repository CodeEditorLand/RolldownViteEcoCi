// @ts-ignore
import { defineConfig, Plugin } from 'rolldown-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte() as Plugin],
})
