export default interface LightInterface {
  // id: string,
  // state: {
  // 	on: boolean,
  // 	bri: number,
  // 	hue: number,
  // 	sat: number,
  // 	xy: number[],
  // 	ct: number,
  // 	colormode: string,
  // 	mode: string,
  // 	reachable: boolean,
  // },
  // name: string,
  // modelid: string,
  // capabilities: {
  // 	certified: boolean
  // 	control: {
  // 		maxlumen: number,
  // 		mindimlevel?: number,
  // 		ct?: {
  // 			min: number,
  // 			max: number
  // 		},
  // 		colorgamut?: number[][],
  // 	},
  // 	streaming: {
  // 		renderer: boolean,
  // 		proxy: boolean
  // 	}
  // },
  id: string;
  state: State;
  swupdate: Swupdate;
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname: string;
  capabilities: Capabilities;
  config: Config;
  uniqueid: string;
  swversion: string;
  swconfigid: string;
  productid: string;
}

interface Config {
  archetype: string;
  function: string;
  direction: string;
  startup: Startup;
}

interface Startup {
  mode: string;
  configured: boolean;
}

interface Capabilities {
  certified: boolean;
  control: Control;
  streaming: Streaming;
}

interface Streaming {
  renderer: boolean;
  proxy: boolean;
}

interface Control {
  mindimlevel: number;
  maxlumen: number;
  colorgamuttype: string;
  colorgamut: number[][];
  ct: Ct;
}

interface Ct {
  min: number;
  max: number;
}

interface Swupdate {
  state: string;
  lastinstall: string;
}

interface State {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: number[];
  ct: number;
  alert: string;
  colormode: string;
  mode: string;
  reachable: boolean;
}
