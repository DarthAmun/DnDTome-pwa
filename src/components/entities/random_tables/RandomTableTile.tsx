import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RandomTable from "../../../data/RandomTable";

import { GiResize } from "react-icons/gi";

interface $Props {
  randomTable: RandomTable;
}

const RandomTableTile = ({ randomTable }: $Props) => {
  return (
    <Tile to={"/randomTable-detail/id/" + randomTable.id}>
      <PropWrapper>
        <Name>
          <b>{randomTable.name}</b>
        </Name>

        <PropRowWrapper>
          <RowProp>
            <GiResize />
            Rows: {randomTable.rows.length}
          </RowProp>
        </PropRowWrapper>
      </PropWrapper>
    </Tile>
  );
};

export default RandomTableTile;

const Tile = styled(Link)`
  flex: 1 1 15em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Name = styled.div`
  height: auto;
  flex: 1 1 auto;
  padding: 10px;
  margin: 5px 5px 5px 0;
  color: ${({ theme }) => theme.tile.headerColor};
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 10px);
  float: left;
  padding: 5px 5px 0 5px;
  display: flex;
  flex-wrap: wrap;
`;
const PropRowWrapper = styled(PropWrapper)`
  flex-wrap: nowrap;
  padding: 0 0 5px 0;
  flex: 1 1 auto;
  width: 100%;
`;

const RowProp = styled.div`
  height: 12px;
  margin: 0 5px 0 0;
  flex: 1 1 auto;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  svg {
    margin-right: 5px;
    height: auto;
    border-radius: 150px;
    transition: color 0.2s;
    color: ${({ theme }) => theme.main.highlight};
  }
}
`;
