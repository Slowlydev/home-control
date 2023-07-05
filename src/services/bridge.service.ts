import axios from "axios";

import { BridgeConfigType } from "@/types/BridgeConfig.type";
import { ClientKeyType } from "@/types/ClientKey.type";

import { loadConfig } from "@/lib/config";

import { cloudBridge, localBridge } from "./axios.service";

const config = await loadConfig();

// TODO migrate to API v2
/**
 * @deprecated migrate to API v2
 */
export const getBridgeInfo = async (): Promise<BridgeConfigType> => {
	const { data } = await localBridge.get("/config");
	return data;
};

// TODO migrate to API v2
/**
 * @deprecated migrate to API v2
 */
export const createClientKey = async (): Promise<{ success: ClientKeyType }[]> => {
	const bridge = "";
	if (bridge) {
		return axios.post(``, { devicetype: "home-control" });
	} else {
		throw new Error("Could not get bridge info");
	}
};

// TODO ping local bridge
export const isLocalBridgeAvailable = async (): Promise<boolean> => true;

export const putLinkButton = async (): Promise<unknown> => {
	const { data } = await cloudBridge.get("/0/config");
	return data;
};

export const createCloudKey = async (): Promise<{ success: ClientKeyType }[]> => {
	const { data } = await axios.post(
		"/api",
		{ devicetype: "home-control" },
		{
			baseURL: "https://api.meethue.com/route/",
			headers: {
				Authorization: `Bearer ${config.cloud.token?.access_token}`,
			},
		},
	);
	return data;
};
