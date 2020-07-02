import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spell from "../../Data/Spell";
import { useRecive } from "../../Database/SpellService";
import { LoadingSpinner } from "../Loading";

interface $Props {
  id: number;
  onClose: () => void;
}

const SpellDetailDialog = ({ id }: $Props) => {
  const [spell, setSpell] = useState<Spell>();
  const { data, loading } = useRecive(id, "spells");

  useEffect(() => {
    if (!loading) {
      const spells: Spell[] = data as Spell[];
      setSpell(spells[0]!);
    }
  }, [loading, data]);

  return (
    <Dialog>
      {loading && <LoadingSpinner />}
      {!loading && <div>{spell !== undefined ? spell.name : ""} </div>}
    </Dialog>
  );
};

export default SpellDetailDialog;

const Dialog = styled.div``;
