import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import Selection from "../../../../../data/Selection";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import SelectionDetail from "../SelectionDetail";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";

type TParams = { name: string };

const NameToSelection = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [selection, loading, error] = useItemByAttr(db.selections, "name", match.params.name);

  const createNewSelection = () => {
    let newSelection = new Selection(0, match.params.name);
    delete newSelection.id;
    createNewWithId("selections", newSelection, (id) => {
      history.push(`/selection-detail/id/${id}`);
    });
  };

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && selection === undefined && (
        <ErrorTile
          text={"No such selection exists. Want to creat such selection?"}
          buttonText={"Add"}
          onButton={() => createNewSelection()}
        />
      )}
      {!error && !loading && selection !== undefined && (
        <SelectionDetail selection={selection} isNew={selection.name === "" ? true : false} />
      )}
    </>
  );
};

export default NameToSelection;
