import { reciveAll, reciveAllPromise, saveNew } from "./DatabaseService";
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
import IEntity from "../Data/IEntity";
import Encounter, { isEncounter } from "../Data/Encounter/Encounter";

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
      } else if (isEncounter(obj)) {
        promList.push(saveNew("encounters", obj as Encounter, file.name));
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

export const import5eToolsSpellsFiles = (fileList: FileList | null) => {
  if (fileList !== null) {
    const files = Array.from(fileList);

    files.forEach((file, i) => {
      let fileReader = new FileReader();
      fileReader.onloadend = async function () {
        const content = fileReader.result;
        if (content !== null) {
          let json = JSON.parse(content.toString());

          let promList: Promise<any>[] = [];
          json.spell.forEach((obj: any) => {
            console.log(obj.duration);

            let classes = "";
            obj.classes.fromClassList.forEach(
              (classe: { name: string; source: string }) => {
                classes += classe.name + ", ";
              }
            );

            let school = "";
            if (obj.school === "V") school = "Evocation";
            if (obj.school === "D") school = "Divination";
            if (obj.school === "N") school = "Necromancy";
            if (obj.school === "T") school = "Transmutation";
            if (obj.school === "I") school = "Illusion";
            if (obj.school === "C") school = "Conjuration";
            if (obj.school === "A") school = "Abjuration";
            if (obj.school === "E") school = "Enchantment";

            let time =
              obj.time[0].number +
              " " +
              obj.time[0].unit +
              " " +
              (obj.time[0].condition ? obj.time[0].condition : "");

            let range =
              obj.range.type +
              " " +
              obj.range.distance.type +
              " " +
              (obj.range.distance.amount ? obj.range.distance.amount : "");

            let components =
              (obj.components.v ? "V, " : "") +
              (obj.components.s ? "S, " : "") +
              (obj.components.m ? "M (" + obj.components.m.text + ")" : "");

            let concentration = obj.duration[0].concentration;
            let duration =
              (concentration ? "Concentration, " : "") +
              obj.duration[0].type +
              " " +
              (obj.duration[0].duration
                ? obj.duration[0].duration.type +
                  " " +
                  obj.duration[0].duration.amount
                : "");

            let text = "";
            obj.entries.forEach((textPart: string) => {
              text += textPart + "\n";
            });

            let newSpell = new Spell(
              obj.name,
              classes,
              obj.source,
              obj.level,
              school,
              time,
              range,
              components,
              duration,
              obj.meta && obj.meta.ritual ? 1 : 0,
              text,
              0,
              file.name,
              ""
            );
            promList.push(saveNew("spells", newSpell, file.name));
          });
          await Promise.all(promList);
        }
      };
      fileReader.readAsText(file);
    });
  }
};
