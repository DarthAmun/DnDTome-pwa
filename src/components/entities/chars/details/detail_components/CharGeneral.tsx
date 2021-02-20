import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import BuildChar from "../../../../../data/chars/BuildChar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faAngleUp,
  faAngleDoubleUp,
  faHeartBroken,
  faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";
import SmallNumberField from "../../../../form_elements/SmallNumberField";
import FeatureSet from "../../../../../data/classes/FeatureSet";
import FormatedText from "../../../../general_elements/FormatedText";
import { useWebhook } from "../../../../../hooks/webhookHook";
import { rollCommand } from "../../../../../services/DiceService";
import { sendEmbedMessage } from "../../../../../services/DiscordService";
import Char from "../../../../../data/chars/Char";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import IconButton from "../../../../form_elements/IconButton";

interface $Props {
  buildChar: BuildChar;
  onChange: (character: BuildChar) => void;
}

const CharGeneral = ({ buildChar, onChange }: $Props) => {
  const [deathSaves, setDeathSaves] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [prof, setProf] = useState<number>(0);

  const calcLevel = useCallback(() => {
    let level = 0;
    buildChar.character.classes.forEach((classe) => {
      level += classe.level;
    });
    return level;
  }, [buildChar]);

  useEffect(() => {
    if (buildChar.classes && buildChar.classes.length > 0) {
      const level = calcLevel();
      buildChar.classes[0].featureSets.forEach((featureSet: FeatureSet) => {
        if (featureSet.level === level) {
          setProf(featureSet.profBonus);
        }
      });
    }
  }, [buildChar, calcLevel]);

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

  const changeMoney = (field: string, value: number) => {
    const newChar: BuildChar = {
      ...buildChar,
      character: {
        ...buildChar.character,
        money: { ...buildChar.character.money, [field]: value },
      },
    };
    onChange(newChar);
  };

  const changeHp = (field: string, value: number) => {
    const newChar = { ...buildChar, character: { ...buildChar.character, [field]: value } };
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
            <RollableProp
              char={buildChar.character}
              title={"Str Save"}
              value={calcSkill(buildChar.character.saves.strSaveProf, buildChar.character.str)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.saves.strSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Dex Save"}
              value={calcSkill(buildChar.character.saves.dexSaveProf, buildChar.character.dex)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.saves.dexSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Con Save"}
              value={calcSkill(buildChar.character.saves.conSaveProf, buildChar.character.con)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.saves.conSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Int Save"}
              value={calcSkill(buildChar.character.saves.intSaveProf, buildChar.character.int)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.saves.intSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Wis Save"}
              value={calcSkill(buildChar.character.saves.wisSaveProf, buildChar.character.wis)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.saves.wisSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Cha Save"}
              value={calcSkill(buildChar.character.saves.chaSaveProf, buildChar.character.cha)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.saves.chaSaveProf)} />
            </PropProf>
          </PropWithProf>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Acrobatics"}
              value={calcSkill(buildChar.character.skills.acrobaticsProf, buildChar.character.dex)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.acrobaticsProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Animal Handling"}
              value={calcSkill(
                buildChar.character.skills.animalHandlingProf,
                buildChar.character.wis
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.animalHandlingProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Arcana"}
              value={calcSkill(buildChar.character.skills.arcanaProf, buildChar.character.int)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.arcanaProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Athletics"}
              value={calcSkill(buildChar.character.skills.athleticsProf, buildChar.character.str)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.athleticsProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Deception"}
              value={calcSkill(buildChar.character.skills.deceptionProf, buildChar.character.cha)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.deceptionProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"History"}
              value={calcSkill(buildChar.character.skills.historyProf, buildChar.character.int)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.historyProf)} />
            </PropProf>
          </PropWithProf>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Insight"}
              value={calcSkill(buildChar.character.skills.insightProf, buildChar.character.wis)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.insightProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Intimidation"}
              value={calcSkill(
                buildChar.character.skills.intimidationProf,
                buildChar.character.cha
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.intimidationProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Investigation"}
              value={calcSkill(
                buildChar.character.skills.investigationProf,
                buildChar.character.int
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.investigationProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Medicine"}
              value={calcSkill(buildChar.character.skills.medicineProf, buildChar.character.wis)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.medicineProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Nature"}
              value={calcSkill(buildChar.character.skills.natureProf, buildChar.character.int)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.natureProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Perception"}
              value={calcSkill(buildChar.character.skills.perceptionProf, buildChar.character.wis)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.perceptionProf)} />
            </PropProf>
          </PropWithProf>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Performance"}
              value={calcSkill(buildChar.character.skills.performanceProf, buildChar.character.cha)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.performanceProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Persuasion"}
              value={calcSkill(buildChar.character.skills.persuasionProf, buildChar.character.cha)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.persuasionProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Religion"}
              value={calcSkill(buildChar.character.skills.religionProf, buildChar.character.int)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.religionProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Sleight Of Hand"}
              value={calcSkill(
                buildChar.character.skills.sleightOfHandProf,
                buildChar.character.dex
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.sleightOfHandProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Stealth"}
              value={calcSkill(buildChar.character.skills.stealthProf, buildChar.character.dex)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.stealthProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Survival"}
              value={calcSkill(buildChar.character.skills.survivalProf, buildChar.character.wis)}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.survivalProf)} />
            </PropProf>
          </PropWithProf>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <Prop>
            <PropTitle>Proficiencies Bonus:</PropTitle>+{prof}
          </Prop>
          <RollableProp
            char={buildChar.character}
            title={"Initiative"}
            value={buildChar.character.init}
          />
          <Prop>
            <PropTitle>Armor Class:</PropTitle>
            {buildChar.character.ac}
          </Prop>
          <Prop>
            <PropTitle>Hit Points:</PropTitle>
            {buildChar.character.hp}
          </Prop>
          <SmallNumberField
            value={buildChar.character.currentHp}
            label="Current Hp"
            onChange={(currentHp) => changeHp("currentHp", currentHp)}
          />
          <Prop>
            <PropTitle>Hit Die:</PropTitle>
            {buildChar.character.classes.map((classe) => {
              return buildChar.classes.map((classesClass) => {
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
            {calcSkill(buildChar.character.skills.perceptionProf, buildChar.character.wis) + 10}
          </Prop>
          <Prop>
            <PropTitle>Passiv Investigation:</PropTitle>
            {calcSkill(buildChar.character.skills.investigationProf, buildChar.character.int) + 10}
          </Prop>
          <Prop>
            <PropTitle>Passiv Insight:</PropTitle>
            {calcSkill(buildChar.character.skills.insightProf, buildChar.character.wis) + 10}
          </Prop>
          <Text>
            <PropTitle>Senses:</PropTitle>
            <FormatedText text={buildChar.character.senses} />
          </Text>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <Text>
            <PropTitle>Proficiencies:</PropTitle>
            <FormatedText text={buildChar.character.profsLangs} />
          </Text>
        </PropColumnWrapper>
      </MinView>
      <MinView>
        <PropColumnWrapper>
          <SmallNumberField
            value={buildChar.character.money.copper}
            label="Copper"
            onChange={(copper) => changeMoney("copper", copper)}
          />
          <SmallNumberField
            value={buildChar.character.money.silver}
            label="Silver"
            onChange={(silver) => changeMoney("silver", silver)}
          />
          <SmallNumberField
            value={buildChar.character.money.gold}
            label="Gold"
            onChange={(gold) => changeMoney("gold", gold)}
          />
          <SmallNumberField
            value={buildChar.character.money.platinum}
            label="Platinum"
            onChange={(platinum) => changeMoney("platinum", platinum)}
          />
          <SmallNumberField
            value={buildChar.character.money.electrum}
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

interface $RollableProps {
  char: Char;
  title: string;
  value: number;
}

const RollableProp = ({ char, title, value }: $RollableProps) => {
  let webhook = useWebhook();

  const rollDiscord = () => {
    let rollString: string = "";
    let roll: number = 0;

    if (value >= 0) {
      roll = rollCommand("d20+" + value);
      rollString = "d20(`" + (roll - value) + "`)+" + value;
    } else {
      roll = rollCommand("d20" + value);
      rollString = "d20(`" + (roll - value) + "`)" + value;
    }

    let krit = false;
    if (roll - value === 20) krit = true;
    let fail = false;
    if (roll - value === 1) fail = true;

    if (rollString !== "" && webhook !== undefined) {
      const newName = value >= 0 ? title + "(+" + value + ")" : title + "(" + value + ")";
      let newJson = {
        username: webhook.name + " (DnDTome)",
        embeds: [
          {
            author: {
              name: char.name,
              icon_url: char.pic,
            },
            fields: [
              {
                name: newName,
                value:
                  roll +
                  (fail ? " :red_circle:" : "") +
                  (krit ? " :green_circle:" : "") +
                  " ||" +
                  rollString +
                  "||",
              },
            ],
          },
        ],
      };
      sendEmbedMessage(webhook, JSON.stringify(newJson));
    }
  };

  return (
    <PropText
      onClick={() => rollDiscord()}
      style={{ cursor: webhook !== undefined ? "pointer" : "default" }}
    >
      <PropTitle>{title}:</PropTitle>
      {value}
      {webhook !== undefined && (
        <IconButton
          style={{
            backgroundColor: "#7289da",
            float: "right",
            padding: "5px",
            height: "10px",
            lineHeight: "10px",
            fontSize: "10px",
            margin: "0px",
          }}
          icon={faDiscord}
          onClick={() => rollDiscord()}
        />
      )}  
    </PropText>
  );
};

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

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
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
