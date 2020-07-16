import React, { useState } from "react";
import styled from "styled-components";
import { MyAppDatabase } from "../../../Database/MyDatabase";
import { useTableByFilter } from "../../../Hooks/DexieHooks";
import Filter from "../../../Data/Filter";
import Item from "../../../Data/Item";

import { LoadingSpinner } from "../../Loading";
import ItemTile from "./ItemTile";
import AppWrapper from "../../AppWrapper";
import ItemSearchBar from "./ItemSearchBar";

const ItemOverview = () => {
  const db = new MyAppDatabase();
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allItem, loading, error] = useTableByFilter(db.items, filters);

  return (
    <AppWrapper>
      <ItemSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <ItemContainer>
        {!error && loading && <LoadingSpinner />}
        {!error &&
          !loading &&
          allItem!.map((item: Item, index: number) => {
            return <ItemTile key={index} item={item}></ItemTile>;
          })}
        {error && <>Fail</>}
      </ItemContainer>
    </AppWrapper>
  );
};

export default ItemOverview;

const ItemContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
