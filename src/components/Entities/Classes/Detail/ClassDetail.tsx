import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import {
  faArrowLeft,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ClassView from "./ClassView";
import ClassEditView from "./ClassEditView";
import BackButton from "../../../FormElements/BackButton";
import Class from "../../../../Data/Class";
import IconButton from "../../../FormElements/IconButton";
import { update, remove } from "../../../../Database/DbService";

interface $Props {
  classe: Class;
}

const ClassDetail = ({ classe }: $Props) => {
  const [editMode, setMode] = useState<boolean>(false);
  const [classeObj, editClass] = useState<Class>(classe);
  let history = useHistory();

  useEffect(() => {
    console.log("saved")
  }, [classeObj]);

  const deleteClass = (classeId: number | undefined) => {
    remove("classes", classeId);
    history.goBack();
  };

  return (
    <>
      <TopBar>
        <BackButton icon={faArrowLeft} action={() => history.goBack()} />
        <EditToggle mode={editMode.toString()}>
          <ToggleLeft onClick={() => setMode(false)}>View</ToggleLeft>
          <ToggleRight onClick={() => setMode(true)}>Edit</ToggleRight>
        </EditToggle>
        {editMode && (
          <>
            <IconButton
              onClick={() => update("classes", classeObj)}
              icon={faSave}
            />
            <IconButton
              onClick={() => deleteClass(classeObj.id)}
              icon={faTrash}
            />
          </>
        )}
      </TopBar>
      {editMode ? (
        <ClassEditView
          classe={classeObj}
          onEdit={(value) => editClass(value)}
        />
      ) : (
        <ClassView classe={classeObj} />
      )}
    </>
  );
};

export default ClassDetail;

const TopBar = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  overflow: hidden;
  flex: 1 1;
  min-width: calc(100% - 20px);
  height: 45px;
  padding: 10px;
`;

const ToggleLeft = styled.div`
  width: auto;
  padding: 10px;
  margin: 5px 0px 5px 5px;
  height: ${({ theme }) => theme.buttons.height};
  line-height: ${({ theme }) => theme.buttons.height};
  float: left;
  cursor: pointer;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px 0px 0px 5px;

  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: white;
  }
`;

const ToggleRight = styled(ToggleLeft)`
  margin: 5px 5px 5px 0px;

  border-radius: 0px 5px 5px 0px;
`;

type EditMode = {
  mode: string;
};

const EditToggle = styled.div<EditMode>`
  width: auto;
  height: ${({ theme }) => theme.buttons.height};
  float: right;
  color: ${({ theme }) => theme.buttons.color};

  ${ToggleLeft} {
    background-color:
    ${(props) => {
      if (props.mode !== "true") {
        return ({ theme }) => theme.buttons.backgroundColor;
      } else {
        return ({ theme }) => theme.tile.backgroundColor;
      }
    }}}
    ;
  }

  ${ToggleRight} {
    background-color:
    ${(props) => {
      if (props.mode === "true") {
        return ({ theme }) => theme.buttons.backgroundColor;
      } else {
        return ({ theme }) => theme.tile.backgroundColor;
      }
    }}}
    ;
  }
`;
