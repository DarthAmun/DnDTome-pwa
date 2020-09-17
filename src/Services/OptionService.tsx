import { saveNewFromList, reciveAll, saveNew } from "./DatabaseService";
import { IndexableType } from "dexie";
import Spell, { isSpell } from "../Data/Spell";
import Gear, { isGear } from "../Data/Gear";
import Monster, { isMonster } from "../Data/Monster";
import Race, { isRace } from "../Data/Races/Race";
import Subrace, { isSubrace } from "../Data/Races/Subrace";
import Item, { isItem } from "../Data/Item";
import Class, { isClass } from "../Data/Classes/Class";
import Subclass, { isSubclass } from "../Data/Classes/Subclass";
import Char, { isChar } from "../Data/Chars/Char";

export const importFiles = (
  fileList: FileList | null,
  callback: (failed: number, max: number) => void
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
  callback: (failed: number, max: number) => void
) => {
  if (Array.isArray(json)) {
    let failCount = 0;
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
      }
    });
    await Promise.all(promList);
    callback(failCount,json.length);
  }
};

const scanImportFile = (json: any, file: File, callback: () => void) => {
  if (Array.isArray(json)) {
    if (isClass(json[0])) {
      saveNewFromList("classes", json as Class[], file.name, callback);
    } else if (isSubclass(json[0])) {
      saveNewFromList("subclasses", json as Subclass[], file.name, callback);
    } else if (isRace(json[0])) {
      saveNewFromList("races", json as Race[], file.name, callback);
    } else if (isSubrace(json[0])) {
      saveNewFromList("subraces", json as Subrace[], file.name, callback);
    } else if (isMonster(json[0])) {
      saveNewFromList("monsters", json as Monster[], file.name, callback);
    } else if (isSpell(json[0])) {
      saveNewFromList("spells", json as Spell[], file.name, callback);
    } else if (isGear(json[0])) {
      saveNewFromList("gears", json as Gear[], file.name, callback);
    } else if (isItem(json[0])) {
      saveNewFromList("items", json as Item[], file.name, callback);
    } else if (isChar(json[0])) {
      saveNewFromList("chars", json as Char[], file.name, callback);
    }
  }
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
