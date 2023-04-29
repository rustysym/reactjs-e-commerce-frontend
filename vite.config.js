import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/reactjs-e-commerce-frontend/',
  plugins: [react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,})],
 
})
