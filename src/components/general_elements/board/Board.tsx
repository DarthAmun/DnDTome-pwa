import { faEyeSlash, faFill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Slot from "../../../data/encounter/Slot";
import Player from "../../../data/encounter/Player";
import IconButton from "../../form_elements/IconButton";
import NumberField from "../../form_elements/NumberField";
import SingleSelectField from "../../form_elements/SingleSelectField";

interface $Props {
  isHost: boolean;
  img: string;
  players: Player[];
  showName: boolean;
  dimension: { width: number; height: number; size: number; zoom: number };
  fogBoard: Slot[];
  currentPlayerNumber: number;
  onChangePlayers: (value: Player[]) => void;
  onChangeDimension: (value: { width: number; height: number; size: number; zoom: number }) => void;
  onChangeBoard: (fogBoard: Slot[]) => void;
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
  const [dragItem, setDragItem] = useState<Player>();
  const [currentFogBoard, setFogBoard] = useState<Slot[]>(fogBoard);
  const [fog, setFog] = useState<boolean>(false);
  const [fogSize, setFogSize] = useState<string>("dot");

  useEffect(() => {
    setFogBoard(fogBoard);
  }, [fogBoard]);

  const makeDrag = useCallback((player: Player) => {
    setDragItem(player);
  }, []);
  const makeDrop = useCallback((): Player | undefined => {
    return dragItem;
  }, [dragItem]);

  const toggleFog = useCallback(
    (cord: number) => {
      if (fog) {
        let newBoard = [...currentFogBoard];
        if (fogSize === "cross") {
          if (cord - dimension.width >= 0)
            newBoard[cord - dimension.width].fog = !newBoard[cord - dimension.width].fog;
          if ((cord - 1) % dimension.width < cord % dimension.width && cord - 1 >= 0)
            newBoard[cord - 1].fog = !newBoard[cord - 1].fog;
          newBoard[cord].fog = !newBoard[cord].fog;
          if ((cord + 1) % dimension.width > cord % dimension.width)
            newBoard[cord + 1].fog = !newBoard[cord + 1].fog;
          if (cord + dimension.width < dimension.width * dimension.height)
            newBoard[cord + dimension.width].fog = !newBoard[cord + dimension.width].fog;
        } else if (fogSize === "quarter") {
          if (
            cord - dimension.width - 1 >= 0 &&
            (cord - dimension.width - 1) % dimension.width < cord % dimension.width
          )
            newBoard[cord - dimension.width - 1].fog = !newBoard[cord - dimension.width - 1].fog;
          if (cord - dimension.width >= 0)
            newBoard[cord - dimension.width].fog = !newBoard[cord - dimension.width].fog;
          if (
            cord - dimension.width + 1 >= 0 &&
            (cord - dimension.width + 1) % dimension.width > cord % dimension.width
          )
            newBoard[cord - dimension.width + 1].fog = !newBoard[cord - dimension.width + 1].fog;
          if ((cord - 1) % dimension.width < cord % dimension.width && cord - 1 >= 0)
            newBoard[cord - 1].fog = !newBoard[cord - 1].fog;
          newBoard[cord].fog = !newBoard[cord].fog;
          if ((cord + 1) % dimension.width > cord % dimension.width)
            newBoard[cord + 1].fog = !newBoard[cord + 1].fog;
          if (
            cord + dimension.width - 1 < dimension.width * dimension.height &&
            (cord + dimension.width - 1) % dimension.width < cord % dimension.width
          )
            newBoard[cord + dimension.width - 1].fog = !newBoard[cord + dimension.width - 1].fog;
          if (cord + dimension.width < dimension.width * dimension.height)
            newBoard[cord + dimension.width].fog = !newBoard[cord + dimension.width].fog;
          if (
            cord + dimension.width + 1 < dimension.width * dimension.height + 1 &&
            (cord + dimension.width + 1) % dimension.width > cord % dimension.width
          )
            newBoard[cord + dimension.width + 1].fog = !newBoard[cord + dimension.width + 1].fog;
        } else if (fogSize === "full") {
          const newFog = !newBoard[cord].fog;
          [...currentFogBoard].forEach((slot: Slot, index) => {
            newBoard[index].fog = newFog;
          });
        } else {
          newBoard[cord].fog = !newBoard[cord].fog;
        }
        setFogBoard(newBoard);
      }
    },
    [setFogBoard, fog, currentFogBoard, fogSize, dimension]
  );

  const makeFog = useCallback(() => {
    setFog((f) => !f);
    if (fog) {
      console.log("push board");
      onChangeBoard(currentFogBoard);
    }
  }, [fog, currentFogBoard, onChangeBoard]);

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
          <SingleSelectField
            options={[
              { value: "dot", label: "dot" },
              { value: "cross", label: "cross" },
              { value: "quarter", label: "quarder" },
              { value: "full", label: "full" },
            ]}
            style={{ zIndex: "600" }}
            value={fogSize}
            label={"Fog Tool"}
            onChange={setFogSize}
          />
          <IconButton onClick={makeFog} toggle={fog} icon={faFill} />
        </BoardBar>
      )}
      <BoardContainer>
        <LayerWrapper zoom={dimension.zoom / 100}>
          <Grid>
            {fogBoard?.map((slot: Slot, i: number) => {
              return (
                <PlayerSlot
                  isHost={isHost}
                  key={i}
                  cord={i}
                  showName={showName}
                  players={players}
                  size={dimension.size}
                  zoom={dimension.zoom / 100}
                  fog={slot.fog}
                  makeDrop={makeDrop}
                  makeDrag={makeDrag}
                  toggleFog={toggleFog}
                  updatePlayers={onChangePlayers}
                  currentPlayerNumber={currentPlayerNumber}
                />
              );
            })}
          </Grid>
          <MapLayer zoom={dimension.zoom / 100} src={img} />
        </LayerWrapper>
      </BoardContainer>
    </BoardWrapper>
  );
};

