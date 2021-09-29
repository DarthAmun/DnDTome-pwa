import { useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup, Message, toaster } from "rsuite";
import { createNewWithId } from "../../../services/DatabaseService";
import { TopBar } from "./EntityDetail";

interface $BuilderProps {
  entityName: string;
  Entity: any;
  EntityDetails: any;
}

const EntityBuilder = ({ entityName, Entity, EntityDetails }: $BuilderProps) => {
  let history = useHistory();
  const [entityObj, onEdit] = useState<typeof Entity>(new Entity());

  const create = () => {
    let newEntity = { ...entityObj };
    delete newEntity.id;
    createNewWithId(entityName + "s", newEntity, (id: number) => {
      history.push(`/${entityName}-detail/${id}`);

      toaster.push(
        <Message showIcon type="success">
          Success: Created new {entityName} named {newEntity.name}.
        </Message>,
        { placement: "bottomStart" }
      );
    });
  };

  return (
    <>
      <TopBar>
        <ButtonGroup>
          <Button onClick={() => history.goBack()} size="lg">
            <FaArrowLeft />
          </Button>
          <Button onClick={() => create()} size="lg">
            <FaSave />
          </Button>
        </ButtonGroup>
      </TopBar>
      <EntityDetails entity={entityObj} onEdit={onEdit} isNew={true} />
    </>
  );
};

export default EntityBuilder;
