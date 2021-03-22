import React from "react";
import styled from "styled-components";
import Gear from "../../../../data/Gear";

import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";

import {
  faLink,
  faCoins,
  faWeightHanging,
  faCrosshairs,
  faBookOpen,
  faImage,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../../form_elements/IconButton";
import ImageImportField from "../../../form_elements/ImageField";

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
          label="Picture Link"
          icon={faImage}
          onChange={(pic) => onEdit({ ...gear, pic: pic })}
        />
        <FieldGroup>
          <ImageImportField
            label="Picture"
            onFinished={(base64) => onEdit({ ...gear, picBase64: base64 })}
          />
          <IconButton icon={faTrash} onClick={() => onEdit({ ...gear, picBase64: "" })} />
        </FieldGroup>
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
          onChange={(description) => onEdit({ ...gear, description: description })}
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

const FieldGroup = styled.div`
  flex: 2 2 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;
