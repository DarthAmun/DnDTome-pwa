import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../Database/MyDatabase";
import { useItemByAttr } from "../../Hooks/DexieHooks";
import { LoadingSpinner } from "../Loading";
import AppWrapper from "../AppWrapper";
import SpellDetail from "./SpellDetail";

type TParams = { name: string };

const NameToSpell = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [spell, loading, error] = useItemByAttr(
    db.spells,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && spell !== undefined ? (
        <SpellDetail spell={spell} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default NameToSpell;
