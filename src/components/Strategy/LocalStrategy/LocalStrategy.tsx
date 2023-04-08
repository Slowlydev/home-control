import arrowLong from "@/assets/arrows/arrow-long.svg";
import bridge from "@/assets/icons/bridge.svg";
import logo from "@/assets/logo.png";

import styles from "./LocalStrategy.module.scss";

export default function LocalStrategy() {
	return (
		<div className={styles.container}>
			<div className={styles.bridge}>
				<img src={bridge} />
			</div>

			<img src={arrowLong} />

			<img className={styles.logo} src={logo} />
		</div>
	);
}
