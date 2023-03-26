import { Inter } from "next/font/google";

import "@/styles/globals.scss";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={inter.className}>
			<head />
			<body>{children}</body>
		</html>
	);
}
