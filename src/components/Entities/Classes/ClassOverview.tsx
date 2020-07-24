import React, { useState } from "react";
import styled from "styled-components";
import { MyAppDatabase } from "../../../Database/MyDatabase";
import { useTableByFilter } from "../../../Hooks/DexieHooks";
import Filter from "../../../Data/Filter";
import Class from "../../../Data/Classes/Class";

import { LoadingSpinner } from "../../Loading";
import ClassTile from "./ClassTile";
import AppWrapper from "../../AppWrapper";
import ClassSearchBar from "./ClassSearchBar";

const ClassOverview = () => {
  const db = new MyAppDatabase();
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allClass, loading, error] = useTableByFilter(db.classes, filters);

  return (
    <AppWrapper>
      <ClassSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <ClassContainer>
        {!error && loading && <LoadingSpinner />}
        {!error &&
          !loading &&
          allClass!.map((classe: Class, index: number) => {
            return <ClassTile key={index} classe={classe}></ClassTile>;
          })}
        {error && <>Fail</>}
      </ClassContainer>
    </AppWrapper>
  );
};

export default ClassOverview;

const ClassContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
