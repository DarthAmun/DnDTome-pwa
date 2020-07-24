import React from "react";
import styled from "styled-components";
import Char from "../../../../Data/Chars/Char";

import StringField from "../../../FormElements/StringField";
import ShortTextField from "../../../FormElements/ShortTextField";

import {
  faLink,
  faImage,
  faPlus,
  faTrash,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import NumberField from "../../../FormElements/NumberField";
import IconButton from "../../../FormElements/IconButton";
import TextField from "../../../FormElements/TextField";
import NumberArrayField from "../../../FormElements/NumberArrayField";
import TextButton from "../../../FormElements/TextButton";

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

const FeatureView = styled(CharView)``;

const FeatureWrapper = styled.div`
  flex: 1 1 600px;
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  margin-bottom: 5px;
  border-radius: 5px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  label {
    margin: 2px;
  }
`;
const FeatureString = styled(StringField)``;
const FeatureNumber = styled(NumberField)``;
const FeatureText = styled(ShortTextField)``;
const FeatureNumberArray = styled(NumberArrayField)``;

const FeatureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex: 1 1 600px;
  border-top: none;
  border-bottom: 2px solid ${({ theme }) => theme.input.backgroundColor};

  &:last-child {
    border-bottom: none;
  }
`;
const FeatureName = styled(StringField)``;

const BoniContainer = styled(FeatureContainer)``;
const BoniName = styled(FeatureString)``;
