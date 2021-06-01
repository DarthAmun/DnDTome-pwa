import React from "react";
import styled from "styled-components";
import Note from "../../../../data/Note";

import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";

import { faLink, faBookOpen } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  note: Note;
  onEdit: (value: Note) => void;
}

const NoteEditView = ({ note, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={note.name}
          label="Name"
          onChange={(name) => onEdit({ ...note, name: name })}
        />
        <StringField
          value={note.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...note, sources: sources })}
        />
        <TextField
          value={note.text}
          label="Text"
          icon={faBookOpen}
          onChange={(text) => onEdit({ ...note, text: text })}
        />
        <StringField
          value={note.tags}
          label="Tags"
          icon={faLink}
          onChange={(tags) => onEdit({ ...note, tags: tags })}
        />
      </View>
    </CenterWrapper>
  );
};

export default NoteEditView;

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
