import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Monster from "../../../data/Monster";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faRunning } from "@fortawesome/free-solid-svg-icons";
import { GiResize, GiAngelOutfit } from "react-icons/gi";
import { MdRecordVoiceOver } from "react-icons/md";
import { stringToColour } from "../../../services/ColorService";

interface $Props {
  monster: Monster;
}

const MonsterTile = ({ monster }: $Props) => {
  const isLegendary = useCallback(() => {
    if (monster !== undefined) {
      if (monster.lAblt.trim() !== "" || monster.sAblt.includes("Legendary")) {
        return "L";
      }
    }
    return "";
  }, [monster]);

  const formatCr = useCallback(() => {
    if (monster !== undefined) {
      if (monster.cr === 0.125) {
        return "⅛";
      } else if (monster.cr === 0.25) {
        return "¼";
      } else if (monster.cr === 0.5) {
        return "½";
      } else {
        return monster.cr;
      }
    }
    return "";
  }, [monster]);

  const getPicture = useCallback(() => {
    if (monster !== undefined) {
      if (
        monster.picBase64 !== "" &&
        monster.picBase64 !== null &&
        monster.picBase64 !== undefined
      ) {
        return monster.picBase64;
      } else if (monster.pic !== "" && monster.pic !== null && monster.pic !== undefined) {
        return monster.pic;
      }
    }
    return "";
  }, [monster]);

  const firstToUpper = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Tile to={"/monster-detail/id/" + monster.id}>
      <Type type={firstToUpper(monster.type)}>
        {firstToUpper(monster.type)}{" "}
        {monster.subtype !== undefined && monster.subtype?.toString().trim() !== ""
          ? "(" + firstToUpper(monster.subtype.toString().trim()) + ")"
          : ""}
      </Type>

      <Flag>
        <b>{isLegendary()}</b>
      </Flag>

      <CR>
        <b>{formatCr()}</b>
      </CR>
      {getPicture() !== "" ? (
        <ImageName>
          <Image pic={getPicture()}></Image>
          <b>{monster.name}</b>
        </ImageName>
      ) : (
        <Name>
          <b>{monster.name}</b>
        </Name>
      )}

      <PropWrapper>
        <Prop>
          <GiResize />
          {monster.size}
        </Prop>
        <Prop>
          <GiAngelOutfit />
          {monster.alignment}
        </Prop>
        <WideProp>
          <Icon icon={faRunning} />
          {monster.speed}
        </WideProp>
        <WideProp>
          <MdRecordVoiceOver />
          {monster.lang}
        </WideProp>
        <WideProp>
          <Icon icon={faLink} />
          {monster.sources}
        </WideProp>
      </PropWrapper>
    </Tile>
  );
};

export default MonsterTile;

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

const CR = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  float: right;
  text-align: center;
  border-top-right-radius: 3px;
  border-radius: 30px;
  border-bottom: solid 1px ${({ theme }) => theme.main.highlight};
  margin: 5px;
`;

type MonsterType = {
  type?: string;
};

const Type = styled.div<MonsterType>`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 0px 0px 10px 0px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  color: ${(props) => {
    return stringToColour(props.type);
  }};
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

const ImageName = styled.div`
  height: 40px;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
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
  width: calc(50% - 25px);
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
    width: calc(50% - 20px);
  }

  svg {
    margin-right: 5px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.main.highlight};
  }
}
`;

const WideProp = styled(Prop)`
  margin: 0 0 5px 0px;
  width: calc(100% - 20px);

  &:nth-child(odd) {
    margin: 0 0 5px 0px;
    width: calc(100% - 20px);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;

const Flag = styled.div`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  margin-left: 5px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 0px 0px 10px 10px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
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
  height: 57px;
  width: 57px;
  float: left;
  border-radius: 100px;
  border: 3px solid ${({ theme }) => theme.main.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
