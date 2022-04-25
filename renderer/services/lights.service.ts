import Store from "electron-store";
import axios from "axios";

import LightInterface from "../interfaces/LightInterface";

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

export default {
	getLights,
	updateLight,
}