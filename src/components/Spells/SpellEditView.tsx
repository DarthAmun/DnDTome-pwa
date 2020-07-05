import React from "react";
import styled from "styled-components";
import Spell from "../../Data/Spell";
import TextField from "../FormElements/TextField";

import { faHistory } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  spell: Spell;
}

const SpellEditView = ({ spell }: $Props) => {
  return (
    <View>
      <TextField value={spell.name} label="Name" />
      <TextField value={spell.school} label="School" />
      <TextField value={spell.time} label="Time" icon={faHistory} />
    </View>
  );
};

export default SpellEditView;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  overflow: hidden;
  flex: 1 1;
  padding: 5px;
`;
