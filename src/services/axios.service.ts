import axios from "axios";

import { loadConfig } from "@/lib/config";
import { env } from "@/lib/env";

import { isLocalBridgeAvailable } from "./bridge.service";

const config = await loadConfig();

export const localBridge = axios.create({
	baseURL: `https://${config.local.bridge}/clip/v2/`,
	headers: {
		"hue-application-key": config.local.key,
	},
});

export const cloudBridge = axios.create({
	baseURL: `https://api.meethue.com/route/clip/v2/`,
	headers: {
		Authorization: `Bearer ${config.cloud.token?.access_token}`,
		"hue-application-key": config.cloud.key,
	},
});

export const cloudToken = axios.create({
	url: "https://api.meethue.com/v2/oauth2/token",
	headers: {
		Authorization: `Basic ${btoa(`${env.VITE_APP_CLIENT_ID}:${env.VITE_APP_CLIENT_SECRET}`)}`,
		"Content-Type": "application/x-www-form-urlencoded",
	},
});

export const dynamicAxios = async () => {
	if (config.strategy === "local") return localBridge;
	if (config.strategy === "cloud") return cloudBridge;
	if (config.strategy === "hybrid") {
		const localBridgeAvailable = await isLocalBridgeAvailable();

		return localBridgeAvailable ? localBridge : cloudBridge;
	}
};
