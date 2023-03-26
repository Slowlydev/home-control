export default interface SceneInterface {
	id?: string;
	name: string;
	type: string;
	group: string;
	lights: string[];
	owner: string;
	recycle: boolean;
	locked: boolean;
	appdata: Appdata;
	picture: string;
	lastupdated: string;
	version: number;
	lightstates: Lightstates;
}

interface Lightstates {
	"1": _1;
	"4": _4;
	"5": _4;
	"6": _6;
}

interface _6 {
	on: boolean;
	bri: number;
}

interface _4 {
	on: boolean;
	bri: number;
	xy: number[];
}

interface _1 {
	on: boolean;
	bri: number;
	ct: number;
}

interface Appdata {
	version: number;
	data: string;
}
