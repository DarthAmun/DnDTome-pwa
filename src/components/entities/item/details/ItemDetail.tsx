import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import {
  faArrowLeft,
  faSave,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import ItemView from "./ItemView";
import ItemEditView from "./ItemEditView";
import BackButton from "../../../form_elements/BackButton";
import Item from "../../../../data/Item";
import IconButton from "../../../form_elements/IconButton";
import { remove, updateWithCallback } from "../../../../services/DatabaseService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from "../../../general_elements/Dialog";
import { EditToggle, ToggleLeft, ToggleRight } from "../../../general_elements/ToggleStyle";

interface $Props {
  item: Item;
  isNew: boolean;
}

const ItemDetail = ({ item, isNew }: $Props) => {
  const [editMode, setMode] = useState<boolean>(isNew);
  const [itemObj, editItem] = useState<Item>(item);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteItem = () => {
    setDeleteDialog(true);
  };

  useEffect(() => {
    if (itemObj !== item) {
      setUnsavedChanges(true);
    }
  }, [itemObj, item]);

  const updateItem = (tableName: string, itemObj: Item) => {
    updateWithCallback(tableName, itemObj, (result) => {
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
          message={`Delete ${item.name}?`}
          icon={faExclamationTriangle}
          confirmeText={"Delete"}
          confirmeClick={() => {
            remove("items", item.id);
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
            <IconButton onClick={() => updateItem("items", itemObj)} icon={faSave} />
            <IconButton onClick={() => deleteItem()} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode ? (
        <ItemEditView item={itemObj} onEdit={(value) => editItem(value)} />
      ) : (
        <ItemView item={itemObj} />
      )}
    </>
  );
};

export default ItemDetail;

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