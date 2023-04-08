import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/window";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import styles from "./setup.module.scss";

import { DiscoverdBridgeType } from "@/types/DiscoveredBridge.type";
import { Strategy } from "@/types/Strategy.type";

import { env } from "@/lib/config";

import { requestToken } from "@/services/account.service";
import { discoverBridge } from "@/services/discovery.service";

import Button from "@/components/Button/Button";
import DummyLightCard from "@/components/DummyLightCard";
import CloudStrategy from "@/components/Strategy/CloudStrategy/CloudStrategy";
import HybridStrategy from "@/components/Strategy/HybridStrategy/HybridStrategy";
import LocalStrategy from "@/components/Strategy/LocalStrategy/LocalStrategy";

import bridgeIcon from "@/assets/icons/bridge.svg";

export default function SetupPage() {
	const [step, setStep] = useState<"intro" | "strategy" | "hybrid-intro" | "login" | "discover" | "link" | "done">("intro");
	const [strategy, setStrategy] = useState<Strategy>(null);
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [bridges, setBridges] = useState<DiscoverdBridgeType[]>([]);
	const [selectedBridge, setSelectedBridge] = useState<null | DiscoverdBridgeType>(null);
	const [linked, setLinked] = useState<boolean>(false);

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

	const delay = (callback: () => void) => {
		setTimeout(callback, 1000);
	};

	const handleDiscoveryStep = async () => {
		// const bridges = await invoke("plugin:discover|discover");
		// setDiscoverdBridges(bridges);

		const bridges = await discoverBridge();
		setBridges(bridges);
		setStep("discover");
	};

	return (
		<div className={styles.container}>
			<AnimatePresence>
				{step === "intro" && (
					<motion.div className={styles.intro} exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="intro">
						<h1>Welcome to home-control</h1>

						<DummyLightCard onClick={() => delay(() => setStep("strategy"))} />

						<p className={styles.infoText}>turn on the light to start</p>
					</motion.div>
				)}

				{step === "strategy" && (
					<motion.div className={styles.strategyWrapper} exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="strategy">
						<h1>Choose your home-control strategy</h1>

						<div className={styles.strategyContainer}>
							<div className={styles.strategy}>
								<LocalStrategy />
								<p className={styles.infoText}>home-control directly talks to your hue bridge over the local network</p>
								<Button
									onClick={() => {
										setStrategy("local");
										handleDiscoveryStep();
									}}
								>
									Choose
								</Button>
							</div>

							<div className={styles.strategy}>
								<CloudStrategy />
								<p className={styles.infoText}>home-control talks to your hue bridge through the Philips Hue servers using your linked hue account</p>
								<Button
									onClick={() => {
										setStrategy("cloud");
										setStep("login");
									}}
								>
									Choose
								</Button>
							</div>

							<div className={styles.strategy}>
								<HybridStrategy />
								<p className={styles.infoText}>home-control decides witch is better for the current situation</p>
								<Button
									onClick={() => {
										setStrategy("hybrid");
										setStep("hybrid-intro");
									}}
								>
									Choose
								</Button>
							</div>
						</div>
					</motion.div>
				)}

				{step === "hybrid-intro" && (
					<motion.div className={styles.wrapper} exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="hybrid-intro">
						<div className={styles.left}>
							<SelectedStrategy strategy={strategy} />
						</div>

						<div className={classNames(styles.right, styles.content)}>
							<h1>Hybrid strategy introduction</h1>
							<p className={styles.infoText}>
								Because the hybrid strategy utilizes both ways to talk to a hue bridge you will need to both link you hue bridge as well as login with
								your philips hue account
							</p>

							<div className={styles.buttons}>
								<Button onClick={() => setStep("strategy")}>Back</Button>
								<Button onClick={() => setStep("login")}>Next</Button>
							</div>
						</div>
					</motion.div>
				)}

				{step === "login" && (
					<motion.div className={styles.wrapper} exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="login">
						<div className={styles.left}>
							<SelectedStrategy strategy={strategy} />
						</div>

						<div className={classNames(styles.right, styles.content)}>
							<h1>Login with Philips Hue Account</h1>
							<p className={styles.infoText}>
								After u press “login”, u will be prompted to login with you philips hue account and to allow home-control to access your hue bridge
							</p>

							<Button className={styles.loginButton} onClick={signInWithHueAccount}>
								Login
							</Button>

							<div className={styles.buttons}>
								<Button onClick={() => setStep(strategy === "hybrid" ? "hybrid-intro" : "strategy")}>Back</Button>
								<Button onClick={() => setStep("login")} disabled={!loggedIn}>
									Next
								</Button>
							</div>
						</div>
					</motion.div>
				)}

				{step === "discover" && (
					<motion.div className={styles.wrapper} exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="discover">
						<div className={styles.left}>
							<SelectedStrategy strategy={strategy} />
						</div>

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

										<input
											type="checkbox"
											checked={selectedBridge?.id === bridge.id}
											className={styles.checkbox}
											onClick={() => setSelectedBridge(bridge)}
										/>
									</div>
								))}
							</div>

							<div className={styles.buttons}>
								<Button onClick={() => setStep("strategy")}>Back</Button>
								<Button onClick={() => setStep("link")} disabled={!selectedBridge}>
									Next
								</Button>
							</div>
						</div>
					</motion.div>
				)}

				{step === "link" && (
					<motion.div className={styles.wrapper} exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="link">
						<div className={styles.left}>
							<SelectedStrategy strategy={strategy} />
						</div>

						<div className={classNames(styles.right, styles.content)}>
							<h1>Link your Hue bridge with home-control</h1>
							<p className={styles.infoText}>After u press “Link”, u will have to press the link button on the bridge</p>

							<Button className={styles.loginButton}>Link</Button>

							<div className={styles.buttons}>
								<Button onClick={() => handleDiscoveryStep()}>Back</Button>
								<Button onClick={() => setStep("done")} disabled={!linked}>
									Next
								</Button>
							</div>
						</div>
					</motion.div>
				)}

				{step === "done" && (
					<motion.div className={styles.wrapper} exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="done">
						<div className={styles.left}>
							<SelectedStrategy strategy={strategy} />
						</div>

						<div className={classNames(styles.right, styles.content)}>
							<h1>All done! Have fun using home-control</h1>
							<Button>Finish Setup</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

type SelectedStrategyProps = {
	strategy: Strategy;
};

const SelectedStrategy = ({ strategy }: SelectedStrategyProps) => {
	if (strategy === "cloud") return <CloudStrategy />;
	if (strategy === "hybrid") return <HybridStrategy />;
	if (strategy === "local") return <LocalStrategy />;
	return <LocalStrategy />;
};
