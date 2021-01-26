import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import {
  faArrowLeft,
  faSave,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import EventView from "./EventView";
import EventEditView from "./EventEditView";
import BackButton from "../../../form_elements/BackButton";
import Event from "../../../../data/world/Event";
import IconButton from "../../../form_elements/IconButton";
import { remove, updateWithCallback } from "../../../../services/DatabaseService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from "../../../general_elements/Dialog";
import { EditToggle, ToggleLeft, ToggleRight } from "../../../general_elements/ToggleStyle";

interface $Props {
  event: Event;
  isNew: boolean;
}

const EventDetail = ({ event, isNew }: $Props) => {
  const [editMode, setMode] = useState<boolean>(isNew);
  const [eventObj, editEvent] = useState<Event>(event);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteEvent = () => {
    setDeleteDialog(true);
  };

  useEffect(() => {
    if (eventObj !== event) {
      setUnsavedChanges(true);
    }
  }, [eventObj, event]);

  const updateEvent = (tableName: string, eventObj: Event) => {
    updateWithCallback(tableName, eventObj, (result) => {
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
          message={`Delete ${event.name}?`}
          icon={faExclamationTriangle}
          confirmeText={"Delete"}
          confirmeClick={() => {
            remove("events", event.id);
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
            <IconButton onClick={() => updateEvent("events", eventObj)} icon={faSave} />
            <IconButton onClick={() => deleteEvent()} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode ? (
        <EventEditView event={eventObj} onEdit={(value) => editEvent(value)} />
      ) : (
        <EventView event={eventObj} />
      )}
    </>
  );
};

export default EventDetail;

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
