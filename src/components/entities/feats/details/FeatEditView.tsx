import React from "react";
import styled from "styled-components";
import Feat from "../../../../data/Feat";

import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";

import { faLink, faBookOpen } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  feat: Feat;
  onEdit: (value: Feat) => void;
}

const FeatEditView = ({ feat, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={feat.name}
          label="Name"
          onChange={(name) => onEdit({ ...feat, name: name })}
        />
        <StringField
          value={feat.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...feat, sources: sources })}
        />
        <TextField
          value={feat.description}
          label="Text"
          icon={faBookOpen}
          onChange={(description) => onEdit({ ...feat, description: description })}
        />
        <TextField
          value={feat.prerequisite}
          label="Prerequisite"
          height={"50px"}
          icon={faBookOpen}
          onChange={(prerequisite) => onEdit({ ...feat, prerequisite: prerequisite })}
        />
      </View>
    </CenterWrapper>
  );
};

export default FeatEditView;

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
