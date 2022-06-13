import { mutate } from "swr";

import styles from "./GroupCard.module.scss";

import groupService from "../../services/group.service";

import Toggle from "../Toggle/Toggle";
import BrightnessPicker from "../Pickers/BrightnessPicker";

import GroupInterface from "../../interfaces/GroupInterface";

import { bitsToDecimal, decimalToBits } from "../../lib/numberConverter";

interface GroupCardProps {
  group: GroupInterface;
}

export default function GroupCard({ group }: GroupCardProps) {
  console.log(group);

	function updateGroup(body: any) {
		groupService.updateGroup(group.id, body);
		mutate("groups", groupService.getDetailedGroups);
	}

	function updateBrightness(brightness: number) {
		updateGroup({
			on: true,
			bri: decimalToBits(brightness)
		})
	}

  return (
    <div className={styles.card}>
      <div className={styles.groupHeader}>
        <h3>{group.name}</h3>
				<div className={styles.groupHeaderButtons}>
					<BrightnessPicker nolabel brightness={bitsToDecimal(group.action.bri)} onChangeDebounced={updateBrightness} />
					<Toggle value={group.action.on} callback={(value: boolean) => updateGroup({ on: value })} />
				</div>
      </div>

      <div className={styles.lights}></div>
    </div>
  );
}
