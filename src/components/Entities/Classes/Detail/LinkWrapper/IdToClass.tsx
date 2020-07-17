import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../Database/MyDatabase";
import { useItem } from "../../../../../Hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import ClassDetail from "../ClassDetail";

type TParams = { id: string };

const IdToClass = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [classe, loading, error] = useItem(db.classes, +match.params.id);
  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && classe !== undefined ? (
        <ClassDetail classe={classe} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default IdToClass;
