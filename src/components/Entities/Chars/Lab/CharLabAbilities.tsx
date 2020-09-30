import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Char from "../../../../Data/Chars/Char";
import Saves from "../../../../Data/Chars/Saves";
import Skills from "../../../../Data/Chars/Skills";
import Class from "../../../../Data/Classes/Class";
import FeatureSet from "../../../../Data/Classes/FeatureSet";
import Race from "../../../../Data/Races/Race";
import Subrace from "../../../../Data/Races/Subrace";
import { reciveAllFiltered } from "../../../../Services/DatabaseService";

import IconButton from "../../../FormElements/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleUp,
  faAngleUp,
  faCheckCircle,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import NumberField from "../../../FormElements/NumberField";
import FormatedText from "../../../GeneralElements/FormatedText";

interface $Props {
  char: Char;
  onChange: (character: Char) => void;
  completed: (completed: boolean, nextTab: string) => void;
}

const CharLabAbilities = ({ char, onChange, completed }: $Props) => {
  const [prof, setProf] = useState<number>(0);
  const [classes, setClasses] = useState<Class[]>([]);
  const [race, setRace] = useState<Race>();
  const [subrace, setSubrace] = useState<Subrace>();

  const calcLevel = useCallback(() => {
    let level = 0;
    char.classes.forEach((classe) => {
      level += classe.level;
    });
    return level;
  }, [char]);

  useEffect(() => {
    if (classes && classes.length > 0) {
      const level = calcLevel();
      classes[0].featureSets.forEach((featureSet: FeatureSet) => {
        if (featureSet.level === level) {
          setProf(featureSet.profBonus);
        }
      });
    }
  }, [classes, calcLevel]);

  useEffect(() => {
    reciveAllFiltered(
      "classes",
      [
        {
          fieldName: "name",
          value: char.classes.map((classe) => {
            return classe.classe;
          }),
          sort: 0,
        },
      ],
      (results: any[]) => {
        setClasses(results);
      }
    );
  }, [char.classes, calcLevel]);

  useEffect(() => {
    if (char.race && char.race.race.length > 1) {
      reciveAllFiltered(
        "races",
        [{ fieldName: "name", value: char.race.race, sort: 0 }],
        (results: any[]) => {
          setRace(results[0]);
        }
      );
    }
  }, [char]);

  useEffect(() => {
    if (char.race && char.race.subrace.length > 1) {
      reciveAllFiltered(
        "subraces",
        [{ fieldName: "name", value: char.race.subrace, sort: 0 }],
        (results: any[]) => {
          setSubrace(results[0]);
        }
      );
    }
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
      return skillProf * prof + formatScore(stat);
    },
    [formatScore, prof]
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
            label="Wisdome"
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
                {calcSkill(char.skills.acrobaticsProf, char.str)}
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
                {calcSkill(char.skills.athleticsProf, char.dex)}
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
