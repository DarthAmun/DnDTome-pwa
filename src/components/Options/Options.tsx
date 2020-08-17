import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "../Theme/MyThemeProvider";
import { darkTheme, lightTheme } from "../Theme/Theme";
import { importFiles, exportAll } from "../../Services/OptionService";
import { deleteAll, reciveCount } from "../../Services/DatabaseService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faTrashAlt,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { faPatreon, faDiscord } from "@fortawesome/free-brands-svg-icons";
import AppWrapper from "../AppWrapper";
import TabBar from "../GeneralElements/TabBar";
import FileField from "../FormElements/FileField";
import IconButton from "../FormElements/IconButton";

const Options = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setTab] = useState<string>("General");

  const [spellAmount, setSpellAmount] = useState<number>(0);
  const [gearAmount, setGearAmount] = useState<number>(0);
  const [itemAmount, setItemAmount] = useState<number>(0);
  const [monsterAmount, setMonsterAmount] = useState<number>(0);
  const [raceAmount, setRaceAmount] = useState<number>(0);
  const [subraceAmount, setSubraceAmount] = useState<number>(0);
  const [classAmount, setClassAmount] = useState<number>(0);
  const [subclassAmount, setSubclassAmount] = useState<number>(0);
  const [charAmount, setCharAmount] = useState<number>(0);

  useEffect(() => {
    reciveCount("spells", (result: number) => {
      setSpellAmount(result);
    });
    reciveCount("gears", (result: number) => {
      setGearAmount(result);
    });
    reciveCount("items", (result: number) => {
      setItemAmount(result);
    });
    reciveCount("monsters", (result: number) => {
      setMonsterAmount(result);
    });
    reciveCount("races", (result: number) => {
      setRaceAmount(result);
    });
    reciveCount("subraces", (result: number) => {
      setSubraceAmount(result);
    });
    reciveCount("classes", (result: number) => {
      setClassAmount(result);
    });
    reciveCount("subclasses", (result: number) => {
      setSubclassAmount(result);
    });
    reciveCount("chars", (result: number) => {
      setCharAmount(result);
    });
  }, []);

  const toggleTheme = () => {
    if (theme === darkTheme) {
      setTheme(lightTheme);
      localStorage.setItem("theme", "light");
    } else {
      setTheme(darkTheme);
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <AppWrapper>
      <TabBar
        children={[
          "General",
          "Spells",
          "Gears",
          "Magic Items",
          "Monsters",
          "Races",
          "Classes",
          "Chars",
        ]}
        onChange={(tab: string) => setTab(tab)}
      />
      {activeTab === "General" && (
        <General>
          <OptionSection>
            <SelectionTitle>Want to support me?</SelectionTitle>
            <ExternalLink
              href="https://www.patreon.com/bePatron?u=25310394"
              target="_blank"
              rel="noopener noreferrer"
              className="patreon"
            >
              <FontAwesomeIcon icon={faPatreon} /> Become a patron
            </ExternalLink>
          </OptionSection>
          <OptionSection>
            <SelectionTitle>
              Found some bugs? Or have some feedback?
            </SelectionTitle>
            <ExternalLink
              href="https://discord.gg/2KB3tzG"
              target="_blank"
              rel="noopener noreferrer"
              className="discord"
            >
              <FontAwesomeIcon icon={faDiscord} /> Join the discord
            </ExternalLink>
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Theme</SelectionTitle>
            <Button onClick={() => toggleTheme()}>Toggle Style</Button>
          </OptionSection>
        </General>
      )}
      {activeTab === "Spells" && (
        <OptionTab>
          <OptionSection>
            <SelectionTitle>Import</SelectionTitle>
            <FileField
              label=""
              icon={faFileImport}
              onChange={(file) => importFiles(file)}
            />
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Export</SelectionTitle>
            <SectionRow>
              <SectionText>Export all Spells?</SectionText>
              <IconButton
                icon={faFileExport}
                onClick={() => exportAll("spells", "DnDTome_spells.json")}
              />
            </SectionRow>
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Delete</SelectionTitle>
            <SectionRow>
              <SectionText>Delete all {spellAmount} Spells?</SectionText>
              <IconButton
                icon={faTrashAlt}
                onClick={() => deleteAll("spells")}
              />
            </SectionRow>
          </OptionSection>
        </OptionTab>
      )}
      {activeTab === "Gears" && (
        <OptionTab>
          <OptionSection>
            <SelectionTitle>Import</SelectionTitle>
            <FileField
              label=""
              icon={faFileImport}
              onChange={(file) => importFiles(file)}
            />
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Export</SelectionTitle>
            <SectionRow>
              <SectionText>Export all Gear?</SectionText>
              <IconButton
                icon={faFileExport}
                onClick={() => exportAll("gears", "DnDTome_gear.json")}
              />
            </SectionRow>
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Delete</SelectionTitle>
            <SectionRow>
              <SectionText>Delete all {gearAmount} Gear?</SectionText>
              <IconButton
                icon={faTrashAlt}
                onClick={() => deleteAll("gears")}
              />
            </SectionRow>
          </OptionSection>
        </OptionTab>
      )}
      {activeTab === "Magic Items" && (
        <OptionTab>
          <OptionSection>
            <SelectionTitle>Import</SelectionTitle>
            <FileField
              label=""
              icon={faFileImport}
              onChange={(file) => importFiles(file)}
            />
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Export</SelectionTitle>
            <SectionRow>
              <SectionText>Export all Items?</SectionText>
              <IconButton
                icon={faFileExport}
                onClick={() => exportAll("items", "DnDTome_items.json")}
              />
            </SectionRow>
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Delete</SelectionTitle>
            <SectionRow>
              <SectionText>Delete all {itemAmount} Items?</SectionText>
              <IconButton
                icon={faTrashAlt}
                onClick={() => deleteAll("items")}
              />
            </SectionRow>
          </OptionSection>
        </OptionTab>
      )}
      {activeTab === "Monsters" && (
        <OptionTab>
          <OptionSection>
            <SelectionTitle>Import</SelectionTitle>
            <FileField
              label=""
              icon={faFileImport}
              onChange={(file) => importFiles(file)}
            />
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Export</SelectionTitle>
            <SectionRow>
              <SectionText>Export all Monsters?</SectionText>
              <IconButton
                icon={faFileExport}
                onClick={() => exportAll("monsters", "DnDTome_monsters.json")}
              />
            </SectionRow>
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Delete</SelectionTitle>
            <SectionRow>
              <SectionText>Delete all {monsterAmount} Monsters?</SectionText>
              <IconButton
                icon={faTrashAlt}
                onClick={() => deleteAll("monsters")}
              />
            </SectionRow>
          </OptionSection>
        </OptionTab>
      )}
      {activeTab === "Races" && (
        <OptionTab>
          <OptionSection>
            <SelectionTitle>Import</SelectionTitle>
            <FileField
              label=""
              icon={faFileImport}
              onChange={(file) => importFiles(file)}
            />
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Export</SelectionTitle>
            <SectionRow>
              <SectionText>Export all Races?</SectionText>
              <IconButton
                icon={faFileExport}
                onClick={() => exportAll("races", "DnDTome_races.json")}
              />
            </SectionRow>
            <SectionRow>
              <SectionText>Export all Subraces?</SectionText>
              <IconButton
                icon={faFileExport}
                onClick={() => exportAll("subraces", "DnDTome_subraces.json")}
              />
            </SectionRow>
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Delete</SelectionTitle>
            <SectionRow>
              <SectionText>Delete all {raceAmount} Races?</SectionText>
              <IconButton
                icon={faTrashAlt}
                onClick={() => deleteAll("races")}
              />
            </SectionRow>
            <SectionRow>
              <SectionText>Delete all {subraceAmount} Subraces?</SectionText>
              <IconButton
                icon={faTrashAlt}
                onClick={() => deleteAll("subraces")}
              />
            </SectionRow>
          </OptionSection>
        </OptionTab>
      )}
      {activeTab === "Classes" && (
        <OptionTab>
          <OptionSection>
            <SelectionTitle>Import</SelectionTitle>
            <FileField
              label=""
              icon={faFileImport}
              onChange={(file) => importFiles(file)}
            />
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Export</SelectionTitle>
            <SectionRow>
              <SectionText>Export all Classes?</SectionText>
              <IconButton
                icon={faFileExport}
                onClick={() => exportAll("classes", "DnDTome_classes.json")}
              />
            </SectionRow>
            <SectionRow>
              <SectionText>Export all Subclasses?</SectionText>
              <IconButton
                icon={faFileExport}
                onClick={() =>
                  exportAll("subclasses", "DnDTome_subclasses.json")
                }
              />
            </SectionRow>
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Delete</SelectionTitle>
            <SectionRow>
              <SectionText>Delete all {classAmount} Classes?</SectionText>
              <IconButton
                icon={faTrashAlt}
                onClick={() => deleteAll("classes")}
              />
            </SectionRow>
            <SectionRow>
              <SectionText>Delete all {subclassAmount} Subclasses?</SectionText>
              <IconButton
                icon={faTrashAlt}
                onClick={() => deleteAll("subclasses")}
              />
            </SectionRow>
          </OptionSection>
        </OptionTab>
      )}
      {activeTab === "Chars" && (
        <OptionTab>
          <OptionSection>
            <SelectionTitle>Import</SelectionTitle>
            <FileField
              label=""
              icon={faFileImport}
              onChange={(file) => importFiles(file)}
            />
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Export</SelectionTitle>
            <SectionRow>
              <SectionText>Export all Chars?</SectionText>
              <IconButton
                icon={faFileExport}
                onClick={() => exportAll("chars", "DnDTome_chars.json")}
              />
            </SectionRow>
          </OptionSection>
          <OptionSection>
            <SelectionTitle>Delete</SelectionTitle>
            <SectionRow>
              <SectionText>Delete all {charAmount} Chars?</SectionText>
              <IconButton
                icon={faTrashAlt}
                onClick={() => deleteAll("chars")}
              />
            </SectionRow>
          </OptionSection>
        </OptionTab>
      )}
    </AppWrapper>
  );
};

export default Options;

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
`;

const Button = styled.button`
  flex: 1 1 auto;
  display: inline-block;
  text-decoration: none;
  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  height: 28px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 5px;
  text-align: center;
  font-family: inherit;
  font-size: 14px;
  color: ${({ theme }) => theme.buttons.color};
  cursor: pointer;
  line-height: 26px;
`;

const ExternalLink = styled.a`
  flex: 1 1 auto;
  display: inline-block;
  text-decoration: none;
  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  height: 28px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 5px;
  text-align: center;
  font-family: inherit;
  font-size: 14px;
  color: ${({ theme }) => theme.buttons.color};
  cursor: pointer;
  line-height: 26px;

  &.patreon {
    background-color: rgb(232, 91, 70);
  }
  &.discord {
    background-color: #7289da;
  }
`;

const SelectionTitle = styled.div`
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  min-width: calc(100% - 10px);
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
