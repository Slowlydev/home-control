import { useEffect, useState } from "react";

import commonStyles from "../common-setup.module.scss";
import styles from "./BridgeSelection.module.scss";

import { DiscoverdBridgeType } from "@/types/DiscoveredBridge.type";

import { discoverBridge } from "@/services/discovery.service";

import Button from "@/components/Button/Button";

import bridgeIcon from "@/assets/icons/bridge.svg";

type Props = {
	next: () => void;
	back: () => void;
	onSelectedBridge: (bridge: DiscoverdBridgeType) => void;
};

export default function BridgeSelection({ next, back }: Props) {
	const [bridges, setBridges] = useState<DiscoverdBridgeType[]>([]);
	const [selectedBridge, setSelectedBridge] = useState<null | DiscoverdBridgeType>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const loadBridges = async () => {
			setLoading(true);

			try {
				const bridges = await discoverBridge();
				setBridges(bridges);
			} catch (_) {
				setError(true);
			}

			setLoading(false);
		};

		loadBridges();
	}, []);

	return (
		<>
			<h1>Select your hue bridge you want to connect</h1>

			{!loading && !error && bridges.length < 1 && <p>No bridge found</p>}
			{loading && !error && <p>loading...</p>}
			{error && !loading && <p>an error occured</p>}

			{/* TODO prettier error handling */}

			<div className={styles.bridges}>
				{bridges.map((bridge, index) => (
					<div className={styles.bridge} key={`selection.bridge.${index}.${bridge.id}`}>
						<div>
							<img src={bridgeIcon} />

							<div>
								<p>{bridge.id}</p>
								<p className={styles.infoText}>
									{bridge.internalipaddress}:{bridge.port}
								</p>
							</div>
						</div>

						<input type="checkbox" checked={selectedBridge?.id === bridge.id} className={styles.checkbox} onClick={() => setSelectedBridge(bridge)} />
					</div>
				))}
			</div>

			<div className={commonStyles.buttons}>
				<Button onClick={() => back()}>Back</Button>
				<Button onClick={() => next()} disabled={!selectedBridge}>
					Next
				</Button>
			</div>
		</>
	);
}
