import React from "react";
import styled from "styled-components";
import Campaign from "../../../../data/campaign/Campaign";
import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faBookOpen, faLink } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  campaign: Campaign;
  onEdit: (value: Campaign) => void;
}

const CampaignEditView = ({ campaign, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={campaign.name}
          label="Campaign Name"
          onChange={(name) => onEdit({ ...campaign, name: name })}
        />
        <StringField
          value={campaign.pic}
          label="Picture"
          icon={faImage}
          onChange={(pic) => onEdit({ ...campaign, pic: pic })}
        />
        <StringField
          value={campaign.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...campaign, sources: sources })}
        />
        <TextField
          value={campaign.description}
          label="Description"
          icon={faBookOpen}
          onChange={(description) => onEdit({ ...campaign, description: description })}
        />
      </View>
    </CenterWrapper>
  );
};

export default CampaignEditView;

const CenterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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
