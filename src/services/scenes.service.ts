import { SceneType } from "../types/Scene.type";
import { localBridge } from "./axios.service";

// TODO migrate to API v2
/**
 * @deprecated migrate to API v2
 */
export const getScenes = async (): Promise<SceneType[]> => {
	const { data } = await localBridge.get("/scenes");
	return Object.keys(data).map((key) => ({ ...data[key], id: key }));
};

// TODO migrate to API v2
/**
 * @deprecated migrate to API v2
 */
export const getScene = async (id: string): Promise<SceneType> => {
	const { data } = await localBridge.get(`/scenes/${id}`);
	return data;
};

// TODO migrate to API v2
/**
 * @deprecated migrate to API v2
 */
export const getDetailedScenes = async (): Promise<SceneType[]> => {
	const { data } = await localBridge.get("/scenes");

	const promises = Object.keys(data).map((key) => {
		return getScene(key).then((result) => {
			return { ...result, id: key };
		});
	});

	return await Promise.all(promises);
};

// TODO migrate to API v2
/**
 * @deprecated migrate to API v2
 */
export const setScene = async (groupId: string, sceneId: string) => {
	const { data } = await localBridge.put(`groups/${groupId}/action`, { scene: sceneId });
	return data;
};
