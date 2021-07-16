import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Char from "../../../data/chars/Char";
import ClassSet from "../../../data/chars/ClassSet";

interface $Props {
  char: Char;
}

const CharTile = ({ char }: $Props) => {
  const getPicture = useCallback(() => {
    if (char !== undefined) {
      if (char.picBase64 !== "" && char.picBase64 !== null && char.picBase64 !== undefined) {
        return char.picBase64;
      } else if (char.pic !== "" && char.pic !== null && char.pic !== undefined) {
        return char.pic;
      }
    }
    return "";
  }, [char]);

  const calcLevel = useCallback(() => {
    let level = 0;
    char.classes.forEach((classe) => {
      level += classe.level;
    });
    return level;
  }, [char]);

  return (
    <Tile
      to={"/char-detail/id/" + char.id}
      style={{
        opacity:
          char.deathSaves !== undefined &&
          char.deathSaves.length === 6 &&
          char.deathSaves[3] === 1 &&
          char.deathSaves[4] === 1 &&
          char.deathSaves[5] === 1
            ? 0.3
            : 1,
      }}
    >
      {getPicture() !== "" ? <Image pic={getPicture()}></Image> : ""}
      <PropWrapper>
        <Name>
          <b>
            {char.name}{" "}
            {char.deathSaves !== undefined &&
            char.deathSaves.length === 6 &&
            char.deathSaves[3] === 1 &&
            char.deathSaves[4] === 1 &&
            char.deathSaves[5] === 1
              ? " - Dead"
              : ""}
          </b>
        </Name>
        {char.campaign && <Name>{char.campaign}</Name>}
        <PropRowWrapper>
          <RowProp>{calcLevel()}</RowProp>
          <RowProp>{char.player}</RowProp>
          <RowProp>{char.race.race}</RowProp>
          <RowProp>{char.race.subrace}</RowProp>
        </PropRowWrapper>
        {char.classes &&
          char.classes.map((classSet: ClassSet, index: number) => {
            return (
              <PropRowWrapper key={index}>
                <RowProp>{classSet.level}</RowProp>
                <RowProp>{classSet.classe}</RowProp>
                <RowProp>{classSet.subclasse}</RowProp>
              </PropRowWrapper>
            );
          })}
        <Prop>{char.background}</Prop>
        <Prop>{char.alignment}</Prop>
      </PropWrapper>
    </Tile>
  );
};

export default CharTile;

const Tile = styled(Link)`
  flex: 1 1 20em;
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
`;

const PropWrapper = styled.div`
  height: auto;
  flex: 1 1 auto;
  padding: 5px 5px 0 5px;
  display: flex;
  flex-wrap: wrap;
`;

const PropRowWrapper = styled(PropWrapper)`
  flex-wrap: nowrap;
  padding: 0 0 5px 0;
  flex: 1 1 auto;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.main.backgroundColor};
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
