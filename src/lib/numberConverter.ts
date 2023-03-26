function decimalToBits(value: number): number {
	const calculated = (254 / 100) * (value * 100);
	return Math.floor(calculated);
}

function bitsToDecimal(value: number): number {
	return (value !== 254 ? Math.floor((value / 255) * 100) : 100) / 100;
}

function bitsToPercent(value: number): number {
	return value !== 254 ? Math.floor((value / 255) * 100) : 100;
}

export { decimalToBits, bitsToDecimal, bitsToPercent };
