/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Note: This feature is required to use NextJS Image in SSG mode.
	// See https://nextjs.org/docs/messages/export-image-api for different workarounds.
	images: {
		unoptimized: true,
	},
	experimental: {
		appDir: true,
	},
	transpilePackages: [
		"@react-spectrum/form",
		"@react-spectrum/icon",
		"@react-spectrum/label",
		"@react-spectrum/layout",
		"@react-spectrum/provider",
		"@react-spectrum/textfield",
		"@spectrum-icons/ui",
		"@react-spectrum/color",
		"@react-spectrum/theme-default",
	],
};

module.exports = nextConfig;
