import { faBookOpen, faImage, faLink, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";
import Npc from "../../../../data/campaign/Npc";
import Char from "../../../../data/chars/Char";
import Monster from "../../../../data/Monster";
import IconButton from "../../../form_elements/IconButton";
import ImageImportField from "../../../form_elements/ImageField";
import StringField from "../../../form_elements/StringField";
import TextButton from "../../../form_elements/TextButton";
import TextField from "../../../form_elements/TextField";
import CharEditView from "../../chars/details/CharEditView";
import MonsterEditView from "../../monsters/details/MonsterEditView";

interface $Props {
  npc: Npc;
  onEdit: (value: Npc) => void;
}

const NpcEditView = ({ npc, onEdit }: $Props) => {
  const makeMonster = () => {
    onEdit({ ...npc, monster: new Monster(0, npc.name, npc.sources, npc.pic), char: undefined });
  };

  const makeChar = () => {
    onEdit({ ...npc, char: new Char(0, npc.name, "", "", npc.pic), monster: undefined });
  };

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
          label="Picture Link"
          icon={faImage}
          onChange={(pic) => onEdit({ ...npc, pic: pic })}
        />
        <FieldGroup>
          <ImageImportField
            label="Picture"
            onFinished={(base64) => onEdit({ ...npc, picBase64: base64 })}
          />
          <IconButton icon={faTrash} onClick={() => onEdit({ ...npc, picBase64: "" })} />
        </FieldGroup>
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
        <TextField
          value={npc.traits}
          label="Traits"
          icon={faBookOpen}
          onChange={(traits) => onEdit({ ...npc, traits: traits })}
        />
        {!npc.monster && (
          <TextButton text={"Make Monster"} icon={faPlus} onClick={() => makeMonster()} />
        )}
        {!npc.char && <TextButton text={"Make Char"} icon={faPlus} onClick={() => makeChar()} />}
      </View>
      {npc.monster && (
        <View>
          <MonsterEditView
            monster={npc.monster}
            onEdit={(value: Monster) => onEdit({ ...npc, monster: value })}
            isNpc
          />
        </View>
      )}
      {npc.char && (
        <View>
          <CharEditView
            character={npc.char}
            onEdit={(value: Char) => onEdit({ ...npc, char: value })}
            isNpc
          />
        </View>
      )}
    </CenterWrapper>
  );
};

export default NpcEditView;

const CenterWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex-start: center;
  align-items: flex-start;
`;

const View = styled.div`
  flex: 1 1 auto;
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
