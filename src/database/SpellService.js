import { MyAppDatabase } from "./MyDatabase";

const db = new MyAppDatabase();
let searchSpellQuery;

export function reciveSpell(id, callback) {
  db.open()
    .then(function () {
      db.spells.where("id").equals(id)
        .then((spell) => {
          callback(spell);
        })
        .finally(function () {
          db.close();
        });
    })
    .finally(function () {
      db.close();
    });
}

export function reciveSpellByName(name, callback) {
  db.open()
    .then(function () {
      db.spells.where("name").equalsIgnoreCase(name)
        .then((spell) => {
          callback(spell);
        })
        .finally(function () {
          db.close();
        });
    })
    .finally(function () {
      db.close();
    });
}

export function reciveAllSpells(callback) {
  db.open()
    .then(function () {
      db.spells.toCollection().sortBy('name', function (array) {
        callback(array);
      })
    })
    .finally(function () {
      db.close();
    });
}

export function reciveSpells(query, callback) {

  if (query !== null) {
    searchSpellQuery = query.query;
  }

  db.open()
    .then(function () {
      console.time("sortSpells")
      db.spells
        .filter(spell => {
          let schoolbool = true;
          if (searchSpellQuery.school !== null && searchSpellQuery.school.length !== 0) {
            schoolbool = false;
            searchSpellQuery.school.map(school => {

              if (spell.school === school.value) schoolbool = true;
            });
          }
          let levelbool = true;
          if (searchSpellQuery.level !== null && searchSpellQuery.level.length !== 0) {
            levelbool = false;
            searchSpellQuery.level.map(level => {
              if (spell.level === level.value) levelbool = true;
            });
          }
          return (
            (searchSpellQuery.name !== undefined && spell.name.includes(searchSpellQuery.name))
            && (searchSpellQuery.time !== undefined && spell.time.includes(searchSpellQuery.time))
            && (searchSpellQuery.range !== undefined && spell.range.includes(searchSpellQuery.range))
            && (searchSpellQuery.duration !== undefined && spell.duration.includes(searchSpellQuery.duration))
            && (searchSpellQuery.components !== undefined && spell.components.includes(searchSpellQuery.components))
            && (searchSpellQuery.text !== undefined && spell.text.includes(searchSpellQuery.text))
            && (searchSpellQuery.classes !== undefined && spell.classes.includes(searchSpellQuery.classes))
            && (searchSpellQuery.sources !== undefined && spell.sources.includes(searchSpellQuery.sources))
            && ((searchSpellQuery.ritual && spell.ritual === 1) || (!searchSpellQuery.ritual))
            && levelbool
            && schoolbool
          );
        })
        .sortBy('name', function (array) {
          console.timeEnd("sortSpells")
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
  db.open()
    .then(function () {
      db.spells.update(spell.id, spell);
    })
    .finally(function () {
      db.close();
    });
}

export function saveNewSpell(spell) {
  db.open()
    .then(function () {
      db.spells.put(spell);
    })
    .finally(function () {
      db.close();
    });
}

export function saveNewSpells(spells, callback) {
  let spellImportLength = Object.keys(spells).length;
  let spellImported = 0;
  db.open()
    .then(function () {
      spells.map(spell => {
        db.spells.put({
          name: spell.spell_name !== undefined ? spell.spell_name : "",
          classes: spell.spell_classes !== undefined ? spell.spell_classes : "",
          sources: spell.spell_sources !== undefined ? spell.spell_sources : "",
          level: spell.spell_level !== undefined ? spell.spell_level : 0,
          school: spell.spell_school !== undefined ? spell.spell_school : "",
          time: spell.spell_time !== undefined ? spell.spell_time : "",
          range: spell.spell_range !== undefined ? spell.spell_range : "",
          components: spell.spell_components !== undefined ? spell.spell_components : "",
          duration: spell.spell_duration !== undefined ? spell.spell_duration : "",
          ritual: spell.spell_ritual !== undefined ? spell.spell_ritual : 0,
          text: spell.spell_text !== undefined ? spell.spell_text : "",
          pic: spell.spell_pic !== undefined ? spell.spell_pic : ""
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
  db.open()
    .then(function () {
      db.spells.where('id').equals(spell.id).delete();
    })
    .finally(function () {
      db.close();
    });
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
