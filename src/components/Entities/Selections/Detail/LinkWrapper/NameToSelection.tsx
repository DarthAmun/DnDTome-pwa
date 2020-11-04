import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../Database/MyDatabase";
import { useItemByAttr } from "../../../../../Hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import SelectionDetail from "../SelectionDetail";

type TParams = { name: string };

const NameToSelection = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [selection, loading, error] = useItemByAttr(
    db.selections,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && selection !== undefined && (
        <SelectionDetail selection={selection} isNew={selection.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToSelection;
