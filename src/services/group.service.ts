import { GroupType } from "../types/Group.type";
import { localBridge } from "./axios.service";
import { getLights } from "./lights.service";

// TODO migrate to API v2
/**
 * @deprecated migrate to API v2
 */
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

// TODO migrate to API v2
/**
 * @deprecated migrate to API v2
 */
export const getDetailedGroups = async (): Promise<GroupType[]> => {
	const [groups, lights] = await Promise.all([getGroups(), getLights()]);

	for (const group of groups) {
		group.detailedLights = lights.filter((light) => group.lights.includes(light.id));
	}

	return groups;
};

// TODO migrate to API v2
/**
 * @deprecated migrate to API v2
 */
export const updateGroup = async (id: string, updatedGroup: any) => {
	const { data } = await localBridge.put(`/groups/${id}/action`, updatedGroup);
	return data;
};
