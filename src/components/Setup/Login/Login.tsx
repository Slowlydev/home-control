import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/window";
import classNames from "classnames";
import { useState } from "react";
import { Store } from "tauri-plugin-store-api";

import styles from "./Login.module.scss";

import { env } from "@/lib/env";

import { requestToken } from "@/services/account.service";

import Button from "@/components/Button/Button";

const store = new Store(".config.dat");

type Props = {
	next: () => void;
	back: () => void;
};

export default function Login({ next, back }: Props) {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

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

			if (state === stateParam && codeParam) requestTokenWithHueAccount(codeParam);
		});

		accountWindow.listen("tauri://close-requested", async () => {
			await invoke("plugin:oauth|cancel", { port });
			unListenError();
			unListenUrl();
		});
	};

	const requestTokenWithHueAccount = async (code: string) => {
		const data = await requestToken(code);
		await store.set("access-token", data);

		//setLoggedIn(true);
	};

	return (
		<div className={classNames(styles.right, styles.content)}>
			<h1>Login with Philips Hue Account</h1>
			<p className={styles.infoText}>
				After u press “login”, u will be prompted to login with you philips hue account and to allow home-control to access your hue bridge
			</p>

			<Button className={styles.loginButton} onClick={signInWithHueAccount}>
				Login
			</Button>

			<div className={styles.buttons}>
				<Button onClick={() => back()}>Back</Button>
				<Button onClick={() => next()} disabled={!loggedIn}>
					Next
				</Button>
			</div>
		</div>
	);
}
