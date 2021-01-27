import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import MonsterDetail from "../MonsterDetail";

type TParams = { id: string };

const IdToMonster = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [monster, loading, error] = useItem(db.monsters, +match.params.id);

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && monster !== undefined && (
        <MonsterDetail monster={monster} isNew={monster.name === "" ? true : false} />
      )}
    </>
  );
};

export default IdToMonster;
