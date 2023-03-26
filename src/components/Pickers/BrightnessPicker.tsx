import { SSRProvider } from "@react-aria/ssr";
import { ColorSlider } from "@react-spectrum/color";
import { Provider } from "@react-spectrum/provider";
import { theme } from "@react-spectrum/theme-default";
import { parseColor } from "@react-stately/color";
import { Color } from "@react-types/color";
import React, { useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import { useDebouncyEffect } from "use-debouncy";

import { preParse } from "../../lib/preParse";

interface BrightnessPickerProps {
	color?: tinycolor.ColorFormats.RGBA;
	brightness: number;
	nolabel?: boolean;
	onChange?: (value: number) => void;
	onChangeDebounced?: (value: number) => void;
}

export default function BrightnessPicker({ color, brightness, nolabel, onChange, onChangeDebounced }: BrightnessPickerProps) {
	// IMPORTANT: always strip the alpha of the new color recived

	const [currentColor, setCurrentColor] = useState<Color>(
		parseColor(preParse(color ? { ...color, a: brightness } : { r: 245, g: 197, b: 66, a: brightness })),
	); // init slider with colors
	const [currentBrightness, setCurrentBrightness] = useState<number>(brightness);

	if (color !== null) {
		useEffect(() => setCurrentColor(parseColor(preParse({ ...color, a: currentBrightness }))), [color]); // listen for color prop updates
	}

	if (onChange !== undefined) {
		useEffect(() => onChange(currentBrightness), [currentBrightness]); // instant update
	}
	if (onChangeDebounced !== undefined) {
		useDebouncyEffect(() => onChangeDebounced(currentBrightness), 200, [currentBrightness]); // debounce update
	}

	function customChange(color: Color) {
		setCurrentBrightness(color.getChannelValue("alpha")); // this toggles the onChange events
		setCurrentColor(color); // this is a ref for the picker
	}

	return (
		<SSRProvider>
			<Provider theme={theme} UNSAFE_style={{ background: "none" }}>
				<ColorSlider label={nolabel ? null : "Brightness"} channel="alpha" value={currentColor} onChange={customChange} />
			</Provider>
		</SSRProvider>
	);
}
