import React from "react";
import styled from "styled-components";
import Npc from "../../../../data/campaign/Npc";

import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";

import {
  faLink,
  faCoins,
  faWeightHanging,
  faCrosshairs,
  faBookOpen,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

interface $Props {
  npc: Npc;
  onEdit: (value: Npc) => void;
}

const NpcEditView = ({ npc, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={npc.name}
          label="Name"
          onChange={(name) => onEdit({ ...npc, name: name })}
        />

        <StringField
          value={npc.pic}
          label="Picture"
          icon={faImage}
          onChange={(pic) => onEdit({ ...npc, pic: pic })}
        />
        <StringField
          value={npc.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...npc, sources: sources })}
        />
        <TextField
          value={npc.description}
          label="Text"
          icon={faBookOpen}
          onChange={(description) => onEdit({ ...npc, description: description })}
        />
      </View>
    </CenterWrapper>
  );
};

export default NpcEditView;

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
