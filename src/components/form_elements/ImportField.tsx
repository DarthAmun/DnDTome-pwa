import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FileField from "./FileField";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import Campaign, { isCampaign } from "../../data/campaign/Campaign";
import Npc, { isNpc } from "../../data/campaign/Npc";
import Quest, { isQuest } from "../../data/campaign/Quest";
import Char, { isChar } from "../../data/chars/Char";
import Class, { isClass } from "../../data/classes/Class";
import Subclass, { isSubclass } from "../../data/classes/Subclass";
import Encounter, { isEncounter } from "../../data/encounter/Encounter";
import Gear, { isGear } from "../../data/Gear";
import Item, { isItem } from "../../data/Item";
import Monster, { isMonster } from "../../data/Monster";
import Race, { isRace } from "../../data/races/Race";
import Subrace, { isSubrace } from "../../data/races/Subrace";
import Selection, { isSelection } from "../../data/Selection";
import Spell, { isSpell } from "../../data/Spell";
import Event, { isEvent } from "../../data/world/Event";
import Location, { isLocation } from "../../data/world/Location";
import World, { isWorld } from "../../data/world/World";
import { saveNew } from "../../services/DatabaseService";

import ProgressBar from "@ramonak/react-progress-bar";
import {
  makeClass,
  makeItems,
  makeMonster,
  makeRace,
  makeSpell,
  makeSubclass,
  makeSubrace,
} from "../../services/5eToolService";
import Group, { isGroup } from "../../data/campaign/Group";

export enum ImportModus {
  NORMAL,
  ETOOLSMONSTERS,
  ETOOLSSPELLS,
  ETOOLSITEMS,
  ETOOLSRACES,
  ETOOLSCLASSES,
}

interface $Props {
  modus: ImportModus;
}

const ImportField = ({ modus }: $Props) => {
  const [files, setFiles] = useState<File[]>([]);

  const changeFile = (fileList: FileList | null) => {
    console.log("Start File Upload");
    if (fileList !== null) {
      const files = Array.from(fileList);
      setFiles(files);
    }
  };

  return (
    <>
      <Files>
        <FileField
          label=""
          isMulti={true}
          accept={".json"}
          icon={faFileImport}
          onChange={(file) => changeFile(file)}
        />
      </Files>
      <Files>
        {files &&
          files.map((file: File, index: number) => (
            <FileTile key={index} modus={modus} file={file} />
          ))}
      </Files>
    </>
  );
};

export default ImportField;

interface $FileProps {
  file: File;
  modus: ImportModus;
}

