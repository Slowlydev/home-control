import arrowShort from "@/assets/arrows/arrow-short.svg";
import bridge from "@/assets/icons/bridge.svg";
import server from "@/assets/icons/server.svg";
import user from "@/assets/icons/user.svg";
import logo from "@/assets/logo.png";

import styles from "./CloudStrategy.module.scss";

export default function CloudStrategy() {
	return (
		<div className={styles.container}>
			<div className={styles.bridge}>
				<img src={bridge} />
			</div>

			<img src={arrowShort} />

			<div className={styles.cloud}>
				<img src={server} />
				<img src={user} />
			</div>

			<img src={arrowShort} />

			<img className={styles.logo} src={logo} />
		</div>
	);
}
