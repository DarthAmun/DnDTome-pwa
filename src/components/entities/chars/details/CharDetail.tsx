import {
  faArrowLeft,
  faClone,
  faExclamationTriangle,
  faList,
  faSave,
  faSlidersH,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import BuildChar from "../../../../data/chars/BuildChar";
import Char from "../../../../data/chars/Char";
import { recalcClasses } from "../../../../services/CharacterService";
import { createNewWithId, remove, updateWithCallback } from "../../../../services/DatabaseService";
import BackButton from "../../../form_elements/BackButton";
import IconButton from "../../../form_elements/IconButton";
import { Dialog } from "../../../general_elements/Dialog";
import { EditToggle, ToggleLeft, ToggleRight } from "../../../general_elements/ToggleStyle";
import CharEditView from "./CharEditView";
import CharView from "./CharView";

interface $Props {
  char: Char;
  isNew: boolean;
}

const CharDetail = ({ char, isNew }: $Props) => {
  const [editMode, setMode] = useState<boolean>(isNew);
  const [modMode, setModMode] = useState<boolean>(true);

  const [charObj, editChar] = useState<Char>(char);

  const [showAlert, setAlert] = useState<boolean>(false);
  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteChar = () => {
    setDeleteDialog(true);
  };

  useEffect(() => {
    if (charObj !== char) {
      setUnsavedChanges(true);
    }
  }, [charObj, char]);

  const updateChar = (tableName: string, charObj: Char, msg: string) => {
    recalcClasses(charObj)
      .then((updatedChar) => {
        editChar(updatedChar);
        updateWithCallback(tableName, updatedChar, (result) => {
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
      })
      .catch((error) => {
        setMessage("Something went wrong!");
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  };

  const duplicateChar = (tableName: string, obj: Char) => {
    let newObj = { ...obj };
    delete newObj.id;
    createNewWithId(tableName, newObj, () => {
      editAndSaveChar({ ...obj, name: obj.name + " [Clone]" }, "Cloning successful!");
    });
  };

  const editAndSaveChar = (obj: Char, msg: string) => {
    editChar(obj);
    updateChar("chars", obj, msg);
  };

  const save = (obj: BuildChar) => {
    editAndSaveChar(obj.oldCharacter, "Saved successful!");
  };

  return (
    <>
      {showDeleteDialog && (
        <Dialog
          message={`Delete ${char.name}?`}
          icon={faExclamationTriangle}
          confirmeText={"Delete"}
          confirmeClick={() => {
            remove("chars", char.id);
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
        {!editMode && (
          <EditToggle mode={(!modMode).toString()}>
            <ToggleLeft onClick={() => setModMode(true)}>
              <FontAwesomeIcon icon={faSlidersH} />
            </ToggleLeft>
            <ToggleRight onClick={() => setModMode(false)}>
              <FontAwesomeIcon icon={faList} />
            </ToggleRight>
          </EditToggle>
        )}
        {unsavedChanges && <Icon icon={faExclamationTriangle} title={"Unsaved changes!"} />}
        {editMode && (
          <>
            <IconButton
              onClick={() => updateChar("chars", charObj, "Saved successful!")}
              icon={faSave}
            />{" "}
            <IconButton onClick={() => duplicateChar("chars", charObj)} icon={faClone} />
            <IconButton onClick={() => deleteChar()} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode ? (
        <CharEditView character={charObj} onEdit={(value) => editChar(value)} />
      ) : (
        <CharView character={charObj} modifications={modMode} saveChar={save} />
      )}
    </>
  );
};

export default CharDetail;

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
