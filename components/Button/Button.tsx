import { motion } from "framer-motion";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
	onClick?: MouseEventHandler,
	children?: ReactNode,
}

export default function Button({ onClick, children }: Props) {

	const button = {
		hover: {
			scale: 1.1,
		},
		tap: {
			scale: 0.9,
		},
		initial: {
			scale: 1.0,
		}
	}

	return (
		<motion.button
			onClick={onClick}
			variants={button}
			initial="initial"
			whileHover="hover"
			whileTap="tap"
		>
			{children}
		</motion.button>
	)
}