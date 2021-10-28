import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { InputGroup, Input } from "rsuite";
import IEntity from "../../../data/IEntity";
import styled from "styled-components";

interface $EditCompletableStringFieldProps {
  placeholder: string;
  icon: any;
  value: any;
  isNew: boolean;
  changeEntity: (entity: IEntity) => void;
  triggerEdit: () => void;
}

const EditCompletableStringField = ({
  placeholder,
  icon,
  value,
  isNew,
  changeEntity,
  triggerEdit,
}: $EditCompletableStringFieldProps) => {
  const [isEdit, changeEdit] = useState<boolean>(isNew);

  return (
    <Prop isEditing={isEdit} onClick={() => changeEdit(true)}>
      {isEdit && (
        <InputGroup style={{ width: "max-content" }}>
          <InputGroup.Addon>{icon}</InputGroup.Addon>
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(val: any) => changeEntity(val)}
            onKeyPress={(e: any) => {
              if (e.key === "Enter") {
                changeEdit(false);
                triggerEdit();
              }
            }}
          />
          <InputGroup.Button
            onClick={(e) => {
              e.stopPropagation();
              changeEdit(false);
              triggerEdit();
            }}
          >
            <FaCheck />
          </InputGroup.Button>
        </InputGroup>
      )}
      {!isEdit && (
        <>
          {icon} {value}
        </>
      )}
    </Prop>
  );
};

export default EditCompletableStringField;

const Prop = styled.div<{
  isEditing?: boolean;
}>`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
  float: left;
  padding: ${(props) => (props.isEditing ? "3px" : "10px")};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
  display: flex;
  gap: 5px;

  & > svg {
    margin-right: 5px;
    width: 15px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.highlight};
  }
`;
