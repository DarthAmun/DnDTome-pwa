import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import RandomTable from "../../../../../data/RandomTable";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { createNewWithId } from "../../../../../services/DatabaseService";
import AppWrapper from "../../../../AppWrapper";
import ErrorTile from "../../../../general_elements/ErrorTile";
import { LoadingSpinner } from "../../../../Loading";
import RandomTableDetail from "../RandomTableDetail";

type TParams = { name: string };

const NameToRandomTable = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [randomTable, loading, error] = useItemByAttr(db.randomTables, "name", match.params.name);

  const createNewRandomTable = () => {
    let newRandomTable = new RandomTable(0, match.params.name);
    delete newRandomTable.id;
    createNewWithId("randomTables", newRandomTable, (id) => {
      history.push(`/randomTable-detail/id/${id}`);
    });
  };

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && randomTable === undefined && (
        <ErrorTile
          text={"No such randomTable exists. Want to creat such randomTable?"}
          buttonText={"Add"}
          onButton={() => createNewRandomTable()}
        />
      )}
      {!error && !loading && randomTable !== undefined && (
        <RandomTableDetail
          randomTable={randomTable}
          isNew={randomTable.name === "" ? true : false}
        />
      )}
    </AppWrapper>
  );
};

export default NameToRandomTable;
