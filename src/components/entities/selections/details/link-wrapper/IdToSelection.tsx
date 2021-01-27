import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import SelectionDetail from "../SelectionDetail";


type TParams = { id: string };

const IdToSelection = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [selection, loading, error] = useItem(db.selections, +match.params.id);

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && selection !== undefined && (
        <SelectionDetail selection={selection} isNew={selection.name === "" ? true : false} />
      )}
    </>
  );
};

export default IdToSelection;
