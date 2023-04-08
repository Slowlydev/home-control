import classNames from "classnames";
import { useState } from "react";

import styles from "./BridgeSelection.module.scss";

import { DiscoverdBridgeType } from "@/types/DiscoveredBridge.type";

import Button from "@/components/Button/Button";

import bridgeIcon from "@/assets/icons/bridge.svg";

type Props = {
	next: () => void;
	back: () => void;
	bridges: DiscoverdBridgeType[];
};

export default function BridgeSelection({ next, back, bridges }: Props) {
	const [selectedBridge, setSelectedBridge] = useState<null | DiscoverdBridgeType>(null);

	return (
		<div className={classNames(styles.right, styles.content)}>
			<h1>Select your hue bridge you want to connect</h1>

			{/* TODO add error/loading/empty handling */}

			<div className={styles.bridges}>
				{bridges.map((bridge) => (
					<div className={styles.bridge} key={bridge.id}>
						<img src={bridgeIcon} />

						<div>
							<p>{bridge.id}</p>
							<p className={styles.infoText}>
								{bridge.internalipaddress}:{bridge.port}
							</p>
						</div>

						<input type="checkbox" checked={selectedBridge?.id === bridge.id} className={styles.checkbox} onClick={() => setSelectedBridge(bridge)} />
					</div>
				))}
			</div>

			<div className={styles.buttons}>
				<Button onClick={() => back()}>Back</Button>
				<Button onClick={() => next()} disabled={!selectedBridge}>
					Next
				</Button>
			</div>
		</div>
	);
}
