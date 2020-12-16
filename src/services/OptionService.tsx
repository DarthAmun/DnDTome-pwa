import { reciveAll, reciveAllPromise, saveNew } from "./DatabaseService";
import { IndexableType } from "dexie";
import Char, { isChar } from "../data/chars/Char";
import Class, { isClass, findClassFormattError } from "../data/classes/Class";
import Subclass, { isSubclass, formattSubclassFromattError } from "../data/classes/Subclass";
import Encounter, { isEncounter } from "../data/encounter/Encounter";
import Gear, { isGear, findGearFormattError } from "../data/Gear";
import IEntity from "../data/IEntity";
import Item, { isItem, findItemFromattError } from "../data/Item";
import Monster, { isMonster, findMonsterFormattError } from "../data/Monster";
import Race, { isRace, findRaceFormattError } from "../data/races/Race";
import Subrace, { isSubrace, findSubraceFormattError } from "../data/races/Subrace";
import Selection, { isSelection, findSelectionFormattError } from "../data/Selection";
import Spell, { isSpell, findSpellFormattError } from "../data/Spell";


export const importFiles = (
  fileList: FileList | null,
  callback: (failed: number, failedObj: string[], max: number) => void
) => {
  if (fileList !== null) {
    const files = Array.from(fileList);

    files.forEach((file, i) => {
      let fileReader = new FileReader();
      fileReader.onloadend = function () {
        const content = fileReader.result;
        if (content !== null) {
          let json = JSON.parse(content.toString());
          scanImportFileTest(json, file.name, callback);
        }
      };
      fileReader.readAsText(file);
    });
  }
};

export const scanImportFileTest = async (
  json: any,
  fileName: string,
  callback: (failed: number, failedObj: string[], max: number) => void
) => {
  let failCount = 0;
  let failedObj: string[] = [];
  let promList: Promise<any>[] = [];

  if (Array.isArray(json)) {
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
      } else if (isChar(obj)) {
        promList.push(saveNew("chars", obj as Char, fileName));
      } else {
        failCount++;
        failedObj.push(
          scanForFormatErrors(obj)
            .replaceAll("true", "success!")
            .replaceAll("false", "fail!")
        );
      }
    });
    await Promise.all(promList);
    callback(failCount, failedObj, json.length);
  } else {
    if (isClass(json)) {
      promList.push(saveNew("classes", json as Class, fileName));
    } else if (isSubclass(json)) {
      promList.push(saveNew("subclasses", json as Subclass, fileName));
    } else if (isRace(json)) {
      promList.push(saveNew("races", json as Race, fileName));
    } else if (isSubrace(json)) {
      promList.push(saveNew("subraces", json as Subrace, fileName));
    } else if (isMonster(json)) {
      promList.push(saveNew("monsters", json as Monster, fileName));
    } else if (isSpell(json)) {
      promList.push(saveNew("spells", json as Spell, fileName));
    } else if (isGear(json)) {
      promList.push(saveNew("gears", json as Gear, fileName));
    } else if (isItem(json)) {
      promList.push(saveNew("items", json as Item, fileName));
    } else if (isEncounter(json)) {
      promList.push(saveNew("encounters", json as Encounter, fileName));
    } else if (isSelection(json)) {
      promList.push(saveNew("selections", json as Selection, fileName));
    } else if (isChar(json)) {
      saveNew("chars", json as Char, fileName);
    } else {
      failCount++;
      failedObj.push(
        scanForFormatErrors(json)
          .replaceAll("true", "success!")
          .replaceAll("false", "fail!")
      );
    }
    await Promise.all(promList);
    callback(failCount, failedObj, json.length);
  }
};

