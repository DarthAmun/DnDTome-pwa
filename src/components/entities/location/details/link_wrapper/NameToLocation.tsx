import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import Location from "../../../../../data/world/Location";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import LocationDetail from "../LocationDetail";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";

type TParams = { name: string };

const NameToLocation = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [location, loading, error] = useItemByAttr(db.locations, "name", match.params.name);

  const createNewLocation = () => {
    let newLocation = new Location(0, match.params.name);
    delete newLocation.id;
    createNewWithId("locations", newLocation, (id) => {
      history.push(`/location-detail/id/${id}`);
    });
  };

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && location === undefined && (
        <ErrorTile
          text={"No such location exists. Want to creat such location?"}
          buttonText={"Add"}
          onButton={() => createNewLocation()}
        />
      )}
      {!error && !loading && location !== undefined && (
        <LocationDetail location={location} isNew={location.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToLocation;
