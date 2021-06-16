import { reciveAll, reciveAllPromise, saveNew } from "./DatabaseService";
import { IndexableType } from "dexie";
import Char, { isChar } from "../data/chars/Char";
import Class, { isClass } from "../data/classes/Class";
import Subclass, { isSubclass } from "../data/classes/Subclass";
import Encounter, { isEncounter } from "../data/encounter/Encounter";
import Gear, { isGear } from "../data/Gear";
import Item, { isItem } from "../data/Item";
import Monster, { isMonster } from "../data/Monster";
import Race, { isRace } from "../data/races/Race";
import Subrace, { isSubrace } from "../data/races/Subrace";
import Selection, { isSelection } from "../data/Selection";
import Spell, { isSpell } from "../data/Spell";
import Campaign, { isCampaign } from "../data/campaign/Campaign";
import Quest, { isQuest } from "../data/campaign/Quest";
import Npc, { isNpc } from "../data/campaign/Npc";
import Location, { isLocation } from "../data/world/Location";
import Event, { isEvent } from "../data/world/Event";
import World, { isWorld } from "../data/world/World";
import Group from "../data/campaign/Group";

export const scanImportFileTest = async (json: any, fileName: string, callback: () => void) => {
  let promList: Promise<any>[] = [];

  if (!Array.isArray(json)) {
    json = [json];
  }

  json.forEach((obj: any) => {
    if (isClass(obj)) {
      promList.push(saveNew("classes", obj as Class, fileName));
    } else if (isSubclass(obj)) {
      promList.push(saveNew("subclasses", obj as Subclass, fileName));
    } else if (isRace(obj)) {
      promList.push(saveNew("races", obj as Race, fileName));
    } else if (isSubrace(obj)) {
      promList.push(saveNew("subraces", obj as Subrace, fileName));
    } else if (isMonster(obj)) {
      promList.push(saveNew("monsters", obj as Monster, fileName));
    } else if (isSpell(obj)) {
      promList.push(saveNew("spells", obj as Spell, fileName));
    } else if (isGear(obj)) {
      promList.push(saveNew("gears", obj as Gear, fileName));
    } else if (isItem(obj)) {
      promList.push(saveNew("items", obj as Item, fileName));
    } else if (isEncounter(obj)) {
      promList.push(saveNew("encounters", obj as Encounter, fileName));
    } else if (isSelection(obj)) {
      promList.push(saveNew("selections", obj as Selection, fileName));
    } else if (isCampaign(obj)) {
      promList.push(saveNew("campaigns", obj as Campaign, fileName));
    } else if (isQuest(obj)) {
      promList.push(saveNew("quests", obj as Quest, fileName));
    } else if (isNpc(obj)) {
      promList.push(saveNew("npcs", obj as Npc, fileName));
    } else if (isWorld(obj)) {
      promList.push(saveNew("worlds", obj as World, fileName));
    } else if (isLocation(obj)) {
      promList.push(saveNew("locations", obj as Location, fileName));
    } else if (isEvent(obj)) {
      promList.push(saveNew("events", obj as Event, fileName));
    } else if (isChar(obj)) {
      promList.push(saveNew("chars", obj as Char, fileName));
    }
  });
  await Promise.all(promList);
  callback();
};

// const scanForFormatErrors = (obj: any) => {
//   const itemFormatErrors = findItemFromattError(obj);
//   let itemFailCount: number = 0;
//   for (const value of Object.entries(itemFormatErrors)) {
//     if (!value[1]) itemFailCount++;
//   }
//   const gearFormatErrors = findGearFormattError(obj);
//   let gearFailCount: number = 0;
//   for (const value of Object.entries(gearFormatErrors)) {
//     if (!value[1]) gearFailCount++;
//   }
//   const spellFormatErrors = findSpellFormattError(obj);
//   let spellFailCount: number = 0;
//   for (const value of Object.entries(spellFormatErrors)) {
//     if (!value[1]) spellFailCount++;
//   }
//   const monsterFormatErrors = findMonsterFormattError(obj);
//   let monsterFailCount: number = 0;
//   for (const value of Object.entries(monsterFormatErrors)) {
//     if (!value[1]) monsterFailCount++;
//   }
//   const raceFormatErrors = findRaceFormattError(obj);
//   let raceFailCount: number = 0;
//   for (const value of Object.entries(raceFormatErrors)) {
//     if (!value[1]) raceFailCount++;
//   }
//   const subraceFormatErrors = findSubraceFormattError(obj);
//   let subraceFailCount: number = 0;
//   for (const value of Object.entries(subraceFormatErrors)) {
//     if (!value[1]) subraceFailCount++;
//   }
//   const classFormatErrors = findClassFormattError(obj);
//   let classFailCount: number = 0;
//   for (const value of Object.entries(classFormatErrors)) {
//     if (!value[1]) classFailCount++;
//   }
//   const subclassFormatErrors = formattSubclassFromattError(obj);
//   let subclassFailCount: number = 0;
//   for (const value of Object.entries(subclassFormatErrors)) {
//     if (!value[1]) subclassFailCount++;
//   }
//   const selectionFormatErrors = findSelectionFormattError(obj);
//   let selectionFailCount: number = 0;
//   for (const value of Object.entries(selectionFormatErrors)) {
//     if (!value[1]) selectionFailCount++;
//   }

