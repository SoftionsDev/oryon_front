import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    include: ['**/*.jsx', '**/*.js', '**/*.tsx', '**/*.ts'],
  })],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
  }
})
