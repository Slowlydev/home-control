import type { AppProps } from 'next/app'

import "../styles/general.scss"

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Component {...pageProps} />
	)
}