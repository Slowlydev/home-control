import { GroupType } from "../types/Group.type";

import { localBridge } from "./axios.service";
import { getLights } from "./lights.service";

export const getGroups = async (): Promise<GroupType[]> => {
	const { data } = await localBridge.get("/groups");

	const resultGroups = [];

	for (const groupObjKey in data) {
		resultGroups.push({
			...data[groupObjKey],
			id: groupObjKey,
		});
	}

	return resultGroups;
};

export const getDetailedGroups = async (): Promise<GroupType[]> => {
	const [groups, lights] = await Promise.all([getGroups(), getLights()]);

	for (const group of groups) {
		group.detailedLights = lights.filter((light) => group.lights.includes(light.id));
	}

	return groups;
};

export const updateGroup = async (id: string, updatedGroup: any) => {
	const { data } = await localBridge.put(`/groups/${id}/action`, updatedGroup);
	return data;
};