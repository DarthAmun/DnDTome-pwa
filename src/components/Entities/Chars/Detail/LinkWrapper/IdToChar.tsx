import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../Database/MyDatabase";
import { useItem } from "../../../../../Hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import CharDetail from "../CharDetail";

type TParams = { id: string };

const IdToChar = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [char, loading, error] = useItem(db.chars, +match.params.id);
  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && char !== undefined ? (
        <CharDetail char={char} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default IdToChar;
