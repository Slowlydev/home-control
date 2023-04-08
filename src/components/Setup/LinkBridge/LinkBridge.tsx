import classNames from "classnames";
import { useState } from "react";
import { Store } from "tauri-plugin-store-api";

import styles from "./LinkBridge.module.scss";

import { DiscoverdBridgeType } from "@/types/DiscoveredBridge.type";

import { createClientKey } from "@/services/bridge.service";

import Button from "@/components/Button/Button";

type Props = {
	next: () => void;
	back: () => void;
	selectedBridge: DiscoverdBridgeType;
};

const store = new Store(".config.dat");

export default function LinkBridge({ next, back, selectedBridge }: Props) {
	const [linked, setLinked] = useState<boolean>(false);

	const startLinkProcess = () => {
		const linkWithBridge = async () => {
			const data = await createClientKey();
			if (data[0].success) {
				await store.set("local-token", data[0].success.username);
				clearInterval(interval);
				setLinked(true);
			}
		};

		let interval = setInterval(linkWithBridge, 2000);
	};

	return (
		<div className={classNames(styles.right, styles.content)}>
			<h1>Link your Hue bridge with home-control</h1>
			<p className={styles.infoText}>After u press “Link”, u will have to press the link button on the bridge</p>

			<Button className={styles.loginButton} onClick={() => startLinkProcess()}>
				Link
			</Button>

			<div className={styles.buttons}>
				<Button onClick={() => back()}>Back</Button>
				<Button onClick={() => next()} disabled={!linked}>
					Next
				</Button>
			</div>
		</div>
	);
}
