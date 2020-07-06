import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../Database/MyDatabase";
import { useItemByAttr } from "../../Hooks/DexieHooks";
import { LoadingSpinner } from "../Loading";
import AppWrapper from "../AppWrapper";
import SpellDetail from "./SpellDetail";

type TParams = { name: string };

const LinkToSpell = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
// const [matchObj, setObj] = useState<RouteComponentProps<TParams>>();
  const db = new MyAppDatabase();
  const [spell, loading, error] = useItemByAttr(
    db.spells,
    "name",
    match.params.name
  );

  useEffect(() => {
    if (!loading && spell !== undefined)
      history.push("/spell-detail/" + spell.id);
    if (!loading && error) {
      history.goBack();
    }
  }, [error, history, loading, spell]);

  return (
    <AppWrapper>
      <LoadingSpinner />
    </AppWrapper>
  );

//   useEffect(() => {
//     if (!loading && spell !== undefined)

//   }, [error, history, loading, spell]);

// return <> {!error && !loading && <SpellDetail match={} />}</>;
};

export default LinkToSpell;
