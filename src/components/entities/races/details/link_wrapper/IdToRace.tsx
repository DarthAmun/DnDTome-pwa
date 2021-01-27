import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import RaceDetail from "../RaceDetail";

type TParams = { id: string };

const IdToRace = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [race, loading, error] = useItem(db.races, +match.params.id);
  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && race !== undefined && (
        <RaceDetail race={race} isNew={race.name === "" ? true : false} />
      )}
    </>
  );
};

export default IdToRace;
