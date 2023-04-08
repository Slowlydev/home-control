import React, { useState } from "react";

import LightCard from "./LightCard/LightCard";

type Props = {
	onClick: () => void;
};

export default function DummyLightCard({ onClick }: Props) {
	const [light, setLight] = useState({
		id: "",
		state: {
			on: false,
			bri: 0,
			hue: 0,
			sat: 0,
			effect: "",
			xy: [],
			ct: 0,
			alert: "",
			colormode: "",
			mode: "",
			reachable: false,
		},
		swupdate: {
			state: "",
			lastinstall: "",
		},
		type: "",
		name: "Light",
		modelid: "",
		manufacturername: "",
		productname: "",
		capabilities: {
			certified: false,
			control: {
				mindimlevel: 0,
				maxlumen: 0,
				colorgamuttype: "",
				colorgamut: [],
				ct: {
					min: 0,
					max: 0,
				},
			},
			streaming: {
				renderer: false,
				proxy: false,
			},
		},
		config: {
			archetype: "",
			function: "",
			direction: "",
			startup: {
				mode: "",
				configured: false,
			},
		},
		uniqueid: "",
		swversion: "",
		swconfigid: "",
		productid: "",
	});

	const onClickHandler = () => {
		const tmpLight = { ...light };
		tmpLight.state.on = true;
		setLight(tmpLight);
		onClick();
	};

	return <LightCard light={light} toggleLight={onClickHandler} />;
}
