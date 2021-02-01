import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import BuildPlayer from "../../../data/encounter/BuildPlayer";
import NumberField from "../../form_elements/NumberField";

interface $Props {
  img: string;
  players: BuildPlayer[];
}

const Board = ({ img, players }: $Props) => {
  const [playerIcons, setPlayerIcons] = useState<{ player: BuildPlayer; cord: number[] }[]>([]);
  const [dimension, setDimension] = useState<{ width: number; height: number; size: number }>({
    width: 30,
    height: 30,
    size: 57.3,
  });

  useEffect(() => {
    let newPlayerIcons = players.map((player: BuildPlayer, index: number) => {
      return { player: player, cord: [0, index] };
    });
    setPlayerIcons(newPlayerIcons);
  }, [players]);

  const makeRow = useCallback(
    (row: number) => {
      let list: any = [];
      for (let j = 0; j < dimension.width; j++) {
        list.push(
          <Slot key={"slot" + row + "" + j} size={dimension.size}>
            {playerIcons.map((playerIcon: { player: BuildPlayer; cord: number[] }) => {
              if (playerIcon.cord[0] === row && playerIcon.cord[1] === j)
                return (
                  <Image
                    key={"icon" + row + "" + j + ""}
                    pic={playerIcon.player.entity.pic}
                    size={dimension.size}
                  />
                );
            })}
          </Slot>
        );
      }
      return list;
    },
    [dimension.width, dimension.size, playerIcons]
  );

  const makeBoard = useCallback(() => {
    let list: any = [];
    for (let i = 0; i < dimension.height; i++) {
      list.push(<BoardRow key={i}>{makeRow(i)}</BoardRow>);
    }
    return list;
  }, [dimension, makeRow]);

  return (
    <BoardWrapper>
      <BoardBar>
        <NumberField
          value={dimension.width}
          label="Width Count"
          onChange={(width) => setDimension({ ...dimension, width: width })}
        />
        <NumberField
          value={dimension.height}
          label="Height Count"
          onChange={(height) => setDimension({ ...dimension, height: height })}
        />
        <NumberField
          value={dimension.size}
          label="Size"
          onChange={(size) => setDimension({ ...dimension, size: size })}
        />
      </BoardBar>
      <BoardContainer>
        <BoardLayer>{makeBoard()}</BoardLayer>
        <MapLayer src={img} />
      </BoardContainer>
    </BoardWrapper>
  );
};

export default Board;

const BoardWrapper = styled.div`
  flex: 1;
  padding: 5px;
  margin: 5px;
  position: relative;

  height: calc(100vh - 20px);
  width: calc(100% - 20px);

  display: flex;
  flex-wrap: wrap;
`;
const BoardContainer = styled.div`
  flex: 1 1 100%;
  position: relative;

  height: calc(100% - 50px);
  max-width: 100%;

  overflow: scroll;

  display: flex;
  flex-wrap: wrap;
`;

const BoardLayer = styled.div`
  position: absolute;

  height: calc(100% - 50px);
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const MapLayer = styled.img`
  width: 100%;
`;

const BoardBar = styled.div`
  flex: 1 1 100%;

  height: 50px;
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const BoardRow = styled.div`
  flex: 1 1 100%;

  width: 100%;

  display: flex;
  flex-wrap: wrap;
`;

type SizeProp = {
  size: number;
};

const Slot = styled.div<SizeProp>`
  flex: 1;
  min-height: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  max-height: ${({ size }) => size}px;
  max-width: ${({ size }) => size}px;

  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

interface $ImageProps {
  pic: string;
  size: number;
}

const Image = ({ pic, size }: $ImageProps) => {
  const style = {
    backgroundImage: `url(${pic})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: size - 6 + "px",
    width: size - 6 + "px",
  };

  if (pic !== "") {
    return <ImageElm style={style}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.div`
  margin: 3px;
  float: left;
  border-radius: 100px;
  border: 3px solid ${({ theme }) => theme.main.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
  box-sizing: border-box;
  cursor: move;
`;
const Empty = styled.div``;
