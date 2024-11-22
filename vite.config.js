import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'src/views/about.html'),
                explora: resolve(__dirname, 'src/views/explora.html'),
                product: resolve(__dirname, 'src/views/product.html'),
            },
        },
    },
});
