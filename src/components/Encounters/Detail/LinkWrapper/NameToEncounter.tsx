import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../Database/MyDatabase";
import { useItemByAttr } from "../../../../Hooks/DexieHooks";
import AppWrapper from "../../../AppWrapper";
import { LoadingSpinner } from "../../../Loading";
import EncounterDetail from "../EncounterDetail";

type TParams = { name: string };

const NameToEncounter = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [encounter, loading, error] = useItemByAttr(
    db.encounters,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && encounter !== undefined ? (
        <EncounterDetail encounter={encounter} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default NameToEncounter;
