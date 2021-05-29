import React, { useState } from "react";
import styled from "styled-components";

import FormatedText from "../general_elements/FormatedText";
import TabBar from "../general_elements/TabBar";

import CreateNewEntity from "./gifs/createNewEntity.gif";
import CreateNewEntityBar from "./gifs/createNewEntity_bar.gif";
import CreateNewSubentity from "./gifs/createNewSubentity.gif";
import Import_5eTools from "./gifs/import_5eTools.gif";
import Import from "./gifs/import.gif";
import Export from "./gifs/export.gif";
import ExportEntity from "./gifs/exportEntity.gif";
import ExportFilteredEntity from "./gifs/exportFilteredEntity.gif";
import Asi from "./gifs/asi.gif";
import AsiChar from "./gifs/asiChar.gif";
import Selection from "./gifs/selection.gif";

const Help = () => {
  const [activeTab, setTab] = useState<string>("Install");

  return (
    <>
      <General>
        <TabBar
          children={[
            "Install",
            "Create",
            "Import",
            "Export",
            "Selections",
            "Asi and Feats",
            "Text Formating",
            "Modifiers",
          ]}
          onChange={(tab: string) => setTab(tab)}
          activeTab={activeTab}
        />
        {activeTab === "Install" && (
          <>
            <HelpSection>
              <SelectionTitle>How to install DnDTome on desktop</SelectionTitle>
              <SectionText>
                To install this webapp as an app use chrome and click on the plus in your navigation
                bar right next to the favorite star icon.
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to install DnDTome on mobile</SelectionTitle>
              <SectionText>
                To install this webapp as an app on mobile find and click the "Add to home screen"
                option in your firefox, chrome or safari.
              </SectionText>
            </HelpSection>
          </>
        )}
        {activeTab === "Create" && (
          <>
            <HelpSection>
              <SelectionTitle>How to create Entitys</SelectionTitle>
              <SectionText>
                To create a new Spell for example go to Spells and hit "Add Spell" in the top
                middle.
              </SectionText>
              <Gif src={CreateNewEntity} />
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to create Entitys via the command bar</SelectionTitle>
              <SectionText>
                To create a new Spell for example click inside the command bar at the top of the
                site or hit the shortcut. After which the command "new spell test" for example
                creates a spell with the name "test".
              </SectionText>
              <Gif src={CreateNewEntityBar} />
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to create Sub-Entitys</SelectionTitle>
              <SectionText>
                For subclasses/subraces you need to visit a class/race and click the little circled
                + in the subclass/subrace section of the class/race.
              </SectionText>
              <Gif src={CreateNewSubentity} />
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
              <Gif src={Import} />
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
              <Gif src={Import_5eTools} />
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
              <Gif src={Export} />
              <SectionText>
                Or go to options and navigate to the entities you want to send for example "Spells".
                There you can export all your spells to one file.
              </SectionText>
              <Gif src={ExportEntity} />
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to export only certain Entitiys to .json files</SelectionTitle>
              <SectionText>
                Go to the overview of the entity and search via the searchbar to determine which
                entities should be exported. then click the "Export filtered"-Button located in the
                bottom right section.
              </SectionText>
              <Gif src={ExportFilteredEntity} />
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
        {activeTab === "Selections" && (
          <>
            <HelpSection>
              <SelectionTitle>How to use selections</SelectionTitle>
              <Gif src={Selection} />
            </HelpSection>
          </>
        )}
        {activeTab === "Asi and Feats" && (
          <>
            <HelpSection>
              <SelectionTitle>How to add Asi and Feats to a class</SelectionTitle>
              <Gif src={Asi} />
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to choose an Asi or Feat for a char</SelectionTitle>
              <Gif src={AsiChar} />
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
              <SectionText>
                You can also write: [[spell.Heal Me|ABC]] to link to the spell with the name "Heal
                Me" from the source "ABC".
              </SectionText>
              <SectionText>
                Result: <FormatedText text={"[[spell.Heal Me|ABC]]"} />
              </SectionText>
              <SectionText>This works for all entities.</SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to create a table</SelectionTitle>
              <SectionText>You can add a table in every textarea.</SectionText>
              <SectionText>
                To do so write: <br />
                ||tableStart||
                <br />
                ||"Header1"|"Header2"|"Header3"|...||
                <br />
                ||"Cell1"|"Cell2"|"Cell3"|...||
                <br />
                ||...||
                <br />
                ||tableEnd||
              </SectionText>
              <SectionText>
                Result:{" "}
                <FormatedText
                  text={`||tableStart||||Header1|Header2|Header3|...||||Cell1|Cell2|Cell3|...||||tableEnd||`}
                />
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to create a discord "Link" to roll dice</SelectionTitle>
              <SectionText>You can add a discord-link in every textarea.</SectionText>
              <SectionText>
                To do so write: [[dice.+2 to hit]] to roll a d20+2 in discord.
              </SectionText>
              <SectionText>
                Result: <FormatedText text={`[[dice.+2 to hit]]`} />
              </SectionText>
              <SectionText>
                Or write: [[dice.2d12+6 radiant damage]] to roll a "2d12+6 radiant damage" in
                discord.
              </SectionText>
              <SectionText>
                Result: <FormatedText text={`[[dice.2d12+6 radiant damage]]`} />
              </SectionText>
            </HelpSection>
            <HelpSection>
              <SelectionTitle>How to create a table with links in it</SelectionTitle>
              <SectionText>
                You can add a link to every cell of a table in every textarea.
              </SectionText>
              <SectionText>
                To do so write: <br />
                ||tableStart||
                <br />
                ||"Header1"|"Header2"|"Header3"|...||
                <br />
                ||"[[spell.Heal Me]]"|"Cell2"|"Cell3"|...||
                <br />
                ||...||
                <br />
                ||tableEnd||
              </SectionText>
              <SectionText>
                Result:{" "}
                <FormatedText
                  text={`||tableStart||||Header1|Header2|Header|...||||[[spell.Heal Me]]|Cell2|Cell3|...||||tableEnd||`}
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
                Modifiers enable you to give class-, subclass-, race-, subracefeatures, backgrounds,
                feats and magic items (for now) spezial modifiers that will directly modify the
                character using those things.
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
                Complex example: {'{{ac="10+(([dex]-10)/2)+(([con]-10)/2)"}}'} where{" "}
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
    </>
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
  max-width: max-content;

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

const Gif = styled.img`
  width: 100%;
  max-width: 600px;
`;
