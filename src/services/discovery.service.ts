import axios from "axios";

import DiscoverdBridgeInterface from "@/types/DiscoveredBridge.type";

async function discoverBridge(): Promise<DiscoverdBridgeInterface[]> {
	return axios.get("https://discovery.meethue.com").then((res) => res.data);
}

export default {
	discoverBridge,
};
