import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import ItemDetail from "../ItemDetail";
import Item from "../../../../../data/Item";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";

type TParams = { name: string };

const NameToItem = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [item, loading, error] = useItemByAttr(db.items, "name", match.params.name);

  const createNewItem = () => {
    let newItem = new Item(0, match.params.name);
    delete newItem.id;
    createNewWithId("items", newItem, (id) => {
      history.push(`/item-detail/id/${id}`);
    });
  };

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && item === undefined && (
        <ErrorTile
          text={"No such item exists. Want to creat such item?"}
          buttonText={"Add"}
          onButton={() => createNewItem()}
        />
      )}
      {!error && !loading && item !== undefined && (
        <ItemDetail item={item} isNew={item.name === "" ? true : false} />
      )}
    </>
  );
};

export default NameToItem;
