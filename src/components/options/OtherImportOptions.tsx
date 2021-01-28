import React from "react";
import styled from "styled-components";
import ImportField, { ImportModus } from "../form_elements/ImportField";

const OtherImportOptions = () => {
  return (
    <OptionTab>
      <OptionSection>
        <SelectionTitle>Import 5eTools Spells</SelectionTitle>
        <ImportField modus={ImportModus.ETOOLSSPELLS} />
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Import 5eTools Monsters</SelectionTitle>
        <ImportField modus={ImportModus.ETOOLSMONSTERS} />
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Import 5eTools Items/Gear</SelectionTitle>
        <ImportField modus={ImportModus.ETOOLSITEMS} />
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Import 5eTools Races</SelectionTitle>
        <ImportField modus={ImportModus.ETOOLSRACES} />
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Import 5eTools Classes</SelectionTitle>
        <ImportField modus={ImportModus.ETOOLSCLASSES} />
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
