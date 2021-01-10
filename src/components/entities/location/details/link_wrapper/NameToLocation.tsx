import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import LocationDetail from "../LocationDetail";

type TParams = { name: string };

const NameToLocation = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [location, loading, error] = useItemByAttr(
    db.locations,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && location !== undefined && (
        <LocationDetail location={location} isNew={location.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToLocation;
