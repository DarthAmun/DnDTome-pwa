import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import World from "../../../../../data/world/World";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { createNewWithId } from "../../../../../services/DatabaseService";
import AppWrapper from "../../../../AppWrapper";
import ErrorTile from "../../../../general_elements/ErrorTile";
import { LoadingSpinner } from "../../../../Loading";
import WorldDetail from "../WorldDetail";

type TParams = { name: string };

const NameToWorld = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [world, loading, error] = useItemByAttr(db.worlds, "name", match.params.name);

  const createNewWorld = () => {
    let newWorld = new World(0, match.params.name);
    delete newWorld.id;
    createNewWithId("worlds", newWorld, (id) => {
      history.push(`/world-detail/id/${id}`);
    });
  };

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && world === undefined && (
        <ErrorTile
          text={"No such world exists. Want to creat such world?"}
          buttonText={"Add"}
          onButton={() => createNewWorld()}
        />
      )}
      {!error && !loading && world !== undefined ? (
        <WorldDetail world={world} isNew={world.name === "" ? true : false} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default NameToWorld;
