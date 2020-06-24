import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useReciveAll } from "../../Database/SpellService";
import { LoadingSpinner } from "../Loading";
import Spell from "../../Data/Spell";

const SpellOverview = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const { data, loading } = useReciveAll("spells");

  useEffect(() => {
    if (!loading) {
      setSpells(data as Spell[]);
    }
  }, [loading, data]);

  return (
    <App>
      {loading && <LoadingSpinner />}
      {!loading &&
        spells.map((spell) => {
          return spell.name;
        })}
    </App>
  );
};

export default SpellOverview;

const App = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.main.backgroundColor};
`;
