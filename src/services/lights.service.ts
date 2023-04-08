import { LightType } from "../types/Light.type";
import { localBridge } from "./axios.service";

// TODO migrate to API v2
/**
 * @deprecated migrate to API v2
 */
export const getLights = async (): Promise<LightType[]> => {
	const { data } = await localBridge.get<{ [key: string]: any }>("/lights");
	return Object.keys(data).map((key) => ({ ...data[key], id: key }));
};

// TODO migrate to API v2
/**
 * @deprecated migrate to API v2
 */
export const updateLight = async (id: string, updatedLight: any) => {
	const { data } = await localBridge.put(`lights/${id}/state`, updatedLight);
	return data;
};
