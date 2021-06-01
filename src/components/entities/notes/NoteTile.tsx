import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Note from "../../../data/Note";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faTags } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  note: Note;
}

const NoteTile = ({ note }: $Props) => {
  return (
    <Tile to={"/note-detail/id/" + note.id}>
      <Name>
        <b>{note.name}</b>
      </Name>

      <PropWrapper>
        <Prop>
          <Icon icon={faTags} />
          {note.tags}
        </Prop>
        <Prop>
          <Icon icon={faLink} />
          {note.sources}
        </Prop>
      </PropWrapper>
    </Tile>
  );
};

export default NoteTile;

const Tile = styled(Link)`
  flex: 1 1 15em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;
  cursor: pointer;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.tile.headerColor};
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

const Prop = styled.div`
  height: 12px;
  width: calc(50% - 22.5px);
  margin: 0 0 5px 5px;
  float: left;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:nth-child(odd) {
  margin: 0 0 5px 0px;
  }
}
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;
