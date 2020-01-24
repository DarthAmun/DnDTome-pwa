import { MyAppDatabase } from "./MyDatabase";

const db = new MyAppDatabase();
let searchSpellQuery;

export function reciveSpell(id, callback) {
  db.spells.where("id").equals(id)
    .then((spell) => {
      callback(spell);
    })
    .finally(function () {
      db.close();
    });
}

export function reciveSpellByName(name, callback) {
  db.spells.where("name").equalsIgnoreCase(name)
    .then((spell) => {
      callback(spell);
    })
    .finally(function () {
      db.close();
    });
}

export function reciveAllSpells(callback) {
  db.open()
    .then(function () {
      db.spells.orderBy("name").then(function (array) {
        callback(array);
      })
    })
    .finally(function () {
      db.close();
    });
}

export function reciveSpells(step, start, query, callback) {

  if (query !== null) {
    searchSpellQuery = query.query;
  }

  db.open()
    .then(function () {
      db.spells.orderBy('name').offset(start).limit(step).toArray().then(function (array) {
        callback(array);
      })
    })
    .finally(function () {
      db.close();
    });
}

export function reciveSpellCount(query, callback) {
  db.open()
    .then(function () {
      db.spells.count(count => {
        callback(count);
      })
    })
    .finally(function () {
      db.close();
    });
}

export function reciveAttributeSelection(attribute, callback) {
  db.open()
    .then(function () {
      db.spells.orderBy(attribute).uniqueKeys(function (array) {
        callback(array);
      })
    })
    .finally(function () {
      db.close();
    });
}


export function saveSpell(spell) {
}

export function saveNewSpell(spell) {
}

export function saveNewSpells(spells, callback) {
  let spellImportLength = Object.keys(spells).length;
  let spellImported = 0;
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
          pic: spell.spell_pic
        });
        spellImported++;
        callback({ now: spellImported, full: spellImportLength, name: spell.spell_name });
      });
    })
    .finally(function () {
      db.close();
    });
}

export function saveNewSpellFromJson(spell, callback) {
}

export function deleteSpell(spell) {
}

export function deleteAllSpells() {
  db.open()
    .then(function () {
      db.spells.clear();
    })
    .finally(function () {
      db.close();
    });
}

export function addSpellToChar(char, spell, callback) {

}
