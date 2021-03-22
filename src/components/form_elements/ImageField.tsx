import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";
import FileField from "./FileField";

interface $Props {
  label?: string;
  onFinished: (base64: string) => void;
}

const ImageImportField = ({ label, onFinished }: $Props) => {
  const changeFile = (fileList: FileList | null) => {
    console.log("Start File Upload");
    if (fileList !== null) {
      const files = Array.from(fileList);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        onFinished(event.target.result);
      };
      reader.readAsDataURL(files[0]);
      console.log(files);
    }
  };

  return (
    <>
      <Files>
        <FileField
          label={label || ""}
          isMulti={false}
          accept={"image/png, image/jpeg"}
          icon={faFileImport}
          onChange={(file) => changeFile(file)}
        />
      </Files>
    </>
  );
};

export default ImageImportField;

const Files = styled.div`
  flex: 1 1 auto;
`;
