import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import GearDetail from "../GearDetail";

type TParams = { name: string };

const NameToGear = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [gear, loading, error] = useItemByAttr(
    db.gears,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && gear !== undefined && (
        <GearDetail gear={gear} isNew={gear.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToGear;
