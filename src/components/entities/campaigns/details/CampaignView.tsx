import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Campaign from "../../../../data/campaign/Campaign";
import Npc from "../../../../data/campaign/Npc";
import Char from "../../../../data/chars/Char";
import Note from "../../../../data/campaign/Note";
import Filter from "../../../../data/Filter";
import BuildCampaign from "../../../../data/campaign/BuildCampaign";
import { buildCampaign } from "../../../../services/CampaignService";
import { applyFilters } from "../../../../services/DatabaseService";

import FormatedText from "../../../general_elements/FormatedText";
import NoteSearchBar from "../NoteSearchBar";
import TabBar from "../../../general_elements/TabBar";
import Map from "../../../general_elements/map/Map";
import NpcTile from "../../npcs/NpcTile";
import CharTile from "../../chars/CharTile";
import { faLink, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpinner } from "../../../Loading";
import FlowChart from "../../../general_elements/flow/FlowChart";

interface $Props {
  campaign: Campaign;
  onEdit: (value: Campaign) => void;
}

const CampaignView = ({ campaign, onEdit }: $Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedCampaign, setLoadedCampaign] = useState<BuildCampaign>(new BuildCampaign());
  const [activeTab, setTab] = useState<string>("Notes");
  const [tabs, setTabs] = useState<string[]>(["General"]);
  const [filters, setFilters] = useState<Filter[]>([]);

  useEffect(() => {
    buildCampaign(campaign).then((buildCampaign) => {
      let newTabs = ["General"];
      if (buildCampaign.characters.length > 0) newTabs.push("Players");
      if (buildCampaign.npcs.length > 0) newTabs.push("Npcs");
      setTabs([...newTabs, "Notes", "Log", "Graph", "Map"]);
      setLoadedCampaign(buildCampaign);
      setLoading(false);
    });
  }, [campaign, setLoadedCampaign]);

  const getPicture = useCallback(() => {
    if (campaign !== undefined) {
      if (
        campaign.picBase64 !== "" &&
        campaign.picBase64 !== null &&
        campaign.picBase64 !== undefined
      ) {
        return campaign.picBase64;
      } else if (campaign.pic !== "" && campaign.pic !== null && campaign.pic !== undefined) {
        return campaign.pic;
      }
    }
    return "";
  }, [campaign]);

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleString();
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && loadedCampaign && (
        <CenterWrapper>
          <Header>
            <View>
              {getPicture() !== "" ? (
                <ImageName>
                  <Image pic={getPicture()}></Image>
                  <b>{loadedCampaign.campaign.name}</b>
                </ImageName>
              ) : (
                <Name>
                  <b>{loadedCampaign.campaign.name}</b>
                </Name>
              )}
            </View>
          </Header>
          <TabBar children={tabs} onChange={(tab: string) => setTab(tab)} activeTab={activeTab} />
          {activeTab === "General" && (
            <View>
              <Text>
                <PropTitle>Description</PropTitle>
                <FormatedText text={loadedCampaign.campaign.description} />
              </Text>
              <PropWrapper>
                <Prop>
                  <Icon icon={faLink} />
                  {loadedCampaign.campaign.sources}
                </Prop>
              </PropWrapper>
            </View>
          )}
          {activeTab === "Players" && loadedCampaign.characters && (
            <PropWrapper>
              {loadedCampaign.characters.map((player: Char, index: number) => {
                return <CharTile char={player} key={index} />;
              })}
            </PropWrapper>
          )}
          {activeTab === "Npcs" && loadedCampaign.npcs && (
            <PropWrapper>
              {loadedCampaign.npcs.map((npc: Npc, index: number) => {
                return <NpcTile npc={npc} key={index} />;
              })}
            </PropWrapper>
          )}
          {activeTab === "Notes" && (
            <>
              <NoteSearchBar hasTitle={true} onSend={setFilters} />
              <SearchableNoteView>
                {loadedCampaign.campaign.notes
                  .filter((note: Note) => applyFilters(note, filters))
                  .reverse()
                  .map((note: Note, index: number) => {
                    return (
                      <NoteWrapper key={index}>
                        <Prop>
                          <PropTitle>{note.title}</PropTitle>
                          <FormatedText text={note.content} />
                        </Prop>
                        <Prop>
                          <Icon icon={faTags} />
                          {note.tags}
                        </Prop>
                      </NoteWrapper>
                    );
                  })}
              </SearchableNoteView>
            </>
          )}
          {activeTab === "Log" && (
            <>
              <NoteSearchBar hasTitle={false} onSend={setFilters} />
              <SearchableView>
                {loadedCampaign.campaign.logs
                  .filter((log: Note) => applyFilters(log, filters))
                  .sort((a: Note, b: Note) => +new Date(b.title) - +new Date(a.title))
                  .map((log: Note, index: number) => {
                    return (
                      <PropWrapper key={index}>
                        <Prop>
                          <PropTitle>{formatDate(log.title)}:</PropTitle>
                          <FormatedText text={log.content} />
                        </Prop>
                        <Prop>
                          <Icon icon={faTags} />
                          {log.tags}
                        </Prop>
                      </PropWrapper>
                    );
                  })}
              </SearchableView>
            </>
          )}
          {activeTab === "Graph" && (
            <PropWrapper>
              <FlowChart isEditable={false} initElements={loadedCampaign.campaign.flow} />
            </PropWrapper>
          )}
          {activeTab === "Map" && <Map editable={false} location={loadedCampaign.map} />}
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

const SearchableView = styled.div`
  margin-top: 50px;
`;

const SearchableNoteView = styled(SearchableView)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  position: relative;
  z-index: 200;
  width: 100%;
  height: 70px;
  margin-bottom: -5px;
  background-color: ${({ theme }) => theme.main.backgroundColor};
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

const NoteWrapper = styled(PropWrapper)`
  flex: 1 1 100%;
  max-width: 800px;
  padding: 10px;
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Prop = styled.div`
  flex: 1 1 auto;
  color: ${({ theme }) => theme.tile.color};
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
