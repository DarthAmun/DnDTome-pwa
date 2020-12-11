import React, { useState } from "react";
import styled from "styled-components";
import Campaign from "../../../../data/campaign/Campaign";
import Note from "../../../../data/campaign/Note";

import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faBookOpen, faLink, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import TabBar from "../../../general_elements/TabBar";
import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";
import AutoStringField from "../../../form_elements/AutoStringField";
import IconButton from "../../../form_elements/IconButton";
import TextButton from "../../../form_elements/TextButton";

interface $Props {
  campaign: Campaign;
  onEdit: (value: Campaign) => void;
}

const CampaignEditView = ({ campaign, onEdit }: $Props) => {
  const [activeTab, setTab] = useState<string>("General");

  const removePlayer = (oldPlayer: string) => {
    if (campaign !== undefined) {
      let newPlayerlList = campaign.players
        .filter((player: string) => player !== oldPlayer)
        .map((player: string) => {
          return player;
        });
      onEdit({ ...campaign, players: newPlayerlList });
    }
  };
  const addNewPlayer = () => {
    if (campaign !== undefined) {
      let newPlayerlList = campaign.players.map((player: string) => {
        return player;
      });
      newPlayerlList.push("");
      onEdit({ ...campaign, players: newPlayerlList });
    }
  };
  const onChangePlayer = (newPlayer: string, oldPlayer: string) => {
    if (campaign !== undefined) {
      let newPlayerlList = campaign.players.map((player: string) => {
        if (player === oldPlayer) {
          return newPlayer;
        } else {
          return player;
        }
      });
      onEdit({ ...campaign, players: newPlayerlList });
    }
  };

  const removeNote = (oldNote: Note) => {
    if (campaign !== undefined) {
      let newNotelList = campaign.notes
        .filter((note: Note) => note !== oldNote)
        .map((note: Note) => {
          return note;
        });
      onEdit({ ...campaign, notes: newNotelList });
    }
  };
  const addNewNote = () => {
    if (campaign !== undefined) {
      let newNotelList = campaign.notes.map((note: Note) => {
        return note;
      });
      newNotelList.push(new Note());
      onEdit({ ...campaign, notes: newNotelList });
    }
  };
  const onChangeNote = (field: string, newValue: string, oldNote: Note) => {
    if (campaign !== undefined) {
      let newNotelList = campaign.notes.map((note: Note) => {
        if (note === oldNote) {
          return { ...note, [field]: newValue };
        } else {
          return note;
        }
      });
      onEdit({ ...campaign, notes: newNotelList });
    }
  };

  return (
    <CenterWrapper>
      <TabBar
        children={["General", "Players", "Notes"]}
        onChange={(tab: string) => setTab(tab)}
        activeTab={activeTab}
      />
      {activeTab === "General" && (
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
      )}
      {activeTab === "Players" && (
        <>
          {campaign.players.map((player: string, index: number) => {
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
      {activeTab === "Notes" && (
        <>
          {campaign.notes.map((note: Note, index: number) => {
            return (
              <Container key={index}>
                <StringField
                  value={note.title}
                  label="Title"
                  onChange={(newNote) => onChangeNote("title", newNote, note)}
                />
                <IconButton icon={faTrash} onClick={() => removeNote(note)} />
                <TextField
                  value={note.content}
                  label="Feature Text"
                  onChange={(newContent) => onChangeNote("content", newContent, note)}
                />
                <StringField
                  value={note.tags}
                  label="Tags"
                  onChange={(newTags) => onChangeNote("tags", newTags, note)}
                />
              </Container>
            );
          })}
          <TextButton text={"Add new Note"} icon={faPlus} onClick={() => addNewNote()} />
        </>
      )}
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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex: 1 1 100%;
`;
