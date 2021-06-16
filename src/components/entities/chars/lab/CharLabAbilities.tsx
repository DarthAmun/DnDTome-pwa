import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Char from "../../../../data/chars/Char";
import Saves from "../../../../data/chars/Saves";
import Skills from "../../../../data/chars/Skills";
import Class from "../../../../data/classes/Class";
import Race from "../../../../data/races/Race";
import Subrace from "../../../../data/races/Subrace";
import { reciveAll, recivePromiseByMultiAttribute } from "../../../../services/DatabaseService";

import IconButton from "../../../form_elements/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleUp,
  faAngleUp,
  faCheckCircle,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import NumberField from "../../../form_elements/NumberField";
import FormatedText from "../../../general_elements/FormatedText";
import { calcLevel, calcProf } from "../../../../services/CharacterService";
import ClassSet from "../../../../data/chars/ClassSet";
import Background from "../../../../data/Background";
import Selection from "../../../../data/Selection";
import EnumField from "../../../form_elements/EnumField";
import SingleSelectField from "../../../form_elements/SingleSelectField";
import DataSelectField from "../../../form_elements/DataSelectField";

interface $Props {
  char: Char;
  onChange: (character: Char) => void;
  completed: (completed: boolean, nextTab: string) => void;
}

const CharLabAbilities = ({ char, onChange, completed }: $Props) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [race, setRace] = useState<Race>();
  const [subrace, setSubrace] = useState<Subrace>();
  const [background, setBackground] = useState<Background>();

  useEffect(() => {
    let classList: Promise<Class>[] = [];
    char.classes.forEach((classe: ClassSet) => {
      let [name, sources] = classe.classe.split("|");
      classList.push(recivePromiseByMultiAttribute("classes", { name: name, sources: sources }));
    });
    Promise.all(classList).then(setClasses);
  }, [char.classes]);

  useEffect(() => {
    if (char.race && char.race.race.length > 1) {
      let [name, sources] = char.race.race.split("|");
      recivePromiseByMultiAttribute("races", { name: name, sources: sources }).then(setRace);
    }
    if (char.race && char.race.subrace.length > 1) {
      let [name, sources] = char.race.subrace.split("|");
      recivePromiseByMultiAttribute("subraces", { name: name, sources: sources }).then(setSubrace);
    }
    if (char.background) {
      let [name, sources] = char.background.split("|");
      recivePromiseByMultiAttribute("backgrounds", { name: name, sources: sources }).then(
        setBackground
      );
    }
    reciveAll("selections", (data: any[]) => {
      let selectionsData = data as Selection[];
      setSelections(selectionsData);
    });
  }, [char]);

  const formatProf = useCallback((prof: number) => {
    if (prof === undefined || prof === 0) {
      return faMinus;
    } else if (prof === 1) {
      return faAngleUp;
    } else {
      return faAngleDoubleUp;
    }
  }, []);

  const formatScore = useCallback((score: number) => {
    let mod = Math.floor((score - 10) / 2);
    return mod;
  }, []);

  const calcSkill = useCallback(
    (skillProf: number, stat: number) => {
      return skillProf * calcProf(char) + formatScore(stat);
    },
    [formatScore, char]
  );

  const changeProf = useCallback(
    (profName: string) => {
      const skills: Skills = char.skills;
      let profValue = skills[profName];
      profValue = (profValue + 1) % 3;
      onChange({ ...char, skills: { ...char.skills, [profName]: profValue } });
    },
    [char, onChange]
  );

  const changeSaveProf = useCallback(
    (profName: string) => {
      const saves: Saves = char.saves;
      let profValue = saves[profName];
      profValue = (profValue + 1) % 2;
      onChange({ ...char, saves: { ...char.saves, [profName]: profValue } });
    },
    [char, onChange]
  );

  const onChangeActiveSelection = useCallback(
    (id: number, select: string) => {
      if (char !== undefined) {
        let newActiveSelections = [...char.activeSelections];
        let activSelect = {
          entityName: "",
          entityText: "",
          level: 0,
        };

        selections.forEach((selection: Selection) => {
          if (selection.name === newActiveSelections[id].selectionName) {
            selection.selectionOptions.forEach((option) => {
              if (option.entityName === select) {
                activSelect = option;
              }
            });
          }
        });
        newActiveSelections[id].activeOption = activSelect;
        onChange({ ...char, activeSelections: newActiveSelections });
      }
    },
    [char, selections, onChange]
  );

  const onFeatureAbilityChange = useCallback(
    (
      abilityImprov: {
        origin: string;
        level: number;
        s1: string;
        s2: string;
        feat: string;
      },
      name: string,
      value: string
    ) => {
      let newAbilityImprovs = char.abilityImprovs.map(
        (set: { origin: string; level: number; s1: string; s2: string; feat: string }) => {
          if (abilityImprov.level === set.level && abilityImprov.origin === set.origin) {
            return { ...set, [name]: value };
          } else {
            return set;
          }
        }
      );
      onChange({ ...char, abilityImprovs: newAbilityImprovs });
    },
    [char, onChange]
  );

  return (
    <>
      <CenterWrapper>
        <CharView>
          <PropWrapper>
            {classes &&
              classes.map((classe: Class, index: number) => {
                return (
                  <Text key={index}>
                    <PropTitle>{classe.name}:</PropTitle>
                    <FormatedText text={classe.proficiencies} />
                  </Text>
                );
              })}
            <Text>
              {race && (
                <>
                  <PropTitle>{race.name}:</PropTitle>
                  <FormatedText text={race.abilityScores} />
                </>
              )}
              <br />
              {subrace && (
                <>
                  <PropTitle>{subrace.name}:</PropTitle>
                  <FormatedText text={subrace.abilityScores} />
                </>
              )}
            </Text>
            <Text>
              {background && (
                <>
                  <PropTitle>{background.name}:</PropTitle>
                  <FormatedText text={background.proficiencies} />
                </>
              )}
            </Text>
          </PropWrapper>
        </CharView>
      </CenterWrapper>
      <CenterWrapper>
        <CharView>
          <NumberField
            value={char.str}
            label="Strength"
            onChange={(str) => onChange({ ...char, str: str })}
          />
          <NumberField
            value={char.dex}
            label="Dexterity"
            onChange={(dex) => onChange({ ...char, dex: dex })}
          />
          <NumberField
            value={char.con}
            label="Constitution"
            onChange={(con) => onChange({ ...char, con: con })}
          />
          <NumberField
            value={char.int}
            label="Intelligence"
            onChange={(int) => onChange({ ...char, int: int })}
          />
          <NumberField
            value={char.wis}
            label="Wisdom"
            onChange={(wis) => onChange({ ...char, wis: wis })}
          />
          <NumberField
            value={char.cha}
            label="Charisma"
            onChange={(cha) => onChange({ ...char, cha: cha })}
          />
          <IconButton
            icon={faCheckCircle}
            disabled={
              !(
                char &&
                char.str > 0 &&
                char.dex > 0 &&
                char.con > 0 &&
                char.int > 0 &&
                char.wis > 0 &&
                char.cha > 0
              )
            }
            onClick={() => completed(true, "Equipment")}
          />
          <PropWrapper>
            <PropWithProf>
              <PropText>
                <PropTitle>Str Save:</PropTitle>
                {calcSkill(char.saves.strSaveProf, char.str)}
              </PropText>
              <PropProf onClick={(e) => changeSaveProf("strSaveProf")}>
                <Icon icon={formatProf(char.saves.strSaveProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Dex Save:</PropTitle>
                {calcSkill(char.saves.dexSaveProf, char.dex)}
              </PropText>
              <PropProf onClick={(e) => changeSaveProf("dexSaveProf")}>
                <Icon icon={formatProf(char.saves.dexSaveProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Con Save:</PropTitle>
                {calcSkill(char.saves.conSaveProf, char.con)}
              </PropText>
              <PropProf onClick={(e) => changeSaveProf("conSaveProf")}>
                <Icon icon={formatProf(char.saves.conSaveProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Int Save:</PropTitle>
                {calcSkill(char.saves.intSaveProf, char.int)}
              </PropText>
              <PropProf onClick={(e) => changeSaveProf("intSaveProf")}>
                <Icon icon={formatProf(char.saves.intSaveProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Wis Save:</PropTitle>
                {calcSkill(char.saves.wisSaveProf, char.wis)}
              </PropText>
              <PropProf onClick={(e) => changeSaveProf("wisSaveProf")}>
                <Icon icon={formatProf(char.saves.wisSaveProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Cha Save:</PropTitle>
                {calcSkill(char.saves.chaSaveProf, char.cha)}
              </PropText>
              <PropProf onClick={(e) => changeSaveProf("chaSaveProf")}>
                <Icon icon={formatProf(char.saves.chaSaveProf)} />
              </PropProf>
            </PropWithProf>
          </PropWrapper>
          <PropWrapper>
            <PropWithProf>
              <PropText>
                <PropTitle>Acrobatics:</PropTitle>
                {calcSkill(char.skills.acrobaticsProf, char.dex)}
              </PropText>
              <PropProf onClick={(e) => changeProf("acrobaticsProf")}>
                <Icon icon={formatProf(char.skills.acrobaticsProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Animal Handling:</PropTitle>
                {calcSkill(char.skills.animalHandlingProf, char.wis)}
              </PropText>
              <PropProf onClick={(e) => changeProf("animalHandlingProf")}>
                <Icon icon={formatProf(char.skills.animalHandlingProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Arcana:</PropTitle>
                {calcSkill(char.skills.arcanaProf, char.int)}
              </PropText>
              <PropProf onClick={(e) => changeProf("arcanaProf")}>
                <Icon icon={formatProf(char.skills.arcanaProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Athletics:</PropTitle>
                {calcSkill(char.skills.athleticsProf, char.str)}
              </PropText>
              <PropProf onClick={(e) => changeProf("athleticsProf")}>
                <Icon icon={formatProf(char.skills.athleticsProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Deception:</PropTitle>
                {calcSkill(char.skills.deceptionProf, char.cha)}
              </PropText>
              <PropProf onClick={(e) => changeProf("deceptionProf")}>
                <Icon icon={formatProf(char.skills.deceptionProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>History:</PropTitle>
                {calcSkill(char.skills.historyProf, char.int)}
              </PropText>
              <PropProf onClick={(e) => changeProf("historyProf")}>
                <Icon icon={formatProf(char.skills.historyProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Insight:</PropTitle>
                {calcSkill(char.skills.insightProf, char.wis)}
              </PropText>
              <PropProf onClick={(e) => changeProf("insightProf")}>
                <Icon icon={formatProf(char.skills.insightProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Intimidation:</PropTitle>
                {calcSkill(char.skills.intimidationProf, char.cha)}
              </PropText>
              <PropProf onClick={(e) => changeProf("intimidationProf")}>
                <Icon icon={formatProf(char.skills.intimidationProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Investigation:</PropTitle>
                {calcSkill(char.skills.investigationProf, char.int)}
              </PropText>
              <PropProf onClick={(e) => changeProf("investigationProf")}>
                <Icon icon={formatProf(char.skills.investigationProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Medicine:</PropTitle>
                {calcSkill(char.skills.medicineProf, char.wis)}
              </PropText>
              <PropProf onClick={(e) => changeProf("medicineProf")}>
                <Icon icon={formatProf(char.skills.medicineProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Nature:</PropTitle>
                {calcSkill(char.skills.natureProf, char.int)}
              </PropText>
              <PropProf onClick={(e) => changeProf("natureProf")}>
                <Icon icon={formatProf(char.skills.natureProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Perception:</PropTitle>
                {calcSkill(char.skills.perceptionProf, char.wis)}
              </PropText>
              <PropProf onClick={(e) => changeProf("perceptionProf")}>
                <Icon icon={formatProf(char.skills.perceptionProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Performance:</PropTitle>
                {calcSkill(char.skills.performanceProf, char.cha)}
              </PropText>
              <PropProf onClick={(e) => changeProf("performanceProf")}>
                <Icon icon={formatProf(char.skills.performanceProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Persuasion:</PropTitle>
                {calcSkill(char.skills.persuasionProf, char.cha)}
              </PropText>
              <PropProf onClick={(e) => changeProf("persuasionProf")}>
                <Icon icon={formatProf(char.skills.persuasionProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Religion:</PropTitle>
                {calcSkill(char.skills.religionProf, char.int)}
              </PropText>
              <PropProf onClick={(e) => changeProf("religionProf")}>
                <Icon icon={formatProf(char.skills.religionProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Sleight Of Hand:</PropTitle>
                {calcSkill(char.skills.sleightOfHandProf, char.dex)}
              </PropText>
              <PropProf onClick={(e) => changeProf("sleightOfHandProf")}>
                <Icon icon={formatProf(char.skills.sleightOfHandProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Stealth:</PropTitle>
                {calcSkill(char.skills.stealthProf, char.dex)}
              </PropText>
              <PropProf onClick={(e) => changeProf("stealthProf")}>
                <Icon icon={formatProf(char.skills.stealthProf)} />
              </PropProf>
            </PropWithProf>
            <PropWithProf>
              <PropText>
                <PropTitle>Survival:</PropTitle>
                {calcSkill(char.skills.survivalProf, char.wis)}
              </PropText>
              <PropProf onClick={(e) => changeProf("survivalProf")}>
                <Icon icon={formatProf(char.skills.survivalProf)} />
              </PropProf>
            </PropWithProf>
          </PropWrapper>
          <PropWrapper>
            {char.activeSelections?.map(
              (
                activeSelection: {
                  selectionName: string;
                  activeOption: {
                    entityName: string;
                    entityText: string;
                    level: number;
                  };
                  featureName: string;
                  className: string;
                },
                index: number
              ) => {
                return (
                  <PropWrapper key={index}>
                    <SelectionTitle>
                      {activeSelection.featureName} of {activeSelection.className}
                    </SelectionTitle>
                    <EnumField
                      options={
                        selections
                          .find((select) => select.name === activeSelection.selectionName)
                          ?.selectionOptions.filter((option) => option.level <= calcLevel(char))
                          .map((option) => {
                            return {
                              value: option.entityName,
                              label: option.entityName,
                            };
                          }) || []
                      }
                      value={{
                        value: activeSelection.activeOption.entityName,
                        label: activeSelection.activeOption.entityName,
                      }}
                      label={activeSelection.selectionName}
                      onChange={(select) => onChangeActiveSelection(index, select)}
                    />
                  </PropWrapper>
                );
              }
            )}
            {char.abilityImprovs &&
              char.abilityImprovs
                .filter((a) => a.level <= calcLevel(char))
                .map((a, i) => {
                  return (
                    <Prop key={a.feat + i}>
                      <PropTitle>
                        Class: {a.origin} - Level: {a.level}
                      </PropTitle>
                      {a.feat === "" && (
                        <>
                          <SingleSelectField
                            options={[
                              {
                                value: "str",
                                label: "Str +1",
                              },
                              {
                                value: "dex",
                                label: "Dex +1",
                              },
                              {
                                value: "con",
                                label: "Con +1",
                              },
                              {
                                value: "int",
                                label: "Int +1",
                              },
                              {
                                value: "wis",
                                label: "Wis +1",
                              },
                              {
                                value: "cha",
                                label: "Cha +1",
                              },
                            ]}
                            value={a.s1}
                            label="First Ability +1"
                            onChange={(s) => onFeatureAbilityChange(a, "s1", s)}
                          />
                          <SingleSelectField
                            options={[
                              {
                                value: "str",
                                label: "Str +1",
                              },
                              {
                                value: "dex",
                                label: "Dex +1",
                              },
                              {
                                value: "con",
                                label: "Con +1",
                              },
                              {
                                value: "int",
                                label: "Int +1",
                              },
                              {
                                value: "wis",
                                label: "Wis +1",
                              },
                              {
                                value: "cha",
                                label: "Cha +1",
                              },
                            ]}
                            value={a.s2}
                            label="Second Ability +1"
                            onChange={(s) => onFeatureAbilityChange(a, "s2", s)}
                          />
                          <AbilitySeperator> or </AbilitySeperator>
                        </>
                      )}
                      {a.feat !== "" && (
                        <AbilitySeperator>Clear Feat for ability scores</AbilitySeperator>
                      )}
                      <DataSelectField
                        optionTable={["feats"]}
                        value={a.feat}
                        label="Feat"
                        onChange={(feat) => onFeatureAbilityChange(a, "feat", feat)}
                      />
                    </Prop>
                  );
                })}
          </PropWrapper>
        </CharView>
      </CenterWrapper>
    </>
  );
};

export default CharLabAbilities;

const CenterWrapper = styled.div`
  overflow: visible;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CharView = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 600px;
  padding: 5px;
  margin: 5px;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: stretch;
`;

const PropWrapper = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PropWithProf = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;

  display: flex;
`;

const PropText = styled.div`
  flex: 2 2 auto;
  height: auto;
  margin: 2px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
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

const PropProf = styled.div`
  flex: 1 1;
  max-width: max-content;
  height: auto;
  margin: 2px;
  padding: 10px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};

  svg {
    width: 17px !important;
    height: 17px !important;
    margin: 0;
  }
`;

const Prop = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};

  svg {
    margin-right: 5px;
    height: auto;
    border-radius: 150px;
    transition: color 0.2s;
    color: ${({ theme }) => theme.main.highlight};
  }
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;

const AbilitySeperator = styled.div`
  width: 100%;
  text-align: center;
`;

const SelectionTitle = styled.div`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
