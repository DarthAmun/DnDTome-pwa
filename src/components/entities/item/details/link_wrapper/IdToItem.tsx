import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import ItemDetail from "../ItemDetail";

type TParams = { id: string };

const IdToItem = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [item, loading, error] = useItem(db.items, +match.params.id);

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && item !== undefined && (
        <ItemDetail item={item} isNew={item.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default IdToItem;
