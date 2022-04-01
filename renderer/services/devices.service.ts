import nookies from "nookies";
import axios from "axios";
import https from "https";
import path from "path";
import fs from "fs";

import Light from "../interfaces/Light";

// const httpRequest = axios.create({
// 	baseURL: `http://${bridge.internalipaddress}/api/${key.username}/`
// });

// @ts-ignore
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const httpRequest = axios.create({
	baseURL: `https://${nookies.get(null).bridge}/clip/v2/resource/`,
	headers: {
		"hue-application-key": nookies.get(null).key
	},
	httpsAgent: new https.Agent({
		rejectUnauthorized: false,
		ca: fs.readFileSync(path.join(process.cwd(), "/resources/hue_cert.pem"))
	})
});

async function getLights(): Promise<Light[]> {
	return httpRequest.get("/light").then(res => res.data.data);
}

async function updateLight(id: string, updatedLight: any) {
	return httpRequest.put(`light/${id}`, updatedLight).then(res => res.data);
}

export default {
	getLights,
	updateLight,
}