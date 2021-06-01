import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import IEntity from "../../../data/IEntity";
import { remove, updateWithCallback, createNewWithId } from "../../../services/DatabaseService";

import {
  faArrowLeft,
  faSave,
  faTrash,
  faExclamationTriangle,
  faClone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackButton from "../../form_elements/BackButton";
import IconButton from "../../form_elements/IconButton";
import { EditToggle, ToggleLeft, ToggleRight } from "../ToggleStyle";
import { Dialog } from "../Dialog";

import CampaignEditView from "../../entities/campaigns/details/CampaignEditView";
import CampaignView from "../../entities/campaigns/details/CampaignView";
import ClasseEditView from "../../entities/classes/details/ClasseEditView";
import ClasseView from "../../entities/classes/details/ClasseView";
import EventEditView from "../../entities/events/details/EventEditView";
import EventView from "../../entities/events/details/EventView";
import GearEditView from "../../entities/gear/details/GearEditView";
import GearView from "../../entities/gear/details/GearView";
import GroupEditView from "../../entities/groups/details/GroupEditView";
import GroupView from "../../entities/groups/details/GroupView";
import ItemEditView from "../../entities/items/details/ItemEditView";
import ItemView from "../../entities/items/details/ItemView";
import BookEditView from "../../entities/library/details/BookEditView";
import BookView from "../../entities/library/details/BookView";
import LocationEditView from "../../entities/locations/details/LocationEditView";
import LocationView from "../../entities/locations/details/LocationView";
import MonsterEditView from "../../entities/monsters/details/MonsterEditView";
import MonsterView from "../../entities/monsters/details/MonsterView";
import NpcEditView from "../../entities/npcs/details/NpcEditView";
import NpcView from "../../entities/npcs/details/NpcView";
import QuestEditView from "../../entities/quests/details/QuestEditView";
import QuestView from "../../entities/quests/details/QuestView";
import RaceEditView from "../../entities/races/details/RaceEditView";
import RaceView from "../../entities/races/details/RaceView";
import RandomTableEditView from "../../entities/random_tables/details/RandomTableEditView";
import RandomTableView from "../../entities/random_tables/details/RandomTableView";
import SelectionEditView from "../../entities/selections/details/SelectionEditView";
import SelectionView from "../../entities/selections/details/SelectionView";
import SpellEditView from "../../entities/spells/details/SpellEditView";
import SpellView from "../../entities/spells/details/SpellView";
import SubclasseEditView from "../../entities/subclasses/details/SubclasseEditView";
import SubclasseView from "../../entities/subclasses/details/SubclasseView";
import SubraceEditView from "../../entities/subraces/details/SubraceEditView";
import SubraceView from "../../entities/subraces/details/SubraceView";
import WorldEditView from "../../entities/worlds/details/WorldEditView";
import WorldView from "../../entities/worlds/details/WorldView";
import FeatEditView from "../../entities/feats/details/FeatEditView";
import FeatView from "../../entities/feats/details/FeatView";
import BackgroundEditView from "../../entities/backgrounds/details/BackgroundEditView";
import BackgroundView from "../../entities/backgrounds/details/BackgroundView";
import NoteView from "../../entities/notes/details/NoteView";
import NoteEditView from "../../entities/notes/details/NoteEditView";

interface $Props {
  entity: IEntity;
  tableName: string;
  isNew: boolean;
  view: string;
}

const EntityDetail = ({ entity, tableName, isNew, view }: $Props) => {
  const [editMode, setMode] = useState<boolean>(isNew);

  const [entityObj, editEntity] = useState<IEntity>(entity);

  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteEntity = (entityId: number | undefined) => {
    remove(tableName, entityId);
    history.goBack();
  };

  useEffect(() => {
    if (entityObj !== entity) {
      setUnsavedChanges(true);
    }
  }, [entityObj, entity]);

  const updateEntity = (entityObj: IEntity, msg: string) => {
    updateWithCallback(tableName, entityObj, (result) => {
      if (result > 0) {
        setUnsavedChanges(false);
        setMessage(msg);
        setAlert(true);
      } else {
        setMessage("Something went wrong!");
        setAlert(true);
      }
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    });
  };

  const duplicateEntity = (obj: IEntity) => {
    let newObj = { ...obj };
    delete newObj.id;
    createNewWithId(tableName, newObj, (id) => {
      editAndSaveEntity({ ...entity, name: entity.name + " [Clone]" }, "Cloning successful!");
    });
  };

  const editAndSaveEntity = (entity: IEntity, msg: string) => {
    editEntity(entity);
    updateEntity(entity, msg);
  };

  const views = {
    CampaignView: CampaignView,
    CampaignEditView: CampaignEditView,
    ClasseView: ClasseView,
    ClasseEditView: ClasseEditView,
    EventView: EventView,
    EventEditView: EventEditView,
    GearView: GearView,
    GearEditView: GearEditView,
    GroupView: GroupView,
    GroupEditView: GroupEditView,
    ItemView: ItemView,
    ItemEditView: ItemEditView,
    BookView: BookView,
    BookEditView: BookEditView,
    LocationView: LocationView,
    LocationEditView: LocationEditView,
    MonsterView: MonsterView,
    MonsterEditView: MonsterEditView,
    NpcView: NpcView,
    NpcEditView: NpcEditView,
    QuestView: QuestView,
    QuestEditView: QuestEditView,
    RaceView: RaceView,
    RaceEditView: RaceEditView,
    RandomTableView: RandomTableView,
    RandomTableEditView: RandomTableEditView,
    SelectionView: SelectionView,
    SelectionEditView: SelectionEditView,
    SpellView: SpellView,
    SpellEditView: SpellEditView,
    SubclasseView: SubclasseView,
    SubclasseEditView: SubclasseEditView,
    SubraceView: SubraceView,
    SubraceEditView: SubraceEditView,
    WorldView: WorldView,
    WorldEditView: WorldEditView,
    FeatView: FeatView,
    FeatEditView: FeatEditView,
    BackgroundView: BackgroundView,
    BackgroundEditView: BackgroundEditView,
    NoteView: NoteView,
    NoteEditView: NoteEditView,
  };

  return (
    <>
      {showDeleteDialog && (
        <Dialog
          message={`Delete ${entity.name}?`}
          icon={faExclamationTriangle}
          confirmeText={"Delete"}
          confirmeClick={() => {
            remove(tableName, entity.id);
            history.goBack();
          }}
          abortText={"Back"}
          abortClick={() => {
            setDeleteDialog(false);
          }}
        />
      )}
      <TopBar>
        <BackButton icon={faArrowLeft} action={() => history.goBack()} />
        <EditToggle mode={editMode.toString()}>
          <ToggleLeft onClick={() => setMode(false)}>View</ToggleLeft>
          <ToggleRight onClick={() => setMode(true)}>Edit</ToggleRight>
        </EditToggle>
        {editMode && unsavedChanges && <Icon icon={faExclamationTriangle} />}
        {editMode && (
          <>
            <IconButton
              onClick={() => updateEntity(entityObj, "Saved successful!")}
              icon={faSave}
            />
            <IconButton onClick={() => duplicateEntity(entityObj)} icon={faClone} />
            <IconButton onClick={() => deleteEntity(entityObj.id)} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode
        ? React.createElement(views[view + "EditView"], {
            [view.toLocaleLowerCase()]: entityObj,
            onEdit: (value: any) => editEntity(value),
          })
        : React.createElement(views[view + "View"], {
            [view.toLocaleLowerCase()]: entityObj,
            onEdit: (value: any) => editAndSaveEntity(value, "Saved successful!"),
          })}
    </>
  );
};

export default EntityDetail;

const TopBar = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  overflow: hidden;
  flex: 1 1;
  width: 100%;
  max-width: calc(100% - 20px);
  height: 45px;
  padding: 10px;

  @media (max-width: 576px) {
    max-width: calc(100% - 20px);
  }
`;

const Message = styled.div`
  padding: 5px;
  width: 150px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  float: right;
`;

const Icon = styled(FontAwesomeIcon)`
  float: right;
  line-height: 30px;
  display: block;
  height: 30px;
  padding: 10px;
  color: ${({ theme }) => theme.main.highlight};
`;
