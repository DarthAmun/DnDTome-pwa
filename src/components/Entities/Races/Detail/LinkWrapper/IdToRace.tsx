import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../Database/MyDatabase";
import { useItem } from "../../../../../Hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import RaceDetail from "../RaceDetail";

type TParams = { id: string };

const IdToRace = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [race, loading, error] = useItem(db.races, +match.params.id);
  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && race !== undefined && (
        <RaceDetail race={race} isNew={race.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default IdToRace;
