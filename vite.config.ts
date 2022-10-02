import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import zipPack from 'vite-plugin-zip-pack';

const srcDir = resolve(__dirname, 'src');
const pagesDir = resolve(srcDir, 'pages');

// https://vitejs.dev/config/

const packageVersion = process.env.npm_package_version
const packageName = process.env.npm_package_name

export default defineConfig({
  plugins: [
    svelte(),
    zipPack({
      outDir: "releases",
      outFileName: `${packageName}-${packageVersion}.zip`
    })
  ],
  resolve: {
    alias: {
      src: srcDir,
    },
  },
  build: {
    rollupOptions: {
      input: {
        background: resolve(pagesDir, 'background', 'index.ts'),
        options: resolve(pagesDir, 'options', 'index.html'),
        popup: resolve(pagesDir, 'popup', 'index.html'),
      },
      output: {
        entryFileNames: (chunk) => `src/pages/${chunk.name}/index.js`,
      },
    },
  },
});
