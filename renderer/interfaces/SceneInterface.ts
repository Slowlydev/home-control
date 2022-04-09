export default interface SceneInterface {
	id?: string,
	name: string,
	type: string,
	lightstates?: {
		[key: string]: {
			on: boolean,
			bri?: number,
			xy?: number[],
		}
	},
}