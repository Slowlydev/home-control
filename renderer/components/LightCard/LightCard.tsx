// @ts-nocheck
import { motion } from "framer-motion"
import { useState } from "react";
import dynamic from "next/dynamic";

const Light = dynamic(() => import('../Light/Light'), {
	ssr: false,
})

import Toggle from "../Toggle/Toggle";

import styles from "./LightCard.module.scss";
import devicesService from "../../services/devices.service";
import { mutate } from "swr";

interface Props {
	light: any,
}

export default function LightCard({ light }: Props) {

	const [isOn, setIsOn] = useState(light.state.on);

	function xyBriToRgb(x, y, bri) {
		z = 1.0 - x - y;

		Y = bri / 255.0; // Brightness of lamp
		X = (Y / y) * x;
		Z = (Y / y) * z;
		r = X * 1.612 - Y * 0.203 - Z * 0.302;
		g = -X * 0.509 + Y * 1.412 + Z * 0.066;
		b = X * 0.026 - Y * 0.072 + Z * 0.962;
		r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
		g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
		b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
		maxValue = Math.max(r, g, b);
		r /= maxValue;
		g /= maxValue;
		b /= maxValue;
		r = r * 255; if (r < 0) { r = 255 };
		g = g * 255; if (g < 0) { g = 255 };
		b = b * 255; if (b < 0) { b = 255 };

		r = Math.round(r).toString(16);
		g = Math.round(g).toString(16);
		b = Math.round(b).toString(16);

		if (r.length < 2)
			r = "0" + r;
		if (g.length < 2)
			g = "0" + g;
		if (b.length < 2)
			b = "0" + r;
		rgb = "#" + r + g + b;

		return rgb;
	}

	function determineHex(): string {
		if (light.state.colormode === "xy") {
			const temp = xyBriToRgb(light.state.xy[0], light.state.xy[0], light.state.bri);
			console.log(temp)
			return temp
		}
	}

	function updateLight(value) {
		setIsOn(value);
		devicesService.updateLight(light.id, { on: value });
		mutate("devices", devicesService.getDevices);
	}

	return (
		<motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
			<Light color={`${determineHex()}`} on={isOn} />
			<p>{isOn ? "On" : "Off"}</p>
			<Toggle value={light.state.on} callback={(value: boolean) => updateLight(value)} />
		</motion.div>
	)
}