import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import SpellDetail from "../SpellDetail";

type TParams = { id: string };

const IdToSpell = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [spell, loading, error] = useItem(db.spells, +match.params.id);

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && spell !== undefined && (
        <SpellDetail spell={spell} isNew={spell.name === "" ? true : false} />
      )}
    </>
  );
};

export default IdToSpell;