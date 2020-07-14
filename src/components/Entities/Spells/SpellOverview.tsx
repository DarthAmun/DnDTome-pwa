import React, { useState } from "react";
import styled from "styled-components";
import { MyAppDatabase } from "../../Database/MyDatabase";
import { useTableByFilter } from "../../Hooks/DexieHooks";
import Filter from "../../Data/Filter";
import Spell from "../../Data/Spell";

import { LoadingSpinner } from "../Loading";
import SpellTile from "./SpellTile";
import AppWrapper from "../AppWrapper";
import SpellSearchBar from "./SpellSearchBar";

const SpellOverview = () => {
  const db = new MyAppDatabase();
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allSpells, loading, error] = useTableByFilter(db.spells, filters);

  return (
    <AppWrapper>
      <SpellSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <SpellContainer>
        {!error && loading && <LoadingSpinner />}
        {!error &&
          !loading &&
          allSpells!.map((spell: Spell, index: number) => {
            return <SpellTile key={index} spell={spell}></SpellTile>;
          })}
        {error && <>Fail</>}
      </SpellContainer>
    </AppWrapper>
  );
};

export default SpellOverview;

const SpellContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
