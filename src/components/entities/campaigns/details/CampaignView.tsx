import React from "react";
import styled from "styled-components";

import Campaign from "../../../../data/campaign/Campaign";

interface $Props {
  campaign: Campaign;
  onEdit: (value: Campaign) => void;
}

const CampaignView = ({ campaign, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <Name>
          <b>{campaign.name}</b>
        </Name>
      </View>
    </CenterWrapper>
  );
};

export default CampaignView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  max-width: 800px;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;
