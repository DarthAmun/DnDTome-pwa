import { saveNewFromList, reciveAll } from "../../Database/DbService";
import { IndexableType } from "dexie";
import Spell, { isSpell } from "../../Data/Spell";
import Gear, { isGear } from "../../Data/Gear";
import Monster, { isMonster } from "../../Data/Monster";
import Race, { isRace } from "../../Data/Race";
import Subrace, { isSubrace } from "../../Data/Subrace";
import Item, { isItem } from "../../Data/Item";
import Class, { isClass } from "../../Data/Class";

export const importFiles = (fileList: FileList | null) => {
  if (fileList !== null) {
    const files = Array.from(fileList);

    files.forEach((file, i) => {
      let fileReader = new FileReader();
      fileReader.onloadend = function () {
        const content = fileReader.result;
        if (content !== null) {
          let json = JSON.parse(content.toString());
          if (Array.isArray(json)) {
            if (isSpell(json[0])) {
              saveNewFromList("spells", json as Spell[], file.name);
            } else if (isGear(json[0])) {
              saveNewFromList("gears", json as Gear[], file.name);
            } else if (isItem(json[0])) {
              saveNewFromList("items", json as Item[], file.name);
            } else if (isMonster(json[0])) {
              saveNewFromList("monsters", json as Monster[], file.name);
            } else if (isRace(json[0])) {
              saveNewFromList("races", json as Race[], file.name);
            } else if (isSubrace(json[0])) {
              saveNewFromList("subraces", json as Subrace[], file.name);
            } else if (isClass(json[0])) {
              saveNewFromList("classes", json as Class[], file.name);
            }
          }
          //   saveNewSpells(spellsJson, file.name);
        }
      };
      fileReader.readAsText(file);
    });
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
