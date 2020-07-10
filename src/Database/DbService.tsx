import { MyAppDatabase } from "./MyDatabase";
import IEntity from "../Data/IEntity";
import Spell from "../Data/Spell";
import { IndexableType } from "dexie";

export const update = (tableName: string, data: IEntity) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName).update(data.id, data);
    })
    .finally(function () {
      db.close();
    });
};

export const save = (tableName: string, data: IEntity) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName).add(data);
    })
    .finally(function () {
      db.close();
    });
};

export const remove = (tableName: string, id: number | undefined) => {
  const db = new MyAppDatabase();
  if (id !== undefined) {
    db.open()
      .then(function () {
        db.table(tableName).delete(id);
      })
      .finally(function () {
        db.close();
      });
  }
};

export const reciveAttributeSelection = (tableName: string, attribute: string, callback: (data: IndexableType[]) => void) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName).orderBy(attribute).uniqueKeys(function (array) {
        callback(array);
      })
    })
    .finally(function () {
      db.close();
    });
}


//DEBUG ONLY
export const saveNewSpells = (spells: Spell[], filename: string) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      spells.map((spell) => {
        db.spells.put({
          name: spell.name !== undefined ? spell.name : "",
          classes: spell.classes !== undefined ? spell.classes : "",
          sources: spell.sources !== undefined ? spell.sources : "",
          level: spell.level !== undefined ? spell.level : 0,
          school: spell.school !== undefined ? spell.school : "",
          time: spell.time !== undefined ? spell.time : "",
          range: spell.range !== undefined ? spell.range : "",
          components: spell.components !== undefined ? spell.components : "",
          duration: spell.duration !== undefined ? spell.duration : "",
          ritual: spell.ritual !== undefined ? spell.ritual : 0,
          text: spell.text !== undefined ? spell.text : "",
          pic: spell.pic !== undefined ? spell.pic : "",
          filename: filename,
        });
        return true;
      });
    })
    .finally(function () {
      db.close();
    });
};
