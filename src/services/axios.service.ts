import { Token } from "@/types/Token.type";
import axios from "axios";

import { env } from "@/lib/config";

type Store = {
	strategy: "local" | "cloud" | "dynamic" | null;
	local: {
		bridge: string;
		key: string;
	} | null;
	cloud: {
		key: string;
	} | null;
	token: Token | null;
};

const store: Store = { strategy: null, local: null, cloud: null, token: null };

export const localBridge = axios.create({
	baseURL: `https://${store.local?.bridge}/clip/v2/`,
	headers: {
		"hue-application-key": store.local?.key,
	},
});

export const cloudBridge = axios.create({
	baseURL: `https://api.meethue.com/route/clip/v2/`,
	headers: {
		Authorization: `Bearer ${store.token?.access_token}`,
		"hue-application-key": store.cloud?.key,
	},
});

export const cloudToken = axios.create({
	url: "https://api.meethue.com/v2/oauth2/token",
	headers: {
		Authorization: `Basic ${btoa(`${env.VITE_APP_CLIENT_ID}:${env.VITE_APP_CLIENT_SECRET}`)}`,
		"Content-Type": "application/x-www-form-urlencoded",
	},
});
