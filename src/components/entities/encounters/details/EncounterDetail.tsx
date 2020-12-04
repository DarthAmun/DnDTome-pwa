import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import {
  faArrowLeft,
  faSave,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Encounter from "../../../../data/encounter/Encounter";
import { remove, updateWithCallback } from "../../../../services/DatabaseService";

import BackButton from "../../../form_elements/BackButton";
import IconButton from "../../../form_elements/IconButton";
import EncounterEditView from "./EncounterEditView";
import EncounterView from "./EncounterView";
import { EditToggle, ToggleLeft, ToggleRight } from "../../../general_elements/Toggle";

interface $Props {
  encounter: Encounter;
}

const EncounterDetail = ({ encounter }: $Props) => {
  const [editMode, setMode] = useState<boolean>(false);
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

  const updateEncounter = (tableName: string, encounterObj: Encounter) => {
    updateWithCallback(tableName, encounterObj, (result) => {
      if (result > 0) {
        setUnsavedChanges(false);
        setMessage("Saved successful!");
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

  const editAndSaveEncounter = (encounter: Encounter) => {
    editEncounter(encounter);
    updateEncounter("encounters", encounter);
  };

  return (
    <>
      <TopBar>
        <BackButton icon={faArrowLeft} action={() => history.goBack()} />
        <EditToggle mode={editMode.toString()}>
          <ToggleLeft onClick={() => setMode(false)}>View</ToggleLeft>
          <ToggleRight onClick={() => setMode(true)}>Edit</ToggleRight>
        </EditToggle>
        {editMode && unsavedChanges && <Icon icon={faExclamationTriangle} />}
        {editMode && (
          <>
            <IconButton onClick={() => updateEncounter("encounters", encounterObj)} icon={faSave} />
            <IconButton onClick={() => deleteEncounter(encounterObj.id)} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode ? (
        <EncounterEditView encounter={encounterObj} onEdit={(value) => editEncounter(value)} />
      ) : (
        <EncounterView encounter={encounterObj} onEdit={(value) => editAndSaveEncounter(value)} />
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
  min-width: calc(100% - 20px);
  height: 45px;
  padding: 10px;
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
