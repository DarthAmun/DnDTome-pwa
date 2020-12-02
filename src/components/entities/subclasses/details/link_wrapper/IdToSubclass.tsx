import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import SubclassDetail from "../SubclassDetail";

type TParams = { id: string };

const IdToSubclass = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [subclass, loading, error] = useItem(db.subclasses, +match.params.id);
  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && subclass !== undefined && (
        <SubclassDetail subclass={subclass} isNew={subclass.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default IdToSubclass;
