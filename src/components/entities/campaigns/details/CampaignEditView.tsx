import React, { useState } from "react";
import styled from "styled-components";
import Campaign from "../../../../data/campaign/Campaign";
import Note from "../../../../data/campaign/Note";

import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faBookOpen, faLink, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import TabBar from "../../../general_elements/TabBar";
import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";
import IconButton from "../../../form_elements/IconButton";
import TextButton from "../../../form_elements/TextButton";
import FlowChart from "../../../general_elements/flow/FlowChart";
import DataSelectField from "../../../form_elements/DataSelectField";
import ImageImportField from "../../../form_elements/ImageField";

interface $Props {
  campaign: Campaign;
  onEdit: (value: Campaign) => void;
}

const CampaignEditView = ({ campaign, onEdit }: $Props) => {
  const [activeTab, setTab] = useState<string>("General");

  const removeNpc = (oldNpc: string) => {
    if (campaign !== undefined) {
      let newNpclList = campaign.npcs
        .filter((npc: string) => npc !== oldNpc)
        .map((npc: string) => {
          return npc;
        });
      onEdit({ ...campaign, npcs: newNpclList });
    }
  };
  const addNewNpc = () => {
    if (campaign !== undefined) {
      let newNpclList = [...campaign.npcs, ""];
      onEdit({ ...campaign, npcs: newNpclList });
    }
  };
  const onChangeNpc = (newNpc: string, oldNpc: string) => {
    if (campaign !== undefined) {
      let newNpclList = campaign.npcs.map((npc: string) => {
        if (npc === oldNpc) {
          return newNpc;
        } else {
          return npc;
        }
      });
      onEdit({ ...campaign, npcs: newNpclList });
    }
  };

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
      let newPlayerlList = [...campaign.players, ""];
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
      let newNotelList = [...campaign.notes, new Note()];
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

  const removeLog = (oldLog: Note) => {
    if (campaign !== undefined) {
      let newLoglList = campaign.logs
        .filter((log: Note) => log !== oldLog)
        .map((log: Note) => {
          return log;
        });
      onEdit({ ...campaign, logs: newLoglList });
    }
  };
  const addNewLog = () => {
    if (campaign !== undefined) {
      let newLoglList = campaign.logs.map((log: Note) => {
        return log;
      });
      newLoglList.push(new Note(new Date().toString(), "", ""));
      onEdit({ ...campaign, logs: newLoglList });
    }
  };
  const onChangeLog = (field: string, newValue: string, oldLog: Note) => {
    if (campaign !== undefined) {
      let newLoglList = campaign.logs.map((logs: Note) => {
        if (logs === oldLog) {
          return { ...logs, [field]: newValue };
        } else {
          return logs;
        }
      });
      onEdit({ ...campaign, logs: newLoglList });
    }
  };

  return (
    <CenterWrapper>
      <TabBar
        children={["General", "Players", "Npcs", "Notes", "Log", "Graph", "Map"]}
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
            label="Picture Link"
            icon={faImage}
            onChange={(pic) => onEdit({ ...campaign, pic: pic })}
          />
          <FieldGroup>
            <ImageImportField
              label="Picture"
              onFinished={(base64) => onEdit({ ...campaign, picBase64: base64 })}
            />
            <IconButton icon={faTrash} onClick={() => onEdit({ ...campaign, picBase64: "" })} />
          </FieldGroup>
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
                <DataSelectField
                  optionTable={["chars"]}
                  value={player}
                  label="Player"
                  onChange={(newPlayer: string) => onChangePlayer(newPlayer, player)}
                />
                <IconButton icon={faTrash} onClick={() => removePlayer(player)} />
              </Container>
            );
          })}
          <TextButton text={"Add new Player"} icon={faPlus} onClick={() => addNewPlayer()} />
        </>
      )}
      {activeTab === "Npcs" && (
        <>
          {campaign.npcs.map((npc: string, index: number) => {
            return (
              <Container key={index}>
                <DataSelectField
                  optionTable={["npcs"]}
                  value={npc}
                  label="Player"
                  onChange={(newPlayer: string) => onChangeNpc(newPlayer, npc)}
                />
                <IconButton icon={faTrash} onClick={() => removeNpc(npc)} />
              </Container>
            );
          })}
          <TextButton text={"Add new Npc"} icon={faPlus} onClick={() => addNewNpc()} />
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
      {activeTab === "Log" && (
        <>
          {campaign.logs.map((log: Note, index: number) => {
            return (
              <Container key={index}>
                <TextField
                  height={"30px"}
                  value={log.content}
                  label="Log Entry"
                  onChange={(newContent) => onChangeLog("content", newContent, log)}
                />
                <StringField
                  value={log.tags}
                  label="Tags"
                  onChange={(newTags) => onChangeLog("tags", newTags, log)}
                />
                <IconButton icon={faTrash} onClick={() => removeLog(log)} />
              </Container>
            );
          })}
          <TextButton text={"Add new Note"} icon={faPlus} onClick={() => addNewLog()} />
        </>
      )}
      {activeTab === "Graph" && (
        <Container>
          <FlowChart
            isEditable={true}
            initElements={campaign.flow}
            onEdit={(graph) => onEdit({ ...campaign, flow: graph })}
          />
        </Container>
      )}
      {activeTab === "Map" && (
        <Container>
          <DataSelectField
            optionTable={["locations"]}
            value={campaign.map}
            label="Map"
            onChange={(newMap) => onEdit({ ...campaign, map: newMap })}
          />
        </Container>
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

const FieldGroup = styled.div`
  flex: 2 2 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;
