import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'login.html'),
        userCenter: resolve(__dirname, 'user-center.html'),
      },
    },
  },
})
