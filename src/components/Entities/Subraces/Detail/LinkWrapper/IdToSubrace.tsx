import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../Database/MyDatabase";
import { useItem } from "../../../../../Hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import SubraceDetail from "../SubraceDetail";

type TParams = { id: string };

const IdToSubrace = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [subrace, loading, error] = useItem(db.subraces, +match.params.id);
  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && subrace !== undefined ? (
        <SubraceDetail subrace={subrace} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default IdToSubrace;