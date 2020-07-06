import React from "react";
import styled from "styled-components";
import Spell from "../../Data/Spell";

import StringField from "../FormElements/StringField";
import NumberField from "../FormElements/NumberField";
import TextField from "../FormElements/TextField";
import CheckField from "../FormElements/CheckField";

import {
  faHourglassHalf,
  faMortarPestle,
  faHistory,
  faPowerOff,
  faUser,
  faLink,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

interface $Props {
  spell: Spell;
}

const SpellEditView = ({ spell }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField value={spell.name} label="Name" />
        <StringField value={spell.school} label="School" />
        <FieldGroup>
          <NumberField value={spell.level} label="Level" />
          <CheckField value={!!spell.ritual} label="Ritual" />
        </FieldGroup>
        <StringField value={spell.time} label="Time" icon={faHistory} />
        <StringField
          value={spell.range}
          label="Range"
          icon={faPowerOff}
          transform={{ rotate: 42 }}
        />
        <StringField
          value={spell.duration}
          label="Duration"
          icon={faHourglassHalf}
        />
        <StringField
          value={spell.components}
          label="Comp."
          icon={faMortarPestle}
        />
        <StringField value={spell.classes} label="Classes" icon={faUser} />
        <StringField value={spell.sources} label="Sources" icon={faLink} />
        <TextField value={spell.text} label="Text" icon={faBookOpen} />
      </View>
    </CenterWrapper>
  );
};

export default SpellEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const FieldGroup = styled.div`
  flex: 2 1 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  padding: 5px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
