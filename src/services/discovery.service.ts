import axios from "axios";

import { DiscoverdBridgeType } from "../types/DiscoveredBridge.type";

export const discoverBridge = async (): Promise<DiscoverdBridgeType[]> => {
	return axios.get("https://discovery.meethue.com").then((res) => res.data);
};
