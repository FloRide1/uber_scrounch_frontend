import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    server: {
        cors: { origin: '*' },
        proxy: {
            '/login': process.env.BACKEND_URL,
            '/auth/microsoft': process.env.BACKEND_URL,
            '/auth/authorize': process.env.BACKEND_URL,
            '/api': {
                target: process.env.BACKEND_URL,
                rewrite: (path) => path.replace(/^\/api/, ''),
                changeOrigin: true
            }
        }
    }
})
