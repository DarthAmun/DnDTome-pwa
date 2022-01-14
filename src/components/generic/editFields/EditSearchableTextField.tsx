import { useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { Button } from "rsuite";
import IEntity from "../../../data/IEntity";
import styled from "styled-components";
import FormattedText from "../../general/FormattedText";
import ReactQuill from "react-quill";
import QuillEditor from "../../general/QuillEditor";

interface $EditSearchableTextFieldProps {
  placeholder: string;
  icon: any;
  value: any;
  isNew: boolean;
  changeEntity: (entity: IEntity) => void;
  triggerEdit: () => void;
}

const EditSearchableTextField = ({
  placeholder,
  icon,
  value,
  isNew,
  changeEntity,
  triggerEdit,
}: $EditSearchableTextFieldProps) => {
  const [isEdit, changeEdit] = useState<boolean>(isNew);

  return (
    <Text isEditing={isEdit}>
      {isEdit && (
        <>
          <QuillEditor
            value={value}
            placeholder={placeholder}
            onChange={(val: any) => {
              changeEntity(val);
            }}
          />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              changeEdit(false);
              triggerEdit();
            }}
          >
            <FaCheck />
          </Button>
        </>
      )}
      {!isEdit && (
        <>
          <PropTitle>{icon}</PropTitle>
          <Button onClick={() => changeEdit(true)} style={{ float: "right" }}>
            <FaEdit />
          </Button>
          <FormattedText text={value} />
        </>
      )}
    </Text>
  );
};

export default EditSearchableTextField;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.highlight};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Text = styled.div<{
  isEditing?: boolean;
}>`
  height: auto;
  width: calc(100% - 15px);
  margin: 10px 5px 5px 5px;
  padding: 10px;
  float: left;
  line-height: 18px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
`;
