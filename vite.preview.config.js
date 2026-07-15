import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Single-file build: everything inlined -> double-click preview over file://
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: 'dist-preview' },
})
