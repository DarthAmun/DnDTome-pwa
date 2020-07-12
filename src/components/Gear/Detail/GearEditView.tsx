import React from "react";
import styled from "styled-components";
import Gear from "../../../Data/Gear";

import StringField from "../../FormElements/StringField";
import TextField from "../../FormElements/TextField";

import {
  faLink,
  faCoins,
  faWeightHanging,
  faCrosshairs,
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
        <StringField
          value={gear.cost}
          label="Cost"
          icon={faCoins}
          onChange={(cost) => onEdit({ ...gear, cost: cost })}
        />
        <StringField
          value={gear.weight}
          label="Weight"
          icon={faWeightHanging}
          onChange={(weight) => onEdit({ ...gear, weight: weight })}
        />
        <StringField
          value={gear.type}
          label="Type"
          onChange={(type) => onEdit({ ...gear, type: type })}
        />
        <StringField
          value={gear.damage}
          label="Damage"
          icon={faCrosshairs}
          onChange={(damage) => onEdit({ ...gear, damage: damage })}
        />
        <StringField
          value={gear.properties}
          label="Properties"
          onChange={(properties) => onEdit({ ...gear, properties: properties })}
        />
        <StringField
          value={gear.pic}
          label="Picture"
          icon={faImage}
          onChange={(pic) => onEdit({ ...gear, pic: pic })}
        />
        <StringField
          value={gear.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...gear, sources: sources })}
        />
        <TextField
          value={gear.description}
          label="Text"
          icon={faBookOpen}
          onChange={(description) =>
            onEdit({ ...gear, description: description })
          }
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
