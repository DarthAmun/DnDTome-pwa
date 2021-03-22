import React from "react";
import styled from "styled-components";
import Quest from "../../../../data/campaign/Quest";

import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";

import { faLink, faBookOpen, faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../../form_elements/IconButton";
import ImageImportField from "../../../form_elements/ImageField";

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
          label="Picture Link"
          icon={faImage}
          onChange={(pic) => onEdit({ ...quest, pic: pic })}
        />
        <FieldGroup>
          <ImageImportField
            label="Picture"
            onFinished={(base64) => onEdit({ ...quest, picBase64: base64 })}
          />
          <IconButton icon={faTrash} onClick={() => onEdit({ ...quest, picBase64: "" })} />
        </FieldGroup>
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
          onChange={(description) => onEdit({ ...quest, description: description })}
        />
        <TextField
          value={quest.rewards}
          label="Rewards"
          height={"50px"}
          icon={faBookOpen}
          onChange={(rewards) => onEdit({ ...quest, rewards: rewards })}
        />
        <TextField
          value={quest.followQuest}
          label="Followup"
          height={"30px"}
          icon={faBookOpen}
          onChange={(newQuest) => onEdit({ ...quest, followQuest: newQuest })}
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

const FieldGroup = styled.div`
  flex: 2 2 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;
