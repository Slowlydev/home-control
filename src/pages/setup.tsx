import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "tauri-plugin-store-api";

import styles from "./setup.module.scss";

import { DiscoverdBridgeType } from "@/types/DiscoveredBridge.type";
import { Strategy } from "@/types/Strategy.type";

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

type Step = {
	strategy: Strategy;
	content: JSX.Element;
	before?: () => void;
};

export default function SetupPage() {
	const [step, setStep] = useState<number>(0);
	const [strategy, setStrategy] = useState<Strategy>(null);
	const [selectedBridge, setSelectedBridge] = useState<DiscoverdBridgeType | null>(null);

	const navigate = useNavigate();

	const handleStrategyChange = (strategy: Strategy) => {
		setStrategy(strategy);
		nextStep();
	};

	const nextStep = async () => {
		const nextStepIndex = step + 1;
		const beforeFunction = filteredSteps[nextStepIndex].before;
		if (beforeFunction) await beforeFunction();
		setStep(nextStepIndex);
	};

	const previousStep = async () => {
		const previousStepIndex = step - 1;
		const beforeFunction = filteredSteps[previousStepIndex].before;
		if (beforeFunction) await beforeFunction();
		setStep(previousStepIndex);
	};

	const delay = (callback: () => void) => {
		setTimeout(callback, 1000);
	};

	const handleFinishSetup = async () => {
		await store.save();
		navigate("/");
	};

	const steps: (Step | Step[])[] = [
		{
			strategy: null,
			content: (
				<>
					<h1>Welcome to home-control</h1>
					<DummyLightCard onClick={() => delay(() => nextStep())} />
					<p className={styles.infoText}>turn on the light to start</p>
				</>
			),
		},
		{
			strategy: null,
			content: <StrategySelection handleStrategyChange={handleStrategyChange} />,
			before: () => setStrategy(null),
		},
		[
			{
				strategy: "local",
				content: <BridgeSelection next={nextStep} back={previousStep} onSelectedBridge={setSelectedBridge} />,
			},
			{
				strategy: "local",
				content: <LinkBridge next={nextStep} back={previousStep} selectedBridge={selectedBridge} />,
			},
		],
		[
			{
				strategy: "cloud",
				content: <Login next={nextStep} back={previousStep} />,
			},
		],
		[
			{
				strategy: "hybrid",
				content: <BridgeSelection next={nextStep} back={previousStep} onSelectedBridge={setSelectedBridge} />,
			},
			{
				strategy: "hybrid",
				content: <Login next={nextStep} back={previousStep} />,
			},
		],
		{
			strategy: null,
			content: (
				<>
					<h1>All done! Have fun using home-control</h1>
					<Button onClick={() => handleFinishSetup()}>Finish Setup</Button>
				</>
			),
		},
	];

	const filterSteps = (step: Step) => step.strategy === strategy || step.strategy === null;

	const filteredSteps = steps.flat().filter(filterSteps);

	return (
		<div className={styles.container}>
			<AnimatePresence>
				{!!strategy && (
					<div className={styles.left}>
						<SelectedStrategy strategy={strategy} />
					</div>
				)}

				<div className={classNames(styles.wrapper, { [styles.right]: !!strategy })}>
					<AnimatePresence>
						{filteredSteps.map((filteredStep, index) =>
							step === index ? (
								<motion.div key={`step.${index}`} className={styles.content} exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
									{filteredStep.content}
								</motion.div>
							) : null,
						)}
					</AnimatePresence>
				</div>
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
