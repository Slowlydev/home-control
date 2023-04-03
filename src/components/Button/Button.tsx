import { motion } from "framer-motion";
import { MouseEventHandler, ReactNode } from "react";

type Props = {
	onClick?: MouseEventHandler;
	children?: ReactNode;
};

export default function Button({ onClick, children }: Props) {
	return (
		<motion.button onClick={onClick} initial={{ scale: 1.0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
			{children}
		</motion.button>
	);
}
