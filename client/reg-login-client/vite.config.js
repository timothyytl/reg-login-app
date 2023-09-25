import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-bootstrap': 'react-bootstrap/dist/react-bootstrap.esm.js',
    },
  }
})
