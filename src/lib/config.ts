import { Store } from "tauri-plugin-store-api";

import { Strategy } from "@/types/Strategy.type";
import { Token } from "@/types/Token.type";

const store = new Store(".config.dat");

export const checkConfig = async (): Promise<boolean> => {
	const storeEntries = await store.entries();

	console.log(storeEntries);

	return false;
};

type Config = {
	strategy: Strategy;
	cloud: {
		token: Token | null;
		key: string | null;
	};
	local: {
		bridge: string | null;
		key: string | null;
	};
};

export const loadConfig = async (): Promise<Config> => {
	const strategy = await store.get<Strategy>("strategy");
	const token = await store.get<Token>("access-token");

	const cloudKey = await store.get<string>("cloud-key");
	const localKey = await store.get<string>("local-key");
	const localBridge = await store.get<string>("local-bridge");

	return {
		strategy,
		cloud: {
			token,
			key: cloudKey,
		},
		local: {
			bridge: localBridge,
			key: localKey,
		},
	};
};
