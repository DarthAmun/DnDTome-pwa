import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../Database/MyDatabase";
import { useItem } from "../../../../../Hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import SelectionDetail from "../SelectionDetail";

type TParams = { id: string };

const IdToSelection = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [selection, loading, error] = useItem(db.selections, +match.params.id);

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && selection !== undefined && (
        <SelectionDetail selection={selection} isNew={selection.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default IdToSelection;
