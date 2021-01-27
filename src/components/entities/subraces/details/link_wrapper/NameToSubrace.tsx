import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
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
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && subrace !== undefined && (
        <SubraceDetail subrace={subrace} isNew={subrace.name === "" ? true : false} />
      )}
    </>
  );
};

export default NameToSubrace;
