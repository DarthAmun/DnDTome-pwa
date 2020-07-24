import React, { useState } from "react";
import styled from "styled-components";
import { MyAppDatabase } from "../../../Database/MyDatabase";
import { useTableByFilter } from "../../../Hooks/DexieHooks";
import Filter from "../../../Data/Filter";
import Race from "../../../Data/Races/Race";

import { LoadingSpinner } from "../../Loading";
import RaceTile from "./RaceTile";
import AppWrapper from "../../AppWrapper";
import RaceSearchBar from "./RaceSearchBar";

const RaceOverview = () => {
  const db = new MyAppDatabase();
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allRace, loading, error] = useTableByFilter(db.races, filters);

  return (
    <AppWrapper>
      <RaceSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <RaceContainer>
        {!error && loading && <LoadingSpinner />}
        {!error &&
          !loading &&
          allRace!.map((race: Race, index: number) => {
            return <RaceTile key={index} race={race}></RaceTile>;
          })}
        {error && <>Fail</>}
      </RaceContainer>
    </AppWrapper>
  );
};

export default RaceOverview;

const RaceContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
