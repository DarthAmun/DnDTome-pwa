import React, { useEffect, useState } from "react";
import styled from "styled-components";

import StringField from "../../form_elements/StringField";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../../form_elements/TextButton";
import { LatLng } from "leaflet";

interface $Props {
  activeElement: { position: LatLng; text: string };
  onSave: (element: { position: LatLng; text: string }) => void;
  onDelete: () => void;
  onClose: () => void;
}

const EditDialog = ({ activeElement, onSave, onClose, onDelete }: $Props) => {
  const [label, setLabel] = useState<string>(activeElement.text);

  useEffect(() => {
    setLabel(activeElement.text);
  }, [activeElement]);

  const onSaveClick = () => {
    let newElement = { ...activeElement };
    newElement.text = label;
    onSave(newElement);
  };

  return (
    <Dialog>
      <StringField value={label} label="Label" onChange={setLabel} />
      <TextButton text={"Cancel"} icon={faTimes} onClick={onClose} />
      <TextButton text={"Delete"} icon={faTimes} onClick={onDelete} />
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
