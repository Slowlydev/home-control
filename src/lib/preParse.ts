import tinycolor from "tinycolor2";

export function preParse(color: tinycolor.ColorFormats.RGBA): string {
	return tinycolor(color).toRgbString();
}
