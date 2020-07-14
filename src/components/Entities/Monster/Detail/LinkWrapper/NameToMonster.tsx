import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../Database/MyDatabase";
import { useItemByAttr } from "../../../../Hooks/DexieHooks";
import { LoadingSpinner } from "../../../Loading";
import AppWrapper from "../../../AppWrapper";
import MonsterDetail from "../MonsterDetail";

type TParams = { name: string };

const NameToMonster = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [monster, loading, error] = useItemByAttr(
    db.monsters,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && monster !== undefined ? (
        <MonsterDetail monster={monster} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default NameToMonster;
