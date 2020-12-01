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
          children={["Create", "Import", "Export", "Text Formating", "Modifiers"]}
          onChange={(tab: string) => setTab(tab)}
        />
        {activeTab === "Create" && (
          <>
            <HelpSection>
              <SelectionTitle>How to create Entitys</SelectionTitle>
              <SectionText>
                To create a new Spell for example go to Spells and hit "Add Spell" in the top
                middle.
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to create Sub-Entitys</SelectionTitle>
              <SectionText>
                For subclasses/subraces you need to visit a class/race and click the little circled
                + in the subclass/subrace section of the class/race.
              </SectionText>
            </HelpSection>
          </>
        )}
        {activeTab === "Import" && (
          <>
            <HelpSection>
              <SelectionTitle>How to import Entitiys via .json files</SelectionTitle>
              <SectionText>
                Go to options and select a file in the top left file select dialog titled "Import".
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to import Entitiys via the send functionallity</SelectionTitle>
              <SectionText>
                Go to options and navigate to recive. Add the ID of the sender to the filed and
                accept sended entities.
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to import 5eTools files</SelectionTitle>
              <SectionText>
                Go to options and navigate to "Other Import" and select the file dialog suited for
                the entity you want to import.
              </SectionText>
              <SectionText>Your entity is not listed there?</SectionText>
              <SectionText>Those will be updated and added gradually.</SectionText>
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
              <SelectionTitle>How to export Entitiys to .json files</SelectionTitle>
              <SectionText>
                Go to options and click the "export"-Button located in the top right section titled
                "Export". This will export your hole collection to one big file! (Excluding your pdf
                library)
              </SectionText>
              <SectionText>
                Or go to options and navigate to the entities you want to send for example "Spells".
                There you can export all your spells to one file.
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to send Entitiys via the send functionallity</SelectionTitle>
              <SectionText>
                Go to options and navigate to the entities you want to send for example "Spells".
                Click the "Send all Spells"-Button and copy the ID.
              </SectionText>
              <SectionText>
                Or go to the entities overview and choose a single entity for example a spell called
                "Heal". Click the "Send Heal"-Button and copy the ID.
              </SectionText>
              <SectionText>You can now send the ID to the reciver.</SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to export 5eTools files</SelectionTitle>
              <SectionText>Not supported as of now.</SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to export to other sources</SelectionTitle>
              <SectionText>As of now you can only export to dndtome .json files.</SectionText>
            </HelpSection>
          </>
        )}
        {activeTab === "Text Formating" && (
          <>
            <HelpSection>
              <SelectionTitle>How to create a hyper-link</SelectionTitle>
              <SectionText>You can add a hyper-link in every textarea.</SectionText>
              <SectionText>
                To do so write: [[spell.Heal Me]] to link to the spell with the name "Heal Me".
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
              <SectionText>
                You can add a link to every cell of a table in every textarea.
              </SectionText>
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
        {activeTab === "Modifiers" && (
          <>
            <HelpSection>
              <SelectionTitle>What are modifiers?</SelectionTitle>
              <SectionText>
                Modifiers enable you to give class-, subclass-, race-, subracefeatures and magic
                items (for now) spezial modifiers that will directly modify the character using
                those things.
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>Equal modifiers</SelectionTitle>
              <SectionText>Add {"{{'target'='value'}}"} to a feature.</SectionText>
              <SectionText>
                For example: {"{{ac=15}}"} or {'{{alignment="Real Evil"}'}
              </SectionText>
              <SectionText>
                You can even alter deeper values like: {"{{saves.chaSaveProf=1}}"}
              </SectionText>
              <SectionText>
                Complex example: {"{{ac=10+(([dex]-10)/2)+(([con]-10)/2)}}"} where{" "}
                {"(([dex]-10)/2)"} gives you the bonus for the stat.
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>Add modifiers</SelectionTitle>
              <SectionText>Add {"{{'target'+'value'}}"} to a feature.</SectionText>
              <SectionText>
                For example: {"{{ac+3}}"} or {'{{profs+"Thiefs tools"}'}
              </SectionText>
              <SectionText>Deep example: {"{{skills.natureProf+1}}"}</SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>Substract modifiers</SelectionTitle>
              <SectionText>Add {"{{'target'-'value'}}"} to a feature.</SectionText>
              <SectionText>For example: {"{{ac-3}}"}</SectionText>
              <SectionText>Deep example: {"{{money.gold-100}}"}</SectionText>
              <SectionText>No option for removing something from a text yet!</SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>Add modifiers</SelectionTitle>
              <SectionText>Add {"{{'target'.add='value'}}"} to a feature.</SectionText>
              <SectionText>For example: {'{{spells.add="Acid Splash"}}'}</SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>Character fields that can be accessed</SelectionTitle>
              <SectionText>
                name: text
                <br /> player: text
                <br /> pic: text
                <br /> background: text
                <br /> ac: number
                <br /> hp: number
                <br /> currentHp: number
                <br /> init: number
                <br /> speed: text
                <br /> str: number
                <br /> dex: number
                <br /> con: number
                <br /> int: number
                <br /> wis: number
                <br /> cha: number
                <br /> actions: text
                <br /> profsLangs: text
                <br /> senses: text
                <br /> alignment: text
                <br /> inspiration: number
                <br /> castingHit: number
                <br /> castingDC: number
                <br /> money: Money
                <br /> skills: Skills
                <br /> saves: Saves
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>Money fields that can be accessed</SelectionTitle>
              <SectionText>
                copper: number
                <br /> silver: number
                <br /> electrum: number
                <br /> gold: number
                <br /> platinum: number
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>Saves fields that can be accessed</SelectionTitle>
              <SectionText>
                strSaveProf: number
                <br /> dexSaveProf: number
                <br /> conSaveProf: number
                <br /> intSaveProf: number
                <br /> wisSaveProf: number
                <br /> chaSaveProf: number
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>Skills fields that can be accessed</SelectionTitle>
              <SectionText>
                acrobaticsProf: number
                <br /> animalHandlingProf: number
                <br /> arcanaProf: number
                <br /> athleticsProf: number
                <br /> deceptionProf: number
                <br /> historyProf: number
                <br /> insightProf: number
                <br /> intimidationProf: number
                <br /> investigationProf: number
                <br /> medicineProf: number
                <br /> natureProf: number
                <br /> perceptionProf: number
                <br /> performanceProf: number
                <br /> persuasionProf: number
                <br /> religionProf: number
                <br /> sleightOfHandProf: number
                <br /> stealthProf: number
                <br /> survivalProf: number
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>Fields you can add something to</SelectionTitle>
              <SectionText>
                monsters
                <br /> spells
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
