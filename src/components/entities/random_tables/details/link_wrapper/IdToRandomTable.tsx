import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import RandomTableDetail from "../RandomTableDetail";

type TParams = { id: string };

const IdToRandomTable = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [randomTable, loading, error] = useItem(db.randomTables, +match.params.id);
  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && randomTable !== undefined && (
        <RandomTableDetail randomTable={randomTable} isNew={randomTable.name === "" ? true : false} />
      )}
    </>
  );
};

export default IdToRandomTable;