//   let errors: any[] = [];
//   if (
//     itemFailCount <= gearFailCount &&
//     itemFailCount <= spellFailCount &&
//     itemFailCount <= raceFailCount &&
//     itemFailCount <= subraceFailCount &&
//     itemFailCount <= classFailCount &&
//     itemFailCount <= subclassFailCount &&
//     itemFailCount <= selectionFailCount &&
//     itemFailCount <= monsterFailCount
//   ) {
//     errors.push({ item: itemFormatErrors });
//   }
//   if (
//     gearFailCount <= itemFailCount &&
//     gearFailCount <= spellFailCount &&
//     gearFailCount <= raceFailCount &&
//     gearFailCount <= subraceFailCount &&
//     gearFailCount <= classFailCount &&
//     gearFailCount <= subclassFailCount &&
//     gearFailCount <= selectionFailCount &&
//     gearFailCount <= monsterFailCount
//   ) {
//     errors.push({ gear: gearFormatErrors });
//   }
//   if (
//     spellFailCount <= itemFailCount &&
//     spellFailCount <= gearFailCount &&
//     spellFailCount <= raceFailCount &&
//     spellFailCount <= subraceFailCount &&
//     spellFailCount <= classFailCount &&
//     spellFailCount <= subclassFailCount &&
//     spellFailCount <= selectionFailCount &&
//     spellFailCount <= monsterFailCount
//   ) {
//     errors.push({ spell: spellFormatErrors });
//   }
//   if (
//     monsterFailCount <= itemFailCount &&
//     monsterFailCount <= gearFailCount &&
//     monsterFailCount <= raceFailCount &&
//     monsterFailCount <= subraceFailCount &&
//     monsterFailCount <= classFailCount &&
//     monsterFailCount <= subclassFailCount &&
//     monsterFailCount <= selectionFailCount &&
//     monsterFailCount <= spellFailCount
//   ) {
//     errors.push({ monster: monsterFormatErrors });
//   }
//   if (
//     raceFailCount <= itemFailCount &&
//     raceFailCount <= gearFailCount &&
//     raceFailCount <= monsterFailCount &&
//     raceFailCount <= subraceFailCount &&
//     raceFailCount <= classFailCount &&
//     raceFailCount <= subclassFailCount &&
//     raceFailCount <= selectionFailCount &&
//     raceFailCount <= spellFailCount
//   ) {
//     errors.push({ race: raceFormatErrors });
//   }
//   if (
//     subraceFailCount <= itemFailCount &&
//     subraceFailCount <= gearFailCount &&
//     subraceFailCount <= monsterFailCount &&
//     subraceFailCount <= raceFailCount &&
//     subraceFailCount <= classFailCount &&
//     subraceFailCount <= subclassFailCount &&
//     subraceFailCount <= selectionFailCount &&
//     subraceFailCount <= spellFailCount
//   ) {
//     errors.push({ subrace: subraceFormatErrors });
//   }
//   if (
//     classFailCount <= itemFailCount &&
//     classFailCount <= gearFailCount &&
//     classFailCount <= monsterFailCount &&
//     classFailCount <= raceFailCount &&
//     classFailCount <= subraceFailCount &&
//     classFailCount <= subclassFailCount &&
//     classFailCount <= selectionFailCount &&
//     classFailCount <= spellFailCount
//   ) {
//     errors.push({ class: classFormatErrors });
//   }
//   if (
//     subclassFailCount <= itemFailCount &&
//     subclassFailCount <= gearFailCount &&
//     subclassFailCount <= monsterFailCount &&
//     subclassFailCount <= raceFailCount &&
//     subclassFailCount <= subraceFailCount &&
//     subclassFailCount <= classFailCount &&
//     subclassFailCount <= selectionFailCount &&
//     subclassFailCount <= spellFailCount
//   ) {
//     errors.push({ subclass: subclassFormatErrors });
//   }
//   if (
//     selectionFailCount <= itemFailCount &&
//     selectionFailCount <= gearFailCount &&
//     selectionFailCount <= monsterFailCount &&
//     selectionFailCount <= raceFailCount &&
//     selectionFailCount <= subraceFailCount &&
//     selectionFailCount <= classFailCount &&
//     selectionFailCount <= subclassFailCount &&
//     selectionFailCount <= spellFailCount
//   ) {
//     errors.push({ selection: selectionFormatErrors });
//   }
//   return JSON.stringify({ failedObject: obj, Errors: errors }, null, 2);
// };

