import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss'; // Import the WindiCSS plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    WindiCSS(), // Add WindiCSS plugin
  ],
});
