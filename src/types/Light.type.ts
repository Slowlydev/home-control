export type LightType = {
	// id: string,
	// state: = {
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
	// capabilities: = {
	// 	certified: boolean
	// 	control: = {
	// 		maxlumen: number,
	// 		mindimlevel?: number,
	// 		ct?: = {
	// 			min: number,
	// 			max: number
	// 		},
	// 		colorgamut?: number[][],
	// 	},
	// 	streaming: = {
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
};

type Config = {
	archetype: string;
	function: string;
	direction: string;
	startup: Startup;
};

type Startup = {
	mode: string;
	configured: boolean;
};

type Capabilities = {
	certified: boolean;
	control: Control;
	streaming: Streaming;
};

type Streaming = {
	renderer: boolean;
	proxy: boolean;
};

type Control = {
	mindimlevel: number;
	maxlumen: number;
	colorgamuttype: string;
	colorgamut: number[][];
	ct: Ct;
};

type Ct = {
	min: number;
	max: number;
};

type Swupdate = {
	state: string;
	lastinstall: string;
};

type State = {
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
};
