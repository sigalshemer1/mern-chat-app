import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: './postcss.config.js',
	  },
	test: {
		globals: true,
		environment: 'jsdom',
		//setupFiles: './src/setupTests.js', // Optional: For global setups like importing jest-dom
	  },
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://backend:5000",
				//target: "http://localhost:5000",
			},
		},
	},
});
