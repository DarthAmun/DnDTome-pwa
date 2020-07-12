import Spell, { isSpell } from "../../Data/Spell";
import { saveNewFromList, reciveAll } from "../../Database/DbService";
import { IndexableType } from "dexie";

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
      var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(all)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(all));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  });
};
