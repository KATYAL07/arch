import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = await createServer({
  configFile: false,
  root: __dirname,
  cacheDir: path.join(os.tmpdir(), 'aquaarch-vite-cache'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});

await server.listen();
server.printUrls();

