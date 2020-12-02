import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import SubraceDetail from "../SubraceDetail";

type TParams = { name: string };

const NameToSubrace = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [subrace, loading, error] = useItemByAttr(
    db.subraces,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && subrace !== undefined && (
        <SubraceDetail subrace={subrace} isNew={subrace.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToSubrace;
