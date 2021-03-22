import React, { useState } from "react";
import styled from "styled-components";
import Group from "../../../../data/campaign/Group";

import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faBookOpen, faLink, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import TabBar from "../../../general_elements/TabBar";
import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";
import IconButton from "../../../form_elements/IconButton";
import TextButton from "../../../form_elements/TextButton";
import FlowChart from "../../../general_elements/flow/FlowChart";
import Note from "../../../../data/campaign/Note";
import DataSelectField from "../../../form_elements/DataSelectField";
import ImageImportField from "../../../form_elements/ImageField";

interface $Props {
  group: Group;
  onEdit: (value: Group) => void;
}

const GroupEditView = ({ group, onEdit }: $Props) => {
  const [activeTab, setTab] = useState<string>("General");

  const removeNpc = (oldNpc: string) => {
    if (group !== undefined) {
      let newNpclList = group.npcs
        .filter((npc: string) => npc !== oldNpc)
        .map((npc: string) => {
          return npc;
        });
      onEdit({ ...group, npcs: newNpclList });
    }
  };
  const addNewNpc = () => {
    if (group !== undefined) {
      let newNpclList = group.npcs.map((npc: string) => {
        return npc;
      });
      newNpclList.push("");
      onEdit({ ...group, npcs: newNpclList });
    }
  };
  const onChangeNpc = (newNpc: string, oldNpc: string) => {
    if (group !== undefined) {
      let newNpclList = group.npcs.map((npc: string) => {
        if (npc === oldNpc) {
          return newNpc;
        } else {
          return npc;
        }
      });
      onEdit({ ...group, npcs: newNpclList });
    }
  };

  const removeMonster = (oldMonster: string) => {
    if (group !== undefined) {
      let newMonsterlList = group.monsters
        .filter((monster: string) => monster !== oldMonster)
        .map((monster: string) => {
          return monster;
        });
      onEdit({ ...group, monsters: newMonsterlList });
    }
  };
  const addNewMonster = () => {
    if (group !== undefined) {
      let newMonsterlList = group.monsters.map((monster: string) => {
        return monster;
      });
      newMonsterlList.push("");
      onEdit({ ...group, monsters: newMonsterlList });
    }
  };
  const onChangeMonster = (newMonster: string, oldMonster: string) => {
    if (group !== undefined) {
      let newMonsterlList = group.monsters.map((monster: string) => {
        if (monster === oldMonster) {
          return newMonster;
        } else {
          return monster;
        }
      });
      onEdit({ ...group, monsters: newMonsterlList });
    }
  };

  const removePlayer = (oldPlayer: string) => {
    if (group !== undefined) {
      let newPlayerlList = group.players
        .filter((player: string) => player !== oldPlayer)
        .map((player: string) => {
          return player;
        });
      onEdit({ ...group, players: newPlayerlList });
    }
  };
  const addNewPlayer = () => {
    if (group !== undefined) {
      let newPlayerlList = group.players.map((player: string) => {
        return player;
      });
      newPlayerlList.push("");
      onEdit({ ...group, players: newPlayerlList });
    }
  };
  const onChangePlayer = (newPlayer: string, oldPlayer: string) => {
    if (group !== undefined) {
      let newPlayerlList = group.players.map((player: string) => {
        if (player === oldPlayer) {
          return newPlayer;
        } else {
          return player;
        }
      });
      onEdit({ ...group, players: newPlayerlList });
    }
  };

  const removeNote = (oldNote: Note) => {
    if (group !== undefined) {
      let newNotelList = group.notes
        .filter((note: Note) => note !== oldNote)
        .map((note: Note) => {
          return note;
        });
      onEdit({ ...group, notes: newNotelList });
    }
  };
  const addNewNote = () => {
    if (group !== undefined) {
      let newNotelList = group.notes.map((note: Note) => {
        return note;
      });
      newNotelList.push(new Note());
      onEdit({ ...group, notes: newNotelList });
    }
  };
  const onChangeNote = (field: string, newValue: string, oldNote: Note) => {
    if (group !== undefined) {
      let newNotelList = group.notes.map((note: Note) => {
        if (note === oldNote) {
          return { ...note, [field]: newValue };
        } else {
          return note;
        }
      });
      onEdit({ ...group, notes: newNotelList });
    }
  };

  return (
    <CenterWrapper>
      <TabBar
        children={["General", "Notes", "Players", "Npcs", "Monsters", "Relationships"]}
        onChange={(tab: string) => setTab(tab)}
        activeTab={activeTab}
      />
      {activeTab === "General" && (
        <View>
          <StringField
            value={group.name}
            label="Group Name"
            onChange={(name) => onEdit({ ...group, name: name })}
          />
          <StringField
            value={group.pic}
            label="Picture Link"
            icon={faImage}
            onChange={(pic) => onEdit({ ...group, pic: pic })}
          />
          <FieldGroup>
            <ImageImportField
              label="Picture"
              onFinished={(base64) => onEdit({ ...group, picBase64: base64 })}
            />
            <IconButton icon={faTrash} onClick={() => onEdit({ ...group, picBase64: "" })} />
          </FieldGroup>
          <StringField
            value={group.sources}
            label="Sources"
            icon={faLink}
            onChange={(sources) => onEdit({ ...group, sources: sources })}
          />
          <TextField
            value={group.description}
            label="Description"
            icon={faBookOpen}
            onChange={(description) => onEdit({ ...group, description: description })}
          />
        </View>
      )}
      {activeTab === "Notes" && (
        <>
          {group.notes !== undefined &&
            group.notes.map((note: Note, index: number) => {
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
      {activeTab === "Players" && (
        <>
          {group.players.map((player: string, index: number) => {
            return (
              <Container key={index}>
                <DataSelectField
                  optionTable={["chars"]}
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
      {activeTab === "Npcs" && (
        <>
          {group.npcs.map((npc: string, index: number) => {
            return (
              <Container key={index}>
                <DataSelectField
                  optionTable={["npcs"]}
                  value={npc}
                  label="Npc"
                  onChange={(newPlayer) => onChangeNpc(newPlayer, npc)}
                />
                <IconButton icon={faTrash} onClick={() => removeNpc(npc)} />
              </Container>
            );
          })}
          <TextButton text={"Add new Npc"} icon={faPlus} onClick={() => addNewNpc()} />
        </>
      )}
      {activeTab === "Monsters" && (
        <>
          {group.monsters.map((monster: string, index: number) => {
            return (
              <Container key={index}>
                <DataSelectField
                  optionTable={["monsters"]}
                  value={monster}
                  label="Monster"
                  onChange={(newMonster) => onChangeMonster(newMonster, monster)}
                />
                <IconButton icon={faTrash} onClick={() => removeMonster(monster)} />
              </Container>
            );
          })}
          <TextButton text={"Add new Monster"} icon={faPlus} onClick={() => addNewMonster()} />
        </>
      )}
      {activeTab === "Relationships" && (
        <Container>
          <FlowChart
            isEditable={true}
            initElements={group.flow}
            onEdit={(graph) => onEdit({ ...group, flow: graph })}
          />
        </Container>
      )}
    </CenterWrapper>
  );
};

export default GroupEditView;

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
