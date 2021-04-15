import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { FlowElement, isNode, isEdge } from "react-flow-renderer";
import StringField from "../../form_elements/StringField";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../../form_elements/TextButton";

interface $Props {
  activeElement: FlowElement;
  onSave: (element: FlowElement) => void;
  onClose: () => void;
}

const EditDialog = ({ activeElement, onSave, onClose }: $Props) => {
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    if (isNode(activeElement)) setLabel(activeElement.data.label);
    // if (isEdge(activeElement) && activeElement.label !== undefined) setLabel(activeElement.label);
    if (isEdge(activeElement) && activeElement.label !== undefined)
      console.log(activeElement.label);
  }, [activeElement, setLabel]);

  const onSaveClick = () => {
    let newElement = activeElement;
    if (isNode(newElement)) {
      newElement.data = { ...newElement.data, label: label };
    }
    if (isEdge(newElement)) {
      if (newElement.label !== undefined) {
        newElement = { ...newElement, label: label };
      } else {
        newElement.label = label;
      }
    }
    onSave(newElement);
  };

  return (
    <Dialog>
      <StringField value={label} label="Label" onChange={setLabel} />
      <TextButton text={"Cancel"} icon={faTimes} onClick={onClose} />
      <TextButton text={"Save"} icon={faSave} onClick={() => onSaveClick()} />
    </Dialog>
  );
};

export default EditDialog;

const Dialog = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0px;

  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.main.backgroundColor};
  margin: 0.5em;
  padding: 10px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
`;
