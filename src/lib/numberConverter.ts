export const decimalToBits = (value: number): number => {
	const calculated = (254 / 100) * (value * 100);
	return Math.floor(calculated);
};

export const bitsToDecimal = (value: number): number => {
	return (value !== 254 ? Math.floor((value / 255) * 100) : 100) / 100;
};

export const bitsToPercent = (value: number): number => {
	return value !== 254 ? Math.floor((value / 255) * 100) : 100;
};
