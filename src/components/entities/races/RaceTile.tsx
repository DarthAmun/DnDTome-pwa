import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Race from "../../../data/races/Race";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { GiUpgrade } from "react-icons/gi";

interface $Props {
  race: Race;
}

const RaceTile = ({ race }: $Props) => {
  const getPicture = useCallback(() => {
    if (race !== undefined) {
      if (race.picBase64 !== "" && race.picBase64 !== null && race.picBase64 !== undefined) {
        return race.picBase64;
      } else if (race.pic !== "" && race.pic !== null && race.pic !== undefined) {
        return race.pic;
      }
    }
    return "";
  }, [race]);

  return (
    <Tile to={"/race-detail/id/" + race.id}>
      {getPicture() !== "" ? <Image pic={getPicture()}></Image> : ""}
      <PropWrapper>
        <Name>
          <b>{race.name}</b>
        </Name>

        <Prop>
          <GiUpgrade />
          {race.abilityScores}
        </Prop>
        <Prop>
          <Icon icon={faLink} />
          {race.sources}
        </Prop>
      </PropWrapper>
    </Tile>
  );
};

export default RaceTile;

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
  width: 100%;
  padding: 10px;
  margin: 5px 0 5px 0;
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

const Prop = styled.div`
  height: 12px;
  flex: 1 1 auto;
  margin: 0 0 5px 0;
  float: left;
  line-height: 10px;
  padding: 10px;
  margin: 0 0 5px 0;
  font-size: 12px;
  border-radius: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:nth-child(odd) {
  margin: 0 0 5px 5px;
  }

  svg {
    margin-right: 5px;
    height: auto;
    border-radius: 150px;
    transition: color 0.2s;
    color: ${({ theme }) => theme.main.highlight};
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

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  if (pic !== "") {
    return (
      <ImgContainer>
        <ImageElm src={pic}></ImageElm>
      </ImgContainer>
    );
  } else {
    return <Empty />;
  }
};

const ImgContainer = styled.div`
  margin: 5px;
`;
const ImageElm = styled.img`
  max-width: 200px;
  max-height: 200px;
`;
const Empty = styled.div``;
