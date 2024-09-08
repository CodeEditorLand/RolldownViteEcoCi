import { defineConfig, Plugin } from 'rolldown-vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue() as Plugin],
})
