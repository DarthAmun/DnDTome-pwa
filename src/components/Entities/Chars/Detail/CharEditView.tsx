import React, { useState } from "react";
import styled from "styled-components";
import Char from "../../../../Data/Chars/Char";

import StringField from "../../../FormElements/StringField";
import TabBar from "../../../GeneralElements/TabBar";
import NumberField from "../../../FormElements/NumberField";
import TextField from "../../../FormElements/TextField";

interface $Props {
  char: Char;
  onEdit: (value: Char) => void;
}

const CharEditView = ({ char, onEdit }: $Props) => {
  const [activeTab, setTab] = useState<string>("General");

  return (
    <CenterWrapper>
      <CharView>
        <StringField
          value={char.name}
          label="Name"
          onChange={(name) => onEdit({ ...char, name: name })}
        />
        <StringField
          value={char.player}
          label="Player"
          onChange={(player) => onEdit({ ...char, player: player })}
        />
        <StringField
          value={char.pic}
          label="Picture"
          onChange={(pic) => onEdit({ ...char, pic: pic })}
        />
        <StringField
          value={char.background}
          label="Background"
          onChange={(background) => onEdit({ ...char, background: background })}
        />
        <NumberField
          value={char.ac}
          label="Armor Class"
          onChange={(ac) => onEdit({ ...char, ac: ac })}
        />
        <NumberField
          value={char.hp}
          label="Hit Points"
          onChange={(hp) => onEdit({ ...char, hp: hp })}
        />
        <NumberField
          value={char.init}
          label="Initiative"
          onChange={(init) => onEdit({ ...char, init: init })}
        />
        <TextField
          value={char.speed}
          label="Speed"
          onChange={(speed) => onEdit({ ...char, speed: speed })}
        />
        <TextField
          value={char.profsLangs}
          label="Languages"
          onChange={(profsLangs) => onEdit({ ...char, profsLangs: profsLangs })}
        />
        <TextField
          value={char.actions}
          label="Actions"
          onChange={(actions) => onEdit({ ...char, actions: actions })}
        />
        <TextField
          value={char.bonusActions}
          label="Bonus Actions"
          onChange={(bonusActions) => onEdit({ ...char, bonusActions: bonusActions })}
        />
        <TextField
          value={char.reactions}
          label="Reactions"
          onChange={(reactions) => onEdit({ ...char, reactions: reactions })}
        />
        <TabBar
          children={["General"]}
          onChange={(tab: string) => setTab(tab)}
        />
        {activeTab === "General" && <></>}
      </CharView>
    </CenterWrapper>
  );
};

export default CharEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CharView = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 600px;
  padding: 5px;
  margin: 5px;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: stretch;
`;
