import { faEyeSlash, faFill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Player from "../../../data/encounter/Player";
import IconButton from "../../form_elements/IconButton";
import NumberField from "../../form_elements/NumberField";

interface $Props {
  isHost: boolean;
  img: string;
  players: Player[];
  showName: boolean;
  dimension: { width: number; height: number; size: number; zoom: number };
  fogBoard: boolean[][];
  currentPlayerNumber: number;
  onChangePlayers: (value: Player[]) => void;
  onChangeDimension: (value: { width: number; height: number; size: number; zoom: number }) => void;
  onChangeBoard: (fogBoard: boolean[][]) => void;
}

const Board = ({
  isHost,
  img,
  players,
  showName,
  dimension,
  fogBoard,
  currentPlayerNumber,
  onChangePlayers,
  onChangeDimension,
  onChangeBoard,
}: $Props) => {
  const [board, setBoard] = useState<JSX.Element>();
  const [dragItem, setDragItem] = useState<Player>();
  const [currentFogBoard, setFogBoard] = useState<boolean[][]>(fogBoard);
  const [fog, setFog] = useState<boolean>(false);

  const makeDrag = useCallback((player: Player) => {
    setDragItem(player);
  }, []);

  const makeDrop = useCallback((): Player | undefined => {
    return dragItem;
  }, [dragItem]);

  const toggleFog = useCallback(
    (cord: number[]) => {
      if (fog) {
        console.log("toggle fog");
        let newBoard = [...currentFogBoard];
        newBoard[cord[0]][cord[1]] = !newBoard[cord[0]][cord[1]];
        setFogBoard(newBoard);
      }
    },
    [currentFogBoard, setFogBoard, fog]
  );

  const makeRow = useCallback(
    (row: number) => {
      let list: any = [];
      for (let j = 0; j < dimension.width; j++) {
        list.push(
          <PlayerSlot
            isHost={isHost}
            key={"slot" + row + "" + j}
            cord={[row, j]}
            showName={showName}
            players={players}
            size={dimension.size}
            zoom={dimension.zoom / 100}
            fog={
              fogBoard && fogBoard.length >= row && fogBoard[row].length >= j
                ? fogBoard[row][j]
                : false
            }
            makeDrop={makeDrop}
            makeDrag={makeDrag}
            toggleFog={toggleFog}
            updatePlayers={onChangePlayers}
            currentPlayerNumber={currentPlayerNumber}
          ></PlayerSlot>
        );
      }
      return list;
    },
    [
      dimension,
      players,
      showName,
      onChangePlayers,
      currentPlayerNumber,
      makeDrop,
      makeDrag,
      isHost,
      fogBoard,
      toggleFog,
    ]
  );

  const makeBoard = useCallback(() => {
    let list: any = [];
    for (let i = 0; i < dimension.height; i++) {
      list.push(<BoardRow key={i}>{makeRow(i)}</BoardRow>);
    }
    setBoard(list);
  }, [dimension, makeRow]);

  useEffect(() => {
    console.time("Redo Board");
    makeBoard();
    console.timeEnd("Redo Board");
    // eslint-disable-next-line
  }, [img, dimension, players, makeDrop, isHost, fog, currentFogBoard]);

  const makeFog = useCallback(() => {
    setFog((f) => !f);
    if (fog) {
      console.log("push board");
      onChangeBoard(fogBoard);
    }
  }, [fog, fogBoard, onChangeBoard]);

  return (
    <BoardWrapper>
      {isHost && (
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
          <IconButton onClick={makeFog} toggle={fog} icon={faFill} />
        </BoardBar>
      )}
      <BoardContainer>
        <BoardLayer>{board}</BoardLayer>
        <MapLayer zoom={dimension.zoom / 100} src={img} />
      </BoardContainer>
    </BoardWrapper>
  );
};

export default Board;

interface $PlayerSlotProps {
  isHost: boolean;
  size: number;
  zoom: number;
  cord: number[];
  showName: boolean;
  currentPlayerNumber: number;
  players: Player[];
  fog: boolean;
  makeDrop: () => Player | undefined;
  makeDrag: (player: Player) => void;
  toggleFog: (cord: number[]) => void;
  updatePlayers: (players: Player[]) => void;
}
const PlayerSlot = ({
  isHost,
  size,
  zoom,
  cord,
  showName,
  players,
  fog,
  currentPlayerNumber,
  makeDrop,
  makeDrag,
  toggleFog,
  updatePlayers,
}: $PlayerSlotProps) => {
  const drop = (e: any, cord: number[]) => {
    e.preventDefault();
    let changedPlayer = makeDrop();
    let newPlayers: Player[] = players.map((player: Player) => {
      if (player === changedPlayer) {
        return { ...player, cord: cord };
      } else {
        return player;
      }
    });
    console.log("update Players");
    updatePlayers(newPlayers);
  };

  const drag = (e: any, player: Player) => {
    console.log("drag", player.name, player.cord);
    makeDrag(player);
  };

  const dragOver = (e: any) => {
    e.preventDefault();
  };

  const defineSize = useCallback(
    (size: number, player: Player): number => {
      if (player.isMonster) {
        switch (player.size) {
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
    <Slot
      size={size * zoom}
      fog={fog}
      onDrop={(e) => drop(e, cord)}
      isHost={isHost}
      onDragOver={dragOver}
      onClick={() => toggleFog(cord)}
    >
      {players
        .filter((a) => !a.isVisible || isHost)
        .map((playerIcon: Player, index: number) => {
          if (
            (playerIcon.cord === undefined && cord[0] === 0 && cord[1] === 0) ||
            (playerIcon.cord !== undefined &&
              playerIcon.cord[0] === cord[0] &&
              playerIcon.cord[1] === cord[1])
          )
            return (
              <Image
                key={"icon" + index}
                index={index}
                drag={drag}
                player={playerIcon}
                isHost={isHost}
                showName={showName}
                dragOver={dragOver}
                pic={playerIcon.pic}
                size={defineSize(size, playerIcon)}
                isDead={playerIcon.currentHp <= 0}
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
  fog: boolean;
  isHost: boolean;
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
  ${({ fog, isHost }) =>
    fog ? (isHost ? "background-color: rgba(0,0,0,0.5);" : "background-color: rgba(0,0,0,1);") : ""}
`;

interface $ImageProps {
  index: number;
  pic: string;
  size: number;
  showName: boolean;
  isDead: boolean;
  isCurrent: boolean;
  player: Player;
  isHost: boolean;
  drag: (e: any, player: Player) => void;
  dragOver: any;
}

const Image = ({
  index,
  dragOver,
  drag,
  pic,
  size,
  showName,
  player,
  isDead,
  isCurrent,
  isHost,
}: $ImageProps) => {
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
      <ImageElm onDragStart={(e) => drag(e, player)} onDragOver={dragOver} draggable style={style}>
        {isHost && player.isMonster && <Tooltip>{index}</Tooltip>}
        {player.isVisible && <FontAwesomeIcon icon={faEyeSlash} style={{ color: "white" }} />}
      </ImageElm>
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
        {player.isVisible && <FontAwesomeIcon icon={faEyeSlash} />}
        {showName ? `${player.name} ${index}` : `??? ${index}`}
      </ImageElm>
    );
  }
};

const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: -35px;
  left: 0;
  right: 0;
  text-align: center;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.main.highlight};
  color: #fff;
  border-radius: 10px;
  padding: 5px;
  transition: 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.main.highlight} transparent transparent transparent;
  }
`;

const ImageElm = styled.div`
  margin: 3px;
  float: left;
  border-radius: 500px;
  border: 3px solid ${({ theme }) => theme.main.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  box-sizing: border-box;
  cursor: move;
  position: absolute;
  text-align: center;

  &:hover ${Tooltip} {
    display: inline;
  }
`;

const Empty = styled.div``;
