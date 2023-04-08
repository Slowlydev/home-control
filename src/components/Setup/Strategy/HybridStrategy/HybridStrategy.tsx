import arrowCurve from "@/assets/arrows/arrow-curve.svg";
import arrowLeft from "@/assets/arrows/arrow-left.svg";
import arrowRight from "@/assets/arrows/arrow-right.svg";
import bridge from "@/assets/icons/bridge.svg";
import server from "@/assets/icons/server.svg";
import user from "@/assets/icons/user.svg";
import logo from "@/assets/logo.png";

import styles from "./HybridStrategy.module.scss";

export default function HybridStrategy() {
	return (
		<div className={styles.container}>
			<div className={styles.bridge}>
				<img src={bridge} />
			</div>

			<div className={styles.pathContainer}>
				<div className={styles.cloudPath}>
					<img src={arrowRight} />

					<div className={styles.cloud}>
						<img src={server} />
						<img src={user} />
					</div>

					<img src={arrowLeft} />
				</div>
				<img src={arrowCurve} />
			</div>

			<img className={styles.logo} src={logo} />
		</div>
	);
}
