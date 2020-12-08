import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Campaign from "../../../../data/campaign/Campaign";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TabBar from "../../../general_elements/TabBar";
import { LoadingSpinner } from "../../../Loading";

interface $Props {
  campaign: Campaign;
  onEdit: (value: Campaign) => void;
}

const CampaignView = ({ campaign, onEdit }: $Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tabs, setTabs] = useState<string[]>(["General", "Notes"]);
  const [activeTab, setTab] = useState<string>("General");

  const getPicture = useCallback(() => {
    if (campaign !== undefined) {
      if (campaign.pic === "" || campaign.pic === null) {
        return "";
      }
      return campaign.pic;
    }
    return "";
  }, [campaign]);

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && (
        <CenterWrapper>
          <View>
            {getPicture() !== "" ? (
              <ImageName>
                <Image pic={getPicture()}></Image>
                <b>{campaign.name}</b>
              </ImageName>
            ) : (
              <Name>
                <b>{campaign.name}</b>
              </Name>
            )}
          </View>
          <TabBar children={tabs} onChange={(tab: string) => setTab(tab)} />
          {activeTab === "General" && (
            <View>
              <PropWrapper>
                <Prop>
                  <Icon icon={faLink} />
                  {campaign.sources}
                </Prop>
              </PropWrapper>
              <Text>
                <PropTitle>Description</PropTitle>
                {campaign.description}
              </Text>
            </View>
          )}
          {activeTab === "Notes" && <span>Notes</span>}
        </CenterWrapper>
      )}
    </>
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

const ImageName = styled.div`
  height: 30px;
  float: left;
  padding: 10px;
  margin: 5px 5px 10px 5px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 50px 5px 5px 50px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
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

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Prop = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
  float: left;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 30px);
  margin: 10px 5px 5px 5px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  const style = {
    backgroundImage: `url(${pic})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  if (pic !== "") {
    return <ImageElm style={style}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.div`
  margin: -10px 5px -10px -10px;
  height: 47px;
  width: 47px;
  float: left;
  border-radius: 100px;
  border: 3px solid ${({ theme }) => theme.main.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
