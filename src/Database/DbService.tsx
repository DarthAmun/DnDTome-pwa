import { MyAppDatabase } from "./MyDatabase";
import { IndexableType } from "dexie";
import IEntity from "../Data/IEntity";
import Spell from "../Data/Spell";
import Gear from "../Data/Gear";
import Monster from "../Data/Monster";

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

export const reciveAll = (
  tableName: string,
  callback: (data: IndexableType[]) => void
) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName)
        .toArray()
        .then((array) => {
          callback(array);
        });
    })
    .finally(function () {
      db.close();
    });
};

export const reciveAttributeSelection = (
  tableName: string,
  attribute: string,
  callback: (data: IndexableType[]) => void
) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName)
        .orderBy(attribute)
        .uniqueKeys(function (array) {
          callback(array);
        });
    })
    .finally(function () {
      db.close();
    });
};

export const saveNewFromList = (
  tableName: string,
  entities: Spell[] | Gear[] | Monster[],
  filename: string
) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      const refinedEntities = (entities as (Spell|Gear|Monster)[]).map((entity: Spell | Gear | Monster) => {
        return { ...entity, filename: filename };
      });
      db.table(tableName).bulkPut(refinedEntities);
    })
    .finally(function () {
      db.close();
    });
};

export const deleteAll = (tableName: string) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName).clear();
    })
    .finally(function () {
      db.close();
    });
};

export const reciveCount = (
  tableName: string,
  callback: (value: number) => void
) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName).count((count) => {
        callback(count);
      });
    })
    .finally(function () {
      db.close();
    });
};
