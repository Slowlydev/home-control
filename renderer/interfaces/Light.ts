export default interface Light {
	id: string,
	metadata: {
		name: string,
	},
	on: {
		on: boolean,
	},
	dimming?: {
		brightness: number,
		min_dim_level?: number,
	},
	color?: {
		xy: {
			x: number,
			y: number,
		},
		gamut?: {
			red: {
				x: number,
				y: number,
			},
			green: {
				x: number,
				y: number,
			},
			blue: {
				x: number,
				y: number,
			}
		}
	}
}