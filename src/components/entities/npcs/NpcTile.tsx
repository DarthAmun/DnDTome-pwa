import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Npc from "../../../data/campaign/Npc";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  npc: Npc;
}

const NpcTile = ({ npc }: $Props) => {
  const getPicture = useCallback(() => {
    if (npc !== undefined) {
      if (npc.pic === "" || npc.pic === null) {
        return "";
      }
      return npc.pic;
    }
    return "";
  }, [npc]);

  return (
    <Tile to={"/npc-detail/id/" + npc.id}>
      {getPicture() !== "" ? <Image pic={getPicture()}></Image> : ""}
      <PropWrapper>
        <Name>
          <b>{npc.name}</b>
        </Name>

        <WideProp>
          <Icon icon={faLink} />
          {npc.sources}
        </WideProp>
      </PropWrapper>
    </Tile>
  );
};

export default NpcTile;

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
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  min-width: calc(100% - 20px);
`;

const PropWrapper = styled.div`
  height: auto;
  flex: 1 1 auto;
  padding: 5px 5px 0 5px;
  display: flex;
  flex-wrap: wrap;
  min-width: calc(100% - 10px);
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

const Prop = styled(RowProp)`
  &:nth-child(odd) {
    margin: 0 5px 5px 0;
  }
}
`;

const WideProp = styled(Prop)`
  margin: 0 0 5px 0px;
  min-width: calc(100% - 20px);
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
    background: url(${(props) => props.pic}) 0 0 no-repeat;
    background-size: cover;
    transform: rotate(-45deg);
  }
`;
const Empty = styled.div``;