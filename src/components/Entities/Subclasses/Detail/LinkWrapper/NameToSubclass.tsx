import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../Database/MyDatabase";
import { useItemByAttr } from "../../../../../Hooks/DexieHooks";
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
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && subclass !== undefined ? (
        <SubclassDetail subclass={subclass} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default NameToSubclass;
