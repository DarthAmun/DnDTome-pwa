import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Class from "../../../data/classes/Class";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { GiDiceEightFacesEight } from "react-icons/gi";

interface $Props {
  classe: Class;
}

const ClassTile = ({ classe }: $Props) => {
  const getPicture = useCallback(() => {
    if (classe !== undefined) {
      if (classe.picBase64 !== "" && classe.picBase64 !== null && classe.picBase64 !== undefined) {
        return classe.picBase64;
      } else if (classe.pic !== "" && classe.pic !== null && classe.pic !== undefined) {
        return classe.pic;
      }
    }
    return "";
  }, [classe]);

  return (
    <Tile to={"/classe-detail/id/" + classe.id}>
      {getPicture() !== "" ? <Image pic={getPicture()}></Image> : ""}
      <PropWrapper>
        <Name>
          <b>{classe.name}</b>
        </Name>

        <Prop>
          <Icon icon={faLink} />
          {classe.sources}
        </Prop>
        <Prop>
          <GiDiceEightFacesEight />
          {classe.hitDices}
        </Prop>
      </PropWrapper>
    </Tile>
  );
};

export default ClassTile;

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
  margin: 0 0 5px 0px;
  float: left;
  line-height: 10px;
  padding: 10px;
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
    return <ImageElm src={pic}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.img`
  margin: 5px;
  max-width: 200px;
  max-height: 300px;
  float: left;
`;
const Empty = styled.div``;
