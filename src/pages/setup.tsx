import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "tauri-plugin-store-api";

import styles from "./setup.module.scss";

import { DiscoverdBridgeType } from "@/types/DiscoveredBridge.type";
import { Strategy } from "@/types/Strategy.type";

import { discoverBridge } from "@/services/discovery.service";

import Button from "@/components/Button/Button";
import DummyLightCard from "@/components/DummyLightCard";
import BridgeSelection from "@/components/Setup/BridgeSelection/BridgeSelection";
import LinkBridge from "@/components/Setup/LinkBridge/LinkBridge";
import Login from "@/components/Setup/Login/Login";
import CloudStrategy from "@/components/Setup/Strategy/CloudStrategy/CloudStrategy";
import HybridStrategy from "@/components/Setup/Strategy/HybridStrategy/HybridStrategy";
import LocalStrategy from "@/components/Setup/Strategy/LocalStrategy/LocalStrategy";
import StrategySelection from "@/components/Setup/StrategySelection/StrategySelection";

const store = new Store(".config.dat");

export default function SetupPage() {
	const [step, setStep] = useState<"intro" | "strategy" | "hybrid-intro" | "login" | "discover" | "link" | "done">("intro");
	const [strategy, setStrategy] = useState<Strategy>(null);
	const [bridges, setBridges] = useState<DiscoverdBridgeType[]>([]);

	const navigate = useNavigate();

	const delay = (callback: () => void) => {
		setTimeout(callback, 1000);
	};

	const handleDiscoveryStep = async () => {
		const bridges = await discoverBridge();
		setBridges(bridges);
		setStep("discover");
	};

	const handleFinishSetup = async () => {
		await store.save();
		navigate("/");
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

				{step === "strategy" && <StrategySelection handleStrategyChange={() => {}} />}

				{step === "login" && <Login next={() => {}} back={() => {}} />}

				{step === "discover" && <BridgeSelection next={() => {}} back={() => {}} bridges={bridges} />}

				{step === "link" && <LinkBridge next={() => {}} back={() => {}} selectedBridge={bridges[0]} />}

				{step === "done" && (
					<motion.div className={styles.wrapper} exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="done">
						<div className={styles.left}>
							<SelectedStrategy strategy={strategy} />
						</div>

						<div className={classNames(styles.right, styles.content)}>
							<h1>All done! Have fun using home-control</h1>
							<Button onClick={() => handleFinishSetup()}>Finish Setup</Button>
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
