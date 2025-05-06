import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dynamicImport from 'vite-plugin-dynamic-import'
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
const ReactCompilerConfig = {
    target: '19' // '17' | '18' | '19'
};

export default defineConfig({
    plugins: [
        tailwindcss(),
        react({
            babel: {
                plugins: [
                    ['babel-plugin-react-compiler', ReactCompilerConfig],
                ],
            },
        }),
        dynamicImport(),
    ],
    assetsInclude: ['**/*.md'],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
    server: {
        port: 3000,
    }
})

