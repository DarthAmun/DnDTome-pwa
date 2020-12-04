import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import RaceDetail from "../RaceDetail";

type TParams = { name: string };

const NameToRace = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [race, loading, error] = useItemByAttr(
    db.races,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && race !== undefined && (
        <RaceDetail race={race} isNew={race.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToRace;
