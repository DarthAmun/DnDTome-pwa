import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import RandomTable from "../../../../data/RandomTable";
import { remove, updateWithCallback } from "../../../../services/DatabaseService";

import {
  faArrowLeft,
  faSave,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RandomTableView from "./RandomTableView";
import RandomTableEditView from "./RandomTableEditView";
import BackButton from "../../../form_elements/BackButton";
import IconButton from "../../../form_elements/IconButton";
import Dialog from "../../../general_elements/Dialog";
import { EditToggle, ToggleLeft, ToggleRight } from "../../../general_elements/ToggleStyle";

interface $Props {
  randomTable: RandomTable;
  isNew: boolean;
}

const RandomTableDetail = ({ randomTable, isNew }: $Props) => {
  const [editMode, setMode] = useState<boolean>(isNew);
  const [randomTableObj, editRandomTable] = useState<RandomTable>(randomTable);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteRandomTable = () => {
    setDeleteDialog(true);
  };

  useEffect(() => {
    if (randomTableObj !== randomTable) {
      setUnsavedChanges(true);
    }
  }, [randomTableObj, randomTable]);

  const updateRandomTable = (tableName: string, randomTableObj: RandomTable) => {
    updateWithCallback(tableName, randomTableObj, (result) => {
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
          message={`Delete ${randomTable.name}?`}
          icon={faExclamationTriangle}
          confirmeText={"Delete"}
          confirmeClick={() => {
            remove("randomTables", randomTable.id);
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
            <IconButton
              onClick={() => updateRandomTable("randomTables", randomTableObj)}
              icon={faSave}
            />
            <IconButton onClick={() => deleteRandomTable()} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode ? (
        <RandomTableEditView
          randomTable={randomTableObj}
          onEdit={(value) => editRandomTable(value)}
        />
      ) : (
        <RandomTableView randomTable={randomTableObj} />
      )}
    </>
  );
};

export default RandomTableDetail;

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
