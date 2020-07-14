import React, { useState } from "react";
import styled from "styled-components";
import { MyAppDatabase } from "../../../Database/MyDatabase";
import { useTableByFilter } from "../../../Hooks/DexieHooks";
import Filter from "../../../Data/Filter";
import Monster from "../../../Data/Monster";

import { LoadingSpinner } from "../../Loading";
import MonsterTile from "./MonsterTile";
import AppWrapper from "../../AppWrapper";
import MonsterSearchBar from "./MonsterSearchBar";

const MonsterOverview = () => {
  const db = new MyAppDatabase();
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allMonsters, loading, error] = useTableByFilter(db.monsters, filters);

  return (
    <AppWrapper>
      <MonsterSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <MonsterContainer>
        {!error && loading && <LoadingSpinner />}
        {!error &&
          !loading &&
          allMonsters!.map((monster: Monster, index: number) => {
            return <MonsterTile key={index} monster={monster}></MonsterTile>;
          })}
        {error && <>Fail</>}
      </MonsterContainer>
    </AppWrapper>
  );
};

export default MonsterOverview;

const MonsterContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
