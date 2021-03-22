import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Group from "../../../data/campaign/Group";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  group: Group;
}

const GroupTile = ({ group }: $Props) => {
  const getPicture = useCallback(() => {
    if (group !== undefined) {
      if (group.picBase64 !== "" && group.picBase64 !== null && group.picBase64 !== undefined) {
        return group.picBase64;
      } else if (group.pic !== "" && group.pic !== null && group.pic !== undefined) {
        return group.pic;
      }
    }
    return "";
  }, [group]);

  return (
    <Tile to={"/group-detail/id/" + group.id}>
      {getPicture() !== "" ? <Image pic={getPicture()}></Image> : ""}

      <PropWrapper>
        <Name>
          <b>{group.name}</b>
        </Name>
        <Text>
          <PropTitle>Description</PropTitle>
          {group.description}
        </Text>
        <Prop>
          <PropTitle>Players</PropTitle>
          {group.players.length}
        </Prop>
        <Prop>
          <PropTitle>Npcs</PropTitle>
          {group.npcs.length}
        </Prop>
        <Prop>
          <PropTitle>Monster</PropTitle>
          {group.monsters.length}
        </Prop>
        <Prop>
          <Icon icon={faLink} />
          {group.sources}
        </Prop>
      </PropWrapper>
    </Tile>
  );
};

export default GroupTile;

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
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
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

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 30px);
  margin: 10px 5px 5px 5px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  if (pic !== "") {
    return <ImgContainer pic={pic}></ImgContainer>;
  } else {
    return <Empty />;
  }
};

const ImgContainer = styled.div<{ pic: string }>`
  margin: 30px;
  width: 100px;
  height: 100px;
  border: 2px double ${({ theme }) => theme.main.highlight};
  transform: rotate(45deg);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    z-index: -1;
    background: url("${(props) => props.pic}") 0 0 no-repeat;
    background-size: cover;
    transform: rotate(-45deg);
  }
`;
const Empty = styled.div``;
