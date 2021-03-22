import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Gear from "../../../data/Gear";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCoins, faWeightHanging } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  gear: Gear;
}

const GearTile = ({ gear }: $Props) => {
  const getPicture = useCallback(() => {
    if (gear !== undefined) {
      if (gear.picBase64 !== "" && gear.picBase64 !== null && gear.picBase64 !== undefined) {
        return gear.picBase64;
      } else if (gear.pic !== "" && gear.pic !== null && gear.pic !== undefined) {
        return gear.pic;
      }
    }
    return "";
  }, [gear]);

  return (
    <Tile to={"/gear-detail/id/" + gear.id}>
      {getPicture() !== "" ? (
        <ImageName>
          <Image pic={getPicture()}></Image>
          <b>{gear.name}</b>
        </ImageName>
      ) : (
        <Name>
          <b>{gear.name}</b>
        </Name>
      )}

      <PropWrapper>
        <Prop>
          <Icon icon={faCoins} />
          {gear.cost}
        </Prop>
        <Prop>
          <Icon icon={faWeightHanging} />
          {gear.weight}
        </Prop>
        <WideProp>{gear.type}</WideProp>
        <WideProp>
          <Icon icon={faLink} />
          {gear.sources}
        </WideProp>
      </PropWrapper>
    </Tile>
  );
};

export default GearTile;

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

const ImageName = styled.div`
  height: 30px;
  float: left;
  padding: 10px;
  margin: 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.tile.headerColor};
  text-align: center;
  border-radius: 50px 5px 5px 50px;
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
    backgroundImage: `url('${pic}')`,
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
