import { reciveAll, saveNew } from "./DatabaseService";
import { IndexableType } from "dexie";
import Spell, { findSpellFormattError, isSpell } from "../Data/Spell";
import Gear, { findGearFormattError, isGear } from "../Data/Gear";
import Monster, { findMonsterFormattError, isMonster } from "../Data/Monster";
import Race, { findRaceFormattError, isRace } from "../Data/Races/Race";
import Subrace, {
  findSubraceFormattError,
  isSubrace,
} from "../Data/Races/Subrace";
import Item, { findItemFromattError, isItem } from "../Data/Item";
import Class, { findClassFormattError, isClass } from "../Data/Classes/Class";
import Subclass, {
  formattSubclassFromattError,
  isSubclass,
} from "../Data/Classes/Subclass";
import Char, { isChar } from "../Data/Chars/Char";

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
          scanImportFileTest(json, file, callback);
        }
      };
      fileReader.readAsText(file);
    });
  }
};

const scanImportFileTest = async (
  json: any,
  file: File,
  callback: (failed: number, failedObj: string[], max: number) => void
) => {
  if (Array.isArray(json)) {
    let failCount = 0;
    let failedObj: string[] = [];
    let promList: Promise<any>[] = [];

    json.forEach((obj: any) => {
      if (isClass(obj)) {
        promList.push(saveNew("classes", obj as Class, file.name));
      } else if (isSubclass(obj)) {
        promList.push(saveNew("subclasses", obj as Subclass, file.name));
      } else if (isRace(obj)) {
        promList.push(saveNew("races", obj as Race, file.name));
      } else if (isSubrace(obj)) {
        promList.push(saveNew("subraces", obj as Subrace, file.name));
      } else if (isMonster(obj)) {
        promList.push(saveNew("monsters", obj as Monster, file.name));
      } else if (isSpell(obj)) {
        promList.push(saveNew("spells", obj as Spell, file.name));
      } else if (isGear(obj)) {
        promList.push(saveNew("gears", obj as Gear, file.name));
      } else if (isItem(obj)) {
        promList.push(saveNew("items", obj as Item, file.name));
      } else if (isChar(obj)) {
        promList.push(saveNew("chars", obj as Char, file.name));
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

  let errors: any[] = [];
  if (
    itemFailCount <= gearFailCount &&
    itemFailCount <= spellFailCount &&
    itemFailCount <= raceFailCount &&
    itemFailCount <= subraceFailCount &&
    itemFailCount <= classFailCount &&
    itemFailCount <= subclassFailCount &&
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
    subclassFailCount <= spellFailCount
  ) {
    errors.push({ subclass: subclassFormatErrors });
  }
  return JSON.stringify({ failedObject: obj, Errors: errors }, null, 2);
};

export const exportAll = (tableName: string, filename: string) => {
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