const FileTile = ({ file, modus }: $FileProps) => {
  const [succCount, setSucc] = useState<number>(0);
  const [maxCount, setMax] = useState<number>(0);

  const iterateJson = async (
    json: any,
    i: number,
    max: number,
    fileName: string,
    originalJson: any
  ) => {
    if (modus === ImportModus.NORMAL) {
      if (isClass(json[i])) {
        await saveNew("classes", json[i] as Class, fileName);
      } else if (isSubclass(json[i])) {
        await saveNew("subclasses", json[i] as Subclass, fileName);
      } else if (isRace(json[i])) {
        await saveNew("races", json[i] as Race, fileName);
      } else if (isSubrace(json[i])) {
        await saveNew("subraces", json[i] as Subrace, fileName);
      } else if (isMonster(json[i])) {
        await saveNew("monsters", json[i] as Monster, fileName);
      } else if (isSpell(json[i])) {
        await saveNew("spells", json[i] as Spell, fileName);
      } else if (isGear(json[i])) {
        await saveNew("gears", json[i] as Gear, fileName);
      } else if (isItem(json[i])) {
        await saveNew("items", json[i] as Item, fileName);
      } else if (isEncounter(json[i])) {
        await saveNew("encounters", json[i] as Encounter, fileName);
      } else if (isSelection(json[i])) {
        await saveNew("selections", json[i] as Selection, fileName);
      } else if (isCampaign(json[i])) {
        await saveNew("campaigns", json[i] as Campaign, fileName);
      } else if (isQuest(json[i])) {
        await saveNew("quests", json[i] as Quest, fileName);
      } else if (isGroup(json[i])) {
        await saveNew("groups", json[i] as Group, fileName);
      } else if (isNpc(json[i])) {
        await saveNew("npcs", json[i] as Npc, fileName);
      } else if (isWorld(json[i])) {
        await saveNew("worlds", json[i] as World, fileName);
      } else if (isLocation(json[i])) {
        await saveNew("locations", json[i] as Location, fileName);
      } else if (isEvent(json[i])) {
        await saveNew("events", json[i] as Event, fileName);
      } else if (isChar(json[i])) {
        await saveNew("chars", json[i] as Char, fileName);
      }
    } else if (modus === ImportModus.ETOOLSMONSTERS) {
      const newMonster = makeMonster(json[i]);
      if (newMonster.name !== "") await saveNew("monsters", newMonster, fileName);
    } else if (modus === ImportModus.ETOOLSSPELLS) {
      const newSpell = makeSpell(json[i], fileName);
      if (newSpell.name !== "") await saveNew("spells", newSpell, fileName);
    } else if (modus === ImportModus.ETOOLSITEMS) {
      const newItem = makeItems(json[i], fileName);
      if (newItem.name !== "")
        if (isGear(newItem)) {
          await saveNew("gears", newItem, fileName);
        } else if (isItem(newItem)) {
          await saveNew("items", newItem, fileName);
        }
    } else if (modus === ImportModus.ETOOLSRACES) {
      const newRace = makeRace(json[i], fileName);
      if (newRace.name !== "") {
        await saveNew("races", newRace, fileName);
        if (json[i]._copy === undefined && json[i].source !== "DMG") {
          if (json[i].subraces !== undefined) {
            json[i].subraces.forEach(async (subrace: any) => {
              const newSubrace = makeSubrace(subrace, newRace, file.name);
              await saveNew("subraces", newSubrace, file.name);
            });
          }
        }
      }
    } else if (modus === ImportModus.ETOOLSCLASSES) {
      const newClass = makeClass(json[i], originalJson, fileName);
      if (newClass.name !== "") {
        await saveNew("classes", newClass, fileName);
        if (json[i].subclasses !== undefined) {
          json[i].subclasses.forEach(async (subclass: any) => {
            const newSubclass = makeSubclass(subclass, originalJson, newClass, file.name);
            await saveNew("subclasses", newSubclass, file.name);
          });
        }
      }
    }

    setSucc(i + 1);
    if (max - 1 > i) {
      iterateJson(json, i + 1, max, fileName, originalJson);
    }
  };

  const scanImportFileTest = async (json: any, fileName: string) => {
    console.log("Start Json interpreting " + fileName);

    const originalJson = json;
    let newJson = json;
    if (modus === ImportModus.ETOOLSMONSTERS) {
      newJson = json.monster;
    } else if (modus === ImportModus.ETOOLSSPELLS) {
      newJson = json.spell;
    } else if (modus === ImportModus.ETOOLSITEMS) {
      newJson = json.item;
    } else if (modus === ImportModus.ETOOLSRACES) {
      newJson = json.race;
    } else if (modus === ImportModus.ETOOLSCLASSES) {
      newJson = json.class;
    }

    if (!Array.isArray(newJson)) {
      newJson = [newJson];
    }
    setMax(newJson.length);
    iterateJson(newJson, 0, newJson.length, fileName, originalJson);
  };

  useEffect(() => {
    console.log("Start Filereader " + file.name);
    let fileReader = new FileReader();
    fileReader.onloadend = function () {
      const content = fileReader.result;
      if (content !== null) {
        let json = JSON.parse(content.toString());
        console.log("Json loaded from " + file.name);
        scanImportFileTest(json, file.name);
      }
    };
    fileReader.readAsText(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <FileWrapper>
      {file.name} {succCount}/{maxCount}
      <ProgressBar
        completed={Math.round((succCount / maxCount) * 100)}
        isLabelVisible={false}
        bgcolor={"#F55C5C"}
        height={"5px"}
        margin={"5px"}
      />
    </FileWrapper>
  );
};

const Files = styled.div`
  flex: 1 1 100%;
`;

const FileWrapper = styled.div`
  width: clac(100% - 20px);
  height: 50px;
  padding: 10px;
`;
