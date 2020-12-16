import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { importFiles, exportAll } from "../../services/OptionService";
import { deleteAll, reciveCount, reciveAllPromise } from "../../services/DatabaseService";
import IEntity from "../../data/IEntity";
import P2PReciver from "../p2p/P2PReciver";
import { isChar } from "../../data/chars/Char";
import { isClass } from "../../data/classes/Class";
import { isSubclass } from "../../data/classes/Subclass";
import { isEncounter } from "../../data/encounter/Encounter";
import { isGear } from "../../data/Gear";
import { isItem } from "../../data/Item";
import { isMonster } from "../../data/Monster";
import { isRace } from "../../data/races/Race";
import { isSubrace } from "../../data/races/Subrace";
import { isSpell } from "../../data/Spell";

import { faFileImport, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { LoadingSpinner } from "../Loading";
import AppWrapper from "../AppWrapper";
import TabBar from "../general_elements/TabBar";
import FileField from "../form_elements/FileField";
import IconButton from "../form_elements/IconButton";
import ClassTile from "../entities/classes/ClassTile";
import EncounterTile from "../entities/encounters/EncounterTile";
import CharTile from "../entities/chars/CharTile";
import GearTile from "../entities/gear/GearTile";
import ItemTile from "../entities/item/ItemTile";
import MonsterTile from "../entities/monster/MonsterTile";
import RaceTile from "../entities/races/RaceTile";
import SpellTile from "../entities/spells/SpellTile";
import GeneralOptions from "./GeneralOptions";
import SpellsOptions from "./SpellsOptions";
import GearsOptions from "./GearsOptions";
import ItemsOptions from "./ItemsOptions";
import MonstersOptions from "./MonstersOptions";
import RacesOptions from "./RacesOptions";
import ClassesOptions from "./ClassesOptions";
import CharsOptions from "./CharsOptions";
import EncountersOptions from "./EncountersOptions";
import SelectionsOptions from "./SelectionsOptions";
import OtherImportOptions from "./OtherImportOptions";

const Options = () => {
  const [activeTab, setTab] = useState<string>("General");

  const [spellAmount, setSpellAmount] = useState<number>(0);
  const [gearAmount, setGearAmount] = useState<number>(0);
  const [itemAmount, setItemAmount] = useState<number>(0);
  const [monsterAmount, setMonsterAmount] = useState<number>(0);
  const [raceAmount, setRaceAmount] = useState<number>(0);
  const [subraceAmount, setSubraceAmount] = useState<number>(0);
  const [classAmount, setClassAmount] = useState<number>(0);
  const [subclassAmount, setSubclassAmount] = useState<number>(0);
  const [charAmount, setCharAmount] = useState<number>(0);
  const [encounterAmount, setEncounterAmount] = useState<number>(0);
  const [selectionAmount, setSelectionAmount] = useState<number>(0);

  const [reload, isReload] = useState<boolean>(true);

  const [loading, isLoading] = useState<boolean>(false);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [failedObjs, setFailedObjs] = useState<string[]>([]);
  const [data, setData] = useState<IEntity[] | IEntity>();

  useEffect(() => {
    if (reload) {
      reciveCount("spells", (result: number) => {
        setSpellAmount(result);
      });
      reciveCount("gears", (result: number) => {
        setGearAmount(result);
      });
      reciveCount("items", (result: number) => {
        setItemAmount(result);
      });
      reciveCount("monsters", (result: number) => {
        setMonsterAmount(result);
      });
      reciveCount("races", (result: number) => {
        setRaceAmount(result);
      });
      reciveCount("subraces", (result: number) => {
        setSubraceAmount(result);
      });
      reciveCount("classes", (result: number) => {
        setClassAmount(result);
      });
      reciveCount("subclasses", (result: number) => {
        setSubclassAmount(result);
      });
      reciveCount("chars", (result: number) => {
        setCharAmount(result);
      });
      reciveCount("encounters", (result: number) => {
        setEncounterAmount(result);
      });
      reciveCount("selections", (result: number) => {
        setSelectionAmount(result);
      });
      reciveAllPromise("chars").then((result: any[]) => {
        return result;
      });
      isReload(false);
    }
  }, [reload]);

  const triggerImportFiles = (fileList: FileList | null) => {
    isLoading(true);
    importFiles(fileList, (failed: number, failedObj: string[], max: number) => {
      setFailedObjs(failedObj);
      isReload(true);
      isLoading(false);

      if (failed > 0) {
        setMessage(failed + " of " + max + " failed!");
      } else {
        setMessage(max + " imported successfully!");
      }
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 5000);
    });
  };

  const triggerDeleteAll = (tableName: string) => {
    deleteAll(tableName);
    isReload(true);
  };

  const returnTile = (entity: IEntity, index: number) => {
    if (isClass(entity)) {
      return <ClassTile key={index} classe={entity} />;
    } else if (isSubclass(entity)) {
      return <OptionSection key={index}>{entity.name}</OptionSection>;
    } else if (isRace(entity)) {
      return <RaceTile key={index} race={entity} />;
    } else if (isSubrace(entity)) {
      return <OptionSection key={index}>{entity.name}</OptionSection>;
    } else if (isMonster(entity)) {
      return <MonsterTile key={index} monster={entity} />;
    } else if (isSpell(entity)) {
      return <SpellTile key={index} spell={entity} />;
    } else if (isGear(entity)) {
      return <GearTile key={index} gear={entity} />;
    } else if (isItem(entity)) {
      return <ItemTile key={index} item={entity} />;
    } else if (isEncounter(entity)) {
      return <EncounterTile key={index} encounter={entity} />;
    } else if (isChar(entity)) {
      return <CharTile key={index} char={entity} />;
    } else {
      return <OptionSection key={index}>{entity.name}</OptionSection>;
    }
  };

  return (
    <AppWrapper>
      {message && showAlert && <Message>{message}</Message>}
      <OptionSection>
        <SelectionTitle>Import</SelectionTitle>
        <FileField
          label=""
          isMulti={true}
          accept={".json"}
          icon={faFileImport}
          onChange={(file) => triggerImportFiles(file)}
        />
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Export</SelectionTitle>
        <SectionRow>
          <SectionText>Export as one file?</SectionText>
          <IconButton icon={faFileExport} onClick={() => exportAll("DnDTome_all.json")} />
        </SectionRow>
      </OptionSection>
      <TabBar
        children={[
          "General",
          "Spells",
          "Gears",
          "Magic Items",
          "Monsters",
          "Races",
          "Classes",
          "Selections",
          "Chars",
          "Encounters",
          "Other Imports",
          "Recive",
        ]}
        onChange={(tab: string) => setTab(tab)}
        activeTab={activeTab}
      />
      {activeTab === "General" && <GeneralOptions />}
      {activeTab === "Spells" && (
        <SpellsOptions amount={spellAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Gears" && (
        <GearsOptions amount={gearAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Magic Items" && (
        <ItemsOptions amount={itemAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Monsters" && (
        <MonstersOptions amount={monsterAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Races" && (
        <RacesOptions amounts={[raceAmount, subraceAmount]} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Classes" && (
        <ClassesOptions
          amounts={[classAmount, subclassAmount]}
          triggerDeleteAll={triggerDeleteAll}
        />
      )}
      {activeTab === "Selections" && (
        <SelectionsOptions amount={selectionAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Chars" && (
        <CharsOptions amount={charAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Encounters" && (
        <EncountersOptions amount={encounterAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Other Imports" && (
        <OtherImportOptions
          isLoading={isLoading}
          isReload={isReload}
          setMessage={setMessage}
          setAlert={setAlert}
        />
      )}
      {activeTab === "Recive" && (
        <OptionTab>
          <OptionSectionLarge>
            <P2PReciver reload={isReload} changeData={setData} />
          </OptionSectionLarge>
          {data !== undefined &&
            Array.isArray(data) &&
            data.map((entity: IEntity, index: number) => {
              return returnTile(entity, index);
            })}
          {data !== undefined && !Array.isArray(data) && returnTile(data, 0)}
        </OptionTab>
      )}
      {loading && <LoadingSpinner />}
      {failedObjs &&
        failedObjs.length > 0 &&
        failedObjs.map((obj: string, index: number) => {
          return (
            <OptionSection key={index}>
              <SelectionTitle>Formatt Errors</SelectionTitle>
              <SectionText>
                <pre>{obj}</pre>
              </SectionText>
            </OptionSection>
          );
        })}
    </AppWrapper>
  );
};

export default Options;

const General = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

const OptionTab = styled(General)`
  flex: 1 1 auto;
`;

const OptionSection = styled(General)`
  flex: 1 1 auto;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

const OptionSectionLarge = styled(OptionSection)`
  width: calc(100% - 1em);
`;

const SelectionTitle = styled.div`
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  min-width: calc(100% - 20px);
  font-weight: bold;
  text-algin: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.input.color};
  background-color: ${({ theme }) => theme.input.backgroundColor};
`;

const SectionRow = styled.div`
  flex: 1 1 auto;
  margin: 5px;
  min-width: calc(100% - 10px);

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
`;

const SectionText = styled.div`
  flex: 1 1 auto;
`;

const Message = styled.div`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  min-width: calc(100% - 20px);
  flex: 1 1 auto;
  padding: 3px;
  margin: 5px;
  border-radius: 5px;
`;