import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { LoadingSpinner } from "../Loading";
import AppWrapper from "../AppWrapper";
import { MyAppDatabase } from "../../Database/MyDatabase";
import { useItem } from "../../Hooks/DexieHooks";

type TParams = { id: string };

const SpellDetail = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [spell, loading, error] = useItem(db.spells, +match.params.id);

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {!error && !loading && spell !== undefined ? (
        <Details>

        </Details>
      ) : (
        <>Fail</>
      )}
      {error && <>Fail</>}
    </AppWrapper>
  );
};

export default SpellDetail;

const Details = styled.div``;
