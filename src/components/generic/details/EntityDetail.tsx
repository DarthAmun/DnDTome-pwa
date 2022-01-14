import { useState } from "react";
import { FaArrowLeft, FaClone, FaTrash } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup, Notification, Modal, toaster } from "rsuite";
import styled from "styled-components";
import BreadCrumbIcon from "../../general/BreadCrumbIcon";

import IEntity from "../../../data/IEntity";
import { remove, updateWithCallback, createNewWithId } from "../../../services/DatabaseService";

interface $Props {
  entity: IEntity;
  tableName: string;
  EntityDetails: any;
}

const EntityDetail = ({ entity, tableName, EntityDetails }: $Props) => {
  let history = useHistory();
  const [entityObj, editEntity] = useState<IEntity>(entity);

  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);

  const deleteEntity = () => {
    remove(tableName, entityObj.id);
    history.goBack();
    toaster.push(
      <Notification closable header={"Success"} type="success">
        Success: Deleted {entityObj.name}.
      </Notification>,
      { placement: "bottomStart" }
    );
  };

  const updateEntity = (entityObj: IEntity, msg: string) => {
    updateWithCallback(tableName, entityObj, (result) => {
      if (result > 0) {
        toaster.push(
          <Notification closable header={"Success"} type="success">
            Success: {msg}.
          </Notification>,
          { placement: "bottomStart" }
        );
      } else {
        toaster.push(
          <Notification closable header={"Error"} type="error">
            Error: Something went wrong!.
          </Notification>,
          { placement: "bottomStart" }
        );
      }
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

  return (
    <>
      <Modal open={showDeleteDialog} onClose={() => setDeleteDialog(false)}>
        <Modal.Header>
          <Modal.Title>Attention</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete '{entity.name}'?</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => deleteEntity()} appearance="primary">
            Yes, delete!
          </Button>
          <Button onClick={() => setDeleteDialog(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <TopBar>
        <BreadCrumbIcon />
        <ButtonGroup>
          <Button onClick={() => history.goBack()} size="lg">
            <FaArrowLeft />
          </Button>
          <Button onClick={() => duplicateEntity(entityObj)} size="lg">
            <FaClone />
          </Button>
          <Button onClick={() => setDeleteDialog(true)} size="lg">
            <FaTrash />
          </Button>
        </ButtonGroup>
      </TopBar>
      <EntityDetails
        entity={entityObj}
        isNew={false}
        onEdit={(value: any) => editAndSaveEntity(value, "Saved!")}
      />
    </>
  );
};

export default EntityDetail;

export const TopBar = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  flex: 1 1;
  width: 100%;
  max-width: calc(100% - 20px);
  height: 55px;
  padding: 10px;
  display: flex;
  align-items: flex-start;

  @media (max-width: 576px) {
    max-width: calc(100% - 20px);
  }
`;
