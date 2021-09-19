import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaClone, FaExclamationTriangle, FaSave, FaTrash } from "react-icons/fa";
import { useHistory } from "react-router";
import { Button, ButtonGroup } from "rsuite";
import styled from "styled-components";

import IEntity from "../../../data/IEntity";
import { remove, updateWithCallback, createNewWithId } from "../../../services/DatabaseService";

interface $Props {
  entity: IEntity;
  tableName: string;
  isNew: boolean;
  view: string;
  EntityDetails: any;
}

const EntityDetail = ({ entity, tableName, isNew, view, EntityDetails }: $Props) => {
  const [editMode, setMode] = useState<boolean>(isNew);

  const [entityObj, editEntity] = useState<IEntity>(entity);

  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteEntity = (entityId: number | undefined) => {
    remove(tableName, entityId);
    history.goBack();
  };

  useEffect(() => {
    if (entityObj !== entity) {
      setUnsavedChanges(true);
    }
  }, [entityObj, entity]);

  const updateEntity = (entityObj: IEntity, msg: string) => {
    updateWithCallback(tableName, entityObj, (result) => {
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

  const duplicateEntity = (obj: IEntity) => {
    let newObj = { ...obj };
    delete newObj.id;
    createNewWithId(tableName, newObj, (id) => {
      editAndSaveEntity({ ...entity, name: entity.name + " [Clone]" }, "Cloning successful!");
    });
  };

  const editAndSaveEntity = (entity: IEntity, msg: string) => {
    editEntity(entity);
    updateEntity(entity, msg);
  };

  const views = {};

  return (
    <>
      {/* {showDeleteDialog && (
        <Dialog
          message={`Delete ${entity.name}?`}
          icon={faExclamationTriangle}
          confirmeText={"Delete"}
          confirmeClick={() => {
            remove(tableName, entity.id);
            history.goBack();
          }}
          abortText={"Back"}
          abortClick={() => {
            setDeleteDialog(false);
          }}
        />
      )} */}
      <TopBar>
        <ButtonGroup>
          <Button onClick={() => history.goBack()}>
            <FaArrowLeft />
          </Button>
          <Button onClick={() => duplicateEntity(entityObj)}>
            <FaClone />
          </Button>
          <Button onClick={() => deleteEntity(entityObj.id)}>
            <FaTrash />
          </Button>
        </ButtonGroup>
        {message && showAlert && <Message>{message}</Message>}
      </TopBar>
      <EntityDetails
        entity={entityObj}
        onEdit={(value: any) => editAndSaveEntity(value, "Saved successful!")}
      />
    </>
  );
};

export default EntityDetail;

export const TopBar = styled.div`
  color: ${({ theme }) => theme.textColor};
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

const Icon = styled.div`
  float: right;
  line-height: 30px;
  display: block;
  height: 30px;
  padding: 10px;
  color: ${({ theme }) => theme.highlight};
`;
