import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import {
  faArrowLeft,
  faSave,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import QuestView from "./QuestView";
import QuestEditView from "./QuestEditView";
import BackButton from "../../../form_elements/BackButton";
import Quest from "../../../../data/campaign/Quest";
import IconButton from "../../../form_elements/IconButton";
import { remove, updateWithCallback } from "../../../../services/DatabaseService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from "../../../general_elements/Dialog";
import { EditToggle, ToggleLeft, ToggleRight } from "../../../general_elements/ToggleStyle";

interface $Props {
  quest: Quest;
  isNew: boolean;
}

const QuestDetail = ({ quest, isNew }: $Props) => {
  const [editMode, setMode] = useState<boolean>(isNew);
  const [questObj, editQuest] = useState<Quest>(quest);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteQuest = () => {
    setDeleteDialog(true);
  };

  useEffect(() => {
    if (questObj !== quest) {
      setUnsavedChanges(true);
    }
  }, [questObj, quest]);

  const updateQuest = (tableName: string, questObj: Quest) => {
    updateWithCallback(tableName, questObj, (result) => {
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
          message={`Delete ${quest.name}?`}
          icon={faExclamationTriangle}
          confirmeText={"Delete"}
          confirmeClick={() => {
            remove("quests", quest.id);
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
            <IconButton onClick={() => updateQuest("quests", questObj)} icon={faSave} />
            <IconButton onClick={() => deleteQuest()} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode ? (
        <QuestEditView quest={questObj} onEdit={(value) => editQuest(value)} />
      ) : (
        <QuestView quest={questObj} />
      )}
    </>
  );
};

export default QuestDetail;

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
