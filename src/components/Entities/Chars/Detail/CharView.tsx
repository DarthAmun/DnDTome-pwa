import React, { useState, useEffect } from "react";
import styled from "styled-components";
import P2PSender from "../../../P2P/P2PSender";
import { update } from "../../../../Services/DatabaseService";
import Char from "../../../../Data/Chars/Char";
import Class from "../../../../Data/Classes/Class";
import Feature from "../../../../Data/Classes/Feature";
import FeatureSet from "../../../../Data/Classes/FeatureSet";
import Trait from "../../../../Data/Races/Trait";

import TabBar from "../../../GeneralElements/TabBar";
import CharGeneral from "./DetailComponents/CharGeneral";
import CharHeader from "./DetailComponents/CharHeader";
import ItemTile from "../../Item/ItemTile";
import GearTile from "../../Gear/GearTile";
import CharCombat from "./DetailComponents/CharCombat";
import MonsterTile from "../../Monster/MonsterTile";
import FormatedText from "../../../GeneralElements/FormatedText";
import CharSpell from "./DetailComponents/CharSpells";
import { faFilePdf, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../../../FormElements/TextButton";
import { exportPdf } from "../../../../Services/PdfService";
import { buildCharacter, applyMods } from "../../../../Services/CharacterService";
import BuildChar from "../../../../Data/Chars/BuildChar";
import { LoadingSpinner } from "../../../Loading";

interface $Props {
  character: Char;
  modifications: boolean;
}

const CharView = ({ character, modifications }: $Props) => {
  const [send, setSend] = useState<boolean>(false);
  const [buildChar, setBuildChar] = useState<BuildChar>();
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setTab] = useState<string>("General");
  const [tabs, setTabs] = useState<string[]>(["General", "Combat", "Race", "Classes", "Notes"]);

  useEffect(() => {
    buildCharacter(character).then((buildChar) => {
      setBuildChar(applyMods(buildChar, modifications));
      setLoading(false);
    });
  }, [character, setBuildChar, modifications]);

  useEffect(() => {
    if (!tabs.includes("Monster") && character.monsters.length > 0)
      setTabs((t) => [...t, "Monster"]);
  }, [character, tabs]);
  useEffect(() => {
    if (!tabs.includes("Items") && character.items.length > 0) setTabs((t) => [...t, "Items"]);
  }, [character, tabs]);
  useEffect(() => {
    if (!tabs.includes("Spells") && character.spells.length > 0) setTabs((t) => [...t, "Spells"]);
  }, [character, tabs]);

  const saveChar = (char: BuildChar) => {
    setBuildChar(char);
    update("chars", char.character);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && buildChar && (
        <CenterWrapper>
          <CharHeader char={buildChar.character} />
          <TabBar children={tabs} onChange={(tab: string) => setTab(tab)} />
          {activeTab === "General" && (
            <>
              <CharGeneral buildChar={buildChar} onChange={saveChar} />
              <View>
                <PropWrapper>
                  {!send && (
                    <TextButton
                      text={`Send ${buildChar.character.name}`}
                      icon={faPaperPlane}
                      onClick={() => setSend(true)}
                    />
                  )}
                  {!!send && <P2PSender data={buildChar.character} mode={"THIS"} />}
                </PropWrapper>
                <TextButton
                  text={`Export ${buildChar.character.name} to Pdf`}
                  icon={faFilePdf}
                  onClick={() => exportPdf(buildChar.character)}
                />
              </View>
            </>
          )}
          {activeTab === "Combat" && <CharCombat buildChar={buildChar} />}
          {activeTab === "Classes" && (
            <View>
              <PropWrapper>
                {buildChar.classes &&
                  buildChar.classes.map((classe: Class, index: number) => {
                    return (
                      <SmallText key={index}>
                        <PropTitle>{classe.name} Proficiencies:</PropTitle>
                        <FormatedText text={classe.proficiencies} />
                      </SmallText>
                    );
                  })}
              </PropWrapper>
              <PropWrapper>
                {buildChar.classFeatures &&
                  buildChar.classFeatures
                    .sort((f1, f2) => f1.level - f2.level)
                    .map((featureSet: FeatureSet) => {
                      return featureSet.features.map((feature: Feature, index: number) => {
                        let selectionsData: {
                          entityName: string;
                          entityText: string;
                          level: number;
                        }[] = [];
                        if (feature.selections !== undefined && feature.selections.length > 0) {
                          buildChar.character.activeSelections.forEach((activeSelect) => {
                            if (activeSelect.featureName === feature.name) {
                              selectionsData.push(activeSelect.activeOption);
                            }
                          });
                        }
                        return (
                          <Text key={index}>
                            <PropTitle>{feature.name}:</PropTitle>
                            <FormatedText text={feature.text} />
                            {selectionsData.map((activeSelectOption) => {
                              return (
                                <>
                                  <br />
                                  <PropTitle>Choosen {activeSelectOption.entityName}:</PropTitle>
                                  <FormatedText text={activeSelectOption.entityText} />
                                </>
                              );
                            })}
                          </Text>
                        );
                      });
                    })}
              </PropWrapper>
            </View>
          )}
          {activeTab === "Race" && (
            <View>
              <PropWrapper>
                {buildChar.raceFeatures &&
                  buildChar.raceFeatures
                    .sort((f1, f2) => f1.level - f2.level)
                    .map((trait: Trait, index: number) => {
                      return (
                        <TraitWrapper key={index}>
                          <TraitName>{trait.name}</TraitName>
                          <TraitLevel>{trait.level}</TraitLevel>
                          <TraitText>
                            <FormatedText text={trait.text} />
                          </TraitText>
                        </TraitWrapper>
                      );
                    })}
              </PropWrapper>
            </View>
          )}
          {activeTab === "Spells" && <CharSpell buildChar={buildChar} saveChar={saveChar} />}
          {activeTab === "Items" && (
            <View>
              <PropWrapper>
                {buildChar.items &&
                  buildChar.items.map((item, index: number) => {
                    return <ItemTile key={index} item={item.item} />;
                  })}
                {buildChar.gears &&
                  buildChar.gears.map((gear, index: number) => {
                    return <GearTile key={index} gear={gear.gear} />;
                  })}
              </PropWrapper>
            </View>
          )}
          {activeTab === "Monster" && (
            <View>
              <PropWrapper>
                {buildChar.monsters &&
                  buildChar.monsters.map((monster, index: number) => {
                    return <MonsterTile key={index} monster={monster} />;
                  })}
              </PropWrapper>
            </View>
          )}
          {activeTab === "Notes" && (
            <View>
              <PropWrapper>
                <Text>
                  <PropTitle>Notes:</PropTitle>
                  <FormatedText text={buildChar.character.spellNotes} />
                </Text>
              </PropWrapper>
            </View>
          )}
        </CenterWrapper>
      )}
    </>
  );
};

export default CharView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  height: 100%;
  width: min-content;
  min-width: 300px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const PropWrapper = styled.div`
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 20px);
  margin: 0 0 5px 0;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const SmallText = styled(Text)`
  max-width: max-content;
`;

const TraitWrapper = styled(PropWrapper)``;
const TraitName = styled.div`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
  flex: 3 3 auto;
`;
const TraitLevel = styled(TraitName)`
  flex: 1 1 auto;
`;
const TraitText = styled(TraitName)`
  flex: 4 4 auto;
`;
