import React, { useState } from "react";
import styled from "styled-components";

import {
  faFileExport,
  faPaperPlane,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { exportAllFromTable } from "../../Services/OptionService";
import IconButton from "../FormElements/IconButton";
import P2PSender from "../P2P/P2PSender";
import TextButton from "../FormElements/TextButton";

interface $Props {
  amounts: number[];
  triggerDeleteAll: (tableName: string) => void;
}

const ClassesOptions = ({ amounts, triggerDeleteAll }: $Props) => {
  const [sendClasses, setSendClasses] = useState<boolean>(false);
  const [sendSubclasses, setSendSubclasses] = useState<boolean>(false);

  return (
    <OptionTab>
      <OptionSection>
        <SelectionTitle>Export</SelectionTitle>
        <SectionRow>
          <SectionText>Export all Classes?</SectionText>
          <IconButton
            icon={faFileExport}
            onClick={() =>
              exportAllFromTable("classes", "DnDTome_classes.json")
            }
          />
        </SectionRow>
        <SectionRow>
          <SectionText>Export all Subclasses?</SectionText>
          <IconButton
            icon={faFileExport}
            onClick={() =>
              exportAllFromTable("subclasses", "DnDTome_subclasses.json")
            }
          />
        </SectionRow>
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Delete</SelectionTitle>
        <SectionRow>
          <SectionText>Delete all {amounts[0]} Classes?</SectionText>
          <IconButton
            icon={faTrashAlt}
            onClick={() => triggerDeleteAll("classes")}
          />
        </SectionRow>
        <SectionRow>
          <SectionText>Delete all {amounts[1]} Subclasses?</SectionText>
          <IconButton
            icon={faTrashAlt}
            onClick={() => triggerDeleteAll("subclasses")}
          />
        </SectionRow>
      </OptionSection>
      <OptionSection>
        {!sendClasses && (
          <TextButton
            text={`Send all classes`}
            icon={faPaperPlane}
            onClick={() => setSendClasses(true)}
          />
        )}
        {!!sendClasses && <P2PSender data={"classes"} mode={"ALL"} />}
      </OptionSection>
      <OptionSection>
        {!sendSubclasses && (
          <TextButton
            text={`Send all subclasses`}
            icon={faPaperPlane}
            onClick={() => setSendSubclasses(true)}
          />
        )}
        {!!sendSubclasses && <P2PSender data={"subclasses"} mode={"ALL"} />}
      </OptionSection>
    </OptionTab>
  );
};

export default ClassesOptions;

const General = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

const OptionTab = styled(General)`
  flex: 1 1 auto;
`;

const OptionSection = styled(General)`
  flex: 1 1 auto;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

const SelectionTitle = styled.div`
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  min-width: calc(100% - 20px);
  font-weight: bold;
  text-algin: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.input.color};
  background-color: ${({ theme }) => theme.input.backgroundColor};
`;

const SectionRow = styled.div`
  flex: 1 1 auto;
  margin: 5px;
  min-width: calc(100% - 10px);

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
`;

const SectionText = styled.div`
  flex: 1 1 auto;
`;
