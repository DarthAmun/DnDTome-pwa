import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import NpcDetail from "../NpcDetail";
import Npc from "../../../../../data/campaign/Npc";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";

type TParams = { name: string };

const NameToNpc = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [npc, loading, error] = useItemByAttr(db.npcs, "name", match.params.name);

  const createNewNpc = () => {
    let newNpc = new Npc(0, match.params.name);
    delete newNpc.id;
    createNewWithId("npcs", newNpc, (id) => {
      history.push(`/npc-detail/id/${id}`);
    });
  };

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && npc === undefined && (
        <ErrorTile
          text={"No such npc exists. Want to creat such npc?"}
          buttonText={"Add"}
          onButton={() => createNewNpc()}
        />
      )}
      {!error && !loading && npc !== undefined && (
        <NpcDetail npc={npc} isNew={npc.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToNpc;
