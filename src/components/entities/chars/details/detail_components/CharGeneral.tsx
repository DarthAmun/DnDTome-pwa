import {
  faAngleDoubleUp,
  faAngleUp,
  faBed,
  faCampground,
  faHeartbeat,
  faHeartBroken,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GiBroadsword, GiHeartBottle } from "react-icons/gi";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import BuildChar from "../../../../../data/chars/BuildChar";
import { calcProf } from "../../../../../services/CharacterService";
import SmallNumberField from "../../../../form_elements/SmallNumberField";
import FormatedText from "../../../../general_elements/FormatedText";
import RollableProp from "../../../../general_elements/RollableProp";
import { DamageDialog, ShortRestDialod } from "../../../../general_elements/Dialog";
import TextButton from "../../../../form_elements/TextButton";
import { FeatureRest } from "../../../../../data/classes/Feature";

interface $Props {
  buildChar: BuildChar;
  onChange: (character: BuildChar) => void;
}

const CharGeneral = ({ buildChar, onChange }: $Props) => {
  const [damageDialog, setDamageDialog] = useState<boolean>(false);
  const [shortRestDialod, setShortRestDialod] = useState<boolean>(false);

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
      return skillProf * calcProf(buildChar.character) + formatScore(stat);
    },
    [formatScore, buildChar.character]
  );

  const changeMoney = (field: string, value: number) => {
    const newChar: BuildChar = {
      ...buildChar,
      oldCharacter: {
        ...buildChar.oldCharacter,
        money: { ...buildChar.oldCharacter.money, [field]: value },
      },
    };
    onChange(newChar);
  };

  const changeHp = (field: string, value: number) => {
    const newChar = { ...buildChar, oldCharacter: { ...buildChar.oldCharacter, [field]: value } };
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
    let newDeathSaves = [...buildChar.oldCharacter.deathSaves];
    newDeathSaves[index] = (newDeathSaves[index] + 1) % 2;
    const newChar = {
      ...buildChar,
      oldCharacter: { ...buildChar.oldCharacter, deathSaves: newDeathSaves },
    };
    onChange(newChar);
  };

  const makeShortRest = (value: number) => {
    console.log(buildChar.oldCharacter);
    const newChar = {
      ...buildChar,
      oldCharacter: {
        ...buildChar.oldCharacter,
        currentHp: value > buildChar.oldCharacter.hp ? buildChar.oldCharacter.hp : value,
        currencyBonis: buildChar.character.currencyBonis?.map(
          (boni: { origin: string; value: number; max: number; rest: FeatureRest }) => {
            if (boni.rest.toString() === FeatureRest[FeatureRest.short])
              return { ...boni, value: boni.max };
            else return boni;
          }
        ),
        currentFeatureUses: buildChar.character.currentFeatureUses?.map(
          (featureUse: { origin: string; value: number; max: number; rest: FeatureRest }) => {
            if (featureUse.rest.toString() === FeatureRest[FeatureRest.short])
              return { ...featureUse, value: featureUse.max };
            else return featureUse;
          }
        ),
      },
    };
    onChange(newChar);
  };
  const makeLongRest = () => {
    const newChar = {
      ...buildChar,
      oldCharacter: {
        ...buildChar.oldCharacter,
        currentHp: buildChar.character.hp,
        spellSlots: buildChar.character.spellSlots?.map(
          (slots: { origin: string; slots: number[]; max: number[] }) => {
            return { ...slots, slots: slots.max };
          }
        ),
        deathSaves: [0, 0, 0, 0, 0, 0],
        currencyBonis: buildChar.character.currencyBonis?.map(
          (boni: { origin: string; value: number; max: number; rest: FeatureRest }) => {
            return { ...boni, value: boni.max };
          }
        ),
        currentFeatureUses: buildChar.character.currentFeatureUses?.map(
          (featureUse: { origin: string; value: number; max: number; rest: FeatureRest }) => {
            return { ...featureUse, value: featureUse.max };
          }
        ),
      },
    };
    onChange(newChar);
  };

  return (
    <>
      {damageDialog && (
        <DamageDialog
          name={buildChar.character.name}
          damageText={"Damage"}
          damageClick={(currentHp: number) => {
            changeHp("currentHp", buildChar.character.currentHp - currentHp);
            setDamageDialog(false);
          }}
          healText={"Heal"}
          healClick={(currentHp: number) => {
            changeHp("currentHp", buildChar.character.currentHp + currentHp);
            setDamageDialog(false);
          }}
          abortText={"Back"}
          abortClick={() => {
            setDamageDialog(false);
          }}
        />
      )}
      {shortRestDialod && (
        <ShortRestDialod
          buildChar={buildChar}
          healText={"Heal"}
          healClick={(currentHp: number) => {
            makeShortRest(buildChar.character.currentHp + currentHp);
            setShortRestDialod(false);
          }}
          abortText={"Back"}
          abortClick={() => {
            setShortRestDialod(false);
          }}
        />
      )}
      <MinView>
        <PropColumnWrapper>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Str Save"}
              rolledValue={calcSkill(
                buildChar.character.saves.strSaveProf,
                buildChar.character.str
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.saves.strSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Dex Save"}
              rolledValue={calcSkill(
                buildChar.character.saves.dexSaveProf,
                buildChar.character.dex
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.saves.dexSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Con Save"}
              rolledValue={calcSkill(
                buildChar.character.saves.conSaveProf,
                buildChar.character.con
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.saves.conSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Int Save"}
              rolledValue={calcSkill(
                buildChar.character.saves.intSaveProf,
                buildChar.character.int
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.saves.intSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Wis Save"}
              rolledValue={calcSkill(
                buildChar.character.saves.wisSaveProf,
                buildChar.character.wis
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.saves.wisSaveProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Cha Save"}
              rolledValue={calcSkill(
                buildChar.character.saves.chaSaveProf,
                buildChar.character.cha
              )}
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
              rolledValue={calcSkill(
                buildChar.character.skills.acrobaticsProf,
                buildChar.character.dex
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.acrobaticsProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Animal Handling"}
              rolledValue={calcSkill(
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
              rolledValue={calcSkill(
                buildChar.character.skills.arcanaProf,
                buildChar.character.int
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.arcanaProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Athletics"}
              rolledValue={calcSkill(
                buildChar.character.skills.athleticsProf,
                buildChar.character.str
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.athleticsProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Deception"}
              rolledValue={calcSkill(
                buildChar.character.skills.deceptionProf,
                buildChar.character.cha
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.deceptionProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"History"}
              rolledValue={calcSkill(
                buildChar.character.skills.historyProf,
                buildChar.character.int
              )}
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
              rolledValue={calcSkill(
                buildChar.character.skills.insightProf,
                buildChar.character.wis
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.insightProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Intimidation"}
              rolledValue={calcSkill(
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
              rolledValue={calcSkill(
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
              rolledValue={calcSkill(
                buildChar.character.skills.medicineProf,
                buildChar.character.wis
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.medicineProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Nature"}
              rolledValue={calcSkill(
                buildChar.character.skills.natureProf,
                buildChar.character.int
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.natureProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Perception"}
              rolledValue={calcSkill(
                buildChar.character.skills.perceptionProf,
                buildChar.character.wis
              )}
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
              rolledValue={calcSkill(
                buildChar.character.skills.performanceProf,
                buildChar.character.cha
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.performanceProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Persuasion"}
              rolledValue={calcSkill(
                buildChar.character.skills.persuasionProf,
                buildChar.character.cha
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.persuasionProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Religion"}
              rolledValue={calcSkill(
                buildChar.character.skills.religionProf,
                buildChar.character.int
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.religionProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Sleight Of Hand"}
              rolledValue={calcSkill(
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
              rolledValue={calcSkill(
                buildChar.character.skills.stealthProf,
                buildChar.character.dex
              )}
            />
            <PropProf>
              <Icon icon={formatProf(buildChar.character.skills.stealthProf)} />
            </PropProf>
          </PropWithProf>
          <PropWithProf>
            <RollableProp
              char={buildChar.character}
              title={"Survival"}
              rolledValue={calcSkill(
                buildChar.character.skills.survivalProf,
                buildChar.character.wis
              )}
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
            <PropTitle>Proficiencies Bonus:</PropTitle>+{calcProf(buildChar.character)}
          </Prop>
          <RollableProp
            char={buildChar.character}
            title={"Initiative"}
            rolledValue={buildChar.character.init}
          />
          <Prop>
            <PropTitle>Armor Class:</PropTitle>
            {buildChar.character.ac}
          </Prop>
          <PropWrapper>
            <Prop>
              <PropTitle>Hit Points:</PropTitle>
              {buildChar.character.currentHp} / {buildChar.character.hp}
            </Prop>
            <DamageButton onClick={() => setDamageDialog(true)}>
              <GiBroadsword />
              <GiHeartBottle />
            </DamageButton>
          </PropWrapper>
          <Prop>
            <PropTitle>Hit Die:</PropTitle>
            {buildChar.character.classes.map((classe) => {
              return buildChar.classes.map((classesClass) => {
                if (classe.classe === classesClass.name + "|" + classesClass.sources) {
                  return classe.level + classesClass.hitDices + " ";
                } else {
                  return "";
                }
              });
            })}
          </Prop>
          <PropWrapper>
            <TextButton
              text={"Short Rest"}
              icon={faCampground}
              onClick={() => setShortRestDialod(true)}
            />
            <TextButton text={"Long Rest"} icon={faBed} onClick={() => makeLongRest()} />
          </PropWrapper>
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
            <PropTitle>Languages:</PropTitle>
            <FormatedText text={buildChar.race.lang} />
          </Text>
          <Text>
            <PropTitle>Proficiencies:</PropTitle>
            <FormatedText text={buildChar.character.profsLangs} />
          </Text>
        </PropColumnWrapper>
      </MinView>
      {buildChar.classes.map((c, index: number) => {
        return (
          <MinView key={index}>
            <PropColumnWrapper>
              <Text>
                <PropTitle>{c.name} Profs:</PropTitle>
                <FormatedText text={c.proficiencies} />
              </Text>
            </PropColumnWrapper>
          </MinView>
        );
      })}
      <MinView>
        <PropColumnWrapper>
          <SmallNumberField
            value={buildChar.oldCharacter.money.copper}
            label="Copper"
            onChange={(copper) => changeMoney("copper", copper)}
          />
          <SmallNumberField
            value={buildChar.oldCharacter.money.silver}
            label="Silver"
            onChange={(silver) => changeMoney("silver", silver)}
          />
          <SmallNumberField
            value={buildChar.oldCharacter.money.gold}
            label="Gold"
            onChange={(gold) => changeMoney("gold", gold)}
          />
          <SmallNumberField
            value={buildChar.oldCharacter.money.platinum}
            label="Platinum"
            onChange={(platinum) => changeMoney("platinum", platinum)}
          />
          <SmallNumberField
            value={buildChar.oldCharacter.money.electrum}
            label="Electrum"
            onChange={(electrum) => changeMoney("electrum", electrum)}
          />
        </PropColumnWrapper>
      </MinView>
      {buildChar.oldCharacter.deathSaves !== undefined &&
        buildChar.oldCharacter.deathSaves.length === 6 && (
          <MinView>
            <PropColumnWrapper>
              <Prop>
                <PropTitle>Death Saves:</PropTitle>
                <DeathSaveRow>
                  <DeathSaveRowHeader>Sucesses:</DeathSaveRowHeader>
                  <span onClick={(e) => changeDeathSave(0)}>
                    <FontAwesomeIcon icon={changeLifeIcon(buildChar.oldCharacter.deathSaves[0])} />
                  </span>
                  <span onClick={(e) => changeDeathSave(1)}>
                    <FontAwesomeIcon icon={changeLifeIcon(buildChar.oldCharacter.deathSaves[1])} />
                  </span>
                  <span onClick={(e) => changeDeathSave(2)}>
                    <FontAwesomeIcon icon={changeLifeIcon(buildChar.oldCharacter.deathSaves[2])} />
                  </span>
                </DeathSaveRow>
                <DeathSaveRow>
                  <DeathSaveRowHeader>Failures:</DeathSaveRowHeader>
                  <span onClick={(e) => changeDeathSave(3)}>
                    <FontAwesomeIcon icon={changeDeathIcon(buildChar.oldCharacter.deathSaves[3])} />
                  </span>
                  <span onClick={(e) => changeDeathSave(4)}>
                    <FontAwesomeIcon icon={changeDeathIcon(buildChar.oldCharacter.deathSaves[4])} />
                  </span>
                  <span onClick={(e) => changeDeathSave(5)}>
                    <FontAwesomeIcon icon={changeDeathIcon(buildChar.oldCharacter.deathSaves[5])} />
                  </span>
                </DeathSaveRow>
              </Prop>
            </PropColumnWrapper>
          </MinView>
        )}
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

const DamageButton = styled.button`
  svg {
    color: ${({ theme }) => theme.buttons.color};
  }
  font-size: 16px;
  float: left;
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);
  box-sizing: content-box;
  border-radius: 10px;
  border: none;

  transition: color 0.2s;
  background: ${({ theme }) => theme.buttons.backgroundColor};
  &:hover {
    color: ${({ theme }) => theme.buttons.hoverColor};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.buttons.disabled};
  }
`;
