import { useState } from "react";
import tinycolor from "tinycolor2";

import styles from "./SceneCard.module.scss";

import convertToRGB from "../../lib/convertToRGB";

import SceneInterface from "../../interfaces/SceneInterface";

interface Props {
	scene: SceneInterface,
	edit?: boolean,
	onHide?: Function,
}

export default function SceneCard({ scene, edit }: Props) {

	const [hasColors, setHasColors] = useState(false);

	const colors: string[] = [];

	Object.values(scene.lightstates).forEach((value) => {
		if (value.on && value.xy) {
			if (!hasColors) { setHasColors(true) };
			colors.push(tinycolor(convertToRGB(value.xy[0], value.xy[1], value.bri)).toHexString());
		}
	});

	const gradient = `linear-gradient(to right, ${colors.join(', ')})`

	return (
		<div className={styles.card}>
			{hasColors && (<div className={styles.light} style={{ backgroundImage: gradient }} />)}
			<p>{scene.name}</p>
			{edit && (<input type="checkbox" />)}
		</div>
	)
}