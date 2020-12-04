import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import CharDetail from "../CharDetail";

type TParams = { name: string };

const NameToChar = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [char, loading, error] = useItemByAttr(
    db.chars,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && char !== undefined && (
        <CharDetail char={char} isNew={char.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToChar;
