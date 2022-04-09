export default interface Light {
	id: string,
	state: {
		on: boolean,
		bri: number,
		hue: number,
		sat: number,
		xy: number[],
		ct: number,
		colormode: string,
		mode: string,
		reachable: boolean,
	},
	name: string,
	modelid: string,
	capabilities: {
		certified: boolean
		control: {
			mindimlevel: number,
			maxlumen: number,
			ct: {
				min: number,
				max: number
			}
		},
		streaming: {
			renderer: boolean,
			proxy: boolean
		}
	},
}