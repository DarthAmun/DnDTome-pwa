import { MyAppDatabase } from "./MyDatabase";
import { useState, useCallback, useEffect, useRef } from "react";
import IEntity from "../Data/IEntity";
import Spell from "../Data/Spell";

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

export const saveNewSpells = (spells: Spell[], filename: string) => {
  const db = new MyAppDatabase();
  db.open()
    .then(function () {
      spells.map((spell) => {
        db.spells
          .put({
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
