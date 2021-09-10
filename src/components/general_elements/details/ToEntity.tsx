import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useQuery } from "../../../hooks/QueryHook";

import { LoadingSpinner } from "../../general/Loading";
import Details from "./EntityDetail";
import {
  recivePromise,
  recivePromiseByAttribute,
  recivePromiseByMultiAttribute,
} from "../../../services/DatabaseService";
import IEntity from "../../../data/IEntity";

type TParams = { id?: string; name?: string };

const ToEntity = ({ match }: RouteComponentProps<TParams>) => {
  const editmode = useQuery().get("editMode");
  const [entityName, setEntityName] = useState<string>("");
  const [entity, setEntity] = useState<IEntity>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    console.log(editmode);
    if (entity !== undefined || error) {
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
      if (match.params.name !== undefined) {
        let [entityName, sources] = match.params.name.split("|");
        if (sources !== undefined) {
          newEntity = await recivePromiseByMultiAttribute(name + "s", {
            name: entityName,
            sources: sources,
          });
        } else {
          newEntity = await recivePromiseByAttribute(name + "s", "name", entityName);
        }
      }
      if (match.params.id !== undefined)
        newEntity = await recivePromise(name + "s", +match.params.id);
      setLoading(false);
      if (newEntity === undefined) {
        setEntityName(name);
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

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && error && <>Error</>}
      {!error && !loading && entity !== undefined && (
        <Details
          entity={entity}
          tableName={entityName + "s"}
          isNew={entity.name === "" || editmode !== null ? true : false}
          view={capitalize(entityName)}
        />
      )}
    </>
  );
};

export default ToEntity;
