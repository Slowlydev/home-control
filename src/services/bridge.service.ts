import axios from "axios";

import { BridgeConfigType } from "@/types/BridgeConfig.type";
import { ClientKeyType } from "@/types/ClientKey.type";

import { localBridge } from "./axios.service";

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
		return axios.post(`http://${bridge}/api`, { devicetype: "home-control#development", generateclientkey: true }).then((res) => res.data);
	} else {
		throw new Error("Could not get bridge info");
	}
};

// TODO ping local bridge
export const isLocalBridgeAvailable = async (): Promise<boolean> => true;
