import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   proxy:{
  //     '/api':'http://localhost:8001'
  //   }
  // },
  server:{
    proxy:{
      '/api':'http://backend:8001'
    },
    port: 5000,
  },
  plugins: [react()],
})
