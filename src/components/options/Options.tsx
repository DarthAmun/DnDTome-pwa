import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { exportAll } from "../../services/OptionService";
import {
  deleteAll,
  reciveCount,
  reciveAllPromise,
  deleteAllByAttrs,
  deleteDatabase,
} from "../../services/DatabaseService";
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
import { isCampaign } from "../../data/campaign/Campaign";
import { isNpc } from "../../data/campaign/Npc";
import { isQuest } from "../../data/campaign/Quest";
import { isLocation } from "../../data/world/Location";
import { isGroup } from "../../data/campaign/Group";
import { isWorld } from "../../data/world/World";
import { isEvent } from "../../data/world/Event";

import { faExclamationTriangle, faFileExport } from "@fortawesome/free-solid-svg-icons";
import TabBar from "../general_elements/TabBar";
import IconButton from "../form_elements/IconButton";
import ClassTile from "../entities/classes/ClassTile";
import EncounterTile from "../entities/encounters/EncounterTile";
import CharTile from "../entities/chars/CharTile";
import GearTile from "../entities/gear/GearTile";
import ItemTile from "../entities/items/ItemTile";
import MonsterTile from "../entities/monsters/MonsterTile";
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
import CampaignTile from "../entities/campaigns/CampaignTile";
import QuestTile from "../entities/quests/QuestTile";
import LocationTile from "../entities/locations/LocationTile";
import NpcTile from "../entities/npcs/NpcTile";
import LocationsOptions from "./LocationsOptions";
import CampaignsOptions from "./CampaignsOptions";
import NpcsOptions from "./NpcsOptions";
import QuestsOptions from "./QuestsOptions";
import EventTile from "../entities/events/EventTile";
import WorldTile from "../entities/worlds/WorldTile";
import EventsOptions from "./EventsOptions";
import WorldsOptions from "./WorldsOptions";
import ImportField, { ImportModus } from "../form_elements/ImportField";
import GroupTile from "../entities/groups/GroupTile";
import GroupsOptions from "./GroupsOptions";
import DiscordOptions from "./DiscordOptions";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import RandomTableTile from "../entities/random_tables/RandomTableTile";
import { isRandomTable } from "../../data/RandomTable";
import RandomTablesOptions from "./RandomTablesOptions";
import { Dialog } from "../general_elements/Dialog";

