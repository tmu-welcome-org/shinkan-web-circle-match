import { defineConfig } from 'vite'
import pkg from "./package.json" with { type: "json" };
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: './dist/circle_match/'
  },
  plugins: [react(), tailwindcss()],
  define: {
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(pkg.version),
  },  
})
