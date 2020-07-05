import React from "react";
import styled from "styled-components";
import Spell from "../../Data/Spell";
import TextField from "../FormElements/TextField";

import {
  faHourglassHalf,
  faMortarPestle,
  faHistory,
  faPowerOff,
  faUser,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

interface $Props {
  spell: Spell;
}

const SpellEditView = ({ spell }: $Props) => {
  return (
    <View>
      <TextField value={spell.name} label="Name" />
      <TextField value={spell.school} label="School" />
      <TextField value={spell.time} label="Time" icon={faHistory} />
      <TextField value={spell.range} label="Time" icon={faPowerOff} transform={{ rotate: 42 }}/>
      <TextField value={spell.duration} label="Time" icon={faHourglassHalf} />
      <TextField value={spell.components} label="Time" icon={faMortarPestle} />
      <TextField value={spell.classes} label="Time" icon={faUser} />
      <TextField value={spell.sources} label="Time" icon={faLink} />
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
  border-radius: 5px;
`;
