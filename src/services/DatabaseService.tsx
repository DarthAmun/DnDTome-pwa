import { MyAppDatabase } from "../database/MyDatabase";
import { IndexableType } from "dexie";
import IEntity from "../data/IEntity";
import Filter from "../data/Filter";

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

export const updateWithCallback = (
  tableName: string,
  data: IEntity,
  callback: (data: number) => void
) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName)
        .update(data.id, data)
        .then((result: number) => {
          callback(result);
        });
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

export const saveNew = (tableName: string, entity: IEntity, filename: string) => {
  const db = new MyAppDatabase();
  return db
    .open()
    .then(async function () {
      delete entity["id"];
      const prom = await db.table(tableName).put({ ...entity, filename: filename });
      return prom;
    })
    .finally(function () {
      db.close();
    });
};

export const saveNewFromList = (tableName: string, entities: IEntity[]) => {
  const db = new MyAppDatabase();
  db.open()
    .then(async function () {
      const refinedEntities = (entities as IEntity[]).map((entity: IEntity) => {
        delete entity["id"];
        return { ...entity, filename: entity.sources };
      });
      const prom = await db.table(tableName).bulkPut(refinedEntities);
      return prom;
    })
    .finally(function () {
      db.close();
    });
};

export const resaveFromList = (tableName: string, entities: IEntity[]) => {
  const db = new MyAppDatabase();
  db.open()
    .then(async function () {
      const refinedEntities = (entities as IEntity[]).map((entity: IEntity) => {
        delete entity["id"];
        return entity;
      });
      const prom = await db.table(tableName).bulkPut(refinedEntities);
      return prom;
    })
    .finally(function () {
      db.close();
    });
};

export const saveWithCallback = (
  tableName: string,
  data: IEntity,
  callback: (data: number) => void
) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName)
        .add(data)
        .then((result) => {
          callback(result as number);
        });
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

export const reciveAll = (tableName: string, callback: (data: IndexableType[]) => void) => {
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

export const reciveCount = (tableName: string, callback: (value: number) => void) => {
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

export const reciveCountPromise = (tableName: string) => {
  const db = new MyAppDatabase();
  return db
    .open()
    .then(function () {
      return db.table(tableName).count();
    })
    .finally(function () {
      db.close();
    });
};

export const reciveByAttribute = (
  tableName: string,
  name: string,
  value: string,
  callback: (data: IEntity) => void
) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName)
        .where(name)
        .equalsIgnoreCase(value)
        .toArray()
        .then((array) => {
          callback(array[0]);
        });
    })
    .finally(function () {
      db.close();
    });
};

export const recivePromiseByAttribute = (tableName: string, name: string, value: string) => {
  const db = new MyAppDatabase();
  return db
    .open()
    .then(async function () {
      const array = await db.table(tableName).where(name).equalsIgnoreCase(value).toArray();
      return array[0];
    })
    .finally(function () {
      db.close();
    });
};

export const recivePromiseByMultiAttribute = (tableName: string, obj: IEntity) => {
  const db = new MyAppDatabase();
  if (obj.sources !== undefined) {
    return db
      .open()
      .then(async function () {
        return await db.table(tableName).where(obj).first();
      })
      .finally(function () {
        db.close();
      });
  } else {
    delete obj.sources;
    return db
      .open()
      .then(async function () {
        return await db.table(tableName).where(obj).first();
      })
      .finally(function () {
        db.close();
      });
  }
};

export const reciveAllPromiseByAttribute = (tableName: string, name: string, value: string) => {
  const db = new MyAppDatabase();
  return db
    .open()
    .then(async function () {
      const array = await db.table(tableName).where(name).equalsIgnoreCase(value).toArray();
      return array;
    })
    .finally(function () {
      db.close();
    });
};

export const recivePromise = (tableName: string, value: number) => {
  const db = new MyAppDatabase();
  return db
    .open()
    .then(async function () {
      return await db.table(tableName).get(value);
    })
    .finally(function () {
      db.close();
    });
};

