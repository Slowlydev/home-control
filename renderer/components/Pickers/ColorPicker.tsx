import { ColorSlider } from "@react-spectrum/color";
import { parseColor } from "@react-stately/color";
import { Color } from "@react-types/color";
import React, { useEffect, useState } from "react";
import { useDebouncyEffect } from "use-debouncy";

import { SSRProvider } from '@react-aria/ssr'
import { Provider } from '@react-spectrum/provider'

import { theme } from "@react-spectrum/theme-default"
import tinycolor from "tinycolor2";

interface ColorPickerProps {
	color: tinycolor.ColorFormats.RGBA,
	onChange?: (value: tinycolor.ColorFormats.RGBA) => void,
	onChangeDebounced?: (value: tinycolor.ColorFormats.RGBA) => void,
}

export default function ColorPicker({ color, onChange, onChangeDebounced }: ColorPickerProps) {

	const [currentColor, setCurrentColor] = useState<Color>(parseColor(tinycolor(color).toHexString())); // init sliders with colors

	if (onChange !== undefined) {
		useEffect(() => onChange(colorFormatter(currentColor)), [currentColor]) // instant update
	}
	if (onChangeDebounced !== undefined) {
		useDebouncyEffect(() => onChangeDebounced(colorFormatter(currentColor)), 200, [currentColor]); // debounce update
	}

	function colorFormatter(color: Color): tinycolor.ColorFormats.RGBA {
		return tinycolor(color.toString("hexa")).toRgb() // format Color to RGBA
	}

	return (
		<SSRProvider>
			<Provider theme={theme} UNSAFE_style={{ background: 'none' }}>
				<ColorSlider
					channel="red"
					value={currentColor}
					onChange={setCurrentColor}
				/>
				<ColorSlider
					channel="green"
					value={currentColor}
					onChange={setCurrentColor}
				/>
				<ColorSlider
					channel="blue"
					value={currentColor}
					onChange={setCurrentColor}
				/>
			</Provider>
		</SSRProvider>
	)
};
