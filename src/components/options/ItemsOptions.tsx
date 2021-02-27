import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { faFileExport, faPaperPlane, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { exportAllFromTable } from "../../services/OptionService";
import IconButton from "../form_elements/IconButton";
import P2PSender from "../p2p/P2PSender";
import TextButton from "../form_elements/TextButton";
import { reciveAttributeSelection } from "../../services/DatabaseService";
import MultipleSelectField from "../form_elements/MultipleSelectField";

interface $Props {
  amount: number;
  triggerDeleteAll: (tableName: string) => void;
  triggerDeleteByAttr: (tableName: string, attrs: string[]) => void;
}

const ItemsOptions = ({ amount, triggerDeleteAll, triggerDeleteByAttr }: $Props) => {
  const [send, setSend] = useState<boolean>(false);
  const [source, setSource] = useState<string[]>([]);
  const [sourceList, setSourceList] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    reciveAttributeSelection("items", "sources", function (result) {
      let sources = result.map((source) => {
        if (source === "") {
          return { value: source.toString(), label: "Empty" };
        }
        return { value: source.toString(), label: source.toString() };
      });
      setSourceList(sources);
    });
  }, []);

  return (
    <OptionTab>
      <OptionSection>
        <SelectionTitle>Export</SelectionTitle>
        <SectionRow>
          <SectionText>Export all Items?</SectionText>
          <IconButton
            icon={faFileExport}
            onClick={() => exportAllFromTable("items", "DnDTome_items.json")}
          />
        </SectionRow>
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Delete</SelectionTitle>
        <SectionRow>
          <SectionText>Delete all {amount} Items?</SectionText>
          <IconButton icon={faTrashAlt} onClick={() => triggerDeleteAll("items")} />
        </SectionRow>
        <SectionRow>
          <SectionText>Delete all Items by</SectionText>
          <MultipleSelectField
            options={sourceList}
            label="Source"
            onChange={(sources: string[]) => setSource(sources)}
          />
          <IconButton icon={faTrashAlt} onClick={() => triggerDeleteByAttr("items", source)} />
        </SectionRow>
      </OptionSection>
      <OptionSection>
        {!send && (
          <TextButton text={`Send all items`} icon={faPaperPlane} onClick={() => setSend(true)} />
        )}
        {!!send && <P2PSender data={"items"} mode={"ALL"} />}
      </OptionSection>
    </OptionTab>
  );
};

export default ItemsOptions;

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
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};

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
