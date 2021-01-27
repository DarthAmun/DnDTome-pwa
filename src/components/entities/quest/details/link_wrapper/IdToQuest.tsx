import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import QuestDetail from "../QuestDetail";

type TParams = { id: string };

const IdToQuest = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [quest, loading, error] = useItem(db.quests, +match.params.id);

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && quest !== undefined && (
        <QuestDetail quest={quest} isNew={quest.name === "" ? true : false} />
      )}
    </>
  );
};

export default IdToQuest;
