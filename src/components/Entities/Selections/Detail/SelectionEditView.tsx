import React from "react";
import styled from "styled-components";
import Selection from "../../../../Data/Selection";

import StringField from "../../../FormElements/StringField";

interface $Props {
  selection: Selection;
  onEdit: (value: Selection) => void;
}

const SelectionEditView = ({ selection, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={selection.name}
          label="Name"
          onChange={(name) => onEdit({ ...selection, name: name })}
        />
      </View>
    </CenterWrapper>
  );
};

export default SelectionEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
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
