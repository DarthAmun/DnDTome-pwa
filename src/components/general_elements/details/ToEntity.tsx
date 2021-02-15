import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import Details from "./Details";

import { LoadingSpinner } from "../../Loading";
import ErrorTile from "../ErrorTile";
import Campaign from "../../../data/campaign/Campaign";
import {
  createNewWithId,
  recivePromise,
  recivePromiseByAttribute,
} from "../../../services/DatabaseService";
import IEntity from "../../../data/IEntity";
import { useCallback } from "react";

type TParams = { id?: string; name?: string };

const ToEntity = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const [entityName, setEntityName] = useState<string>("");
  const [entity, setEntity] = useState<IEntity>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (entity !== undefined) {
      setLoading(true);
      setError(false);
      setEntityName("");
      setEntity(undefined);
    }
    // eslint-disable-next-line
  }, [match]);

  const makeEntity = useCallback(
    async (name: string) => {
      let newEntity: IEntity | undefined = undefined;
      if (match.params.name !== undefined)
        newEntity = await recivePromiseByAttribute(name + "s", "name", match.params.name);
      if (match.params.id !== undefined)
        newEntity = await recivePromise(name + "s", +match.params.id);
      setLoading(false);
      if (newEntity === undefined) {
        setError(true);
      } else {
        setEntityName(name);
        setEntity(newEntity);
      }
    },
    [match]
  );

  useEffect(() => {
    if (match !== undefined && entity === undefined) {
      let newMatch: string = match.path
        .split("/")
        .filter((match: string) => match.includes("-detail"))[0]
        .replaceAll("-detail", "");
      if (newMatch !== undefined) {
        makeEntity(newMatch);
      }
    }
  }, [match, makeEntity, entity]);

  const createNewEntity = () => {
    let newCampaign = new Campaign(0, match.params.name);
    delete newCampaign.id;
    createNewWithId(entityName + "s", newCampaign, (id) => {
      history.push(`/${entityName}-detail/id/${id}`);
    });
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && error && (
        <ErrorTile
          text={"No such campaign exists. Want to creat such campaign?"}
          buttonText={"Add"}
          onButton={() => createNewEntity()}
        />
      )}
      {!error && !loading && entity !== undefined ? (
        <Details
          entity={entity}
          tableName={entityName + "s"}
          isNew={entity.name === "" ? true : false}
          view={capitalize(entityName)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ToEntity;
