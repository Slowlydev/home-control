/** @type {import('next').NextConfig} */
const nextConfig = {
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
