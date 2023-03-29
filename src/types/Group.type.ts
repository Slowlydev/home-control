import { LightType } from "./Light.type";

export type GroupType = {
	id?: string;
	detailedLights?: LightType[];
	name: string;
	lights: string[];
	type: string;
	action: Action;
};

type Action = {
	on: boolean;
	bri: number;
	hue: number;
	sat: number;
	effect: string;
	xy: number[];
	ct: number;
	alert: string;
	colormode: string;
};
