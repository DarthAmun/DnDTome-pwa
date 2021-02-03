import React, { useCallback, useState } from "react";
import styled from "styled-components";
import BuildPlayer from "../../../data/encounter/BuildPlayer";
import Monster from "../../../data/Monster";
import NumberField from "../../form_elements/NumberField";

interface $Props {
  img: string;
  players: BuildPlayer[];
  dimension: { width: number; height: number; size: number };
  currentPlayerNumber: number;
  onChangePlayers: (value: BuildPlayer[]) => void;
  onChangeDimension: (value: { width: number; height: number; size: number }) => void;
}

const Board = ({
  img,
  players,
  dimension,
  currentPlayerNumber,
  onChangePlayers,
  onChangeDimension,
}: $Props) => {
  const [dragItem, setDragItem] = useState<BuildPlayer>();

  const makeDrag = (player: BuildPlayer) => {
    setDragItem(player);
  };

  const makeDrop = useCallback((): BuildPlayer | undefined => {
    return dragItem;
  }, [dragItem]);

  const makeRow = useCallback(
    (row: number) => {
      let list: any = [];
      for (let j = 0; j < dimension.width; j++) {
        list.push(
          <PlayerSlot
            key={"slot" + row + "" + j}
            cord={[row, j]}
            players={players}
            size={dimension.size}
            makeDrop={makeDrop}
            makeDrag={makeDrag}
            updatePlayers={onChangePlayers}
            currentPlayerNumber={currentPlayerNumber}
          ></PlayerSlot>
        );
      }
      return list;
    },
    [dimension.width, dimension.size, players, onChangePlayers, currentPlayerNumber, makeDrop]
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
          onChange={(width) => onChangeDimension({ ...dimension, width: width })}
        />
        <NumberField
          value={dimension.height}
          label="Height Count"
          onChange={(height) => onChangeDimension({ ...dimension, height: height })}
        />
        <NumberField
          value={dimension.size}
          label="Size"
          onChange={(size) => onChangeDimension({ ...dimension, size: size })}
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

interface $PlayerSlotProps {
  size: number;
  cord: number[];
  currentPlayerNumber: number;
  players: BuildPlayer[];
  makeDrop: () => BuildPlayer | undefined;
  makeDrag: (player: BuildPlayer) => void;
  updatePlayers: (players: BuildPlayer[]) => void;
}
const PlayerSlot = ({
  size,
  cord,
  players,
  currentPlayerNumber,
  makeDrop,
  makeDrag,
  updatePlayers,
}: $PlayerSlotProps) => {
  const drop = (e: any, cord: number[]) => {
    e.preventDefault();
    let changedPlayer = makeDrop();
    let newPlayers: BuildPlayer[] = players.map((player: BuildPlayer) => {
      if (player === changedPlayer) {
        return { ...player, player: { ...player.player, cord: cord } };
      } else {
        return player;
      }
    });
    updatePlayers(newPlayers);
  };

  const drag = (e: any, player: BuildPlayer) => {
    console.log("drag", player.player.name, player.player.cord);
    makeDrag(player);
  };

  const dragOver = (e: any) => {
    e.preventDefault();
  };

  const defineSize = useCallback((size: number, player: BuildPlayer): number => {
    if (player.player.isMonster) {
      const monster = player.entity as Monster;
      switch (monster.size) {
        case "gargantuan":
          return size * 4;
        case "huge":
          return size * 3;
        case "large":
          return size * 2;
      }
    }
    return size;
  }, []);

  return (
    <Slot size={size} onDrop={(e) => drop(e, cord)} onDragOver={dragOver}>
      {players.map((playerIcon: BuildPlayer, index: number) => {
        if (playerIcon.player.cord[0] === cord[0] && playerIcon.player.cord[1] === cord[1])
          return (
            <Image
              key={"icon" + index}
              drag={drag}
              player={playerIcon}
              dragOver={dragOver}
              pic={playerIcon.entity.pic}
              size={defineSize(size, playerIcon)}
              isDead={playerIcon.player.currentHp <= 0}
              isCurrent={currentPlayerNumber === index}
            />
          );
        return <Empty key={"icon" + index} />;
      })}
    </Slot>
  );
};

const BoardWrapper = styled.div`
  flex: 1;
  padding: 5px;
  margin: 5px;
  position: relative;

  height: calc(100vh - 20px);
  width: calc(100vw - 120px);

  @media (max-width: 576px) {
    width: 100vw;
  }

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
  width: auto;
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
  flex: 1 1 auto;
  min-width: max-content;
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
  position: releativ;
`;

interface $ImageProps {
  pic: string;
  size: number;
  isDead: boolean;
  isCurrent: boolean;
  player: BuildPlayer;
  drag: (e: any, player: BuildPlayer) => void;
  dragOver: any;
}

const Image = ({ dragOver, drag, pic, size, player, isDead, isCurrent }: $ImageProps) => {
  const style = {
    backgroundImage: `url(${pic})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: size - 6 + "px",
    width: size - 6 + "px",
    opacity: isDead ? "0.5" : "1",
    border: isCurrent ? "" : "none",
  };

  if (pic !== "") {
    return (
      <ImageElm
        onDragStart={(e) => drag(e, player)}
        onDragOver={dragOver}
        draggable
        style={style}
      ></ImageElm>
    );
  } else {
    return <></>;
  }
};

const ImageElm = styled.div`
  margin: 3px;
  float: left;
  border-radius: 500px;
  border: 3px solid ${({ theme }) => theme.main.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
  box-sizing: border-box;
  cursor: move;
  position: absolute;
`;

const Empty = styled.div``;
