import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	// prevent vite from obscuring rust errors
	clearScreen: false,
	// Tauri expects a fixed port, fail if that port is not available
	server: {
		strictPort: true,
		// proxy: {
		// 	"/meet-hue/": {
		// 		target: "https://api.meethue.com/v2/",
		// 		changeOrigin: true,
		// 		secure: false,
		// 		headers: {
		// 			"Access-Control-Allow-Origin": "*",
		// 		},
		// 	},
		// },
	},
	// to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
	// `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
	// env variables
	envPrefix: ["VITE_", "TAURI_"],
	build: {
		target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
		minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
		sourcemap: !!process.env.TAURI_DEBUG,
	},
});
