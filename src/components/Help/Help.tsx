import React, { useState } from "react";
import styled from "styled-components";

import AppWrapper from "../AppWrapper";
import FormatedText from "../GeneralElements/FormatedText";
import TabBar from "../GeneralElements/TabBar";

const Help = () => {
  const [activeTab, setTab] = useState<string>("Create");

  return (
    <AppWrapper>
      <General>
        <TabBar
          children={["Create", "Import", "Export", "Text Formating"]}
          onChange={(tab: string) => setTab(tab)}
        />
        {activeTab === "Create" && (
          <>
            <HelpSection>
              <SelectionTitle>How to create Entitys</SelectionTitle>
              <SectionText>
                To create a new Spell for example go to Spells and hit "Add
                Spell" in the top middle.
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to create Sub-Entitys</SelectionTitle>
              <SectionText>
                For subclasses/subraces you need to visit a class/race and click
                the little circled + in the subclass/subrace section of the
                class/race.
              </SectionText>
            </HelpSection>
          </>
        )}
        {activeTab === "Import" && (
          <>
            <HelpSection>
              <SelectionTitle>
                How to import Entitiys via .json files
              </SelectionTitle>
              <SectionText>
                Go to options and select a file in the top left file select
                dialog titled "Import".
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>
                How to import Entitiys via the send functionallity
              </SelectionTitle>
              <SectionText>
                Go to options and navigate to recive. Add the ID of the sender
                to the filed and accept sended entities.
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to import 5eTools files</SelectionTitle>
              <SectionText>
                Go to options and navigate to "Other Import" and select the file
                dialog suited for the entity you want to import.
              </SectionText>
              <SectionText>Your entity is not listed there?</SectionText>
              <SectionText>
                Those will be updated and added gradually.
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to import from other sources</SelectionTitle>
              <SectionText>
                As of now only dndtome and 5eTools .json files are supported.
              </SectionText>
            </HelpSection>
          </>
        )}
        {activeTab === "Export" && (
          <>
            <HelpSection>
              <SelectionTitle>
                How to export Entitiys to .json files
              </SelectionTitle>
              <SectionText>
                Go to options and click the "export"-Button located in the top
                right section titled "Export". This will export your hole
                collection to one big file! (Excluding your pdf library)
              </SectionText>
              <SectionText>
                Or go to options and navigate to the entities you want to send
                for example "Spells". There you can export all your spells to
                one file.
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>
                How to send Entitiys via the send functionallity
              </SelectionTitle>
              <SectionText>
                Go to options and navigate to the entities you want to send for
                example "Spells". Click the "Send all Spells"-Button and copy
                the ID.
              </SectionText>
              <SectionText>
                Or go to the entities overview and choose a single entity for
                example a spell called "Heal". Click the "Send Heal"-Button and
                copy the ID.
              </SectionText>
              <SectionText>You can now send the ID to the reciver.</SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to export 5eTools files</SelectionTitle>
              <SectionText>Not supported as of now.</SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to export to other sources</SelectionTitle>
              <SectionText>
                As of now you can only export to dndtome .json files.
              </SectionText>
            </HelpSection>
          </>
        )}
        {activeTab === "Text Formating" && (
          <>
            <HelpSection>
              <SelectionTitle>How to create a hyper-link</SelectionTitle>
              <SectionText>
                You can add a hyper-link in every textarea.
              </SectionText>
              <SectionText>
                To do so write: [[spell.Heal Me]] to link to the spell with the
                name "Heal Me".
              </SectionText>
              <SectionText>
                Result: <FormatedText text={"[[spell.Heal Me]]"} />
              </SectionText>
              <SectionText>This works for all entities.</SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to create a table</SelectionTitle>
              <SectionText>You can add a table in every textarea.</SectionText>
              <SectionText>
                To do so write: <br />
                ||table||
                <br />
                ||"Header1"|"Header2"|"Header3"|...||
                <br />
                ||"Cell1"|"Cell2"|"Cell3"|...||
                <br />
                ||...||
              </SectionText>
              <SectionText>
                Result:{" "}
                <FormatedText
                  text={`||table||||Header1|Header2|Header3|...||||Cell1|Cell2|Cell3|...||`}
                />
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to create a table with links in it</SelectionTitle>
              <SectionText>You can add a link to every cell of a table in every textarea.</SectionText>
              <SectionText>
                To do so write: <br />
                ||table||
                <br />
                ||"Header1"|"Header2"|"Header3"|...||
                <br />
                ||"[[spell.Heal Me]]"|"Cell2"|"Cell3"|...||
                <br />
                ||...||
              </SectionText>
              <SectionText>
                Result:{" "}
                <FormatedText
                  text={`||table||||Header1|Header2|Header|...||||[[spell.Heal Me]]|Cell2|Cell3|...||`}
                />
              </SectionText>
            </HelpSection>
          </>
        )}
      </General>
    </AppWrapper>
  );
};

export default Help;

const General = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

const HelpSection = styled.div`
  flex: 1 1 20em;
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

const SectionText = styled.div`
  flex: 1 1 auto;
  width: calc(100% - 10px);
  padding: 5px;
`;
