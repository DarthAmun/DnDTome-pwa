import React from "react";
import styled from "styled-components";
import RandomTable from "../../../../data/RandomTable";

import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../../form_elements/IconButton";
import StringField from "../../../form_elements/StringField";

interface $Props {
  randomTable: RandomTable;
  onEdit: (value: RandomTable) => void;
}

const RandomTableEditView = ({ randomTable, onEdit }: $Props) => {
  const onRowChange = (field: string, value: string, index: number) => {
    let rows = randomTable.rows;
    rows[index] = { ...rows[index], [field]: value };
    onEdit({ ...randomTable, rows: rows });
  };

  const addNewRow = () => {
    onEdit({
      ...randomTable,
      rows: [...randomTable.rows, { value: "", cells: "" }],
    });
  };

  const removeRow = (index: number) => {
    let rows = randomTable.rows;
    if (index !== -1) {
      rows.splice(index, 1);
      onEdit({ ...randomTable, rows: rows });
    }
  };

  return (
    <CenterWrapper>
      <RandomTableView>
        <StringField
          value={randomTable.name}
          label="Name"
          onChange={(name) => onEdit({ ...randomTable, name: name })}
        />
        <StringField
          value={randomTable.header}
          label="Header"
          onChange={(name) => onEdit({ ...randomTable, header: name })}
          placeholder={"Items| Description|..."}
        />
      </RandomTableView>
      <RandomTableView>
        {randomTable.rows.map(
          (row: { value: string; cells: string }, index: number) => {
            return (
              <RowWrapper key={index}>
                <RowCount>{index}</RowCount>
                <StringField
                  value={row.value}
                  label={"Row values " + index}
                  onChange={(text) => onRowChange("value", text, index)}
                  placeholder={`${index + 1} or 0-5`}
                />
                <StringField
                  value={row.cells}
                  label={"Row " + index}
                  onChange={(text) => onRowChange("cells", text, index)}
                  placeholder={`Item ${index}| Description ${index}|...`}
                />
                <IconButton icon={faTrash} onClick={() => removeRow(index)} />
              </RowWrapper>
            );
          }
        )}
        <RowWrapper>
          <IconButton icon={faPlus} onClick={() => addNewRow()} />
        </RowWrapper>
      </RandomTableView>
    </CenterWrapper>
  );
};

export default RandomTableEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const RandomTableView = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 600px;
  padding: 5px;
  margin: 5px;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: flex-start;
`;

const RowWrapper = styled.div`
  flex: 1 1 600px;
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const RowCount = styled.div`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  height: 38px;
  line-height: 38px;
  flex: 1 1 20px;
  max-width: 20px;
  text-algin: center;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
`;
