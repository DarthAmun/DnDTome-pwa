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
import Group from "../../../../data/campaign/Group";
import { remove, updateWithCallback } from "../../../../services/DatabaseService";

import BackButton from "../../../form_elements/BackButton";
import IconButton from "../../../form_elements/IconButton";
import GroupEditView from "./GroupEditView";
import GroupView from "./GroupView";
import { EditToggle, ToggleLeft, ToggleRight } from "../../../general_elements/ToggleStyle";

interface $Props {
  group: Group;
  isNew: boolean;
}

const GroupDetail = ({ group, isNew }: $Props) => {
  const [editMode, setMode] = useState<boolean>(isNew);
  const [groupObj, editGroup] = useState<Group>(group);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteGroup = (groupId: number | undefined) => {
    remove("groups", groupId);
    history.goBack();
  };

  useEffect(() => {
    if (groupObj !== group) {
      setUnsavedChanges(true);
    }
  }, [groupObj, group]);

  const updateGroup = (tableName: string, groupObj: Group) => {
    console.log(groupObj);
    updateWithCallback(tableName, groupObj, (result) => {
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

  const editAndSaveGroup = (group: Group) => {
    editGroup(group);
    updateGroup("groups", group);
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
            <IconButton onClick={() => updateGroup("groups", groupObj)} icon={faSave} />
            <IconButton onClick={() => deleteGroup(groupObj.id)} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode ? (
        <GroupEditView group={groupObj} onEdit={(value) => editGroup(value)} />
      ) : (
        <GroupView group={groupObj} onEdit={(value) => editAndSaveGroup(value)} />
      )}
    </>
  );
};

export default GroupDetail;

const TopBar = styled.div`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.main.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  min-width: calc(100% - 20px);
  height: 45px;
  padding: 10px;
  position: relative;
  z-index: 100;
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