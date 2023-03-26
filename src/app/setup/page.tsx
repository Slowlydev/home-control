"use client";

import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

import styles from "./setup.module.scss";

import DiscoverdBridgeInterface from "@/types/DiscoveredBridge.type";

import bridgeService from "@/services/bridge.service";
import discoveryService from "@/services/discovery.service";

import BridgeStatus from "@/components/BridgeStatus/BridgeStatus";
import Button from "@/components/Button/Button";

export default function Setup() {
	const { data, mutate } = useSWR<DiscoverdBridgeInterface[]>("discovery", discoveryService.discoverBridge);

	const [selectedBridge, setSelectedBridge] = useState<null | DiscoverdBridgeInterface>(null);
	const [hasClientKey, setHasClientKey] = useState<boolean>(false);
	const [step, setStep] = useState<"start" | "cloud" | "discover" | "link" | "done">("start");

	function startLinkProcess() {
		let interval = setInterval(linkWithBridge, 2000);

		async function linkWithBridge() {
			const data = await bridgeService.createClientKey();
			if (data[0].success) {
				// nookies.set(null, "key", data[0].success.username, { maxAge: 12 * 30 * 24 * 60 * 60, });
				// store.set("token", data[0].success.username);
				setHasClientKey(true);
				clearInterval(interval);
			}
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<h1>Setup</h1>
			</div>

			<div className={styles.right}>
				{step === "start" && (
					<div className={styles.content}>
						<h2>Local or Cloud</h2>

						<div className={styles.buttonContainer}>
							<Button onClick={() => setStep("discover")}>Local</Button>
							<Button onClick={() => setStep("cloud")}>Cloud</Button>
						</div>
					</div>
				)}

				{step === "discover" && (
					<div className={styles.content}>
						<h2>Discover Hue Bridge</h2>

						{data !== undefined ? (
							<div>
								{data.map((bridge: DiscoverdBridgeInterface) => (
									<div className={styles.bridge} key={bridge.id}>
										<div>
											<p>{bridge.id}</p>
											<p>
												{bridge.internalipaddress}:{bridge.port}
											</p>
										</div>

										<input type="radio" onClick={() => setSelectedBridge(bridge)} />
									</div>
								))}
							</div>
						) : (
							<p>No bridges were found!</p>
						)}

						<div className={styles.buttonContainer}>
							<Link href="/home">
								<Button>Leave Setup</Button>
							</Link>
							<Button onClick={() => mutate(discoveryService.discoverBridge)}>Reload</Button>

							{selectedBridge && (
								<Button
									onClick={() => {
										setStep("link");
									}}
								>
									Next Step
								</Button>
							)}

							{/* store.set("bridge", selectedBridge.internalipaddress); */}
						</div>
					</div>
				)}

				{step === "link" && (
					<div className={styles.content}>
						<h2>Connect with Bridge</h2>
						<p>After u pressed start, u will have to press the link button on the bridge.</p>

						<Link href="/home">
							<Button>Leave Setup</Button>
						</Link>
						<Button onClick={() => startLinkProcess()}>Start</Button>

						{hasClientKey && <Button onClick={() => setStep("done")}>Next Step</Button>}
					</div>
				)}

				{step === "done" && (
					<div className={styles.content}>
						<h2>All done!</h2>
						<p>Here u see the status of your hue bridge, if there are any red dots, please check your network connection or redo the setup</p>

						<BridgeStatus />
						<Link href="/home">
							<Button>Finish Setup</Button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
