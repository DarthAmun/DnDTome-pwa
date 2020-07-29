import React, { useCallback, Suspense } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Char from "../../../Data/Chars/Char";
import ClassSet from "../../../Data/Chars/ClassSet";

import { LoadingSpinner } from "../../Loading";

interface $Props {
  char: Char;
}

const CharTile = ({ char }: $Props) => {
  const getPicture = useCallback(() => {
    if (char !== undefined) {
      if (char.pic === "" || char.pic === null) {
        return "";
      }
      return char.pic;
    }
    return "";
  }, [char]);

  return (
    <Tile to={"/char-detail/id/" + char.id}>
      <Suspense fallback={<LoadingSpinner />}>
        {getPicture() !== "" ? <Image pic={getPicture()}></Image> : ""}
        <PropWrapper>
          <Name>
            <b>{char.name}</b>
          </Name>

          <PropRowWrapper>
            <RowProp>{char.level}</RowProp>
            <RowProp>{char.player}</RowProp>
            <RowProp>{char.race}</RowProp>
          </PropRowWrapper>
          {char.classes &&
            char.classes.map((classSet: ClassSet, index:number) => {
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
      </Suspense>
    </Tile>
  );
};

export default CharTile;

const Tile = styled(Link)`
  flex: 1 1 15em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 3px;
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
  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.3);
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
`;

const RowProp = styled.div`
  height: 12px;
  margin: 0 5px 0 0;
  flex: 1 1 auto;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
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