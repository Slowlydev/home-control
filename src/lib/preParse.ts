import tinycolor from "tinycolor2";

export const preParse = (color: tinycolor.ColorFormats.RGBA): string => {
	return tinycolor(color).toRgbString();
};
