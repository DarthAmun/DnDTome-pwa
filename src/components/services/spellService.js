import { MyAppDatabase } from "./MyDatabase";
import Spell from "../spell/Spell";

const db = new MyAppDatabase();

export function getSpells(callback) {
  db.open()
    .then(function () {
      for (let i = 0; i < 30; i++) {
        db.spells.put({
          id: i,
          name: "Test" + i,
          classes: "class",
          sources: "source",
          level: 0,
          school: "school",
          time: "time",
          range: "range",
          components: "comps",
          duration: "duration",
          ritual: i % 2,
          text: "text",
        });
      }
    })
    .finally(function () {
      db.spells.toArray().then(function (array) {
        callback(array);
      })
      db.close();
    });
}
