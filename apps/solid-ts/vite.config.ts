import { defineConfig, Plugin } from 'rolldown-vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid() as Plugin],
})
