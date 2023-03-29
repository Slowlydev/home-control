export type SceneType = {
	id?: string;
	name: string;
	type: string;
	group: string;
	lights: string[];
	owner: string;
	recycle: boolean;
	locked: boolean;
	appdata: AppData;
	picture: string;
	lastupdated: string;
	version: number;
	lightstates: LightStates;
};

type LightStates = {
	"1": _1;
	"4": _4;
	"5": _4;
	"6": _6;
};

type _6 = {
	on: boolean;
	bri: number;
};

type _4 = {
	on: boolean;
	bri: number;
	xy: number[];
};

type _1 = {
	on: boolean;
	bri: number;
	ct: number;
};

type AppData = {
	version: number;
	data: string;
};
