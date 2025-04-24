import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   proxy:{
  //     // '/api':'http://localhost:5000'
  //   }
  // },

  // server:{
  //   proxy:{
  //     '/api':'http://backend:5000'
  //   },
  //   port: 5000,
  // },
  plugins: [react()],
})
