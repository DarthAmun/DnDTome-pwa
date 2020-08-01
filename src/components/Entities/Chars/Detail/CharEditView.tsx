import React from "react";
import styled from "styled-components";
import Char from "../../../../Data/Chars/Char";

import StringField from "../../../FormElements/StringField";

interface $Props {
  char: Char;
  onEdit: (value: Char) => void;
}

const CharEditView = ({ char, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <CharView>
        <StringField
          value={char.name}
          label="Name"
          onChange={(name) => onEdit({ ...char, name: name })}
        />
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
