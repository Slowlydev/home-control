import Store from "electron-store";
import axios from "axios";

import ClinetKeyInterface from "../interfaces/ClientKeyInterface";

const store = new Store();

async function getBridgeInfo(): Promise<any> {
	const bridge = store.get("bridge");
	if (bridge) {
		return axios.get(`http://${bridge}/clip/v2/resource/device`).then(res => res.data);
	} else {
		throw new Error("Could not get bridge info");
	}
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