import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useQuery } from "../../../hooks/QueryHook";

import Details from "./EntityDetail";
import {
  recivePromise,
  recivePromiseByAttribute,
  recivePromiseByMultiAttribute,
} from "../../../services/DatabaseService";
import IEntity from "../../../data/IEntity";
import { Loader } from "rsuite";
import { TParams } from "../../../App";

interface $EntityProps {
  entityName: string;
  Entity: any;
  EntityDetails: any;
  match: RouteComponentProps<TParams>;
}

const ToEntity = ({ match, entityName, Entity, EntityDetails }: $EntityProps) => {
  const editmode = useQuery().get("editMode");
  const [entity, setEntity] = useState<typeof Entity>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (entity !== undefined || error) {
      setLoading(true);
      setError(false);
      setEntity(undefined);
    }
    // eslint-disable-next-line
  }, [match]);

  const makeEntity = useCallback(async () => {
    let nameId: string | undefined = match.match.params.name;
    let newEntity: typeof Entity | undefined = undefined;
    var reg = /^\d+$/;
    if (nameId !== undefined) {
      if (!reg.test(nameId)) {
        let [name, sources] = nameId.split("|");
        if (sources !== undefined) {
          newEntity = await recivePromiseByMultiAttribute(entityName + "s", {
            name: name,
            sources: sources,
          });
        } else {
          newEntity = await recivePromiseByAttribute(entityName + "s", "name", name);
        }
      } else {
        newEntity = await recivePromise(entityName + "s", +nameId);
      }
    }
    setLoading(false);
    if (newEntity === undefined) {
      setError(true);
    } else {
      setEntity(newEntity);
    }
  }, [match]);

  useEffect(() => {
    if (match.match !== undefined && entity === undefined) {
      makeEntity();
    }
  }, [match, makeEntity, entity]);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      {loading && <Loader center content="Loading..." />}
      {!loading && error && <>Error</>}
      {!error && !loading && entity !== undefined && (
        <Details
          EntityDetails={EntityDetails}
          entity={entity}
          tableName={entityName + "s"}
          isNew={editmode !== null ? true : false}
          view={capitalize(entityName)}
        />
      )}
    </>
  );
};

export default ToEntity;
