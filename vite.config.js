import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'Components': path.resolve(__dirname, 'src/Components'),  
      'ResuableFunctions':path.resolve(__dirname,'src/ResuableFunctions'),
      'Security': path.resolve(__dirname, 'src/Security'),
      'Assets': path.resolve(__dirname, 'src/Assets'),
      'Services': path.resolve(__dirname, 'src/Services'),
      'Utils': path.resolve(__dirname, 'src/Utils'),
      'Views': path.resolve(__dirname, 'src/Views'),
      'Redux': path.resolve(__dirname, 'src/Redux'),
    },  
  },
  server: {
    host: true,
    port: 3000,
  },
})
