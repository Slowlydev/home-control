import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Store from "electron-store";
import tinycolor from "tinycolor2";
import useSWR, { mutate } from "swr";

import styles from "./home.module.scss"

import lightsService from "../services/lights.service";
import scenesService from "../services/scenes.service";
import groupService from "../services/group.service";

import Light from "../components/Light/Light";
import Modal from "../components/Modal/Modal";
import LightCard from "../components/LightCard/LightCard";
import SceneCard from "../components/SceneCard/SceneCard";
import GroupCard from "../components/GroupCard/GroupCard";
import BridgeStatus from "../components/BridgeStatus/BridgeStatus";
import SettingsHeader from "../components/SettingsHeader/SettingsHeader";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ColorPicker from "../components/Pickers/ColorPicker";
import BrightnessPicker from "../components/Pickers/BrightnessPicker";
import TemperaturePicker from "../components/Pickers/TemperaturePicker";

import LightInterface from "../interfaces/LightInterface";
import SceneInterface from "../interfaces/SceneInterface";
import GroupInterface from "../interfaces/GroupInterface";

import convertToRGB from "../lib/convertToRGB";
import convertToCIE from "../lib/convertToCIE";
import { hasCT, hasDimming, hasRGB } from "../lib/lightCapabilities";
import { bitsToDecimal, decimalToBits } from "../lib/numberConverter";

const store = new Store();

export default function Home() {
	const { data: lightsData, isValidating: lightsDataLoading } = useSWR("lights", lightsService.getLights);
	const { data: scenesData, isValidating: scenesDataLoading } = useSWR("scenes", scenesService.getDetailedScenes);
	const { data: groupsData, isValidating: groupsDataLoading } = useSWR("groups", groupService.getDetailedGroups);

	const [scenesOpen, setScenesOpen] = useState(false);

	const [selectedLight, setSelectedLight] = useState<null | number>(null);

	const [previewColor, setPreviewColor] = useState<null | tinycolor.ColorFormats.RGBA>(null);

	const [color, setColor] = useState<null | tinycolor.ColorFormats.RGBA>(null);
	const [brightness, setBrightness] = useState<null | number>(null);
	const [temperature, setTerperature] = useState<null | number>(null);

	const scenesToHide = store.get("hiddenScenes") as string[] || [];

	function updateColor(color: tinycolor.ColorFormats.RGBA) {
		lightsService.updateLight(lightsData[selectedLight].id, {
			on: true,
			xy: convertToCIE(color.r, color.g, color.b),
		});

		mutate("lights", lightsService.getLights);
	}

	function updateTemperature(number: number) {
		const min = lightsData[selectedLight].capabilities.control.ct.min;
		const max = lightsData[selectedLight].capabilities.control.ct.max;
		const calclations = min + (number / 100) * (max - min);

		lightsService.updateLight(lightsData[selectedLight].id, {
			on: true,
			ct: Math.floor(calclations),
		});

		mutate("lights", lightsService.getLights);
	}

	function updateBrightness(number: number) {
		lightsService.updateLight(lightsData[selectedLight].id, {
			on: true,
			bri: decimalToBits(number)
		});

		mutate("lights", lightsService.getLights);
	}

	function initializeColor(index: number, light: LightInterface) {
		setSelectedLight(index);

		if (hasRGB(light)) {
			setColor({ ...convertToRGB(light.state.xy[0], light.state.xy[1]), a: 1 });
			setPreviewColor({ ...convertToRGB(light.state.xy[0], light.state.xy[1]), a: 1 });
		} else {
			setColor(null);
		}

		if (hasDimming(light)) {
			setBrightness(bitsToDecimal(light.state.bri));
		} else {
			setBrightness(null);
		}

		if (hasCT(light)) {
			const min = light.capabilities.control.ct.min;
			const max = light.capabilities.control.ct.max;
			const calclations = ((light.state.ct - min) * 100) / (max - min);

			setTerperature(Math.floor(calclations));
		} else {
			setTerperature(null);
		}
	}

	return (
		<React.Fragment>
			<div className={styles.container}>
				<SettingsHeader level={1}>Home</SettingsHeader>

				<BridgeStatus />

				<div className={styles.row}>
					<SettingsHeader level={2} onClick={() => setScenesOpen(true)} >Scenes</SettingsHeader>
					{scenesDataLoading && (<LoadingSpinner />)}
				</div>

				{scenesData !== undefined && (
					<div className={styles.scenes}>
						{scenesData.filter((sceneToHide: SceneInterface) => !scenesToHide.includes(sceneToHide.id)).map((scene: SceneInterface, index: number) => (
							<SceneCard scene={scene} key={`scene.${index}.${scene.id}`} />
						))}
					</div>
				)}

				<div className={styles.row}>
					<SettingsHeader level={2}>Groups</SettingsHeader>
					{groupsDataLoading && (<LoadingSpinner />)}
				</div>

				{groupsData !== undefined && (
					<div className={styles.groups}>
						{groupsData.map((group: GroupInterface, index: number) => (
							<GroupCard group={group} key={`group.${index}.${group.id}`} />
						))}
					</div>
				)}

				<div className={styles.row}>
					<SettingsHeader level={2}>All Lights</SettingsHeader>
					{lightsDataLoading && (<LoadingSpinner />)}
				</div>

				{lightsData !== undefined && (
					<div className={styles.lights}>
						{lightsData.map((light: LightInterface, index: number) => (
							<div onClick={() => initializeColor(index, light)} key={`light.${index}.${light.id}`}>
								<LightCard light={light} />
							</div>
						))}
					</div>
				)}
			</div>

			<AnimatePresence>
				{selectedLight !== null && (
					<Modal close={() => setSelectedLight(null)} >
						<div className={styles.modalContainer}>
							<div className={styles.modalHeader}>
								<Light isOn={lightsData[selectedLight].state.on} color={tinycolor(previewColor).toHexString()} />
								<h1>{lightsData[selectedLight].name}</h1>
								{lightsDataLoading && (<LoadingSpinner />)}
							</div>

							<div className={styles.pickerWrapper}>
								{hasRGB(lightsData[selectedLight]) && (
									<ColorPicker
										color={color}
										onChange={(color) => setColor(color)}
										onChangeDebounced={(color) => updateColor(color)} />
								)}

								{hasCT(lightsData[selectedLight]) && (
									<TemperaturePicker
										teperature={temperature}
										onChange={(bitsValue) => setTerperature(bitsValue)}
										onChangeDebounced={(bitsValue) => updateTemperature(bitsValue)} />
								)}

								{hasDimming(lightsData[selectedLight]) && (
									<BrightnessPicker
										color={color}
										brightness={brightness}
										onChange={(decimalNumber) => setBrightness(decimalNumber)}
										onChangeDebounced={(decimalNumber) => updateBrightness(decimalNumber)}
									/>
								)}
							</div>
						</div>
					</Modal>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{scenesOpen && (
					<Modal close={() => setScenesOpen(false)} >
						<div className={styles.modalContainer}>
							<h1>Edit Scenes View</h1>

							{scenesData !== undefined && (
								<div className={styles.scenes}>
									{scenesData.map((scene: SceneInterface, index: number) => (
										<SceneCard scene={scene} key={`scene.${index}.${scene.id}`} edit onHide={() => { }} />
									))}
								</div>
							)}
						</div>
					</Modal>
				)}
			</AnimatePresence>
		</React.Fragment >
	);
}