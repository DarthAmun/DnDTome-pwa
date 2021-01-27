import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import QuestDetail from "../QuestDetail";
import Quest from "../../../../../data/campaign/Quest";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";

type TParams = { name: string };

const NameToQuest = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [quest, loading, error] = useItemByAttr(db.quests, "name", match.params.name);

  const createNewQuest = () => {
    let newQuest = new Quest(0, match.params.name);
    delete newQuest.id;
    createNewWithId("quests", newQuest, (id) => {
      history.push(`/quest-detail/id/${id}`);
    });
  };

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && quest === undefined && (
        <ErrorTile
          text={"No such quest exists. Want to creat such quest?"}
          buttonText={"Add"}
          onButton={() => createNewQuest()}
        />
      )}
      {!error && !loading && quest !== undefined && (
        <QuestDetail quest={quest} isNew={quest.name === "" ? true : false} />
      )}
    </>
  );
};

export default NameToQuest;
