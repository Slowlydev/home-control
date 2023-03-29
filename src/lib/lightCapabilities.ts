import { LightType } from "../types/Light.type";

export const hasRGB = (light: LightType) => {
	return !!light.capabilities.control.colorgamut;
};

export const hasCT = (light: LightType) => {
	return !!light.capabilities.control.ct;
};

export const hasDimming = (light: LightType) => {
	return light.state.bri !== undefined;
};
