import React from "react";
import styled from "styled-components";
import Campaign from "../../../../data/campaign/Campaign";
import StringField from "../../../form_elements/StringField";

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
  flex: 1 1;
  min-width: calc(100% - 40px);
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
