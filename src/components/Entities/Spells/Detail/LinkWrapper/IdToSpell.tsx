import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../Database/MyDatabase";
import { useItem } from "../../../../Hooks/DexieHooks";
import { LoadingSpinner } from "../../../Loading";
import AppWrapper from "../../../AppWrapper";
import SpellDetail from "../SpellDetail";

type TParams = { id: string };

const IdToSpell = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [spell, loading, error] = useItem(db.spells, +match.params.id);

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && spell !== undefined ? (
        <SpellDetail spell={spell} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default IdToSpell;
