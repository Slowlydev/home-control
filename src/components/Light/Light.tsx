import styles from "./Light.module.scss";

type LightProps = {
	isOn: boolean;
	color: string;
	customStyles?: React.CSSProperties;
};

export default function Light({ isOn, color, customStyles }: LightProps) {
	return (
		<div className={styles.lightContainer} style={customStyles}>
			<div className={styles.light} style={{ backgroundColor: isOn ? color : "black" }} />

			<div className={styles.background}>
				<div className={styles.light} style={{ backgroundColor: isOn ? color : "black" }} />
			</div>
		</div>
	);
}
