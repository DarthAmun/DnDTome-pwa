import { MyAppDatabase } from "./MyDatabase";
import { IndexableType } from "dexie";
import IEntity from "../Data/IEntity";
import Spell from "../Data/Spell";
import Gear from "../Data/Gear";
import Monster from "../Data/Monster";
import Race from "../Data/Race";
import Subrace from "../Data/Subrace";
import Filter from "../Data/Filter";

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

export const reciveAllFiltered = (
  tableName: string,
  filters: Filter[],
  callback: (data: IndexableType[]) => void
) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName)
        .filter((obj) => {
          let test: boolean[] = [];
          filters.forEach((filter) => {
            if (typeof filter.value === "string") {
              test.push(
                // @ts-ignore
                obj[filter.fieldName]
                  .toLowerCase()
                  .includes(filter.value.toLowerCase())
              );
            } else if (typeof filter.value === "number") {
              // @ts-ignore
              test.push(obj[filter.fieldName] === filter.value);
            } else if (typeof filter.value === "boolean") {
              // @ts-ignore
              test.push(obj[filter.fieldName] === filter.value);
            } else if (filter.value instanceof Array) {
              let arrayTest: boolean = false;
              filter.value.forEach((filterPart: string | boolean | number) => {
                if (typeof filterPart === "string") {
                  if (
                    // @ts-ignore
                    obj[filter.fieldName]
                      .toLowerCase()
                      .includes(filterPart.toLowerCase())
                  )
                    arrayTest = true;
                } else if (typeof filterPart === "number") {
                  // @ts-ignore
                  if (obj[filter.fieldName] === filterPart) arrayTest = true;
                } else if (typeof filterPart === "boolean") {
                  // @ts-ignore
                  if (obj[filter.fieldName] === filterPart) arrayTest = true;
                }
              });
              test.push(arrayTest);
            }
          });

          let result = true;
          test.forEach((val) => {
            if (!val) result = false;
          });
          return result;
        })
        .toArray()
        .then((data) => {
          callback(data);
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
  entities: Spell[] | Gear[] | Monster[] | Race[] | Subrace[],
  filename: string
) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      const refinedEntities = (entities as (
        | Spell
        | Gear
        | Monster
        | Race
        | Subrace
      )[]).map((entity: Spell | Gear | Monster | Race | Subrace) => {
        delete entity['id'];
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
