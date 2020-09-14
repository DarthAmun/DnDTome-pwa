import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../Database/MyDatabase";
import { useItemByAttr } from "../../../../../Hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import ItemDetail from "../ItemDetail";

type TParams = { name: string };

const NameToItem = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [item, loading, error] = useItemByAttr(
    db.items,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && item !== undefined ? (
        <ItemDetail item={item} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default NameToItem;
