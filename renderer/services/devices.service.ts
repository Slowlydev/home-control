import Store from "electron-store";
import axios from "axios";

import LightInterface from "../interfaces/LightInterface";
import SceneInterface from "../interfaces/SceneInterface";

const store = new Store();

const httpRequest = axios.create({
	baseURL: `http://${store.get('bridge')}/api/${store.get('token')}/`
});

async function getLights(): Promise<LightInterface[]> {
	const { data } = await httpRequest.get("/lights");

	const resultLights = [];

	for (const lightObjKey in data) {
		resultLights.push({
			...data[lightObjKey],
			id: lightObjKey,
		})
	}

	return resultLights;
}

async function updateLight(id: string, updatedLight: any) {
	return httpRequest.put(`lights/${id}/state`, updatedLight).then(res => res.data);
}

async function getScenes(): Promise<SceneInterface[]> {
	const { data } = await httpRequest.get("/scenes");

	const resultScenes = [];

	for (const sceneObjKey in data) {
		resultScenes.push({
			...data[sceneObjKey],
			id: sceneObjKey,
		})
	}

	return resultScenes;
}

async function getScene(id: string): Promise<SceneInterface> {
	const { data } = await httpRequest.get(`/scenes/${id}`);
	return data;
}

async function getDetailedScenes(): Promise<SceneInterface[]> {
	const { data } = await httpRequest.get("/scenes");

	const resultScenes = [];

	await Promise.all([
		Object.keys(data).map((key) => getScene(key).then((result) => resultScenes.push({ ...result, id: key })))
	]);

	return resultScenes;
}

export default {
	getLights,
	updateLight,
	getScenes,
	getScene,
	getDetailedScenes,
}