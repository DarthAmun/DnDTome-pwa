import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import ClassDetail from "../ClassDetail";

type TParams = { name: string };

const NameToClass = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [classe, loading, error] = useItemByAttr(
    db.classes,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && classe !== undefined && (
        <ClassDetail classe={classe} isNew={classe.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToClass;
