import React from "react";
import styled from "styled-components";
import Quest from "../../../../data/campaign/Quest";

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
  quest: Quest;
  onEdit: (value: Quest) => void;
}

const QuestEditView = ({ quest, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={quest.name}
          label="Name"
          onChange={(name) => onEdit({ ...quest, name: name })}
        />

        <StringField
          value={quest.pic}
          label="Picture"
          icon={faImage}
          onChange={(pic) => onEdit({ ...quest, pic: pic })}
        />
        <StringField
          value={quest.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...quest, sources: sources })}
        />
        <TextField
          value={quest.description}
          label="Text"
          icon={faBookOpen}
          onChange={(description) =>
            onEdit({ ...quest, description: description })
          }
        />
      </View>
    </CenterWrapper>
  );
};

export default QuestEditView;

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
