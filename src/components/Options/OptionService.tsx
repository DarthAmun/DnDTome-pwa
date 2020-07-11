import Spell, { isSpell } from "../../Data/Spell";
import { saveNewFromList } from "../../Database/DbService";

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
