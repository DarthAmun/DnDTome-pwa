import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import EventDetail from "../EventDetail";
import Event from "../../../../../data/world/Event";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";

type TParams = { name: string };

const NameToEvent = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [event, loading, error] = useItemByAttr(db.events, "name", match.params.name);

  const createNewEvent = () => {
    let newEvent = new Event(0,match.params.name);
    delete newEvent.id;
    createNewWithId("events", newEvent, (id) => {
      history.push(`/event-detail/id/${id}`);
    });
  };

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && event === undefined && (
        <ErrorTile
          text={"No such event exists. Want to creat such event?"}
          buttonText={"Add"}
          onButton={() => createNewEvent()}
        />
      )}
      {!error && !loading && event !== undefined && (
        <EventDetail event={event} isNew={event.name === "" ? true : false} />
      )}
    </>
  );
};

export default NameToEvent;
