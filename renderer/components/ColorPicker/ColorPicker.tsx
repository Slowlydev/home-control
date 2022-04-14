import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDebouncyEffect } from "use-debouncy";

interface ColorPickerProps {
	color: string,
	onChange: (value: string) => void,
	onChangeDebounced: (value: string) => void,
}

export default function ColorPicker({ color, onChange, onChangeDebounced }: ColorPickerProps) {
	const [value, setValue] = useState(color);

	useDebouncyEffect(() => onChangeDebounced(value), 200, [value]);

	useEffect(() => {
		onChange(value);
	}, [value])

	return <HexColorPicker color={value} onChange={setValue} />;
};
