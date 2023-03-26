import SceneInterface from "../../interfaces/SceneInterface";
import convertToRGB from "../../lib/convertToRGB";
import scenesService from "../../services/scenes.service";
import styles from "./SceneCard.module.scss";
import { useState } from "react";
import tinycolor from "tinycolor2";

interface Props {
  scene: SceneInterface;
  edit?: boolean;
  onHide?: Function;
}

export default function SceneCard({ scene, edit }: Props) {
  function checkIfHidden() {
    const hiddenScenes: string[] = [];
    return hiddenScenes.includes(scene.id);
  }

  const [hasColors, setHasColors] = useState(false);
  const [isCurrentlyHidden, setIsCurrentlyHidden] = useState(checkIfHidden());

  const colors: string[] = [];

  Object.values(scene.lightstates).forEach((value) => {
    if (value.on && value.xy) {
      if (!hasColors) {
        setHasColors(true);
      }
      colors.push(
        tinycolor(
          convertToRGB(value.xy[0], value.xy[1], value.bri)
        ).toHexString()
      );
    }
  });

  const gradient = `linear-gradient(to right, ${colors.join(", ")})`;

  function addToList() {
    setIsCurrentlyHidden(true);
    const hiddenScenes: string[] = [];
    hiddenScenes.push(scene.id);
    // store.set("hiddenScenes", hiddenScenes);
  }

  function removeFromList() {
    setIsCurrentlyHidden(false);
    const hiddenScenes: string[] = [];
    const index: number = hiddenScenes.findIndex(
      (stringToCheck) => stringToCheck === scene.id
    );
    hiddenScenes.splice(index, 1);
    // store.set("hiddenScenes", hiddenScenes);
  }

  function setScene() {
    scenesService.setScene(scene.group, scene.id);
  }

  return (
    <div
      className={styles.card}
      style={{ cursor: edit ? "default" : "pointer" }}
      onClick={() => (!edit ? setScene() : void 0)}
    >
      {hasColors && (
        <div className={styles.light} style={{ backgroundImage: gradient }} />
      )}
      <p>{scene.name}</p>
      {edit && (
        <input
          type="checkbox"
          checked={isCurrentlyHidden}
          onChange={(event) =>
            event.target.checked ? addToList() : removeFromList()
          }
        />
      )}
    </div>
  );
}
