import { MyAppDatabase } from "./MyDatabase";
import Spell from "../components/spell/Spell";

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

// let searchSpellQuery;

module.exports.reciveSpell = (id, callback) => {
  // db.serialize(function () {
  //   db.get("SELECT * FROM 'main'.'tab_spells' WHERE spell_id=?", [id], function (err, row) {
  //     if (err !== null) {
  //       console.log("====>" + err);
  //     }
  //     callback(row);
  //     console.log("====>" + `getSpell successfull`)
  //   });
  // });
}

module.exports.reciveSpellByName = (name, callback) => {
  // db.serialize(function () {
  //   db.get("SELECT * FROM 'main'.'tab_spells' WHERE spell_name=?", [name], function (err, row) {
  //     if (err !== null) {
  //       console.log("====>" + err);
  //     }
  //     callback(row);
  //     console.log("====>" + `getSpell successfull`)
  //   });
  // });
}

module.exports.reciveAllSpells = (callback) => {
  // let q = "SELECT * FROM 'main'.'tab_spells' ORDER BY spell_name";
  // db.serialize(function () {
  //   db.all(q, function (err, rows) {
  //     if (err !== null) {
  //       console.log("====>" + err);
  //     }
  //     console.log("====>" + `getAllSpellsResult successfull`)
  //     callback(rows);
  //   });
  // });
}

module.exports.reciveSpells = (step, start, query, callback) => {
  // localStorage.setItem('spellStep', parseInt(step, 10));
  // localStorage.setItem('spellStart', parseInt(start, 10));

  // if (query !== null) {
  //   searchSpellQuery = query;
  // }
  // let q = "SELECT * FROM 'main'.'tab_spells' WHERE ";
  // if (searchSpellQuery !== null) {
  //   if (searchSpellQuery.name !== null && typeof searchSpellQuery.name !== 'undefined' && searchSpellQuery.name !== "") {
  //     q += `spell_name like "%${searchSpellQuery.name}%" AND `;
  //   }
  //   if (searchSpellQuery.time !== null && typeof searchSpellQuery.time !== 'undefined' && searchSpellQuery.time !== "") {
  //     q += `spell_time like "%${searchSpellQuery.time}%" AND `;
  //   }
  //   if (searchSpellQuery.level !== null && typeof searchSpellQuery.level !== 'undefined' && searchSpellQuery.level !== "" && searchSpellQuery.level.length !== 0) {
  //     searchSpellQuery.level.map(level => {
  //       q += `spell_level = "${level.value}" OR `;
  //     });
  //     q = q.slice(0, -3);
  //     q += "AND ";
  //   }
  //   if (searchSpellQuery.school !== null && typeof searchSpellQuery.school !== 'undefined' && searchSpellQuery.school !== "" && searchSpellQuery.school.length !== 0) {
  //     searchSpellQuery.school.map(school => {
  //       q += `spell_school = "${school.value}" OR `;
  //     });
  //     q = q.slice(0, -3);
  //     q += "AND ";
  //   }
  //   if (searchSpellQuery.range !== null && typeof searchSpellQuery.range !== 'undefined' && searchSpellQuery.range !== "") {
  //     q += `spell_range like "%${searchSpellQuery.range}%" AND `;
  //   }
  //   if (searchSpellQuery.components !== null && typeof searchSpellQuery.components !== 'undefined' && searchSpellQuery.components !== "") {
  //     q += `spell_components like "%${searchSpellQuery.components}%" AND `;
  //   }
  //   if (searchSpellQuery.classes !== null && typeof searchSpellQuery.classes !== 'undefined' && searchSpellQuery.classes !== "") {
  //     q += `spell_classes like "%${searchSpellQuery.classes}%" AND `;
  //   }
  //   if (searchSpellQuery.text !== null && typeof searchSpellQuery.text !== 'undefined' && searchSpellQuery.text !== "") {
  //     q += `spell_text like "%${searchSpellQuery.text}%" AND `;
  //   }
  //   if (searchSpellQuery.sources !== null && typeof searchSpellQuery.sources !== 'undefined' && searchSpellQuery.sources !== "") {
  //     q += `spell_sources like "%${searchSpellQuery.sources}%" AND `;
  //   }
  //   if (searchSpellQuery.duration !== null && typeof searchSpellQuery.duration !== 'undefined' && searchSpellQuery.duration !== "") {
  //     q += `spell_duration like "%${searchSpellQuery.duration}%" AND `;
  //   }
  //   if (searchSpellQuery.ritual !== null && typeof searchSpellQuery.ritual !== 'undefined' && searchSpellQuery.ritual !== "") {
  //     q += `spell_ritual = ${searchSpellQuery.ritual} AND `;
  //   }
  //   if (q.includes(" AND ")) {
  //     q = q.slice(0, -4);
  //   } else {
  //     q = q.slice(0, -6);
  //   }
  // } else {
  //   q = q.slice(0, -6);
  // }
  // q += ` ORDER BY spell_name ASC LIMIT ${step} OFFSET ${start}`;
  // db.serialize(function () {
  //   db.all(q, function (err, rows) {
  //     if (err !== null) {
  //       console.log("====>" + err);
  //     }
  //     callback(rows);
  //     console.log("====>" + `getSearchSpellsResult from ${start} to ${(start + step)} successfull`)
  //   });
  // });
  // return q;
}

