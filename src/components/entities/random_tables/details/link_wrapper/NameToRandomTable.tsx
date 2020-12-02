import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import AppWrapper from "../../../../AppWrapper";
import { LoadingSpinner } from "../../../../Loading";
import RandomTableDetail from "../RandomTableDetail";

type TParams = { name: string };

const NameToRandomTable = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [randomTable, loading, error] = useItemByAttr(
    db.randomTables,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && randomTable !== undefined && (
        <RandomTableDetail randomTable={randomTable} isNew={randomTable.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToRandomTable;
