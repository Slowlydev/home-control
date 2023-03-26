import LightInterface from "../../interfaces/LightInterface";
import convertToRGB from "../../lib/convertToRGB";
import devicesService from "../../services/lights.service";
import Light from "../Light/Light";
import Toggle from "../Toggle/Toggle";
import styles from "./LightCard.module.scss";
import { motion } from "framer-motion";
import { mutate } from "swr";
import tinycolor from "tinycolor2";

interface Props {
  light: LightInterface;
}

export default function LightCard({ light }: Props) {
  function color(): string {
    if (light.state.colormode === "xy") {
      return tinycolor(
        convertToRGB(light.state.xy[0], light.state.xy[1], light.state.bri)
      ).toHexString();
    }

    if (light.state.colormode === "ct") {
      return "#ffffff";
    }

    return "#ffd70f";
  }

  function calcBrightness(): number {
    return light.state.bri !== 254
      ? Math.floor((light.state.bri / 255) * 100)
      : 100;
  }

  function updateLight(value: boolean) {
    devicesService.updateLight(light.id, { on: value });
    mutate("lights", devicesService.getLights);
  }

  return (
    <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
      <Light color={color()} isOn={light.state.on} />

      <div>
        <p>{light.name}</p>
        <p className={styles.brightness}>
          {light.state.on ? calcBrightness() : 0}%
        </p>
      </div>

      <Toggle
        value={light.state.on}
        callback={(value: boolean) => updateLight(value)}
      />
    </motion.div>
  );
}
