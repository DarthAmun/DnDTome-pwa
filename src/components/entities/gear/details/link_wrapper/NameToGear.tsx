import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import GearDetail from "../GearDetail";
import Gear from "../../../../../data/Gear";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";

type TParams = { name: string };

const NameToGear = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [gear, loading, error] = useItemByAttr(db.gears, "name", match.params.name);

  const createNewGear = () => {
    let newGear = new Gear(0, match.params.name);
    delete newGear.id;
    createNewWithId("gears", newGear, (id) => {
      history.push(`/gear-detail/id/${id}`);
    });
  };

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && gear === undefined && (
        <ErrorTile
          text={"No such gear exists. Want to creat such gear?"}
          buttonText={"Add"}
          onButton={() => createNewGear()}
        />
      )}
      {!error && !loading && gear !== undefined && (
        <GearDetail gear={gear} isNew={gear.name === "" ? true : false} />
      )}
    </>
  );
};

export default NameToGear;
