import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Campaign from "../../../../data/campaign/Campaign";
import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faBookOpen, faLink, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import BuildCampaign from "../../../../data/campaign/BuildCampaign";
import { buildCampaign } from "../../../../services/CampaignService";
import { LoadingSpinner } from "../../../Loading";
import TabBar from "../../../general_elements/TabBar";
import AutoStringField from "../../../form_elements/AutoStringField";
import IconButton from "../../../form_elements/IconButton";
import TextButton from "../../../form_elements/TextButton";

interface $Props {
  campaign: Campaign;
  onEdit: (value: Campaign) => void;
}

const CampaignEditView = ({ campaign, onEdit }: $Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedCampaign, setLoadedCampaign] = useState<BuildCampaign>(new BuildCampaign());
  const [activeTab, setTab] = useState<string>("General");

  useEffect(() => {
    buildCampaign(campaign).then((buildCampaign) => {
      setLoadedCampaign(buildCampaign);
      console.log(buildCampaign);
      setLoading(false);
    });
  }, [campaign, setLoadedCampaign]);

  const removePlayer = (oldPlayer: string) => {
    if (loadedCampaign !== undefined) {
      let newPlayerlList = loadedCampaign.campaign.players
        .filter((player: string) => player !== oldPlayer)
        .map((player: string) => {
          return player;
        });
      onEdit({ ...loadedCampaign.campaign, players: newPlayerlList });
    }
  };
  const addNewPlayer = () => {
    if (loadedCampaign !== undefined) {
      let newPlayerlList = loadedCampaign.campaign.players.map((player: string) => {
        return player;
      });
      newPlayerlList.push("");
      onEdit({ ...loadedCampaign.campaign, players: newPlayerlList });
    }
  };
  const onChangePlayer = (newPlayer: string, oldPlayer: string) => {
    if (loadedCampaign !== undefined) {
      let newPlayerlList = loadedCampaign.campaign.players.map((player: string) => {
        if (player === oldPlayer) {
          return newPlayer;
        } else {
          return player;
        }
      });
      onEdit({ ...loadedCampaign.campaign, players: newPlayerlList });
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && loadedCampaign && (
        <CenterWrapper>
          <TabBar
            children={["General", "Players", "Notes"]}
            onChange={(tab: string) => setTab(tab)}
          />
          {activeTab === "General" && (
            <View>
              <StringField
                value={campaign.name}
                label="Campaign Name"
                onChange={(name) => onEdit({ ...loadedCampaign.campaign, name: name })}
              />
              <StringField
                value={campaign.pic}
                label="Picture"
                icon={faImage}
                onChange={(pic) => onEdit({ ...loadedCampaign.campaign, pic: pic })}
              />
              <StringField
                value={campaign.sources}
                label="Sources"
                icon={faLink}
                onChange={(sources) => onEdit({ ...loadedCampaign.campaign, sources: sources })}
              />
              <TextField
                value={campaign.description}
                label="Description"
                icon={faBookOpen}
                onChange={(description) =>
                  onEdit({ ...loadedCampaign.campaign, description: description })
                }
              />
            </View>
          )}
          {activeTab === "Players" && (
            <>
              {loadedCampaign.campaign.players.map((player: string, index: number) => {
                return (
                  <Container key={index}>
                    <AutoStringField
                      optionTable={"chars"}
                      value={player}
                      label="Player"
                      onChange={(newPlayer) => onChangePlayer(newPlayer, player)}
                    />
                    <IconButton icon={faTrash} onClick={() => removePlayer(player)} />
                  </Container>
                );
              })}
              <TextButton text={"Add new Player"} icon={faPlus} onClick={() => addNewPlayer()} />
            </>
          )}
          {activeTab === "Notes" && <span>Notes</span>}
        </CenterWrapper>
      )}
    </>
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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex: 1 1 600px;
`;
