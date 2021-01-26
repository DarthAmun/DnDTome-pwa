import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import RaceDetail from "../RaceDetail";
import Race from "../../../../../data/races/Race";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";

type TParams = { name: string };

const NameToRace = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [race, loading, error] = useItemByAttr(db.races, "name", match.params.name);

  const createNewRace = () => {
    let newRace = new Race(match.params.name);
    delete newRace.id;
    createNewWithId("races", newRace, (id) => {
      history.push(`/race-detail/id/${id}`);
    });
  };

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && race === undefined && (
        <ErrorTile
          text={"No such race exists. Want to creat such race?"}
          buttonText={"Add"}
          onButton={() => createNewRace()}
        />
      )}
      {!error && !loading && race !== undefined && (
        <RaceDetail race={race} isNew={race.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToRace;
