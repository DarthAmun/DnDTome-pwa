import React from "react";
import styled from "styled-components";
import Selection from "../../../../data/Selection";

import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../../form_elements/IconButton";
import NumberField from "../../../form_elements/NumberField";
import ShortTextField from "../../../form_elements/ShortTextField";
import StringField from "../../../form_elements/StringField";

interface $Props {
  selection: Selection;
  onEdit: (value: Selection) => void;
}

const SelectionEditView = ({ selection, onEdit }: $Props) => {
  const onSelectionChange = (
    oldSelection: { entityName: string; entityText: string; level: number },
    field: string,
    value: string | number
  ) => {
    let selections = selection.selectionOptions.map(
      (selection: {
        entityName: string;
        entityPrerequsite: string;
        entityText: string;
        level: number;
      }) => {
        if (selection === oldSelection) {
          return {
            ...selection,
            [field]: value,
          };
        } else {
          return selection;
        }
      }
    );
    onEdit({ ...selection, selectionOptions: selections });
  };

  const addNewSelection = () => {
    onEdit({
      ...selection,
      selectionOptions: [
        ...selection.selectionOptions,
        { entityName: "", entityPrerequsite: "", entityText: "", level: 0 },
      ],
    });
  };

  const removeSelection = (oldSelection: {
    entityName: string;
    entityPrerequsite: string;
    entityText: string;
    level: number;
  }) => {
    let selections = selection.selectionOptions;
    const index: number = selections.indexOf(oldSelection);
    if (index !== -1) {
      selections.splice(index, 1);
      onEdit({ ...selection, selectionOptions: selections });
    }
  };

  return (
    <CenterWrapper>
      <View>
        <StringField
          value={selection.name}
          label="Selections Name"
          style={{ width: "100%" }}
          onChange={(name) => onEdit({ ...selection, name: name })}
        />
        {selection.selectionOptions.map(
          (
            selection: {
              entityName: string;
              entityPrerequsite: string;
              entityText: string;
              level: number;
            },
            index: number
          ) => {
            return (
              <SelectionWrapper key={index}>
                <SelectionName
                  value={selection.entityName}
                  label="Name"
                  onChange={(name) => onSelectionChange(selection, "entityName", name)}
                />
                <SelectionLevel
                  value={selection.level}
                  label="Level"
                  onChange={(level) => onSelectionChange(selection, "level", level)}
                />
                <IconButton icon={faTrash} onClick={() => removeSelection(selection)} />
                <SelectionText
                  value={selection.entityPrerequsite}
                  label="Prerequsite"
                  onChange={(text) => onSelectionChange(selection, "entityPrerequsite", text)}
                />
                <SelectionText
                  value={selection.entityText}
                  label="Text"
                  onChange={(text) => onSelectionChange(selection, "entityText", text)}
                />
              </SelectionWrapper>
            );
          }
        )}
        <SelectionWrapper>
          <IconButton icon={faPlus} onClick={() => addNewSelection()} />
        </SelectionWrapper>
      </View>
    </CenterWrapper>
  );
};

export default SelectionEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  padding: 5px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const SelectionWrapper = styled.div`
  flex: 1 1 600px;
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const SelectionName = styled(StringField)`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
  flex: 3 3 auto;
`;
const SelectionLevel = styled(NumberField)`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
  flex: 1 1 auto;
`;
const SelectionText = styled(ShortTextField)`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
  flex: 4 4 auto;
`;
