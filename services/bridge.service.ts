import Store from "electron-store";
import axios from "axios";

import ClinetKeyInterface from "../interfaces/ClientKeyInterface";
import BridgeConfigInterface from "../interfaces/BridgeConfigInterface";

const store = new Store();

const httpRequest = axios.create({
	baseURL: `http://${store.get('bridge')}/api/${store.get('token')}/`
});

async function getBridgeInfo(): Promise<BridgeConfigInterface> {
	const { data } = await httpRequest.get("/config");
	return data;
}

async function createClientKey(): Promise<{ success: ClinetKeyInterface }[]> {
	const bridge = store.get("bridge");
	if (bridge) {
		return axios.post(`http://${bridge}/api`, { "devicetype": "home-control#development", "generateclientkey": true }).then(res => res.data);
	} else {
		throw new Error("Could not get bridge info");
	}
}

export default {
	getBridgeInfo,
	createClientKey,
}