import { mutate } from "swr";

import styles from "./GroupCard.module.scss";

import groupService from "../../services/group.service";

import Toggle from "../Toggle/Toggle";
import BrightnessPicker from "../Pickers/BrightnessPicker";

import GroupInterface from "../../interfaces/GroupInterface";

import { bitsToDecimal, decimalToBits } from "../../lib/numberConverter";
import LightInterface from "../../interfaces/LightInterface";
import Light from "../Light/Light";
import tinycolor from "tinycolor2";
import convertToRGB from "../../lib/convertToRGB";

interface GroupCardProps {
  group: GroupInterface;
}

export default function GroupCard({ group }: GroupCardProps) {
  function updateGroup(body: any) {
    groupService.updateGroup(group.id, body);
    mutate("groups", groupService.getDetailedGroups);
  }

  function updateBrightness(brightness: number) {
    updateGroup({
      on: true,
      bri: decimalToBits(brightness),
    });
  }

  function color(light: LightInterface): string {
    if (light.state.colormode === "xy") {
      return tinycolor(convertToRGB(light.state.xy[0], light.state.xy[1], light.state.bri)).toHexString();
    }

    if (light.state.colormode === "ct") {
      return "#ffffff";
    }

    return "#ffd70f";
  }

  const computedLights = [];
  computedLights.push(...group.detailedLights.filter((light: LightInterface) => light.state.on));
  computedLights.push(...group.detailedLights.filter((light: LightInterface) => !light.state.on));

  return (
    <div className={styles.card}>
      <h3>{group.name}</h3>

      <div className={styles.groupActions}>
        <Toggle value={group.action.on} callback={(value: boolean) => updateGroup({ on: value })} />
        <BrightnessPicker nolabel brightness={bitsToDecimal(group.action.bri)} onChangeDebounced={updateBrightness} />
      </div>

      <div className={styles.lights}>
        {computedLights.slice(0, 2).map((light: LightInterface) => (
          <div className={styles.light} key={light.id}>
            <Light color={color(light)} isOn={light.state.on} customStyles={{ transform: "scale(0.5)" }} />
            <p>{light.name}</p>
            <p>{light.state.on ? "on" : "off"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
