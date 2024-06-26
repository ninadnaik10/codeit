import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8080,
  },
  rollupOptions: {
    external: ["react", "react-router", "react-router-dom", "react-redux"],
    output: {
      globals: {
        react: "React",
      },
    },
  },
})
