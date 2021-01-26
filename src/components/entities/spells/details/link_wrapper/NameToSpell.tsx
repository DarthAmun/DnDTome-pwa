import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import SpellDetail from "../SpellDetail";
import Spell from "../../../../../data/Spell";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";

type TParams = { name: string };

const NameToSpell = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [spell, loading, error] = useItemByAttr(db.spells, "name", match.params.name);

  const createNewSpell = () => {
    let newSpell = new Spell(match.params.name);
    delete newSpell.id;
    createNewWithId("spells", newSpell, (id) => {
      history.push(`/spell-detail/id/${id}`);
    });
  };

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && spell === undefined && (
        <ErrorTile
          text={"No such spell exists. Want to creat such spell?"}
          buttonText={"Add"}
          onButton={() => createNewSpell()}
        />
      )}
      {!error && !loading && spell !== undefined && (
        <SpellDetail spell={spell} isNew={spell.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToSpell;
