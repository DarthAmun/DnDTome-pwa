import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import QuestDetail from "../QuestDetail";

type TParams = { name: string };

const NameToQuest = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [quest, loading, error] = useItemByAttr(
    db.quests,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && quest !== undefined && (
        <QuestDetail quest={quest} isNew={quest.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToQuest;
