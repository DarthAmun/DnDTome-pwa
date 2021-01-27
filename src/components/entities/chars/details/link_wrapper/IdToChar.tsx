import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import CharDetail from "../CharDetail";

type TParams = { id: string };

const IdToChar = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [char, loading, error] = useItem(db.chars, +match.params.id);
  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && char !== undefined && (
        <CharDetail char={char} isNew={char.name === "" ? true : false} />
      )}
    </>
  );
};

export default IdToChar;
