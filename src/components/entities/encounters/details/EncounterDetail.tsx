import {
  faArrowLeft,
  faClone,
  faExclamationTriangle,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Encounter from "../../../../data/encounter/Encounter";
import { createNewWithId, remove, updateWithCallback } from "../../../../services/DatabaseService";
import BackButton from "../../../form_elements/BackButton";
import IconButton from "../../../form_elements/IconButton";
import { EditToggle, ToggleLeft, ToggleRight } from "../../../general_elements/ToggleStyle";
import P2PEncounter from "../../../p2p/P2PEncounter";
import EncounterEditView from "./EncounterEditView";
import EncounterView from "./EncounterView";

interface $Props {
  encounter: Encounter;
  isNew: boolean;
}

const EncounterDetail = ({ encounter, isNew }: $Props) => {
  const [editMode, setMode] = useState<boolean>(isNew);
  const [dmMode, setDmMode] = useState<boolean>(true);
  const [encounterObj, editEncounter] = useState<Encounter>(encounter);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteEncounter = (encounterId: number | undefined) => {
    remove("encounters", encounterId);
    history.goBack();
  };

  useEffect(() => {
    if (encounterObj !== encounter) {
      setUnsavedChanges(true);
    }
  }, [encounterObj, encounter]);

  const updateEncounter = (tableName: string, encounterObj: Encounter, msg: string) => {
    updateWithCallback(tableName, encounterObj, (result) => {
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

  const duplicateEncounter = (tableName: string, obj: Encounter) => {
    let newObj = { ...obj };
    delete newObj.id;
    createNewWithId(tableName, newObj, (id) => {
      editAndSaveEncounter(
        { ...encounter, name: encounter.name + " [Clone]" },
        "Cloning successful!"
      );
    });
  };

  const editAndSaveEncounter = (encounter: Encounter, msg: string) => {
    editEncounter(encounter);
    updateEncounter("encounters", encounter, msg);
  };

  return (
    <>
      <TopBar>
        <BackButton icon={faArrowLeft} action={() => history.goBack()} />
        <EditToggle mode={editMode.toString()}>
          <ToggleLeft onClick={() => setMode(false)}>View</ToggleLeft>
          <ToggleRight onClick={() => setMode(true)}>Edit</ToggleRight>
        </EditToggle>
        {!editMode && (
          <EditToggle mode={(!dmMode).toString()}>
            <ToggleLeft onClick={() => setDmMode(true)}>DM</ToggleLeft>
            <ToggleRight onClick={() => setDmMode(false)}>Player</ToggleRight>
          </EditToggle>
        )}
        {editMode && unsavedChanges && <Icon icon={faExclamationTriangle} />}
        {editMode && (
          <>
            <IconButton
              onClick={() => updateEncounter("encounters", encounterObj, "Saved successful!")}
              icon={faSave}
            />
            <IconButton
              onClick={() => duplicateEncounter("encounters", encounterObj)}
              icon={faClone}
            />
            <IconButton onClick={() => deleteEncounter(encounterObj.id)} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
        <P2PEncounter
          encounter={encounterObj}
          onEdit={(value) => editEncounter(value)}
          isHost={true}
        />
      </TopBar>
      {editMode ? (
        <EncounterEditView encounter={encounterObj} onEdit={(value) => editEncounter(value)} />
      ) : (
        <EncounterView
          encounter={encounterObj}
          dmView={dmMode}
          onEdit={(value) => editAndSaveEncounter(value, "Saved successful!")}
        />
      )}
    </>
  );
};

export default EncounterDetail;

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
