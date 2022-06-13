import Store from "electron-store";
import axios from "axios";

import lightsService from "./lights.service";

import GroupInterface from "../interfaces/GroupInterface";
import LightInterface from "../interfaces/LightInterface";

const store = new Store();

const httpRequest = axios.create({
	baseURL: `http://${store.get('bridge')}/api/${store.get('token')}/`
});

async function getGroups(): Promise<GroupInterface[]> {
	const { data } = await httpRequest.get("/groups");

	const resultGroups = [];

	for (const groupObjKey in data) {
		resultGroups.push({
			...data[groupObjKey],
			id: groupObjKey,
		})
	}

	return resultGroups;
}

async function getDetailedGroups(): Promise<GroupInterface[]> {
	const [groups, lights] = await Promise.all([getGroups(), lightsService.getLights()]);

	for (const group of groups) {
		group.detailedLights = lights.filter((light: LightInterface) => group.lights.includes(light.id));
	}

	return groups;
}

async function updateGroup(id: string, updatedGroup: any) {
	return httpRequest.put(`/groups/${id}/action`, updatedGroup).then(res => res.data);
}

export default {
	getGroups,
	getDetailedGroups,
	updateGroup
}