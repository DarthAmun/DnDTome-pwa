import React, { useCallback, Suspense } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Monster from "../../../data/Monster";
import { LoadingSpinner } from "../../Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faRunning } from "@fortawesome/free-solid-svg-icons";
import { GiResize, GiAngelOutfit } from "react-icons/gi";
import { MdRecordVoiceOver } from "react-icons/md";

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
      if (monster.pic === "" || monster.pic === null) {
        return "";
      }
      return monster.pic;
    }
    return "";
  }, [monster]);

  return (
    <Tile to={"/monster-detail/id/" + monster.id}>
      <Suspense fallback={<LoadingSpinner />}>
        <Type>
          {monster.type}{" "}
          {monster.subtype.trim() !== "" ? "(" + monster.subtype + ")" : ""}
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
      </Suspense>
    </Tile>
  );
};

export default MonsterTile;

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
  box-shadow: inset 0px 0px 10px -2px rgba(0, 0, 0, 0.4);
  border-radius: 30px;
  margin: 5px;
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
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
`;

const ImageName = styled.div`
  height: 40px;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
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
  width: calc(50% - 25px);
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
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  background-color: ${({ theme }) => theme.tile.backgroundColor};
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
