import styles from "./Light.module.scss";

interface LightProps {
	isOn: boolean,
	color: string,
}

export default function Light({ isOn, color }: LightProps) {
	return (
		<div className={styles.lightContainer}>
			<div className={styles.light} style={{ backgroundColor: isOn ? color : "black" }} />

			<div className={styles.background}>
				<div className={styles.light} style={{ backgroundColor: isOn ? color : "black" }} />
			</div>
		</div>
	)
}