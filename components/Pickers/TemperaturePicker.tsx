import React, { useEffect, useState } from "react";
import { useDebouncyEffect } from "use-debouncy";
import tinycolor from "tinycolor2";

import { ColorSlider } from "@react-spectrum/color";
import { Color } from "@react-types/color";

import { SSRProvider } from '@react-aria/ssr'
import { Provider } from '@react-spectrum/provider'
import { theme } from "@react-spectrum/theme-default"
import { parseColor } from "@react-stately/color";

import { bitsToPercent } from "../../lib/numberConverter";

interface TemperaturePickerProps {
	teperature: number,
	onChange?: (value: number) => void,
	onChangeDebounced?: (value: number) => void,
}

export default function TemperaturePicker({ teperature, onChange, onChangeDebounced }: TemperaturePickerProps) {

	const [colorTemperature, setColorTemperature] = useState<Color>(parseColor(tinycolor({ r: teperature, g: 127, b: 137 }).toHexString()));

	if (onChange !== undefined) {
		useEffect(() => onChange(temperatureFormatter(colorTemperature)), [colorTemperature])
	}
	if (onChangeDebounced !== undefined) {
		useDebouncyEffect(() => onChangeDebounced(temperatureFormatter(colorTemperature)), 200, [colorTemperature]);
	}

	function temperatureFormatter(color: Color): number {
		const RGBcolor = tinycolor(color.toString("hexa")).toRgb() // format number to RGB
		return bitsToPercent(RGBcolor.r)
	}

	return (
		<SSRProvider>
			<Provider theme={theme} UNSAFE_style={{ background: 'none' }}>
				<ColorSlider
					label="Temperature"
					channel="red"
					value={colorTemperature}
					onChange={setColorTemperature}
				/>
			</Provider>
		</SSRProvider>
	)
};
