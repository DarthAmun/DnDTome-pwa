import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import BuildPlayer from "../../../data/encounter/BuildPlayer";
import Monster from "../../../data/Monster";
import NumberField from "../../form_elements/NumberField";

interface $Props {
  img: string;
  players: BuildPlayer[];
  showName: boolean;
  dimension: { width: number; height: number; size: number; zoom: number };
  currentPlayerNumber: number;
  onChangePlayers: (value: BuildPlayer[]) => void;
  onChangeDimension: (value: { width: number; height: number; size: number; zoom: number }) => void;
}

const Board = ({
  img,
  players,
  showName,
  dimension,
  currentPlayerNumber,
  onChangePlayers,
  onChangeDimension,
}: $Props) => {
  const [board, setBoard] = useState<JSX.Element>();
  const [dragItem, setDragItem] = useState<BuildPlayer>();

  const makeDrag = useCallback((player: BuildPlayer) => {
    setDragItem(player);
  }, []);

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
            showName={showName}
            players={players}
            size={dimension.size}
            zoom={dimension.zoom / 100}
            makeDrop={makeDrop}
            makeDrag={makeDrag}
            updatePlayers={onChangePlayers}
            currentPlayerNumber={currentPlayerNumber}
          ></PlayerSlot>
        );
      }
      return list;
    },
    [dimension, players, showName, onChangePlayers, currentPlayerNumber, makeDrop, makeDrag]
  );

  const makeBoard = useCallback(() => {
    let list: any = [];
    for (let i = 0; i < dimension.height; i++) {
      list.push(<BoardRow key={i}>{makeRow(i)}</BoardRow>);
    }
    setBoard(list);
  }, [dimension, makeRow]);

  useEffect(() => {
    console.log("Redo Board");
    makeBoard();
    // eslint-disable-next-line
  }, [img, dimension, players, makeDrop]);

  return (
    <BoardWrapper>
      <BoardBar>
        <NumberField
          value={dimension.zoom}
          label="Zoom"
          step={10}
          onChange={(zoom) => onChangeDimension({ ...dimension, zoom: zoom })}
        />
        <NumberField
          value={dimension.width}
          label="Horizontal"
          onChange={(width) => onChangeDimension({ ...dimension, width: width })}
        />
        <NumberField
          value={dimension.height}
          label="Vertical"
          onChange={(height) => onChangeDimension({ ...dimension, height: height })}
        />
        <NumberField
          value={dimension.size}
          label="Size"
          onChange={(size) => onChangeDimension({ ...dimension, size: size })}
        />
      </BoardBar>
      <BoardContainer>
        <BoardLayer>{board}</BoardLayer>
        <MapLayer zoom={dimension.zoom / 100} src={img} />
      </BoardContainer>
    </BoardWrapper>
  );
};

export default Board;

interface $PlayerSlotProps {
  size: number;
  zoom: number;
  cord: number[];
  showName: boolean;
  currentPlayerNumber: number;
  players: BuildPlayer[];
  makeDrop: () => BuildPlayer | undefined;
  makeDrag: (player: BuildPlayer) => void;
  updatePlayers: (players: BuildPlayer[]) => void;
}
const PlayerSlot = ({
  size,
  zoom,
  cord,
  showName,
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

  const defineSize = useCallback(
    (size: number, player: BuildPlayer): number => {
      if (player.player.isMonster) {
        const monster = player.entity as Monster;
        switch (monster.size) {
          case "gargantuan":
            return size * 4 * zoom;
          case "huge":
            return size * 3 * zoom;
          case "large":
            return size * 2 * zoom;
        }
      }
      return size * zoom;
    },
    [zoom]
  );

  return (
    <Slot size={size * zoom} onDrop={(e) => drop(e, cord)} onDragOver={dragOver}>
      {players.map((playerIcon: BuildPlayer, index: number) => {
        if (
          (playerIcon.player.cord === undefined && cord[0] === 0 && cord[1] === 0) ||
          (playerIcon.player.cord !== undefined &&
            playerIcon.player.cord[0] === cord[0] &&
            playerIcon.player.cord[1] === cord[1])
        )
          return (
            <Image
              key={"icon" + index}
              drag={drag}
              player={playerIcon}
              showName={showName}
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
  flex: 1 1 min-content;
  padding: 5px;
  margin: 5px;
  // position: relative;
  max-width: calc(100vw - 120px);

  @media (max-width: 576px) {
    max-width: 100vw;
  }

  display: flex;
  flex-wrap: wrap;
`;
const BoardContainer = styled.div`
  flex: 1 1 100%;
  position: relative;

  max-width: calc(100% - 10px);

  overflow: scroll;

  display: flex;
  flex-wrap: wrap;
`;

const BoardLayer = styled.div`
  position: absolute;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

type ZoomProp = {
  zoom: number;
};

const MapLayer = styled.img<ZoomProp>`
  width: calc(800px * ${({ zoom }) => zoom});
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
  showName: boolean;
  isDead: boolean;
  isCurrent: boolean;
  player: BuildPlayer;
  drag: (e: any, player: BuildPlayer) => void;
  dragOver: any;
}

const Image = ({ dragOver, drag, pic, size, showName, player, isDead, isCurrent }: $ImageProps) => {
  if (pic !== "") {
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

    return (
      <ImageElm
        onDragStart={(e) => drag(e, player)}
        onDragOver={dragOver}
        draggable
        style={style}
      ></ImageElm>
    );
  } else {
    const style = {
      height: size - 6 + "px",
      width: size - 6 + "px",
      opacity: isDead ? "0.5" : "1",
      border: isCurrent ? "" : "none",
      padding: size / 5 + "px",
      fontSize: size / 6 + "px",
    };

    return (
      <ImageElm onDragStart={(e) => drag(e, player)} onDragOver={dragOver} draggable style={style}>
        {showName ? player.entity.name : "???"}
      </ImageElm>
    );
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
  text-align: center;
`;

const Empty = styled.div``;
