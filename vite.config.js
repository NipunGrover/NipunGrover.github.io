import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    host: true, // Allow access from other devices on the network
    proxy: {
      // Use "/contact" as the key if you only want to proxy requests for "/contact"
      // Use "^/api" to match any path that starts with "/api"
      '/contact': {
        target: 'https://nipungrover-github-io.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  //base: "/NipunGrover.github.io/",
})
