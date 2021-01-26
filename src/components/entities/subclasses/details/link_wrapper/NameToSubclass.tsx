import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import SubclassDetail from "../SubclassDetail";

type TParams = { name: string };

const NameToSubclass = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [subclass, loading, error] = useItemByAttr(
    db.subclasses,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && subclass !== undefined && (
        <SubclassDetail subclass={subclass} isNew={subclass.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToSubclass;
