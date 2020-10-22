import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../Database/MyDatabase";
import { useItem } from "../../../../../Hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import GearDetail from "../GearDetail";

type TParams = { id: string };

const IdToGear = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [gear, loading, error] = useItem(db.gears, +match.params.id);

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && gear !== undefined && (
        <GearDetail gear={gear} isNew={gear.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default IdToGear;
