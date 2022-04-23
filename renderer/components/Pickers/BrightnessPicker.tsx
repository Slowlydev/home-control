import React, { useEffect, useState } from "react";
import { useDebouncyEffect } from "use-debouncy";

import { ColorSlider } from "@react-spectrum/color";
import { Color } from "@react-types/color";

import { SSRProvider } from '@react-aria/ssr'
import { Provider } from '@react-spectrum/provider'
import { theme } from "@react-spectrum/theme-default"
import { parseColor } from "@react-stately/color";
import tinycolor from "tinycolor2";

interface BrightnessPickerProps {
	color: tinycolor.ColorFormats.RGBA,
	onChange?: (value: number) => void,
	onChangeDebounced?: (value: number) => void,
}

export default function BrightnessPicker({ color, onChange, onChangeDebounced }: BrightnessPickerProps) {

	const [currentColor, setCurrentColor] = useState<Color>(parseColor(tinycolor(color).toHexString())); // init slider with colors

	useEffect(() => setCurrentColor(parseColor(tinycolor(color).toHexString())), [color]); // listen for color prop updates

	if (onChange !== undefined) {
		useEffect(() => onChange(numberFormatter(currentColor)), [currentColor]) // instant update
	}
	if (onChangeDebounced !== undefined) {
		useDebouncyEffect(() => onChangeDebounced(numberFormatter(currentColor)), 200, [currentColor]); // debounce update
	}

	function numberFormatter(colorNew: Color): number {
		return colorNew.getChannelValue("alpha") // format Color to decimal
	}

	return (
		<SSRProvider>
			<Provider theme={theme} UNSAFE_style={{ background: 'none' }}>
				<ColorSlider
					label="Brightness"
					channel="alpha"
					value={currentColor}
					onChange={setCurrentColor}
				/>
			</Provider>
		</SSRProvider>
	)
};
