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
  amounts: number[];
  triggerDeleteAll: (tableName: string) => void;
  triggerDeleteByAttr: (tableName: string, attrs: string[]) => void;
}

const RacesOptions = ({ amounts, triggerDeleteAll, triggerDeleteByAttr }: $Props) => {
  const [sendRaces, setSendRaces] = useState<boolean>(false);
  const [sendSubraces, setSendSubraces] = useState<boolean>(false);

  const [races, setRaces] = useState<string[]>([]);
  const [raceList, setRaceList] = useState<{ value: string; label: string }[]>([]);
  const [subraces, setSubraces] = useState<string[]>([]);
  const [subraceList, setSubraceList] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    reciveAttributeSelection("races", "sources", function (result) {
      let sources = result.map((source) => {
        if (source === "") {
          return { value: source.toString(), label: "Empty" };
        }
        return { value: source.toString(), label: source.toString() };
      });
      setRaceList(sources);
    });
    reciveAttributeSelection("subraces", "sources", function (result) {
      let sources = result.map((source) => {
        if (source === "") {
          return { value: source.toString(), label: "Empty" };
        }
        return { value: source.toString(), label: source.toString() };
      });
      setSubraceList(sources);
    });
  }, []);

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
            onClick={() => exportAllFromTable("subraces", "DnDTome_subraces.json")}
          />
        </SectionRow>
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Delete</SelectionTitle>
        <SectionRow>
          <SectionText>Delete all {amounts[0]} Races?</SectionText>
          <IconButton icon={faTrashAlt} onClick={() => triggerDeleteAll("races")} />
        </SectionRow>
        <SectionRow>
          <SectionText>Delete all Races by</SectionText>
          <MultipleSelectField
            options={raceList}
            label="Source"
            onChange={(sources: string[]) => setRaces(sources)}
          />
          <IconButton icon={faTrashAlt} onClick={() => triggerDeleteByAttr("races", races)} />
        </SectionRow>
        <SectionRow>
          <SectionText>Delete all {amounts[1]} Subraces?</SectionText>
          <IconButton icon={faTrashAlt} onClick={() => triggerDeleteAll("subraces")} />
        </SectionRow>
        <SectionRow>
          <SectionText>Delete all Subraces by</SectionText>
          <MultipleSelectField
            options={subraceList}
            label="Source"
            onChange={(sources: string[]) => setSubraces(sources)}
          />
          <IconButton icon={faTrashAlt} onClick={() => triggerDeleteByAttr("subraces", subraces)} />
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
