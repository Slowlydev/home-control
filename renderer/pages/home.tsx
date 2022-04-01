import Link from "next/link";
import React from "react";
import useSWR from "swr";

import styles from "./home.module.scss"

import devicesService from "../services/devices.service";

import LightCard from "../components/LightCard/LightCard";

import Light from "../interfaces/Light";

export default function Home() {
	const { data: lightsData } = useSWR("devices", devicesService.getLights);

	return (
		<React.Fragment>
			<div className={styles.container}>
				<h1>Home</h1>

				<h2>Scenes</h2>

				<h2>Lights</h2>
				{lightsData !== undefined && (
					<div className={styles.devices}>
						{lightsData.map((light: Light) => (
							<LightCard light={light} />
						))}
					</div>
				)}

				<Link href="/setup">Settings</Link>

			</div>
		</React.Fragment>
	);
}