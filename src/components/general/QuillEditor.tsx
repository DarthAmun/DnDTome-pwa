import ReactQuill from "react-quill";
import styled from "styled-components";

interface $Props {
  value: string;
  placeholder: string;
  onChange: (val: any) => void;
}

const QuillEditor = ({ value, placeholder, onChange }: $Props) => {
  return (
    <EditorWrapper>
      <ReactQuill
        theme="snow"
        placeholder={placeholder}
        modules={{
          toolbar: [
            //[{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            ["bold", "italic", "underline", "strike", "blockquote"], // toggled buttons
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme

            ["clean"], // remove formatting button
          ],
        }}
        value={value}
        onChange={onChange}
      />
    </EditorWrapper>
  );
};

export default QuillEditor;

const EditorWrapper = styled.div`
  & .quill .ql-toolbar {
    border: none;
    .ql-picker {
      color: ${({ theme }) => theme.highlight};
    }
    .ql-stroke {
      stroke: ${({ theme }) => theme.highlight};
    }
    .ql-picker-options {
      background-color: ${({ theme }) => theme.secondColor};
      border-radius: 5px;
      border: none;
      color: ${({ theme }) => theme.textColor};
    }
    .ql-picker-label {
      border: none;
      color: ${({ theme }) => theme.highlight};
    }
  }
  & .quill .ql-container {
    border: none;
    background-color: ${({ theme }) => theme.mainColor};
    border-radius: 5px;
  }
  & .ql-blank:before {
    color: rgba(255, 255, 255, 0.6);
  }
`;
