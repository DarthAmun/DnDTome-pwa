import React, { useState, useEffect, ReactNode } from "react";
import styled from "styled-components";
import { reciveAll } from "../../services/DatabaseService";

interface $OverviewProps {
  entityName: string;
  Tile: any;
  Entity: any;
}

const EntityOverview = ({ entityName, Entity, Tile }: $OverviewProps) => {
  const [allEntitys, setAllEntitys] = useState<typeof Entity[]>([]);
  const [entitys, setEntitys] = useState<typeof Entity[]>([]);

  useEffect(() => {
    if (entityName !== "")
      reciveAll(entityName + "s", (results: any[]) => {
        setAllEntitys(results);
        setEntitys(results.slice(0, 10));
      });
  }, [entityName]);

  return (
    <EntityContainer>
      {entityName !== "" &&
        entitys.length > 0 &&
        entitys!.map((entity: typeof Entity, index: number) => {
          return <Tile key={index} entity={entity} />;
        })}
    </EntityContainer>
  );
};

export default EntityOverview;

const EntityContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
