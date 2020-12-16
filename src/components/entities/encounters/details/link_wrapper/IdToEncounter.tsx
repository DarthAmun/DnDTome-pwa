import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";

import AppWrapper from "../../../../AppWrapper";
import { LoadingSpinner } from "../../../../Loading";
import EncounterDetail from "../EncounterDetail";

type TParams = { id: string };

const IdToEncounter = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [encounter, loading, error] = useItem(db.encounters, +match.params.id);

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && encounter !== undefined ? (
        <EncounterDetail encounter={encounter} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default IdToEncounter;