export const recivePromiseByAttributeCount = (
  tableName: string,
  name: string,
  value: string | number
) => {
  const db = new MyAppDatabase();
  if (typeof value === "string") {
    return db
      .open()
      .then(async function () {
        return await db.table(tableName).where(name).equalsIgnoreCase(value).count();
      })
      .finally(function () {
        db.close();
      });
  } else if (typeof value === "number") {
    return db
      .open()
      .then(async function () {
        return await db.table(tableName).where(name).equals(value).count();
      })
      .finally(function () {
        db.close();
      });
  } else {
    return db
      .open()
      .then(async function () {
        return await db
          .table(tableName)
          .where(name)
          .equalsIgnoreCase("" + value)
          .count();
      })
      .finally(function () {
        db.close();
      });
  }
};

export const reciveAllPromise = (tableName: string) => {
  const db = new MyAppDatabase();
  return db
    .open()
    .then(async function () {
      return await db.table(tableName).toArray();
    })
    .finally(function () {
      db.close();
    });
};

export const applyFilters = (obj: any, filters: Filter[]) => {
  let test: boolean[] = [];
  filters.forEach((filter) => {
    if (typeof filter.value === "string") {
      if (obj[filter.fieldName] instanceof Array) {
        let hasTag = false;
        obj[filter.fieldName].forEach((fieldPart: string) => {
          // @ts-ignore
          if (fieldPart.toLowerCase().includes(filter.value.toLowerCase())) {
            hasTag = true;
          }
        });
        if (hasTag) {
          test.push(true);
        } else {
          test.push(false);
        }
      } else {
        test.push(
          // @ts-ignore
          obj[filter.fieldName].toLowerCase().includes(filter.value.toLowerCase())
        );
      }
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
            obj[filter.fieldName].toLowerCase().includes(filterPart.toLowerCase())
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
};

export const reciveAllFiltered = (
  tableName: string,
  filters: Filter[],
  callback: (data: IndexableType[]) => void
) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      let sortedFiled: string = "name";
      let reverse: boolean = false;

      filters.forEach((filter: Filter) => {
        if (filter.sort !== 0) {
          sortedFiled = filter.fieldName;
          if (filter.sort === 2) reverse = true;
        }
      });

      if (reverse) {
        db.table(tableName)
          .filter((obj) => applyFilters(obj, filters))
          .reverse()
          .sortBy(sortedFiled)
          .then((data) => {
            callback(data);
          });
      } else {
        db.table(tableName)
          .filter((obj) => applyFilters(obj, filters))
          .sortBy(sortedFiled)
          .then((data) => {
            callback(data);
          });
      }
    })
    .finally(function () {
      db.close();
    });
};

export const reciveAllFilteredPromise = (tableName: string, filters: Filter[]) => {
  const db = new MyAppDatabase();
  return db
    .open()
    .then(function () {
      let sortedFiled: string = "name";
      let reverse: boolean = false;

      filters.forEach((filter: Filter) => {
        if (filter.sort !== 0) {
          sortedFiled = filter.fieldName;
          if (filter.sort === 2) reverse = true;
        }
      });

      if (reverse) {
        return db
          .table(tableName)
          .filter((obj) => applyFilters(obj, filters))
          .reverse()
          .sortBy(sortedFiled);
      } else {
        return db
          .table(tableName)
          .filter((obj) => applyFilters(obj, filters))
          .sortBy(sortedFiled);
      }
    })
    .catch((reason) => {
      console.log(reason);
      return undefined;
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

export const reciveAttributeSelectionPromise = (tableName: string, attribute: string) => {
  const db = new MyAppDatabase();
  return db
    .open()
    .then(function () {
      return db.table(tableName).orderBy(attribute).uniqueKeys();
    })
    .finally(function () {
      db.close();
    });
};

export const createNewWithId = (
  tableName: string,
  entity: IEntity,
  callback: (id: number) => void
) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName)
        .put(entity)
        .then((id) => {
          callback(id as number);
        });
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

export const deleteAllByAttrs = (tableName: string, attr: string, attrs: string[]) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      db.table(tableName).where(attr).anyOf(attrs).delete();
    })
    .finally(function () {
      db.close();
    });
};

export const exportFilteredFromTable = (tableName: string, filters: Filter[], filename: string) => {
  reciveAllFiltered(tableName, filters, (all: IndexableType[]) => {
    const data = { [tableName]: all };
    let contentType = "application/json;charset=utf-8;";
    var a = document.createElement("a");
    a.download = filename;
    a.href = "data:" + contentType + "," + encodeURIComponent(JSON.stringify(data));
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
};

export const deleteDatabase = () => {
  const db = new MyAppDatabase();
  db.delete();
};
