import { MyAppDatabase } from "./MyDatabase";
import { useState, useCallback, useEffect, useRef } from "react";
import IEntity from "../Data/IEntity";

export interface $Result<IEntity> {
  loading: boolean;
  data: IEntity[];
  loadData: (tableName: string) => void;
  setData: (data: IEntity[]) => any;
}

export const useReciveAll = (tableName: string): $Result<IEntity> => {
  const db = new MyAppDatabase();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IEntity[]>([]);
  const [effect, setEffect] = useState(true);
  const cancelPromise = useRef(false);

  useEffect(() => {
    cancelPromise.current = false;
    return () => {
      cancelPromise.current = true;
    };
  });

  const loadData = useCallback(
    async (tableName: string) => {
      setLoading(true);
      db.open()
        .then(function () {
          db.table(tableName)
            .toCollection()
            .sortBy("name", function (array) {
              if (!cancelPromise.current) {
                setData(array);
              }
            });
        })
        .finally(function () {
          if (!cancelPromise.current) {
            db.close();
            setLoading(false);
          }
        });
    },
    [setLoading, setData, db, cancelPromise]
  );

  useEffect(() => {
    if (effect) {
      loadData(tableName);
    }
    setEffect(false);
  }, [loadData, setData, setEffect, tableName, effect, cancelPromise]);

  return {
    loading,
    data,
    loadData,
    setData,
  };
};
