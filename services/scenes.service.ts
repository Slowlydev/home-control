import Store from "electron-store";
import axios from "axios";

import SceneInterface from "../interfaces/SceneInterface";

const store = new Store();

const httpRequest = axios.create({
	baseURL: `http://${store.get('bridge')}/api/${store.get('token')}/`
});

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

	const promises = Object.keys(data).map((key) => {
		return getScene(key).then((result) => {
			return { ...result, id: key }
		})
	})

	return await Promise.all(promises);
}

async function setScene(groupId: string, sceneId: string) {
	const { data } = await httpRequest.put(`groups/${groupId}/action`, { scene: sceneId });
	return data;
}

export default {
	getScenes,
	getScene,
	getDetailedScenes,
	setScene,
}