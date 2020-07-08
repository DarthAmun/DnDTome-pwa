import React, { useState } from "react";
import { LoadingSpinner } from "../Loading";
import Spell from "../../Data/Spell";
import SpellTile from "./SpellTile";
import AppWrapper from "../AppWrapper";
import { MyAppDatabase } from "../../Database/MyDatabase";
import { useTableByFilter } from "../../Hooks/DexieHooks";
import Filter from "../../Data/Filter";
import SpellSearchBar from "./SpellSearchBar";

const SpellOverview = () => {
  const db = new MyAppDatabase();
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allSpells, loading, error] = useTableByFilter(db.spells, filters);

  return (
    <AppWrapper>
      <SpellSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      {!error && loading && <LoadingSpinner />}
      {!error &&
        !loading &&
        allSpells!.map((spell: Spell, index: number) => {
          return <SpellTile key={index} spell={spell}></SpellTile>;
        })}
      {error && <>Fail</>}
    </AppWrapper>
  );
};

export default SpellOverview;
