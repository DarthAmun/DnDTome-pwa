import { reciveAll, reciveAllPromise } from "./DatabaseService";
import { IndexableType } from "dexie";
import Char from "../data/chars/Char";
import Class from "../data/classes/Class";
import Subclass from "../data/classes/Subclass";
import Encounter from "../data/encounter/Encounter";
import Gear from "../data/Gear";
import Item from "../data/Item";
import Monster from "../data/Monster";
import Race from "../data/races/Race";
import Subrace from "../data/races/Subrace";
import Selection from "../data/Selection";
import Spell from "../data/Spell";
import Campaign from "../data/campaign/Campaign";
import Quest from "../data/campaign/Quest";
import Npc from "../data/campaign/Npc";
import Location from "../data/world/Location";
import Event from "../data/world/Event";
import World from "../data/world/World";
import Group from "../data/campaign/Group";

export const downloadAllFromTable = async (tableName: string, fileName: string) => {
  reciveAll(tableName, (all: IndexableType[]) => {
    let entity = { [tableName]: all };
    downloadContent(entity, fileName);
  });
};

export const downloadBackup = async (
  filename: string,
  updateProgress: (progress: number) => void
) => {
  console.time("Get all");
  let spells = await reciveAllPromise("spells");
  updateProgress(2);
  let items = await reciveAllPromise("items");
  updateProgress(4);
  let gears = await reciveAllPromise("gears");
  updateProgress(6);
  let monsters = await reciveAllPromise("monsters");
  updateProgress(8);
  let races = await reciveAllPromise("races");
  updateProgress(10);
  let subraces = await reciveAllPromise("subraces");
  updateProgress(12);
  let classes = await reciveAllPromise("classes");
  updateProgress(14);
  let subclasses = await reciveAllPromise("subclasses");
  updateProgress(16);
  let chars = await reciveAllPromise("chars");
  updateProgress(18);
  let encounters = await reciveAllPromise("encounters");
  updateProgress(20);
  let selections = await reciveAllPromise("selections");
  updateProgress(22);
  let randomTables = await reciveAllPromise("randomTables");
  updateProgress(24);
  let campaigns = await reciveAllPromise("campaigns");
  updateProgress(26);
  let quests = await reciveAllPromise("quests");
  updateProgress(28);
  let npcs = await reciveAllPromise("npcs");
  updateProgress(30);
  let worlds = await reciveAllPromise("worlds");
  updateProgress(32);
  let locations = await reciveAllPromise("locations");
  updateProgress(34);
  let events = await reciveAllPromise("events");
  updateProgress(36);
  let groups = await reciveAllPromise("groups");
  updateProgress(38);
  let feats = await reciveAllPromise("feats");
  updateProgress(40);
  let backgrounds = await reciveAllPromise("backgrounds");
  updateProgress(42);
  let notes = await reciveAllPromise("notes");
  updateProgress(50);
  console.timeEnd("Get all");

  console.time("Remove Base64 Images");
  spells = spells.map((v: Spell) => {
    let newV = { ...v };
    newV.picBase64 = "";
    return newV;
  });
  items = items.map((v: Item) => {
    let newV = { ...v };
    newV.picBase64 = "";
    return newV;
  });
  gears = gears.map((v: Gear) => {
    let newV = { ...v };
    newV.picBase64 = "";
    return newV;
  });
  monsters = monsters.map((v: Monster) => {
    let newV = { ...v };
    newV.picBase64 = "";
    return newV;
  });
  races = races.map((v: Race) => {
    let newV = { ...v };
    newV.picBase64 = "";
    return newV;
  });
  classes = classes.map((v: Class) => {
    let newV = { ...v };
    newV.picBase64 = "";
    return newV;
  });
  chars = chars.map((v: Char) => {
    let newV = { ...v };
    newV.picBase64 = "";
    return newV;
  });
  campaigns = campaigns.map((v: Campaign) => {
    let newV = { ...v };
    newV.picBase64 = "";
    return newV;
  });
  quests = quests.map((v: Quest) => {
    let newV = { ...v };
    newV.picBase64 = "";
    return newV;
  });
  npcs = npcs.map((v: Npc) => {
    let newV = { ...v };
    newV.picBase64 = "";
    if (newV.char !== undefined) {
      let newChar: Char = { ...newV.char };
      newChar.picBase64 = "";
      newV.char = newChar;
    } else if (newV.monster !== undefined) {
      let newMonster: Monster = { ...newV.monster };
      newMonster.picBase64 = "";
      newV.monster = newMonster;
    }
    return newV;
  });
  groups = groups.map((v: Group) => {
    let newV = { ...v };
    newV.picBase64 = "";
    return newV;
  });
  console.timeEnd("Remove Base64 Images");
  updateProgress(85);

  let all: any = {
    spells: spells,
    items: items,
    gears: gears,
    monsters: monsters,
    races: races,
    subraces: subraces,
    classes: classes,
    subclasses: subclasses,
    chars: chars,
    encounters: encounters,
    selections: selections,
    randomTables: randomTables,
    campaigns: campaigns,
    quests: quests,
    npcs: npcs,
    worlds: worlds,
    locations: locations,
    events: events,
    groups: groups,
    feats: feats,
    backgrounds: backgrounds,
    notes: notes,
  };
  downloadContent(all, filename);
  updateProgress(100);
};

const downloadContent = (all: any, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([JSON.stringify(all)]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName); // 3. Append to html page
  document.body.appendChild(link); // 4. Force download
  link.click(); // 5. Clean up and remove the link
  document.body.removeChild(link);
};
