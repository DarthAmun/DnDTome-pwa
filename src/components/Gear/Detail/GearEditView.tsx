import React from "react";
import styled from "styled-components";
import Gear from "../../../Data/Gear";

import StringField from "../../FormElements/StringField";
import NumberField from "../../FormElements/NumberField";
import TextField from "../../FormElements/TextField";
import CheckField from "../../FormElements/CheckField";

import {
  faHourglassHalf,
  faMortarPestle,
  faHistory,
  faPowerOff,
  faUser,
  faLink,
  faBookOpen,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

interface $Props {
  gear: Gear;
  onEdit: (value: Gear) => void;
}

const GearEditView = ({ gear, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={gear.name}
          label="Name"
          onChange={(name) => onEdit({ ...gear, name: name })}
        />
      </View>
    </CenterWrapper>
  );
};

export default GearEditView;

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
