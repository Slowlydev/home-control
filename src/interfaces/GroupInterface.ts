import LightInterface from "./LightInterface";

export default interface GroupInterface {
  id?: string;
  detailedLights?: LightInterface[];
  name: string;
  lights: string[];
  type: string;
  action: Action;
}

interface Action {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: number[];
  ct: number;
  alert: string;
  colormode: string;
}
