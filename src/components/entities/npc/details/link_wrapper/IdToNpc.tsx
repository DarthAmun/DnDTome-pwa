import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import NpcDetail from "../NpcDetail";

type TParams = { id: string };

const IdToNpc = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [npc, loading, error] = useItem(db.npcs, +match.params.id);

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && npc !== undefined && (
        <NpcDetail npc={npc} isNew={npc.name === "" ? true : false} />
      )}
    </>
  );
};

export default IdToNpc;
