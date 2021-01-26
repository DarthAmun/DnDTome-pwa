import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";

import AppWrapper from "../../../../AppWrapper";
import { LoadingSpinner } from "../../../../Loading";
import WorldDetail from "../WorldDetail";

type TParams = { id: string };

const IdToWorld = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [world, loading, error] = useItem(db.worlds, +match.params.id);

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && world === undefined && <>Fail by Id</>}
      {!error && !loading && world !== undefined ? (
        <WorldDetail world={world} isNew={world.name === "" ? true : false} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default IdToWorld;
