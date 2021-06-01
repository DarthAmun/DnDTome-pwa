import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { useQuery } from "../../../hooks/QueryHook";

import { LoadingSpinner } from "../../Loading";
import Details from "./EntityDetail";
import ErrorTile from "../ErrorTile";
import Campaign from "../../../data/campaign/Campaign";
import {
  createNewWithId,
  recivePromise,
  recivePromiseByAttribute,
  recivePromiseByMultiAttribute,
} from "../../../services/DatabaseService";
import IEntity from "../../../data/IEntity";
import Book from "../../../data/Book";
import Group from "../../../data/campaign/Group";
import Npc from "../../../data/campaign/Npc";
import Quest from "../../../data/campaign/Quest";
import Gear from "../../../data/Gear";
import Item from "../../../data/Item";
import Monster from "../../../data/Monster";
import Race from "../../../data/races/Race";
import Subrace from "../../../data/races/Subrace";
import RandomTable from "../../../data/RandomTable";
import Spell from "../../../data/Spell";
import World from "../../../data/world/World";
import Class from "../../../data/classes/Class";
import Subclass from "../../../data/classes/Subclass";
import Event from "../../../data/world/Event";
import Selection from "../../../data/Selection";
import Location from "../../../data/world/Location";
import Feat from "../../../data/Feat";
import Background from "../../../data/Background";
import Note from "../../../data/Note";

type TParams = { id?: string; name?: string };

const ToEntity = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
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

  const entities = {
    campaign: new Campaign(0, match.params.name),
    classe: new Class(0, match.params.name),
    event: new Event(0, match.params.name),
    gear: new Gear(0, match.params.name),
    group: new Group(0, match.params.name),
    item: new Item(0, match.params.name),
    book: new Book(0, match.params.name),
    location: new Location(0, match.params.name),
    monster: new Monster(0, match.params.name),
    npc: new Npc(0, match.params.name),
    quest: new Quest(0, match.params.name),
    race: new Race(match.params.name),
    randomTable: new RandomTable(0, match.params.name),
    selection: new Selection(0, match.params.name),
    spell: new Spell(match.params.name),
    subclasse: new Subclass(0, match.params.name),
    subrace: new Subrace(match.params.name),
    world: new World(0, match.params.name),
    feat: new Feat(0, match.params.name),
    background: new Background(0, match.params.name),
    note: new Note(0, match.params.name),
  };

  const createNewEntity = () => {
    let newEntity: IEntity = entities[entityName];
    delete newEntity.id;
    createNewWithId(entityName + "s", newEntity, (id) => {
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