const scanForFormatErrors = (obj: any) => {
  const itemFormatErrors = findItemFromattError(obj);
  let itemFailCount: number = 0;
  for (const value of Object.entries(itemFormatErrors)) {
    if (!value[1]) itemFailCount++;
  }
  const gearFormatErrors = findGearFormattError(obj);
  let gearFailCount: number = 0;
  for (const value of Object.entries(gearFormatErrors)) {
    if (!value[1]) gearFailCount++;
  }
  const spellFormatErrors = findSpellFormattError(obj);
  let spellFailCount: number = 0;
  for (const value of Object.entries(spellFormatErrors)) {
    if (!value[1]) spellFailCount++;
  }
  const monsterFormatErrors = findMonsterFormattError(obj);
  let monsterFailCount: number = 0;
  for (const value of Object.entries(monsterFormatErrors)) {
    if (!value[1]) monsterFailCount++;
  }
  const raceFormatErrors = findRaceFormattError(obj);
  let raceFailCount: number = 0;
  for (const value of Object.entries(raceFormatErrors)) {
    if (!value[1]) raceFailCount++;
  }
  const subraceFormatErrors = findSubraceFormattError(obj);
  let subraceFailCount: number = 0;
  for (const value of Object.entries(subraceFormatErrors)) {
    if (!value[1]) subraceFailCount++;
  }
  const classFormatErrors = findClassFormattError(obj);
  let classFailCount: number = 0;
  for (const value of Object.entries(classFormatErrors)) {
    if (!value[1]) classFailCount++;
  }
  const subclassFormatErrors = formattSubclassFromattError(obj);
  let subclassFailCount: number = 0;
  for (const value of Object.entries(subclassFormatErrors)) {
    if (!value[1]) subclassFailCount++;
  }
  const selectionFormatErrors = findSelectionFormattError(obj);
  let selectionFailCount: number = 0;
  for (const value of Object.entries(selectionFormatErrors)) {
    if (!value[1]) selectionFailCount++;
  }

  let errors: any[] = [];
  if (
    itemFailCount <= gearFailCount &&
    itemFailCount <= spellFailCount &&
    itemFailCount <= raceFailCount &&
    itemFailCount <= subraceFailCount &&
    itemFailCount <= classFailCount &&
    itemFailCount <= subclassFailCount &&
    itemFailCount <= selectionFailCount &&
    itemFailCount <= monsterFailCount
  ) {
    errors.push({ item: itemFormatErrors });
  }
  if (
    gearFailCount <= itemFailCount &&
    gearFailCount <= spellFailCount &&
    gearFailCount <= raceFailCount &&
    gearFailCount <= subraceFailCount &&
    gearFailCount <= classFailCount &&
    gearFailCount <= subclassFailCount &&
    gearFailCount <= selectionFailCount &&
    gearFailCount <= monsterFailCount
  ) {
    errors.push({ gear: gearFormatErrors });
  }
  if (
    spellFailCount <= itemFailCount &&
    spellFailCount <= gearFailCount &&
    spellFailCount <= raceFailCount &&
    spellFailCount <= subraceFailCount &&
    spellFailCount <= classFailCount &&
    spellFailCount <= subclassFailCount &&
    spellFailCount <= selectionFailCount &&
    spellFailCount <= monsterFailCount
  ) {
    errors.push({ spell: spellFormatErrors });
  }
  if (
    monsterFailCount <= itemFailCount &&
    monsterFailCount <= gearFailCount &&
    monsterFailCount <= raceFailCount &&
    monsterFailCount <= subraceFailCount &&
    monsterFailCount <= classFailCount &&
    monsterFailCount <= subclassFailCount &&
    monsterFailCount <= selectionFailCount &&
    monsterFailCount <= spellFailCount
  ) {
    errors.push({ monster: monsterFormatErrors });
  }
  if (
    raceFailCount <= itemFailCount &&
    raceFailCount <= gearFailCount &&
    raceFailCount <= monsterFailCount &&
    raceFailCount <= subraceFailCount &&
    raceFailCount <= classFailCount &&
    raceFailCount <= subclassFailCount &&
    raceFailCount <= selectionFailCount &&
    raceFailCount <= spellFailCount
  ) {
    errors.push({ race: raceFormatErrors });
  }
  if (
    subraceFailCount <= itemFailCount &&
    subraceFailCount <= gearFailCount &&
    subraceFailCount <= monsterFailCount &&
    subraceFailCount <= raceFailCount &&
    subraceFailCount <= classFailCount &&
    subraceFailCount <= subclassFailCount &&
    subraceFailCount <= selectionFailCount &&
    subraceFailCount <= spellFailCount
  ) {
    errors.push({ subrace: subraceFormatErrors });
  }
  if (
    classFailCount <= itemFailCount &&
    classFailCount <= gearFailCount &&
    classFailCount <= monsterFailCount &&
    classFailCount <= raceFailCount &&
    classFailCount <= subraceFailCount &&
    classFailCount <= subclassFailCount &&
    classFailCount <= selectionFailCount &&
    classFailCount <= spellFailCount
  ) {
    errors.push({ class: classFormatErrors });
  }
  if (
    subclassFailCount <= itemFailCount &&
    subclassFailCount <= gearFailCount &&
    subclassFailCount <= monsterFailCount &&
    subclassFailCount <= raceFailCount &&
    subclassFailCount <= subraceFailCount &&
    subclassFailCount <= classFailCount &&
    subclassFailCount <= selectionFailCount &&
    subclassFailCount <= spellFailCount
  ) {
    errors.push({ subclass: subclassFormatErrors });
  }
  if (
    selectionFailCount <= itemFailCount &&
    selectionFailCount <= gearFailCount &&
    selectionFailCount <= monsterFailCount &&
    selectionFailCount <= raceFailCount &&
    selectionFailCount <= subraceFailCount &&
    selectionFailCount <= classFailCount &&
    selectionFailCount <= subclassFailCount &&
    selectionFailCount <= spellFailCount
  ) {
    errors.push({ selection: selectionFormatErrors });
  }
  return JSON.stringify({ failedObject: obj, Errors: errors }, null, 2);
};

export const exportAllFromTable = (tableName: string, filename: string) => {
  reciveAll(tableName, (all: IndexableType[]) => {
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob(
        [decodeURIComponent(encodeURI(JSON.stringify(all)))],
        { type: contentType }
      );
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement("a");
      a.download = filename;
      a.href =
        "data:" + contentType + "," + encodeURIComponent(JSON.stringify(all));
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  });
};

export const exportAll = async (filename: string) => {
  let tableList: Promise<IEntity[]>[] = [];
  tableList.push(reciveAllPromise("spells"));
  tableList.push(reciveAllPromise("items"));
  tableList.push(reciveAllPromise("gears"));
  tableList.push(reciveAllPromise("monsters"));
  tableList.push(reciveAllPromise("races"));
  tableList.push(reciveAllPromise("subraces"));
  tableList.push(reciveAllPromise("classes"));
  tableList.push(reciveAllPromise("subclasses"));
  tableList.push(reciveAllPromise("chars"));
  tableList.push(reciveAllPromise("encounters"));
  tableList.push(reciveAllPromise("selections"));
  const results = await Promise.all(tableList);
  let all: IEntity[] = [];
  results.forEach((list: IEntity[]) => {
    list.forEach((entity: IEntity) => {
      all.push(entity);
    });
  });

  let contentType = "application/json;charset=utf-8;";
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(all)))], {
      type: contentType,
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var a = document.createElement("a");
    a.download = filename;
    a.href =
      "data:" + contentType + "," + encodeURIComponent(JSON.stringify(all));
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};