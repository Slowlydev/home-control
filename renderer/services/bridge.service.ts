import nookies from "nookies";
import axios from "axios";

import ClinetKeyInterface from "../interfaces/ClientKeyInterface";

async function getBridgeInfo(): Promise<any> {
	const bridge = JSON.parse(nookies.get(null).bridge);
	if (bridge.internalipaddress) {
		return axios.get(`http://${bridge.internalipaddress}/clip/v2/resource/device`).then(res => res.data);
	} else {
		throw new Error("Could not get bridge info");
	}
}

async function createClientKey(): Promise<{ success: ClinetKeyInterface }[]> {
	const bridge = JSON.parse(nookies.get(null).bridge);
	if (bridge.internalipaddress) {
		return axios.post(`http://${bridge.internalipaddress}/api`, { "devicetype": "home-control#development", "generateclientkey": true }).then(res => res.data);
	} else {
		throw new Error("Could not get bridge info");
	}
}

export default {
	getBridgeInfo,
	createClientKey,
}