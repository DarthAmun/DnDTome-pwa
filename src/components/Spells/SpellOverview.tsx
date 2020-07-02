import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useReciveAll } from "../../Database/SpellService";
import { LoadingSpinner } from "../Loading";
import Spell from "../../Data/Spell";
import SpellTile from "./SpellTile";
import Navigation from "../Navigation/Navigation";
import Header from "../Header";
import SpellDetailDialog from "./SpellDetailDialog";

const SpellOverview = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [dialog, showDialog] = useState<boolean>(false);
  const [spellId, showId] = useState<number>();
  const { data, loading } = useReciveAll("spells");

  useEffect(() => {
    if (!loading) {
      setSpells(data as Spell[]);
    }
  }, [loading, data]);

  const openSpellDetail = (id: number) => {
    if (id !== undefined) {
      showId(id);
      showDialog(true);
    }
  };

  const closeSpellDetail = () => {
    showDialog(false);
  };

  return (
    <App>
      <Header />
      <Navigation />
      {dialog && (
        <SpellDetailDialog id={spellId!} onClose={() => closeSpellDetail()} />
      )}
      {loading && <LoadingSpinner />}
      {!loading &&
        spells.map((spell: Spell, index: number) => {
          return (
            <SpellTile
              key={index}
              spell={spell}
              onClick={() => openSpellDetail(spell.id!)}
            ></SpellTile>
          );
        })}
    </App>
  );
};

export default SpellOverview;

const App = styled.div`
  padding-top: 4rem;
  width: 100%;
  min-height: calc(100vh - 4rem);
  height: auto;
  background-color: ${({ theme }) => theme.main.backgroundColor};
  display: flex;
  flex-wrap: wrap;
`;
