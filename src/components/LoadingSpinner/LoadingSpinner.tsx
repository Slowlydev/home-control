import styles from "./LoadingSpinner.module.scss";
import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <motion.div className={styles.wrapper}>
      <motion.div
        className={styles.dot}
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [0.5, 1, 0.5],
          transition: { repeat: Infinity },
        }}
      />
      <motion.div
        className={styles.dot}
        animate={{
          opacity: [1, 0.2, 1],
          scale: [1, 0.5, 1],
          transition: { repeat: Infinity },
        }}
      />
    </motion.div>
  );
}
