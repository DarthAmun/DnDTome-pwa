import React from "react";
import styled from "styled-components";
import Item from "../../../../Data/Item";

import StringField from "../../../FormElements/StringField";
import TextField from "../../../FormElements/TextField";

import {
  faLink,
  faBookOpen,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import CheckField from "../../../FormElements/CheckField";

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
        <StringField
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
          onChange={(description) =>
            onEdit({ ...item, description: description })
          }
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
