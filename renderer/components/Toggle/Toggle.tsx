import { motion } from "framer-motion";
import { useState } from "react";

import styles from "./Toggle.module.scss";

interface Props {
	value: boolean,
	callback: Function,
}

export default function Toggle({ value, callback }: Props) {

	const [isOn, setIsOn] = useState(value ? value : false);

	const toggleSwitch = () => { setIsOn(!isOn); callback(!isOn) };

	return (
		<div className={styles.switch} data-ison={isOn} onClick={toggleSwitch}>
			<motion.div className={styles.handle} layout />
		</div>
	)
}