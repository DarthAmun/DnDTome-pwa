import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import NpcDetail from "../NpcDetail";

type TParams = { name: string };

const NameToNpc = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [npc, loading, error] = useItemByAttr(
    db.npcs,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && npc !== undefined && (
        <NpcDetail npc={npc} isNew={npc.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToNpc;
