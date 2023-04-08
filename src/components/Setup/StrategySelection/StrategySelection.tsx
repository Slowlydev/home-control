import { motion } from "framer-motion";

import styles from "./StrategySelection.module.scss";

import Button from "@/components/Button/Button";

import CloudStrategy from "../Strategy/CloudStrategy/CloudStrategy";
import HybridStrategy from "../Strategy/HybridStrategy/HybridStrategy";
import LocalStrategy from "../Strategy/LocalStrategy/LocalStrategy";

type Props = {
	handleStrategyChange: (strategy: "local" | "cloud" | "hybrid") => void;
};

export default function StrategySelection({ handleStrategyChange }: Props) {
	return (
		<motion.div className={styles.wrapper} exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="strategy">
			<h1>Choose your home-control strategy</h1>

			<div className={styles.container}>
				<div className={styles.strategy}>
					<LocalStrategy />
					<p className={styles.infoText}>home-control directly talks to your hue bridge over the local network</p>
					<Button onClick={() => handleStrategyChange("local")}>Choose</Button>
				</div>

				<div className={styles.strategy}>
					<CloudStrategy />
					<p className={styles.infoText}>home-control talks to your hue bridge through the Philips Hue servers using your linked hue account</p>
					<Button onClick={() => handleStrategyChange("cloud")}>Choose</Button>
				</div>

				<div className={styles.strategy}>
					<HybridStrategy />
					<p className={styles.infoText}>home-control decides witch is better for the current situation</p>
					<Button onClick={() => handleStrategyChange("hybrid")}>Choose</Button>
				</div>
			</div>
		</motion.div>
	);
}
