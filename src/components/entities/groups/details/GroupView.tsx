import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Group from "../../../../data/campaign/Group";
import Npc from "../../../../data/campaign/Npc";
import Char from "../../../../data/chars/Char";
import BuildGroup from "../../../../data/campaign/BuildGroup";
import { buildGroup } from "../../../../services/GroupService";

import FormatedText from "../../../general_elements/FormatedText";
import TabBar from "../../../general_elements/TabBar";
import NpcTile from "../../npcs/NpcTile";
import CharTile from "../../chars/CharTile";
import { faLink, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpinner } from "../../../Loading";
import FlowChart from "../../../general_elements/flow/FlowChart";
import MonsterTile from "../../monsters/MonsterTile";
import Monster from "../../../../data/Monster";
import Note from "../../../../data/campaign/Note";
import { applyFilters } from "../../../../services/DatabaseService";
import NoteSearchBar from "../../campaigns/NoteSearchBar";
import Filter from "../../../../data/Filter";

interface $Props {
  group: Group;
  onEdit: (value: Group) => void;
}

const GroupView = ({ group, onEdit }: $Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedGroup, setLoadedGroup] = useState<BuildGroup>(new BuildGroup());
  const [activeTab, setTab] = useState<string>("General");
  const [tabs, setTabs] = useState<string[]>(["General"]);
  const [filters, setFilters] = useState<Filter[]>([]);

  useEffect(() => {
    buildGroup(group).then((buildGroup) => {
      let newTabs = ["General"];
      if (buildGroup.group.notes.length > 0) newTabs.push("Notes");
      if (buildGroup.characters.length > 0) newTabs.push("Players");
      if (buildGroup.npcs.length > 0) newTabs.push("Npcs");
      if (buildGroup.monsters.length > 0) newTabs.push("Monsters");
      setTabs([...newTabs, "Relationships"]);
      setLoadedGroup(buildGroup);
      setLoading(false);
    });
  }, [group, setLoadedGroup]);

  const getPicture = useCallback(() => {
    if (group !== undefined) {
      if (group.picBase64 !== "" && group.picBase64 !== null && group.picBase64 !== undefined) {
        return group.picBase64;
      } else if (group.pic !== "" && group.pic !== null && group.pic !== undefined) {
        return group.pic;
      }
    }
    return "";
  }, [group]);

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && loadedGroup && (
        <CenterWrapper>
          <Header>
            <View>
              {getPicture() !== "" ? (
                <ImageName>
                  <Image pic={getPicture()}></Image>
                  <b>{loadedGroup.group.name}</b>
                </ImageName>
              ) : (
                <Name>
                  <b>{loadedGroup.group.name}</b>
                </Name>
              )}
            </View>
          </Header>
          <TabBar children={tabs} onChange={(tab: string) => setTab(tab)} activeTab={activeTab} />
          {activeTab === "General" && (
            <View>
              <Text>
                <PropTitle>Description</PropTitle>
                <FormatedText text={loadedGroup.group.description} />
              </Text>
              <PropWrapper>
                <Prop>
                  <Icon icon={faLink} />
                  {loadedGroup.group.sources}
                </Prop>
              </PropWrapper>
            </View>
          )}
          {activeTab === "Notes" && (
            <>
              <NoteSearchBar hasTitle={true} onSend={setFilters} />
              <SearchableNoteView>
                {loadedGroup.group.notes
                  .filter((note: Note) => applyFilters(note, filters))
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
          {activeTab === "Players" && (
            <PropWrapper>
              {loadedGroup.characters.map((player: Char, index: number) => {
                return <CharTile char={player} key={index} />;
              })}
            </PropWrapper>
          )}
          {activeTab === "Npcs" && (
            <PropWrapper>
              {loadedGroup.npcs.map((npc: Npc, index: number) => {
                return <NpcTile npc={npc} key={index} />;
              })}
            </PropWrapper>
          )}
          {activeTab === "Monsters" && (
            <PropWrapper>
              {loadedGroup.monsters.map((monster: Monster, index: number) => {
                return <MonsterTile monster={monster} key={index} />;
              })}
            </PropWrapper>
          )}
          {activeTab === "Relationships" && (
            <PropWrapper>
              <FlowChart isEditable={false} initElements={loadedGroup.group.flow} />
            </PropWrapper>
          )}
        </CenterWrapper>
      )}
    </>
  );
};

export default GroupView;

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
    backgroundImage: `url('${pic}')`,
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
