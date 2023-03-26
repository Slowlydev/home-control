import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import styles from "./Toggle.module.scss";

interface Props {
  value: boolean;
  callback: Function;
}

export default function Toggle({ value, callback }: Props) {
  const [isOn, setIsOn] = useState(value ? value : false);

  function toggleSwitch(event: any) {
    event.stopPropagation();

    setIsOn(!isOn);
    callback(!isOn);
  }

  useEffect(() => {
    setIsOn(value);
  }, [value]);

  return (
    <div className={styles.switch} data-ison={isOn} onClick={toggleSwitch}>
      <motion.div className={styles.handle} layout="position" />
    </div>
  );
}