const Options = () => {
  const [activeTab, setTab] = useState<string>("General");
  const [showResetDialog, setResetDialog] = useState<boolean>(false);

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
  const [campaignAmount, setCampaignAmount] = useState<number>(0);
  const [questAmount, setQuestAmount] = useState<number>(0);
  const [locationAmount, setLocationAmount] = useState<number>(0);
  const [worldAmount, setWorldAmount] = useState<number>(0);
  const [eventAmount, setEventAmount] = useState<number>(0);
  const [npcAmount, setNpcAmount] = useState<number>(0);
  const [groupAmount, setGroupAmount] = useState<number>(0);
  const [selectionAmount, setSelectionAmount] = useState<number>(0);
  const [randomTableAmount, setRandomTableAmount] = useState<number>(0);

  const [reload, isReload] = useState<boolean>(true);
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
      reciveCount("campaigns", (result: number) => {
        setCampaignAmount(result);
      });
      reciveCount("quests", (result: number) => {
        setQuestAmount(result);
      });
      reciveCount("worlds", (result: number) => {
        setWorldAmount(result);
      });
      reciveCount("events", (result: number) => {
        setEventAmount(result);
      });
      reciveCount("locations", (result: number) => {
        setLocationAmount(result);
      });
      reciveCount("npcs", (result: number) => {
        setNpcAmount(result);
      });
      reciveCount("groups", (result: number) => {
        setGroupAmount(result);
      });
      reciveCount("selections", (result: number) => {
        setSelectionAmount(result);
      });
      reciveCount("randomTables", (result: number) => {
        setRandomTableAmount(result);
      });
      reciveAllPromise("chars").then((result: any[]) => {
        return result;
      });
      isReload(false);
    }
  }, [reload]);

  const triggerDeleteAll = (tableName: string) => {
    deleteAll(tableName);
    isReload(true);
  };

  const triggerDeleteByAttr = (tableName: string, attrs: string[]) => {
    deleteAllByAttrs(tableName, "sources", attrs);
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
    } else if (isCampaign(entity)) {
      return <CampaignTile key={index} campaign={entity} />;
    } else if (isQuest(entity)) {
      return <QuestTile key={index} quest={entity} />;
    } else if (isLocation(entity)) {
      return <LocationTile key={index} location={entity} />;
    } else if (isNpc(entity)) {
      return <NpcTile key={index} npc={entity} />;
    } else if (isWorld(entity)) {
      return <WorldTile key={index} world={entity} />;
    } else if (isGroup(entity)) {
      return <GroupTile key={index} group={entity} />;
    } else if (isEvent(entity)) {
      return <EventTile key={index} event={entity} />;
    } else if (isRandomTable(entity)) {
      return <RandomTableTile key={index} randomTable={entity} />;
    } else if (isChar(entity)) {
      return <CharTile key={index} char={entity} />;
    } else {
      return <OptionSection key={index}>{entity.name}</OptionSection>;
    }
  };

  const resetDatabase = () => {
    deleteDatabase();
    isReload(true);
  };

  return (
    <>
      {showResetDialog && (
        <Dialog
          message={`Reset Database?`}
          icon={faExclamationTriangle}
          confirmeText={"Delete"}
          confirmeClick={() => {
            resetDatabase();
          }}
          abortText={"Back"}
          abortClick={() => {
            setResetDialog(false);
          }}
        />
      )}
      <OptionSection>
        <SelectionTitle>Import</SelectionTitle>
        <ImportField modus={ImportModus.NORMAL} />
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Export</SelectionTitle>
        <SectionRow>
          <SectionText>Export as one file?</SectionText>
          <IconButton icon={faFileExport} onClick={() => exportAll("DnDTome_all.json")} />
        </SectionRow>
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Reset Database</SelectionTitle>
        <IconButton icon={faTrashAlt} onClick={() => setResetDialog(true)} />
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
          "Campaigns",
          "Quests",
          "Groups",
          "Npc's",
          "Worlds",
          "Events",
          "Locations",
          "Random Table",
          "Other Imports",
          "Discord",
          "Receive",
        ]}
        onChange={(tab: string) => setTab(tab)}
        activeTab={activeTab}
      />
      {activeTab === "General" && <GeneralOptions />}
      {activeTab === "Spells" && (
        <SpellsOptions
          amount={spellAmount}
          triggerDeleteAll={triggerDeleteAll}
          triggerDeleteByAttr={triggerDeleteByAttr}
        />
      )}
      {activeTab === "Gears" && (
        <GearsOptions
          amount={gearAmount}
          triggerDeleteAll={triggerDeleteAll}
          triggerDeleteByAttr={triggerDeleteByAttr}
        />
      )}
      {activeTab === "Magic Items" && (
        <ItemsOptions
          amount={itemAmount}
          triggerDeleteAll={triggerDeleteAll}
          triggerDeleteByAttr={triggerDeleteByAttr}
        />
      )}
      {activeTab === "Monsters" && (
        <MonstersOptions
          amount={monsterAmount}
          triggerDeleteAll={triggerDeleteAll}
          triggerDeleteByAttr={triggerDeleteByAttr}
        />
      )}
      {activeTab === "Races" && (
        <RacesOptions
          amounts={[raceAmount, subraceAmount]}
          triggerDeleteAll={triggerDeleteAll}
          triggerDeleteByAttr={triggerDeleteByAttr}
        />
      )}
      {activeTab === "Classes" && (
        <ClassesOptions
          amounts={[classAmount, subclassAmount]}
          triggerDeleteAll={triggerDeleteAll}
          triggerDeleteByAttr={triggerDeleteByAttr}
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
      {activeTab === "Campaigns" && (
        <CampaignsOptions amount={campaignAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Quests" && (
        <QuestsOptions amount={questAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Groups" && (
        <GroupsOptions amount={groupAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Npc's" && (
        <NpcsOptions amount={npcAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Worlds" && (
        <WorldsOptions amount={worldAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Events" && (
        <EventsOptions amount={eventAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Locations" && (
        <LocationsOptions amount={locationAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Random Table" && (
        <RandomTablesOptions amount={randomTableAmount} triggerDeleteAll={triggerDeleteAll} />
      )}
      {activeTab === "Other Imports" && <OtherImportOptions />}
      {activeTab === "Discord" && <DiscordOptions />}
      {activeTab === "Receive" && (
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
      {/* {failedObjs &&
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
        })} */}
    </>
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