module.exports.reciveSpellCount = (query, callback) => {
  // const q = this.reciveSpells(10, 0, query, function (result) { });
  // const sql = q.replace("SELECT * FROM 'main'.'tab_spells'", "SELECT count(*) AS count FROM 'main'.'tab_spells'");
  // db.serialize(function () {
  //   db.all(sql, function (err, rows) {
  //     if (err !== null) {
  //       console.log("====>" + err);
  //     }
  //     callback(rows[0]);
  //     console.log("====>" + `getSpellCount successfull`)
  //   });
  // });
}

module.exports.reciveAttributeSelection = (attribute, callback) => {
  // let q = `SELECT spell_${attribute} FROM 'main'.'tab_spells' GROUP BY spell_${attribute} ORDER BY spell_${attribute}`;
  // db.serialize(function () {
  //   db.all(q, function (err, rows) {
  //     if (err !== null) {
  //       console.log("====>" + err);
  //     }
  //     callback(rows);
  //     console.log("====>" + `get all ${attribute} successfull`)
  //   });
  // });
}


module.exports.saveSpell = (spell) => {
  // let data = [spell.name, spell.school, spell.level, spell.ritual, spell.time, spell.duration, spell.range, spell.components, spell.text, spell.classes, spell.sources, spell.pic, spell.id];
  // let sql = `UPDATE 'main'.'tab_spells'
  //             SET spell_name = ?, spell_school = ?, spell_level = ?, spell_ritual = ?, spell_time = ?, spell_duration = ?, spell_range = ?, spell_components = ?, spell_text = ?, spell_classes = ?, spell_sources = ?, spell_pic = ?
  //             WHERE spell_id = ?`;
  // db.serialize(function () {
  //   db.run(sql, data, function (err) {
  //     if (err) {
  //       return console.error(err.message);
  //     }
  //     console.log(`====> ${spell.name} updated successfull`);
  //     ipcRenderer.send('displayMessage', { type: `Saved spell`, message: `Saved ${spell.name} successful` });
  //   });
  // });
}

module.exports.saveNewSpell = (spell) => {
  // let data = [spell.name, spell.school, spell.level, spell.ritual, spell.time, spell.duration, spell.range, spell.components, spell.text, spell.classes, spell.sources, spell.pic];
  // let sql = `INSERT INTO 'main'.'tab_spells' (spell_name, spell_school, spell_level, spell_ritual, spell_time, spell_duration, spell_range, spell_components, spell_text, spell_classes, spell_sources, spell_pic)
  //             VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  // db.serialize(function () {
  //   db.run(sql, data, function (err) {
  //     if (err) {
  //       return console.error(err.message);
  //     }
  //     console.log(`====>Added ${spell.name} successfull`);
  //     ipcRenderer.send('displayMessage', { type: `Added spell`, message: `Added ${spell.name} successful` });
  //   });
  // });
}

module.exports.saveNewSpells = (spells, callback) => {
  // let spellImportLength = Object.keys(spells).length;
  // let spellImported = 0;
  // spells.forEach(spell => {
  //   let data = [spell.spell_name, spell.spell_ritual, spell.spell_school, spell.spell_level, spell.spell_time, spell.spell_duration, spell.spell_range, spell.spell_components, spell.spell_text, spell.spell_classes, spell.spell_sources, spell.spell_pic];
  //   let sql = `INSERT INTO 'main'.'tab_spells' (spell_name, spell_ritual, spell_school, spell_level, spell_time, spell_duration, spell_range, spell_components, spell_text, spell_classes, spell_sources, spell_pic)
  //               VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  //   db.serialize(function () {
  //     db.run(sql, data, function (err) {
  //       if (err) {
  //         return console.error(err.message);
  //       }
  //       console.log(`====>Added ${spell.spell_name} successfull`);
  //       spellImported++;
  //       callback({ now: spellImported, full: spellImportLength, name: spell.spell_name });
  //     });
  //   });
  // });
}

