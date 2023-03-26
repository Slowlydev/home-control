import DiscoverdBidgeInterface from "../interfaces/DiscoveredBidgeInterface";
import axios from "axios";

async function discoverBidge(): Promise<DiscoverdBidgeInterface[]> {
  return axios.get("https://discovery.meethue.com").then((res) => res.data);
}

export default {
  discoverBidge,
};
