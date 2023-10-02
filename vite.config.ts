import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    server: {
        cors: { origin: '*' },
        proxy: {
            '/login': 'http://127.0.0.1:3000',
            '/auth/microsoft': 'http://127.0.0.1:3000',
            '/auth/authorize': 'http://127.0.0.1:3000',
            '/api': {
                target: 'http://127.0.0.1:3000',
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
