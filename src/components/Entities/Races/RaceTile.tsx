import React, { useCallback, Suspense } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Race from "../../../Data/Race";
import { LoadingSpinner } from "../../Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { GiUpgrade } from "react-icons/gi";

interface $Props {
  race: Race;
}

const RaceTile = ({ race }: $Props) => {
  const getPicture = useCallback(() => {
    if (race !== undefined) {
      if (race.pic === "" || race.pic === null) {
        return "";
      }
      return race.pic;
    }
    return "";
  }, [race]);

  return (
    <Tile to={"/race-detail/id/" + race.id}>
      <Suspense fallback={<LoadingSpinner />}>
        <Type>{race.type}</Type>

        {getPicture() !== "" ? (
          <ImageName>
            <Image pic={getPicture()}></Image>
            <b>{race.name}</b>
          </ImageName>
        ) : (
          <Name>
            <b>{race.name}</b>
          </Name>
        )}

        <PropWrapper>
          <Prop>
            <GiUpgrade />
            {race.abilityScores}
          </Prop>
          <Prop>
            <Icon icon={faLink} />
            {race.sources}
          </Prop>
        </PropWrapper>
      </Suspense>
    </Tile>
  );
};

export default RaceTile;

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

const Type = styled.div`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 0px 0px 10px 0px;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
`;

const ImageName = styled.div`
  height: 30px;
  float: left;
  padding: 10px;
  margin: 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 50px 5px 5px 50px;
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

  svg {
    margin-right: 5px;
    height: auto;
    border-radius: 150px;
    transition: color 0.2s;
    color: ${({ theme }) => theme.main.highlight};
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

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  const style = {
    backgroundImage: `url(${pic})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  if (pic !== "") {
    return <ImageElm style={style}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.div`
  margin: -10px 5px -10px -10px;
  height: 47px;
  width: 47px;
  float: left;
  border-radius: 100px;
  border: 3px solid ${({ theme }) => theme.main.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
