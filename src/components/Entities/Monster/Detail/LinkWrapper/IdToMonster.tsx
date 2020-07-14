import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../Database/MyDatabase";
import { useItem } from "../../../../Hooks/DexieHooks";
import { LoadingSpinner } from "../../../Loading";
import AppWrapper from "../../../AppWrapper";
import MonsterDetail from "../MonsterDetail";

type TParams = { id: string };

const IdToMonster = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [monster, loading, error] = useItem(db.monsters, +match.params.id);

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && monster !== undefined ? (
        <MonsterDetail monster={monster} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default IdToMonster;
