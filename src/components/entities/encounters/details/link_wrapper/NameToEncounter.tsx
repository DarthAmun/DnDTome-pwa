import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import Encounter from "../../../../../data/encounter/Encounter";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";
import { LoadingSpinner } from "../../../../Loading";
import EncounterDetail from "../EncounterDetail";

type TParams = { name: string };

const NameToEncounter = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [encounter, loading, error] = useItemByAttr(db.encounters, "name", match.params.name);

  const createNewEncounter = () => {
    let newEncounter = new Encounter(0, match.params.name);
    delete newEncounter.id;
    createNewWithId("encounters", newEncounter, (id) => {
      history.push(`/encounter-detail/id/${id}`);
    });
  };

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && encounter === undefined && (
        <ErrorTile
          text={"No such encounter exists. Want to creat such encounter?"}
          buttonText={"Add"}
          onButton={() => createNewEncounter()}
        />
      )}
      {!error && !loading && encounter !== undefined ? (
        <EncounterDetail encounter={encounter} isNew={encounter.name === "" ? true : false} />
      ) : (
        ""
      )}
    </>
  );
};

export default NameToEncounter;
