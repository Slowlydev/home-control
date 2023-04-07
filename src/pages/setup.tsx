import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/window";

import styles from "./setup.module.scss";

import { env } from "@/lib/config";

import { requestToken } from "@/services/account.service";

import Button from "@/components/Button/Button";

export default function SetupPage() {
	const signInWithHueAccount = async () => {
		const state: string = env.VITE_APP_HUE_STATE;

		const port: number = await invoke("plugin:oauth|start");

		const accountWindow = new WebviewWindow("hue-account-callback", {
			url: `https://api.meethue.com/v2/oauth2/authorize?client_id=yXJ5rxr1AB4eUvdb9Vpk6diSAFs0zXAb&response_type=code&state=${state}`,
			title: "Sign in with Hue Account",
			alwaysOnTop: true,
			resizable: false,
			center: true,
			focus: true,
			visible: true,
		});

		const unListenError = await listen("oauth://invalid-url", (event) => {
			// TODO: Add error handling
			console.error(event);
		});

		const unListenUrl = await listen("oauth://url", async ({ payload }: { payload: string }) => {
			await accountWindow.close();

			const url = new URL(payload);

			// const pkceParam = url.searchParams.get("pkce");
			const codeParam = url.searchParams.get("code");
			const stateParam = url.searchParams.get("state");

			if (state === stateParam) {
				if (codeParam) requestTokenWithHueAccount(codeParam);
			}
		});

		accountWindow.listen("tauri://close-requested", async () => {
			await invoke("plugin:oauth|cancel", { port });
			unListenError();
			unListenUrl();
		});
	};

	const requestTokenWithHueAccount = async (code: string) => {
		const data = await requestToken(code);
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<h1>Setup</h1>
			</div>

			<div className={styles.right}>
				<div className={styles.content}>
					<h2>Cloud Setup</h2>
					<p>Here u can setup your hue bridge with the cloud</p>

					<Button onClick={signInWithHueAccount}>Sign in with Hue Account</Button>
				</div>
			</div>
		</div>
	);
}
