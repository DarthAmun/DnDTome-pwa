import React from "react";
import styled from "styled-components";
import Char from "../../../../Data/Chars/Char";

import IconButton from "../../../FormElements/IconButton";
import StringField from "../../../FormElements/StringField";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  char: Char;
  onChange: (character: Char) => void;
  completed: (completed: boolean, nextTab: string) => void;
}

const CharLabGeneral = ({ char, onChange, completed }: $Props) => {
  return (
    <CenterWrapper>
      <CharView>
        <StringField
          value={char.name}
          label="Name *"
          onChange={(name) => onChange({ ...char, name: name })}
        />
        <StringField
          value={char.player}
          label="Player *"
          onChange={(player) => onChange({ ...char, player: player })}
        />
        <StringField
          value={char.pic}
          label="Picture"
          onChange={(pic) => onChange({ ...char, pic: pic })}
        />
        <IconButton
          icon={faCheckCircle}
          disabled={!(char && char.name.length > 1 && char.player.length > 1)}
          onClick={() => completed(true, "Class")}
        />
      </CharView>
    </CenterWrapper>
  );
};

export default CharLabGeneral;

const CenterWrapper = styled.div`
  overflow: visible;
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
