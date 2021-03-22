import React from "react";
import styled from "styled-components";
import Item from "../../../../data/Item";

import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";
import CheckField from "../../../form_elements/CheckField";
import NumberField from "../../../form_elements/NumberField";

import { faLink, faBookOpen, faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import DataSelectField from "../../../form_elements/DataSelectField";
import IconButton from "../../../form_elements/IconButton";
import ImageImportField from "../../../form_elements/ImageField";

interface $Props {
  item: Item;
  onEdit: (value: Item) => void;
}

const ItemEditView = ({ item, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={item.name}
          label="Name"
          onChange={(name) => onEdit({ ...item, name: name })}
        />
        <DataSelectField
          optionTable={["gears"]}
          value={item.base}
          label="Base Gear"
          onChange={(base) => onEdit({ ...item, base: base })}
        />
        <CheckField
          value={!!item.attunment}
          label="Attunment"
          onChange={(attunment) => onEdit({ ...item, attunment: attunment ? 1 : 0 })}
        />
        <StringField
          value={item.type}
          label="Type"
          onChange={(type) => onEdit({ ...item, type: type })}
        />
        <NumberField
          value={item.magicBonus}
          label="Magic Bonus"
          onChange={(magicBonus) => onEdit({ ...item, magicBonus: magicBonus })}
        />
        <StringField
          value={item.rarity}
          label="Rarity"
          onChange={(rarity) => onEdit({ ...item, rarity: rarity })}
        />
        <StringField
          value={item.pic}
          label="Picture"
          icon={faImage}
          onChange={(pic) => onEdit({ ...item, pic: pic })}
        />
        <FieldGroup>
          <ImageImportField
            label="Picture"
            onFinished={(base64) => onEdit({ ...item, picBase64: base64 })}
          />
          <IconButton icon={faTrash} onClick={() => onEdit({ ...item, picBase64: "" })} />
        </FieldGroup>
        <StringField
          value={item.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...item, sources: sources })}
        />
        <TextField
          value={item.description}
          label="Text"
          icon={faBookOpen}
          onChange={(description) => onEdit({ ...item, description: description })}
        />
      </View>
    </CenterWrapper>
  );
};

export default ItemEditView;

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
