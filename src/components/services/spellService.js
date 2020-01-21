import { MyAppDatabase } from "./MyDatabase";
import Spell from "../spell/Spell";

const db = new MyAppDatabase();

export function getSpells(callback) {
  db.open()
    .then(function () {
      db.spells.toArray().then(function (array) {
        callback(array);
      })
    })
    .finally(function () {
      db.close();
    });
}

export function writeSpells(spells) {
  db.open()
    .then(function () {
      spells.map(spell => {
        db.spells.put({
          name: spell.spell_name,
          classes: spell.spell_classes,
          sources: spell.spell_sources,
          level: spell.spell_level,
          school: spell.spell_school,
          time: spell.spell_time,
          range: spell.spell_range,
          components: spell.spell_components,
          duration: spell.spell_duration,
          ritual: spell.spell_ritual,
          text: spell.spell_text,
        });
      });
    })
    .finally(function () {
      db.close();
    });
}