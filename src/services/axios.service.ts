import axios from "axios";

const store = { bridge: "", token: "" };

export const localBridge = axios.create({
	baseURL: `http://${store.bridge}/api/${store.token}/`,
});

export const remoteBridge = axios.create({
	baseURL: `http://${store.bridge}/api/${store.token}/`,
});
