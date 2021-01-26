import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import MonsterDetail from "../MonsterDetail";
import Monster from "../../../../../data/Monster";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";

type TParams = { name: string };

const NameToMonster = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [monster, loading, error] = useItemByAttr(db.monsters, "name", match.params.name);

  const createNewMonster = () => {
    let newMonster = new Monster(0, match.params.name);
    delete newMonster.id;
    createNewWithId("monsters", newMonster, (id) => {
      history.push(`/monster-detail/id/${id}`);
    });
  };

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && monster === undefined && (
        <ErrorTile
          text={"No such monster exists. Want to creat such monster?"}
          buttonText={"Add"}
          onButton={() => createNewMonster()}
        />
      )}
      {!error && !loading && monster !== undefined && (
        <MonsterDetail monster={monster} isNew={monster.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToMonster;
