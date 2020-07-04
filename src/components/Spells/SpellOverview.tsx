import React from "react";
import { LoadingSpinner } from "../Loading";
import Spell from "../../Data/Spell";
import SpellTile from "./SpellTile";
import AppWrapper from "../AppWrapper";
import { MyAppDatabase } from "../../Database/MyDatabase";
import { useTable } from "../../Hooks/DexieHooks";

const SpellOverview = () => {
  const db = new MyAppDatabase();
  const [allSpells, loading, error] = useTable(db.spells);

  return (
    <AppWrapper>
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
