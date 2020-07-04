import Dexie from "dexie";
import { useReducer, useEffect, useCallback, useState } from "react";

type TableState<T> = [T[] | undefined, boolean, Dexie.DexieError | undefined];
type TableAction<T> =
  | { type: "resolved"; data: T[] }
  | { type: "reset" }
  | { type: "error"; error: Dexie.DexieError };

type ItemState<T> = [T | undefined, boolean, Dexie.DexieError | undefined];
type ItemAction<T> =
  | { type: "resolved"; data: T }
  | { type: "reset" }
  | { type: "error"; error: Dexie.DexieError };

export const useTable = <T, U>(table: Dexie.Table<T, U>): TableState<T> => {
  const [effect, setEffect] = useState<boolean>(true);
  const reducer = useCallback(
    (state: TableState<T>, action: TableAction<T>): TableState<T> => {
      switch (action.type) {
        case "resolved":
          return [action.data, false, undefined];
        case "error":
          return [undefined, false, action.error];
        default:
          return [undefined, true, undefined];
      }
    },
    []
  );

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

export const useItem = <T, U>(table: Dexie.Table<T, U>, id: U) => {
  const [effect, setEffect] = useState<boolean>(true);
  const reducer = useCallback(
    (state: ItemState<T>, action: ItemAction<T>): ItemState<T> => {
      switch (action.type) {
        case "resolved":
          return [action.data, false, undefined];
        case "error":
          return [undefined, false, action.error];
        default:
          return [undefined, true, undefined];
      }
    },
    []
  );

  const [state, dispatch] = useReducer(reducer, [undefined, true, undefined]);

  useEffect(() => {
    if (effect) {
      const getAndDispatch = () =>
        table
          .get(id)
          .then((data) => {
            if (data !== undefined)
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
  }, [table, id, effect]);

  return state;
};
