import styles from "./BridgeStatus.module.scss";

export default function BridgeStatus() {

	// todo: logic 

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.dot} data-isoffline />
				<p>Connectivity</p>
			</div>

			<div className={styles.wrapper}>
				<div className={styles.dot} />
				<p>Authentication</p>
			</div>

			<div className={styles.wrapper}>
				<div className={styles.dot} />
				<p>Discovery</p>
			</div>
		</div>
	)
}