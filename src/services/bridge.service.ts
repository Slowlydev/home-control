import axios from "axios";

import BridgeConfigInterface from "../interfaces/BridgeConfigInterface";
import ClinetKeyInterface from "../interfaces/ClientKeyInterface";

const store = { bridge: "", token: "" };

const httpRequest = axios.create({
	baseURL: `http://${store.bridge}/api/${store.token}/`,
});

async function getBridgeInfo(): Promise<BridgeConfigInterface> {
	const { data } = await httpRequest.get("/config");
	return data;
}

async function createClientKey(): Promise<{ success: ClinetKeyInterface }[]> {
	const bridge = store.bridge;
	if (bridge) {
		return axios
			.post(`http://${bridge}/api`, {
				devicetype: "home-control#development",
				generateclientkey: true,
			})
			.then((res) => res.data);
	} else {
		throw new Error("Could not get bridge info");
	}
}

export default {
	getBridgeInfo,
	createClientKey,
};
