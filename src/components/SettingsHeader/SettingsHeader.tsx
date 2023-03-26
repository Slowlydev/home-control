import { AnimatePresence, motion } from "framer-motion";
import { MouseEventHandler, ReactNode, useState } from "react";

import styles from "./SettingsHeader.module.scss";

interface SettingsHeaderProps {
	onClick?: MouseEventHandler;
	children: ReactNode;
	level: number;
	loading?: boolean;
}

export default function SettingsHeader({ onClick, children, level, loading }: SettingsHeaderProps) {
	const [hover, setHover] = useState(false);

	const CustomHeaderTag: keyof JSX.IntrinsicElements = `h${level || 1}` as keyof JSX.IntrinsicElements;

	return (
		<motion.div className={styles.wrapper} onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}>
			<CustomHeaderTag>{children}</CustomHeaderTag>

			<AnimatePresence>
				{hover && (
					<motion.img
						onClick={onClick}
						initial={{ x: -30, opacity: 0, scale: 0.8 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: -30, opacity: 0 }}
						src="/assets/settings.svg"
					/>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
