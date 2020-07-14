import React, { useState } from "react";
import styled from "styled-components";
import { MyAppDatabase } from "../../../Database/MyDatabase";
import { useTableByFilter } from "../../../Hooks/DexieHooks";
import Filter from "../../../Data/Filter";
import Gear from "../../../Data/Gear";

import { LoadingSpinner } from "../../Loading";
import GearTile from "./GearTile";
import AppWrapper from "../../AppWrapper";
import GearSearchBar from "./GearSearchBar";

const GearOverview = () => {
  const db = new MyAppDatabase();
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allGear, loading, error] = useTableByFilter(db.gears, filters);

  return (
    <AppWrapper>
      <GearSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <GearContainer>
        {!error && loading && <LoadingSpinner />}
        {!error &&
          !loading &&
          allGear!.map((gear: Gear, index: number) => {
            return <GearTile key={index} gear={gear}></GearTile>;
          })}
        {error && <>Fail</>}
      </GearContainer>
    </AppWrapper>
  );
};

export default GearOverview;

const GearContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
