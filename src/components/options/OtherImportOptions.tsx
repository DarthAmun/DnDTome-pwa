import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";
import {
  import5eToolsClassesFiles,
  import5eToolsItemsFiles,
  import5eToolsMonstersFiles,
  import5eToolsRacesFiles,
  import5eToolsSpellsFiles,
} from "../../services/5eToolService";
import FileField from "../form_elements/FileField";

interface $Props {
  isLoading: (loading: boolean) => void;
  isReload: (loading: boolean) => void;
  setMessage: (msg: string) => void;
  setAlert: (loading: boolean) => void;
}

const OtherImportOptions = ({ isLoading, isReload, setMessage, setAlert }: $Props) => {
  const trigger5eToolsSpellImport = (fileList: FileList | null) => {
    isLoading(true);
    import5eToolsSpellsFiles(fileList, (max: number) => {
      isReload(true);
      isLoading(false);

      setMessage(max + " imported successfully!");
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 5000);
    });
  };

  const trigger5eToolsMonsterImport = (fileList: FileList | null) => {
    isLoading(true);
    import5eToolsMonstersFiles(fileList, (max: number) => {
      isReload(true);
      isLoading(false);

      setMessage(max + " imported successfully!");
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 5000);
    });
  };

  const trigger5eToolsRacesImport = (fileList: FileList | null) => {
    isLoading(true);
    import5eToolsRacesFiles(fileList, (max: number) => {
      isReload(true);
      isLoading(false);

      setMessage(max + " imported successfully!");
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 5000);
    });
  };

  const trigger5eToolsClassesImport = (fileList: FileList | null) => {
    isLoading(true);
    import5eToolsClassesFiles(fileList, (max: number) => {
      isReload(true);
      isLoading(false);

      setMessage(max + " imported successfully!");
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 5000);
    });
  };

  const trigger5eToolsItemsImport = (fileList: FileList | null) => {
    isLoading(true);
    import5eToolsItemsFiles(fileList, (max: number) => {
      isReload(true);
      isLoading(false);

      setMessage(max + " imported successfully!");
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 5000);
    });
  };

  return (
    <OptionTab>
      <OptionSection>
        <SelectionTitle>Import 5eTools Spells</SelectionTitle>
        <FileField
          label=""
          accept={".json"}
          isMulti={true}
          icon={faFileImport}
          onChange={(file) => trigger5eToolsSpellImport(file)}
        />
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Import 5eTools Monsters</SelectionTitle>
        <FileField
          label=""
          accept={".json"}
          isMulti={true}
          icon={faFileImport}
          onChange={(file) => trigger5eToolsMonsterImport(file)}
        />
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Import 5eTools Items/Gear</SelectionTitle>
        <FileField
          label=""
          accept={".json"}
          isMulti={true}
          icon={faFileImport}
          onChange={(file) => trigger5eToolsItemsImport(file)}
        />
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Import 5eTools Races</SelectionTitle>
        <FileField
          label=""
          accept={".json"}
          isMulti={true}
          icon={faFileImport}
          onChange={(file) => trigger5eToolsRacesImport(file)}
        />
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Import 5eTools Classes</SelectionTitle>
        <FileField
          label=""
          accept={".json"}
          isMulti={true}
          icon={faFileImport}
          onChange={(file) => trigger5eToolsClassesImport(file)}
        />
      </OptionSection>
    </OptionTab>
  );
};

export default OtherImportOptions;

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
