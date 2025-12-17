import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    proxy: {
      // Use "/contact" as the key if you only want to proxy requests for "/contact"
      // Use "^/api" to match any path that starts with "/api"
      '/contact': {
        target: 'https://damp-badlands-16343-6f115056a401.herokuapp.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  //base: "/NipunGrover.github.io/",
})
