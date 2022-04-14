export default interface LightInterface {
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
			maxlumen: number,
			mindimlevel?: number,
			ct?: {
				min: number,
				max: number
			},
			colorgamut?: number[][],
		},
		streaming: {
			renderer: boolean,
			proxy: boolean
		}
	},
}