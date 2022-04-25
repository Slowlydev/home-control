import useSWR from "swr";

import styles from "./BridgeStatus.module.scss";

import bridgeService from "../../services/bridge.service";

export default function BridgeStatus() {

	const { data, isValidating } = useSWR("bridgeInfo", bridgeService.getBridgeInfo);

	const hasNoUpdates = data?.swupdate2.state === "noupdates";
	const hasInternet = data?.internetservices.internet === "connected";
	const hasConnectivity = data !== undefined;

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={`${styles.dot} ${!hasNoUpdates ? styles.error : void 0}`} />
				<p>Updates</p>
			</div>

			<div className={styles.wrapper}>
				<div className={`${styles.dot} ${!hasInternet ? styles.error : void 0}`} />
				<p>Internet</p>
			</div>

			<div className={styles.wrapper}>
				<div className={`${styles.dot} ${!hasConnectivity ? styles.error : void 0}`} />
				<p>Connectivity</p>
			</div>
		</div>
	)
}