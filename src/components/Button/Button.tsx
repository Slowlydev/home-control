import classNames from "classnames";
import { motion } from "framer-motion";
import { MouseEventHandler, ReactNode } from "react";

import styles from "./Button.module.scss";

type Props = {
	onClick?: MouseEventHandler;
	children?: ReactNode;
	className?: string;
	disabled?: boolean;
};

export default function Button({ onClick, children, className, disabled }: Props) {
	return (
		<motion.button
			disabled={disabled}
			onClick={(e) => (!disabled && onClick ? onClick(e) : void 0)}
			className={classNames(className, styles.button)}
			initial={{ scale: 1.0 }}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			{children}
		</motion.button>
	);
}
