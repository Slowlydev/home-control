import { LightType } from "@/types/Light.type";
import { motion } from "framer-motion";
import tinycolor from "tinycolor2";

import styles from "./LightCard.module.scss";

import { convertToRGB } from "@/lib/convertToRGB";

import Light from "@/components/Light/Light";
import Toggle from "@/components/Toggle/Toggle";

type Props = {
	light: LightType;
	toggleLight: (value: boolean) => void;
};

export default function LightCard({ light, toggleLight }: Props) {
	const color = () => {
		if (light.state.colormode === "xy") {
			return tinycolor(convertToRGB(light.state.xy[0], light.state.xy[1], light.state.bri)).toHexString();
		}

		if (light.state.colormode === "ct") {
			return "#ffffff";
		}

		return "#ffd70f";
	};

	const calcBrightness = light.state.bri !== 254 ? Math.floor((light.state.bri / 255) * 100) : 100;
	const status = light.state.on ? `${calcBrightness}%` : "off";

	return (
		<motion.div className={styles.card} animate={{ scale: 1 }}>
			<div className={styles.lightContainer}>
				<Light color={color()} isOn={light.state.on} />
			</div>

			<div className={styles.detailsContainer}>
				<div className={styles.infoContainer}>
					<p>{light.name}</p>
					<p className={styles.status}>{status}</p>
				</div>
				<Toggle value={light.state.on} callback={(value: boolean) => toggleLight(value)} />
			</div>
		</motion.div>
	);
}
