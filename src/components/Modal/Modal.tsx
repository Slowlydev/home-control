import Button from "../Button/Button";
import styles from "./Modal.module.scss";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  close: Function;
}

export default function Modal({ children, close }: ModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className={styles.background}
    >
      <div className={styles.content}>
        {children}
        <Button onClick={() => close()}>close</Button>
      </div>
    </motion.div>
  );
}
