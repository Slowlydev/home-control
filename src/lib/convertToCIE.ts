/**
 * Converts RGB color space to CIE color space
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 * @return {Array} Array that contains the CIE color values for x and y
 */
export const convertToCIE = (redParam: number, greenParam: number, blueParam: number) => {
	//Apply a gamma correction to the RGB values, which makes the color more vivid and more the like the color displayed on the screen of your device
	let red = redParam > 0.04045 ? Math.pow((redParam + 0.055) / (1.0 + 0.055), 2.4) : redParam / 12.92;
	let green = greenParam > 0.04045 ? Math.pow((greenParam + 0.055) / (1.0 + 0.055), 2.4) : greenParam / 12.92;
	let blue = blueParam > 0.04045 ? Math.pow((blueParam + 0.055) / (1.0 + 0.055), 2.4) : blueParam / 12.92;

	//RGB values to XYZ using the Wide RGB D65 conversion formula
	let X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
	let Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
	let Z = red * 0.000088 + green * 0.07231 + blue * 0.986039;

	//Calculate the xy values from the XYZ values
	let x = parseFloat((X / (X + Y + Z)).toFixed(4));
	let y = parseFloat((Y / (X + Y + Z)).toFixed(4));

	if (isNaN(x)) x = 0;
	if (isNaN(y)) y = 0;

	return [x, y];
};
