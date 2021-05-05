import Dexie, { DexieError } from "dexie";
import { useReducer, useEffect, useCallback, useState } from "react";
import Filter from "../data/Filter";
import ReactDOM from "react-dom";

type TableState<T> = [T[] | undefined, boolean, DexieError | undefined];
type TableAction<T> =
  | { type: "resolved"; data: T[] }
  | { type: "empty" }
  | { type: "reset" }
  | { type: "error"; error: DexieError };

type ItemState<T> = [T | undefined, boolean, DexieError | undefined];
type ItemAction<T> =
  | { type: "resolved"; data: T }
  | { type: "empty" }
  | { type: "reset" }
  | { type: "error"; error: DexieError };

export const useTable = <T, U>(table: Dexie.Table<T, U>): TableState<T> => {
  const [effect, setEffect] = useState<boolean>(true);
  const reducer = useCallback((state: TableState<T>, action: TableAction<T>): TableState<T> => {
    switch (action.type) {
      case "resolved":
        return [action.data, false, undefined];
      case "error":
        return [undefined, false, action.error];
      default:
        return [undefined, true, undefined];
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, [undefined, true, undefined]);

  useEffect(() => {
    if (effect) {
      const getAndDispatch = () =>
        table
          .toArray()
          .then((data) => {
            dispatch({
              type: "resolved",
              data,
            });
          })
          .catch((error) => {
            dispatch({
              type: "error",
              error,
            });
          });

      getAndDispatch();
      setEffect(false);
    }
  }, [table, effect]);

  return state;
};

export const useTableByFilter = <T, U>(
  table: Dexie.Table<T, U>,
  filters: Filter[]
): TableState<T> => {
  const [effect, setEffect] = useState<boolean>(true);
  const [filter, setFilter] = useState<Filter[]>(filters);
  const reducer = useCallback((state: TableState<T>, action: TableAction<T>): TableState<T> => {
    switch (action.type) {
      case "resolved":
        return [action.data, false, undefined];
      case "error":
        return [undefined, false, action.error];
      case "reset":
        return [undefined, true, undefined];
      default:
        return [undefined, true, undefined];
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, [undefined, true, undefined]);

  useEffect(() => {
    if (filter !== filters) {
      ReactDOM.unstable_batchedUpdates(() => {
        dispatch({ type: "reset" });
        setFilter(filters);
        setEffect(true);
      });
    }
  }, [filter, filters, setEffect]);

  useEffect(() => {
    if (effect) {
      const getAndDispatch = () => console.time("filtered get all");
      table
        .filter((obj: T) => {
          let test: boolean[] = [];
          filters.forEach((filter) => {
            if (typeof filter.value === "string") {
              test.push(
                // @ts-ignore
                obj[filter.fieldName].toLowerCase().includes(filter.value.toLowerCase())
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
        })
        .sortBy("name")
        .then((data) => {
          console.timeEnd("filtered get all");
          dispatch({
            type: "resolved",
            data,
          });
        })
        .catch((error) => {
          dispatch({
            type: "error",
            error,
          });
        });

      getAndDispatch();
      setEffect(false);
    }
  }, [table, effect, filters]);

  return state;
};

export const useItem = <T, U>(table: Dexie.Table<T, U>, id: U) => {
  const [effect, setEffect] = useState<boolean>(true);
  const reducer = useCallback((state: ItemState<T>, action: ItemAction<T>): ItemState<T> => {
    switch (action.type) {
      case "resolved":
        return [action.data, false, undefined];
      case "empty":
        return [undefined, false, undefined];
      case "error":
        return [undefined, false, action.error];
      default:
        return [undefined, true, undefined];
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, [undefined, true, undefined]);

  useEffect(() => {
    if (effect && table !== undefined) {
      const getAndDispatch = () =>
        table
          .get(id)
          .then((data) => {
            if (data !== undefined) {
              dispatch({
                type: "resolved",
                data,
              });
            } else {
              dispatch({
                type: "empty",
              });
            }
          })
          .catch((error) => {
            dispatch({
              type: "error",
              error,
            });
          });

      getAndDispatch();
      setEffect(false);
    }
  }, [table, id, effect]);

  return state;
};

export const useItemByAttr = <T, U>(table: Dexie.Table<T, U>, attr: string, attrValue: string) => {
  const [effect, setEffect] = useState<boolean>(true);
  const reducer = useCallback((state: ItemState<T>, action: ItemAction<T>): ItemState<T> => {
    switch (action.type) {
      case "resolved":
        return [action.data, false, undefined];
      case "empty":
        return [undefined, false, undefined];
      case "error":
        return [undefined, false, action.error];
      default:
        return [undefined, true, undefined];
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, [undefined, true, undefined]);

  useEffect(() => {
    if (effect && table !== undefined) {
      const getAndDispatch = () =>
        table
          .where(attr)
          .equalsIgnoreCase(attrValue)
          .first()
          .then((data) => {
            if (data !== undefined) {
              dispatch({
                type: "resolved",
                data,
              });
            } else {
              dispatch({
                type: "empty",
              });
            }
          })
          .catch((error) => {
            dispatch({
              type: "error",
              error,
            });
          });

      getAndDispatch();
      setEffect(false);
    }
  }, [table, attr, attrValue, effect]);

  return state;
};

export const useItemByMultiAttr = <T, U>(table: Dexie.Table<T, U>, obj: Object) => {
  const [effect, setEffect] = useState<boolean>(true);
  const reducer = useCallback((state: ItemState<T>, action: ItemAction<T>): ItemState<T> => {
    switch (action.type) {
      case "resolved":
        return [action.data, false, undefined];
      case "empty":
        return [undefined, false, undefined];
      case "error":
        return [undefined, false, action.error];
      default:
        return [undefined, true, undefined];
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, [undefined, true, undefined]);

  useEffect(() => {
    if (effect && table !== undefined) {
      const getAndDispatch = () =>
        table
          .where(obj)
          .first()
          .then((data) => {
            if (data !== undefined) {
              dispatch({
                type: "resolved",
                data,
              });
            } else {
              dispatch({
                type: "empty",
              });
            }
          })
          .catch((error) => {
            dispatch({
              type: "error",
              error,
            });
          });

      getAndDispatch();
      setEffect(false);
    }
  }, [table, obj, effect]);

  return state;
};
