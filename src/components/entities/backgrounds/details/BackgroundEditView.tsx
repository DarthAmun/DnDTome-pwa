import React from "react";
import styled from "styled-components";
import Background from "../../../../data/Background";

import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";

import { faLink, faBookOpen } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  background: Background;
  onEdit: (value: Background) => void;
}

const BackgroundEditView = ({ background, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={background.name}
          label="Name"
          onChange={(name) => onEdit({ ...background, name: name })}
        />
        <StringField
          value={background.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...background, sources: sources })}
        />
        <TextField
          value={background.description}
          label="Text"
          icon={faBookOpen}
          onChange={(description) => onEdit({ ...background, description: description })}
        />
        <TextField
          value={background.proficiencies}
          label="Proficiencies"
          height={"50px"}
          icon={faBookOpen}
          onChange={(proficiencies) => onEdit({ ...background, proficiencies: proficiencies })}
        />
      </View>
    </CenterWrapper>
  );
};

export default BackgroundEditView;

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
