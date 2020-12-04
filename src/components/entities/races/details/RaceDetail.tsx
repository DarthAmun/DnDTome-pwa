import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import {
  faArrowLeft,
  faSave,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import RaceView from "./RaceView";
import RaceEditView from "./RaceEditView";
import BackButton from "../../../form_elements/BackButton";
import Race from "../../../../data/races/Race";
import IconButton from "../../../form_elements/IconButton";
import { remove, updateWithCallback } from "../../../../services/DatabaseService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from "../../../general_elements/Dialog";
import { EditToggle, ToggleLeft, ToggleRight } from "../../../general_elements/ToggleStyle";

interface $Props {
  race: Race;
  isNew: boolean;
}

const RaceDetail = ({ race, isNew }: $Props) => {
  const [editMode, setMode] = useState<boolean>(isNew);
  const [raceObj, editRace] = useState<Race>(race);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteRace = () => {
    setDeleteDialog(true);
  };

  useEffect(() => {
    if (raceObj !== race) {
      setUnsavedChanges(true);
    }
  }, [raceObj, race]);

  const updateRace = (tableName: string, raceObj: Race) => {
    updateWithCallback(tableName, raceObj, (result) => {
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

  return (
    <>
      {showDeleteDialog && (
        <Dialog
          message={`Delete ${race.name}?`}
          icon={faExclamationTriangle}
          confirmeText={"Delete"}
          confirmeClick={() => {
            remove("races", race.id);
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
        {unsavedChanges && <Icon icon={faExclamationTriangle} title={"Unsaved changes!"} />}
        {editMode && (
          <>
            <IconButton onClick={() => updateRace("races", raceObj)} icon={faSave} />
            <IconButton onClick={() => deleteRace()} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode ? (
        <RaceEditView race={raceObj} onEdit={(value) => editRace(value)} />
      ) : (
        <RaceView race={raceObj} />
      )}
    </>
  );
};

export default RaceDetail;

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
