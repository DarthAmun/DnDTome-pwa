import React, { useState, useEffect } from "react";
import styled from "styled-components";
import P2PSender from "../../../p2p/P2PSender";
import { update } from "../../../../services/DatabaseService";
import Char from "../../../../data/chars/Char";
import Class from "../../../../data/classes/Class";
import Feature from "../../../../data/classes/Feature";
import FeatureSet from "../../../../data/classes/FeatureSet";
import Trait from "../../../../data/races/Trait";

import TabBar from "../../../general_elements/TabBar";
import CharGeneral from "./detail_components/CharGeneral";
import CharHeader from "./detail_components/CharHeader";
import ItemTile from "../../item/ItemTile";
import GearTile from "../../gear/GearTile";
import CharCombat from "./detail_components/CharCombat";
import MonsterTile from "../../monster/MonsterTile";
import FormatedText from "../../../general_elements/FormatedText";
import CharSpell from "./detail_components/CharSpells";
import { faFilePdf, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../../../form_elements/TextButton";
import { exportPdf } from "../../../../services/PdfService";
import { buildCharacter, applyMods } from "../../../../services/CharacterService";
import BuildChar from "../../../../data/chars/BuildChar";
import { LoadingSpinner } from "../../../Loading";
import Modifier from "../../../../data/Modifier";

interface $Props {
  character: Char;
  modifications: boolean;
}

const CharView = ({ character, modifications }: $Props) => {
  const [send, setSend] = useState<boolean>(false);
  const [buildChar, setBuildChar] = useState<BuildChar>(new BuildChar());
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setTab] = useState<string>("General");
  const [tabs, setTabs] = useState<string[]>([
    "General",
    "Combat",
    "Race",
    "Classes",
    "Notes",
    "Modifications",
  ]);

  useEffect(() => {
    buildCharacter(character).then(async (buildChar) => {
      setBuildChar(await applyMods(buildChar, modifications));
      setLoading(false);
    });
  }, [character, setBuildChar, modifications]);

  useEffect(() => {
    if (!tabs.includes("Monster") && buildChar.monsters.length > 0)
      setTabs((t) => [...t, "Monster"]);
  }, [buildChar.monsters, tabs]);
  useEffect(() => {
    if (!tabs.includes("Items") && buildChar.items.length > 0) setTabs((t) => [...t, "Items"]);
  }, [buildChar.items, tabs]);
  useEffect(() => {
    if (!tabs.includes("Spells") && buildChar.spells.length > 0) setTabs((t) => [...t, "Spells"]);
  }, [buildChar.spells, tabs]);

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
          <TabBar children={tabs} onChange={(tab: string) => setTab(tab)} activeTab={activeTab} />
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
          {activeTab === "Modifications" && (
            <View>
              <PropWrapper>
                {buildChar.modifiers.map((mod: Modifier, index: number) => {
                  return (
                    <Text>
                      <PropTitle>
                        {mod.origin}
                        {" | "}
                      </PropTitle>
                      <FormatedText text={mod.makeString()} />
                    </Text>
                  );
                })}
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