export const exportAllFromTable = (tableName: string, filename: string) => {
  reciveAll(tableName, (all: IndexableType[]) => {
    let entity = { [tableName]: all };
    let contentType = "application/json;charset=utf-8;";

    var a = document.createElement("a");
    a.download = filename;
    a.href = "data:" + contentType + "," + encodeURIComponent(JSON.stringify(entity));
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
};

export const exportAll = async (filename: string) => {
  console.time("Get all");
  let spells = await reciveAllPromise("spells");
  let items = await reciveAllPromise("items");
  let gears = await reciveAllPromise("gears");
  let monsters = await reciveAllPromise("monsters");
  let races = await reciveAllPromise("races");
  let subraces = await reciveAllPromise("subraces");
  let classes = await reciveAllPromise("classes");
  let subclasses = await reciveAllPromise("subclasses");
  let chars = await reciveAllPromise("chars");
  let encounters = await reciveAllPromise("encounters");
  let selections = await reciveAllPromise("selections");
  let randomTables = await reciveAllPromise("randomTables");
  let campaigns = await reciveAllPromise("campaigns");
  let quests = await reciveAllPromise("quests");
  let npcs = await reciveAllPromise("npcs");
  let worlds = await reciveAllPromise("worlds");
  let locations = await reciveAllPromise("locations");
  let events = await reciveAllPromise("events");
  let groups = await reciveAllPromise("groups");
  let feats = await reciveAllPromise("feats");
  let backgrounds = await reciveAllPromise("backgrounds");
  let notes = await reciveAllPromise("notes");
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

  let contentType = "application/json;charset=utf-8;";

  var a = document.createElement("a");
  a.download = filename;
  a.href = "data:" + contentType + "," + encodeURIComponent(JSON.stringify(all));
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const exportAllRight = async (filename: string) => {
  console.time("Get all");
  let spells = await reciveAllPromise("spells");
  let items = await reciveAllPromise("items");
  let gears = await reciveAllPromise("gears");
  let monsters = await reciveAllPromise("monsters");
  let races = await reciveAllPromise("races");
  let subraces = await reciveAllPromise("subraces");
  let classes = await reciveAllPromise("classes");
  let subclasses = await reciveAllPromise("subclasses");
  let chars = await reciveAllPromise("chars");
  let feats = await reciveAllPromise("feats");
  let backgrounds = await reciveAllPromise("backgrounds");
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
  console.timeEnd("Remove Base64 Images");

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
    feats: feats,
    backgrounds: backgrounds,
  };

  let contentType = "application/json;charset=utf-8;";

  var a = document.createElement("a");
  a.download = filename;
  a.href = "data:" + contentType + "," + encodeURIComponent(JSON.stringify(all));
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const exportAllLeft = async (filename: string) => {
  console.time("Get all");
  let encounters = await reciveAllPromise("encounters");
  let selections = await reciveAllPromise("selections");
  let randomTables = await reciveAllPromise("randomTables");
  let campaigns = await reciveAllPromise("campaigns");
  let quests = await reciveAllPromise("quests");
  let npcs = await reciveAllPromise("npcs");
  let worlds = await reciveAllPromise("worlds");
  let locations = await reciveAllPromise("locations");
  let events = await reciveAllPromise("events");
  let groups = await reciveAllPromise("groups");
  let notes = await reciveAllPromise("notes");
  console.timeEnd("Get all");

  console.time("Remove Base64 Images");
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

  let all: any = {
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
    notes: notes,
  };

  let contentType = "application/json;charset=utf-8;";

  var a = document.createElement("a");
  a.download = filename;
  a.href = "data:" + contentType + "," + encodeURIComponent(JSON.stringify(all));
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
