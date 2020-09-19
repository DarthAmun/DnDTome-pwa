import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Encounter from "../../Data/Encounter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon, faUser } from "@fortawesome/free-solid-svg-icons";
import { LoadingSpinner } from "../Loading";

interface $Props {
  encounter: Encounter;
}

const EncounterTile = ({ encounter }: $Props) => {
  return (
    <Tile to={"/encounter-detail/id/" + encounter.id}>
      <Suspense fallback={<LoadingSpinner />}>
        <Name>
          <b>{encounter.name}</b>
        </Name>

        <PropWrapper>
          <WideProp>
            <Icon icon={faUser} />
            {encounter.players.length}
          </WideProp>
          <WideProp>
            <Icon icon={faDragon} />
            {encounter.monsters.length}
          </WideProp>
        </PropWrapper>
      </Suspense>
    </Tile>
  );
};

export default EncounterTile;

const Tile = styled(Link)`
  flex: 1 1 15em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;
  cursor: pointer;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 10px);
  float: left;
  padding: 5px 5px 0 5px;
  display: flex;
  flex-wrap: wrap;
`;

const Prop = styled.div`
  height: 12px;
  width: calc(50% - 22.5px);
  margin: 0 0 5px 5px;
  float: left;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:nth-child(odd) {
  margin: 0 0 5px 0px;
  }
}
`;

const WideProp = styled(Prop)`
  margin: 0 0 5px 0px;
  width: calc(100% - 20px);
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;
