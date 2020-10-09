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
  amount: number;
  triggerDeleteAll: (tableName: string) => void;
}

const CharsOptions = ({ amount, triggerDeleteAll }: $Props) => {
  const [send, setSend] = useState<boolean>(false);
  return (
    <OptionTab>
      <OptionSection>
        <SelectionTitle>Export</SelectionTitle>
        <SectionRow>
          <SectionText>Export all Chars?</SectionText>
          <IconButton
            icon={faFileExport}
            onClick={() => exportAllFromTable("chars", "DnDTome_chars.json")}
          />
        </SectionRow>
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Delete</SelectionTitle>
        <SectionRow>
          <SectionText>Delete all {amount} Chars?</SectionText>
          <IconButton
            icon={faTrashAlt}
            onClick={() => triggerDeleteAll("chars")}
          />
        </SectionRow>
      </OptionSection>
      <OptionSection>
        {!send && (
          <TextButton
            text={`Send all chars`}
            icon={faPaperPlane}
            onClick={() => setSend(true)}
          />
        )}
        {!!send && <P2PSender data={"chars"} mode={"ALL"} />}
      </OptionSection>
    </OptionTab>
  );
};

export default CharsOptions;

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
