import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Char from "../../../../../Data/Chars/Char";
import Class from "../../../../../Data/Classes/Class";
import Item from "../../../../../Data/Item";
import Gear from "../../../../../Data/Gear";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faAngleUp,
  faAngleDoubleUp,
  faHeartBroken,
  faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";
import SmallNumberField from "../../../../FormElements/SmallNumberField";
import FeatureSet from "../../../../../Data/Classes/FeatureSet";

interface $Props {
  char: Char;
  onChange: (character: Char) => void;
  classes: Class[];
  items: Item[];
  gears: Gear[];
}

const CharGeneral = ({ char, classes, items, gears, onChange }: $Props) => {
  const [deathSaves, setDeathSaves] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [prof, setProf] = useState<number>(0);
  let history = useHistory();

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
  }, [char, classes, calcLevel]);


  const formatText = useCallback(
    (text: String) => {
      if (char !== undefined) {
        let parts: string[] = text.split("[[");
        return parts.map((part: string, index: number) => {
          if (part.includes("]]")) {
            const codePart: string[] = part.split("]]");
            const linkParts: string[] = codePart[0].split(".");
            const link: string =
              "/" + linkParts[0] + "-detail/name/" + linkParts[1];
            return (
              <TextPart key={index}>
                <Link onClick={() => history.push(link)}>{linkParts[1]}</Link>
                {codePart[1]}
              </TextPart>
            );
          } else {
            return <TextPart key={index}>{part}</TextPart>;
          }
        });
      }
      return "";
    },
    [char, history]
  );

  const formatProf = useCallback((prof: number) => {
    if (prof === undefined || prof === 0) {
      return faMinus;
    } else if (prof === 1) {
      return faAngleUp;
    } else {
      return faAngleDoubleUp;
    }
  }, []);

  const changeMoney = (field: string, value: number) => {
    const newChar = { ...char, money: { ...char.money, [field]: value } };
    onChange(newChar);
  };

  const changeHp = (field: string, value: number) => {
    const newChar = { ...char, [field]: value };
    onChange(newChar);
  };

  const changeDeathIcon = (value: number) => {
    if (value === undefined || value === 0) {
      return faMinus;
    } else {
      return faHeartBroken;
    }
  };
  const changeLifeIcon = (value: number) => {
    if (value === undefined || value === 0) {
      return faMinus;
    } else {
      return faHeartbeat;
    }
  };
  const changeDeathSave = (index: number) => {
    let newDeathSaves = [...deathSaves];
    newDeathSaves[index] = (deathSaves[index] + 1) % 2;
    setDeathSaves(newDeathSaves);
  };

  return (
    <>
      <MinView>
        <PropColumnWrapper>
          <PropWithProf>
            <PropText>
              <PropTitle>Str Save:</PropTitle>
              {char.saves.strSave}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.saves.strSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Dex Save:</PropTitle>
              {char.saves.dexSave}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.saves.dexSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Con Save:</PropTitle>
              {char.saves.conSave}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.saves.conSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Int Save:</PropTitle>
              {char.saves.intSave}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.saves.intSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Wis Save:</PropTitle>
              {char.saves.wisSave}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.saves.wisSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Cha Save:</PropTitle>
              {char.saves.chaSave}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.saves.chaSaveProf)} />
            </PropProf>
          </PropWithProf>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <PropWithProf>
            <PropText>
              <PropTitle>Acrobatics:</PropTitle>
              {char.skills.acrobatics}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.acrobaticsProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Animal Handling:</PropTitle>
              {char.skills.animalHandling}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.animalHandlingProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Arcana:</PropTitle>
              {char.skills.arcana}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.arcanaProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Athletics:</PropTitle>
              {char.skills.athletics}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.athleticsProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Deception:</PropTitle>
              {char.skills.deception}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.deceptionProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>History:</PropTitle>
              {char.skills.history}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.historyProf)} />
            </PropProf>
          </PropWithProf>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <PropWithProf>
            <PropText>
              <PropTitle>Insight:</PropTitle>
              {char.skills.insight}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.insightProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Intimidation:</PropTitle>
              {char.skills.intimidation}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.intimidationProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Investigation:</PropTitle>
              {char.skills.investigation}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.investigationProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Medicine:</PropTitle>
              {char.skills.medicine}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.medicineProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Nature:</PropTitle>
              {char.skills.nature}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.natureProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Perception:</PropTitle>
              {char.skills.perception}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.perceptionProf)} />
            </PropProf>
          </PropWithProf>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <PropWithProf>
            <PropText>
              <PropTitle>Performance:</PropTitle>
              {char.skills.performance}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.performanceProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Persuasion:</PropTitle>
              {char.skills.persuasion}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.persuasionProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Religion:</PropTitle>
              {char.skills.religion}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.religionProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Sleight Of Hand:</PropTitle>
              {char.skills.sleightOfHand}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.sleightOfHandProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Stealth:</PropTitle>
              {char.skills.stealth}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.stealthProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Survival:</PropTitle>
              {char.skills.survival}{" "}
            </PropText>
            <PropProf>
              <Icon icon={formatProf(char.skills.survivalProf)} />
            </PropProf>
          </PropWithProf>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <Prop>
            <PropTitle>Proficiencies Bonus:</PropTitle>+{prof}
          </Prop>
          <Prop>
            <PropTitle>Initiative:</PropTitle>
            {char.init}
          </Prop>
          <Prop>
            <PropTitle>Armor Class:</PropTitle>
            {char.ac}
          </Prop>
          <Prop>
            <PropTitle>Hit Points:</PropTitle>
            {char.hp}
          </Prop>
          <SmallNumberField
            value={char.currentHp}
            label="Current Hp"
            onChange={(currentHp) => changeHp("currentHp", currentHp)}
          />
          <Prop>
            <PropTitle>Hit Die:</PropTitle>
            {char.classes.map((classe) => {
              return classes.map((classesClass) => {
                if (classe.classe === classesClass.name) {
                  return classe.level + classesClass.hitDices + " ";
                } else {
                  return "";
                }
              });
            })}
          </Prop>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <Prop>
            <PropTitle>Passiv Perception:</PropTitle>
            {char.passivPerception}
          </Prop>
          <Prop>
            <PropTitle>Passiv Investigation:</PropTitle>
            {char.passivInvestigation}
          </Prop>
          <Prop>
            <PropTitle>Passiv Insight:</PropTitle>
            {char.passivInsight}
          </Prop>
          <Text>
            <PropTitle>Senses:</PropTitle>
            {formatText(char.senses)}
          </Text>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <Text>
            <PropTitle>Proficiencies:</PropTitle>
            {formatText(char.profsLangs)}
          </Text>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <SmallNumberField
            value={char.money.copper}
            label="Copper"
            onChange={(copper) => changeMoney("copper", copper)}
          />
          <SmallNumberField
            value={char.money.silver}
            label="Silver"
            onChange={(silver) => changeMoney("silver", silver)}
          />
          <SmallNumberField
            value={char.money.gold}
            label="Gold"
            onChange={(gold) => changeMoney("gold", gold)}
          />
          <SmallNumberField
            value={char.money.platinum}
            label="Platinum"
            onChange={(platinum) => changeMoney("platinum", platinum)}
          />
          <SmallNumberField
            value={char.money.electrum}
            label="Electrum"
            onChange={(electrum) => changeMoney("electrum", electrum)}
          />
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <Prop>
            <PropTitle>Death Saves:</PropTitle>
            <DeathSaveRow>
              <DeathSaveRowHeader>Sucesses:</DeathSaveRowHeader>
              <span onClick={(e) => changeDeathSave(0)}>
                <FontAwesomeIcon icon={changeLifeIcon(deathSaves[0])} />
              </span>
              <span onClick={(e) => changeDeathSave(1)}>
                <FontAwesomeIcon icon={changeLifeIcon(deathSaves[1])} />
              </span>
              <span onClick={(e) => changeDeathSave(2)}>
                <FontAwesomeIcon icon={changeLifeIcon(deathSaves[2])} />
              </span>
            </DeathSaveRow>
            <DeathSaveRow>
              <DeathSaveRowHeader>Failures:</DeathSaveRowHeader>
              <span onClick={(e) => changeDeathSave(3)}>
                <FontAwesomeIcon icon={changeDeathIcon(deathSaves[3])} />
              </span>
              <span onClick={(e) => changeDeathSave(4)}>
                <FontAwesomeIcon icon={changeDeathIcon(deathSaves[4])} />
              </span>
              <span onClick={(e) => changeDeathSave(5)}>
                <FontAwesomeIcon icon={changeDeathIcon(deathSaves[5])} />
              </span>
            </DeathSaveRow>
          </Prop>
        </PropColumnWrapper>
      </MinView>
    </>
  );
};

export default CharGeneral;

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

const MinView = styled(View)`
  max-width: max-content;
`;

const PropWrapper = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PropColumnWrapper = styled(PropWrapper)`
  flex-direction: column;
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

const Text = styled.div`
  height: auto;
  width: calc(100% - 20px);
  margin: 2px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const TextPart = styled.span`
  white-space: pre-line;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;

const Link = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 10px;
  padding: 0px 5px 0px 5px;
  cursor: pointer;
`;

const DeathSaveRow = styled.div`
  width: calc(100% - 10px);
  padding: 5px;

  & span svg {
    margin-left: 5px;
  }
`;

const DeathSaveRowHeader = styled.div`
  width: 80px;
  float: left;
`;
