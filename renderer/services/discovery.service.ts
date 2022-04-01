import axios from "axios";
import DiscoverdBidgeInterface from "../interfaces/DiscoveredBidgeInterface";

async function discoverBidge(): Promise<DiscoverdBidgeInterface[]> {
	return axios.get("https://discovery.meethue.com").then(res => res.data);
}

export default {
	discoverBidge,
}