export default Board;

interface $PlayerSlotProps {
  isHost: boolean;
  size: number;
  zoom: number;
  cord: number;
  showName: boolean;
  currentPlayerNumber: number;
  players: Player[];
  fog: boolean;
  makeDrop: () => Player | undefined;
  makeDrag: (player: Player) => void;
  toggleFog: (cord: number) => void;
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
  const drop = (e: any, cord: number) => {
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
    <GridCell
      size={size * zoom}
      fog={fog}
      onDrop={(e) => drop(e, cord)}
      isHost={isHost}
      onDragOver={dragOver}
      onClick={() => toggleFog(cord)}
    >
      {players.map((playerIcon: Player, index: number) => {
        if ((!playerIcon.isVisible || isHost) && playerIcon.cord === cord)
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
    </GridCell>
  );
};

const BoardWrapper = styled.div`
  padding: 5px;
  height: calc(100vh - 140px);
  width: calc(100vw - 110px);

  @media (max-width: 576px) {
    width: 100vw;
  }

  display: flex;
  flex-wrap: no-wrap;
  flex-direction: column;
  justify-content: flex-start;
`;
const BoardContainer = styled.div`
  flex: 1 1 100%;
  position: relative;

  max-width: calc(100% - 10px);

  overflow: scroll;

  display: flex;
  flex-wrap: wrap;
`;

type ZoomProp = {
  zoom: number;
};
const LayerWrapper = styled.div<ZoomProp>`
  width: calc(100px * ${({ zoom }) => zoom * 10});
  position: absolute;
  left: 0;
  right: 0;
`;

const MapLayer = styled.img<ZoomProp>`
  width: calc(800px * ${({ zoom }) => zoom});
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const BoardBar = styled.div`
  flex: 1 1 100%;

  max-height: 50px;
  width: 100%;

  display: flex;
  flex-wrap: no-wrap;
  justify-content: space-between;
`;

const Grid = styled.div`
  z-index: 100;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  flex-wrap: wrap;
  flex-direction: flex-start;
`;

type SizeProp = {
  size: number;
  fog: boolean;
  isHost: boolean;
};
const GridCell = styled.div<SizeProp>`
  flex: 1 1;
  min-width: calc(${({ size }) => size}px + 1px);
  max-width: calc(${({ size }) => size}px + 1px);
  min-height: calc(${({ size }) => size}px + 1px);
  max-height: calc(${({ size }) => size}px + 1px);
  margin-left: -1px;
  margin-top: -1px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  position: relative;
  box-sizing: border-box;
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
      zIndex: 200,
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
        {showName ? `${player.name.split("|")[0]} ${index}` : `??? ${index}`}
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
