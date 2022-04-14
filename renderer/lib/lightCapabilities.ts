import LightInterface from "../interfaces/LightInterface";

function hasRGB(light: LightInterface) {
	return !!light.capabilities.control.colorgamut;
}

function hasCT(light: LightInterface) {
	return !!light.capabilities.control.ct;
}

function hasDimming(light: LightInterface) {
	return !!light.capabilities.control.mindimlevel;
}

export {
	hasRGB,
	hasCT,
	hasDimming,
}