module.exports.saveNewSpellFromJson = (spell, callback) => {
  // let data = [spell.spell_name, spell.spell_ritual, spell.spell_school, spell.spell_level, spell.spell_time, spell.spell_duration, spell.spell_range, spell.spell_components, spell.spell_text, spell.spell_classes, spell.spell_sources, spell.spell_pic];
  // let sql = `INSERT INTO 'main'.'tab_spells' (spell_name, spell_ritual, spell_school, spell_level, spell_time, spell_duration, spell_range, spell_components, spell_text, spell_classes, spell_sources, spell_pic)
  //               VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  // db.serialize(function () {
  //   db.run(sql, data, function (err) {
  //     if (err) {
  //       return console.error(err.message);
  //     }
  //     console.log(`====>Added ${spell.spell_name} successfull`);
  //     callback(this.lastID);
  //   });
  // });
}

module.exports.deleteSpell = (spell) => {
  // let data = [spell.id];
  // let sql1 = `DELETE FROM 'main'.'tab_spells' WHERE spell_id = ?`;
  // let sql2 = `DELETE FROM 'main'.'tab_characters_spells' WHERE spell_id = ?`;
  // db.serialize(function () {
  //   db.run(sql2, data, function (err) {
  //     if (err) {
  //       return console.error(err.message);
  //     }
  //     console.log(`====>Deleted ${spell.name} from characters successfull`);
  //   });
  //   db.run(sql1, data, function (err) {
  //     if (err) {
  //       return console.error(err.message);
  //     }
  //     console.log(`====>Deleted ${spell.name} successfull`);
  //     ipcRenderer.send('closeActiveView');
  //     ipcRenderer.send('removeWindow', spell);
  //     ipcRenderer.send('displayMessage', { type: `Deleted spell`, message: `Deleted ${spell.name} successful` });
  //   });
  // });
}

module.exports.deleteAllSpells = () => {
  // db.serialize(function () {
  //   db.run(`DELETE FROM tab_characters_spells`, function (err) {
  //     if (err !== null) {
  //       console.log("====>" + err);
  //     }
  //     console.log(`====> All from characters_spells successful deleted`);
  //     ipcRenderer.send("displayMessage", { type: `Delete all spells`, message: "delete all spells from characters successful" });
  //   });
  //   db.run(`DELETE FROM sqlite_sequence WHERE name='tab_characters_spells'`, function (err) {
  //     if (err !== null) {
  //       console.log("====>" + err);
  //     }
  //     console.log(`====> characters_spells autoincreasement reseted successful`);
  //   });
  //   db.run(`DELETE FROM tab_spells`, function (err) {
  //     if (err !== null) {
  //       console.log("====>" + err);
  //     }
  //     console.log(`====> All from spells successful deleted`);
  //     ipcRenderer.send("displayMessage", { type: `Delete all spells`, message: "delete all spells successful" });
  //   });
  //   db.run(`DELETE FROM sqlite_sequence WHERE name='tab_spells'`, function (err) {
  //     if (err !== null) {
  //       console.log("====>" + err);
  //     }
  //     console.log(`====> spells autoincreasement reseted successful`);
  //   });
  // });
}

module.exports.addSpellToChar = (char, spell, callback) => {
  // let data = [];
  // if (spell.id === undefined) {
  //   data = [char.selectedChar, spell.spell_id, false];
  // } else {
  //   data = [char.selectedChar, spell.id, false];
  // }

  // let sql = `INSERT INTO 'main'.'tab_characters_spells' (char_id, spell_id, spell_prepared)
  //             VALUES  (?, ?, ?)`;
  // db.serialize(function () {
  //   db.run(sql, data, function (err) {
  //     if (err) {
  //       return console.error(err.message);
  //     }
  //     console.log(`====>Added ${spell.name} to character successfull`);
  //     ipcRenderer.send('displayMessage', { type: `Added spell to character`, message: `Added ${spell.name} to character successful` });
  //     callback();
  //   });
  // });
}
