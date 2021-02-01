import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NumberField from "../../form_elements/NumberField";

interface $Props {
  img: string;
}

const Board = ({ img }: $Props) => {
  const [board, setBoard] = useState<JSX.Element[]>([]);
  const [dimension, setDimension] = useState<{ width: number; height: number; size: number }>({
    width: 30,
    height: 30,
    size: 57.3,
  });

  useEffect(() => {
    let newBoard: JSX.Element[] = [];
    for (let i = 0; i < dimension.height; i++) {
      newBoard.push(<BoardRow>{makeRow(i).map((slot) => slot)}</BoardRow>);
    }
    setBoard(newBoard);
    console.log(newBoard);
  }, [dimension]);

  const makeRow = (row: number) => {
    let slots: JSX.Element[] = [];
    for (let j = 0; j < dimension.width; j++) {
      slots.push(<Slot key={"" + row + j} size={dimension.size}></Slot>);
    }
    return slots;
  };

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
        <BoardLayer>{board}</BoardLayer>
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
  border: 1px solid rgba(0, 0, 0, .3);
`;
