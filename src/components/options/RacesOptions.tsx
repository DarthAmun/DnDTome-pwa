import React, { useState } from "react";
import styled from "styled-components";

import {
  faFileExport,
  faPaperPlane,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { exportAllFromTable } from "../../services/OptionService";
import IconButton from "../form_elements/IconButton";
import P2PSender from "../p2p/P2PSender";
import TextButton from "../form_elements/TextButton";

interface $Props {
  amounts: number[];
  triggerDeleteAll: (tableName: string) => void;
}

const RacesOptions = ({ amounts, triggerDeleteAll }: $Props) => {
  const [sendRaces, setSendRaces] = useState<boolean>(false);
  const [sendSubraces, setSendSubraces] = useState<boolean>(false);

  return (
    <OptionTab>
      <OptionSection>
        <SelectionTitle>Export</SelectionTitle>
        <SectionRow>
          <SectionText>Export all Races?</SectionText>
          <IconButton
            icon={faFileExport}
            onClick={() => exportAllFromTable("races", "DnDTome_races.json")}
          />
        </SectionRow>
        <SectionRow>
          <SectionText>Export all Subraces?</SectionText>
          <IconButton
            icon={faFileExport}
            onClick={() =>
              exportAllFromTable("subraces", "DnDTome_subraces.json")
            }
          />
        </SectionRow>
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Delete</SelectionTitle>
        <SectionRow>
          <SectionText>Delete all {amounts[0]} Races?</SectionText>
          <IconButton
            icon={faTrashAlt}
            onClick={() => triggerDeleteAll("races")}
          />
        </SectionRow>
        <SectionRow>
          <SectionText>Delete all {amounts[1]} Subraces?</SectionText>
          <IconButton
            icon={faTrashAlt}
            onClick={() => triggerDeleteAll("subraces")}
          />
        </SectionRow>
      </OptionSection>
      <OptionSection>
        {!sendRaces && (
          <TextButton
            text={`Send all races`}
            icon={faPaperPlane}
            onClick={() => setSendRaces(true)}
          />
        )}
        {!!sendRaces && <P2PSender data={"races"} mode={"ALL"} />}
      </OptionSection>
      <OptionSection>
        {!sendSubraces && (
          <TextButton
            text={`Send all subraces`}
            icon={faPaperPlane}
            onClick={() => setSendSubraces(true)}
          />
        )}
        {!!sendSubraces && <P2PSender data={"subraces"} mode={"ALL"} />}
      </OptionSection>
    </OptionTab>
  );
};

export default RacesOptions;

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
