import React, { useState } from "react";
import styled from "styled-components";
import { MyAppDatabase } from "../../../Database/MyDatabase";
import { useTableByFilter } from "../../../Hooks/DexieHooks";
import Filter from "../../../Data/Filter";
import Char from "../../../Data/Chars/Char";

import { LoadingSpinner } from "../../Loading";
import CharTile from "./CharTile";
import AppWrapper from "../../AppWrapper";
import CharSearchBar from "./CharSearchBar";

const CharOverview = () => {
  const db = new MyAppDatabase();
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allChar, loading, error] = useTableByFilter(db.chars, filters);

  return (
    <AppWrapper>
      <CharSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <CharContainer>
        {!error && loading && <LoadingSpinner />}
        {!error &&
          !loading &&
          allChar!.map((char: Char, index: number) => {
            return <CharTile key={index} char={char}></CharTile>;
          })}
        {error && <>Fail</>}
      </CharContainer>
    </AppWrapper>
  );
};

export default CharOverview;

const CharContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
