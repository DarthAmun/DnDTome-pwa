import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { recivePromiseByAttribute, saveWithCallback } from "../../../../services/DatabaseService";
import ClassSet from "../../../../data/chars/ClassSet";
import Boni from "../../../../data/classes/Boni";
import Class from "../../../../data/classes/Class";
import Char from "../../../../data/chars/Char";

import { faCheckCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import AppWrapper from "../../../AppWrapper";
import IconButton from "../../../form_elements/IconButton";
import TabBar from "../../../general_elements/TabBar";
import CharLabGeneral from "./CharLabGeneral";
import CharLabClass from "./CharLabClass";
import CharLabRace from "./CharLabRace";
import CharLabAbilities from "./CharLabAbilities";
import CharLabEquipment from "./CharLabEquipment";

const CharLab = () => {
  let history = useHistory();
  const [activeTab, setTab] = useState<string>("General");
  const [newChar, updateChar] = useState<Char>(new Char());

  const [completedGeneral, setGeneral] = useState<boolean>(false);
  const [completedClass, setClass] = useState<boolean>(false);
  const [completedRace, setRace] = useState<boolean>(false);
  const [completedAbilities, setAbilities] = useState<boolean>(false);
  const [completedEquipment, setEquipment] = useState<boolean>(false);

  const updateGeneral = (value: boolean, nextTab: string) => {
    setGeneral(value);
    setTab(nextTab);
  };
  const updateClass = (value: boolean, nextTab: string) => {
    setClass(value);
    setTab(nextTab);
  };
  const updateRace = (value: boolean, nextTab: string) => {
    setRace(value);
    setTab(nextTab);
  };
  const updateAbilities = (value: boolean, nextTab: string) => {
    setAbilities(value);
    setTab(nextTab);
  };
  const updateEquipment = (value: boolean, nextTab: string) => {
    setEquipment(value);
    setTab(nextTab);
  };

  const recalcClasses = async (char: Char) => {
    let bonis: { origin: string; value: number; max: number }[] = [];
    let spellSlots: {
      origin: string;
      slots: number[];
      max: number[];
    }[] = [];
    let fullClassList: { class: Class; classSet: ClassSet }[] = [];
    let classList: Promise<Class>[] = [];

    char.classes?.forEach((classe) => {
      classList.push(
        recivePromiseByAttribute("classes", "name", classe.classe)
      );
    });
    const results = await Promise.all(classList);
    results?.forEach((classe: Class) => {
      char.classes.forEach((classSet) => {
        if (classe.name === classSet.classe) {
          fullClassList.push({ class: classe, classSet: classSet });
        }
      });
    });

    fullClassList?.forEach((classe: { class: Class; classSet: ClassSet }) => {
      let featureSet = classe.class.featureSets[classe.classSet.level - 1];
      if (featureSet.bonis) {
        featureSet.bonis?.forEach((boni: Boni) => {
          if (boni.isCurrency) {
            bonis = [
              ...bonis,
              {
                origin: boni.name,
                value: +boni.value,
                max: +boni.value,
              },
            ];
          }
        });
      }
      if (featureSet.spellslots && featureSet.spellslots.length > 0) {
        spellSlots = [
          ...spellSlots,
          {
            origin: classe.class.name,
            slots: featureSet.spellslots,
            max: featureSet.spellslots,
          },
        ];
      }
    });

    if (char.currencyBonis && char.currencyBonis.length > 0) {
      let updatedBonis = bonis.map((newBoni) => {
        let updatedOldBonis = char.currencyBonis?.map((old) => {
          if (newBoni.origin === old.origin) {
            return {
              origin: newBoni.origin,
              value: old.value,
              max: newBoni.max,
            };
          } else {
            return null;
          }
        });
        if (
          updatedOldBonis &&
          updatedOldBonis.length > 0 &&
          updatedOldBonis[0] !== undefined &&
          updatedOldBonis[0] !== null
        ) {
          return updatedOldBonis[0];
        } else {
          return newBoni;
        }
      });
      if (updatedBonis && updatedBonis.length > 0) {
        bonis = Array.from(updatedBonis);
      }
    }

    if (char.spellSlots && char.spellSlots.length > 0) {
      let updatedSpellSlots = spellSlots?.map((newSpellSlots) => {
        let updatedOldSlots = char.spellSlots?.map((old) => {
          if (newSpellSlots.origin === old.origin) {
            return {
              origin: newSpellSlots.origin,
              slots: old.slots,
              max: newSpellSlots.max,
            };
          } else {
            return null;
          }
        });
        if (
          updatedOldSlots &&
          updatedOldSlots.length > 0 &&
          updatedOldSlots[0] !== undefined &&
          updatedOldSlots[0] !== null
        ) {
          return updatedOldSlots[0];
        } else {
          return newSpellSlots;
        }
      });
      if (updatedSpellSlots && updatedSpellSlots.length > 0) {
        spellSlots = Array.from(updatedSpellSlots);
      }
    }

    let updatedChar = {
      ...char,
      spellSlots: spellSlots,
      currencyBonis: bonis,
    };
    updateChar(updatedChar);
    return updatedChar;
  };

  const saveChar = () => {
    recalcClasses(newChar).then((updatedChar) => {
      delete updatedChar["id"];
      saveWithCallback("chars", updatedChar, (result) => {
        history.push(`/char-detail/id/${result}`);
      });
    });
  }

  return (
    <AppWrapper>
      <TabBar
        children={[
          "General",
          "Class",
          "Race",
          "Abilities",
          "Equipment",
          "Finished",
        ]}
        onChange={(tab: string) => setTab(tab)}
        activeTab={activeTab}
      />
      <CenterWrapper>
        <View>
          {activeTab === "General" && (
            <>
              {!completedGeneral && (
                <CharLabGeneral
                  char={newChar}
                  onChange={updateChar}
                  completed={updateGeneral}
                />
              )}
              {completedGeneral && (
                <PropWrapper>
                  <Prop>Would you like to edit general again? </Prop>
                  <IconButton icon={faEdit} onClick={() => setGeneral(false)} />
                </PropWrapper>
              )}
            </>
          )}
          {activeTab === "Class" && (
            <>
              {!completedClass && (
                <CharLabClass
                  char={newChar}
                  onChange={updateChar}
                  completed={updateClass}
                />
              )}
              {completedClass && (
                <PropWrapper>
                  <Prop>Would you like to edit classes again? </Prop>
                  <IconButton icon={faEdit} onClick={() => setClass(false)} />
                </PropWrapper>
              )}
            </>
          )}
          {activeTab === "Race" && (
            <>
              {!completedRace && (
                <CharLabRace
                  char={newChar}
                  onChange={updateChar}
                  completed={updateRace}
                />
              )}
              {completedRace && (
                <PropWrapper>
                  <Prop>Would you like to edit race again? </Prop>
                  <IconButton icon={faEdit} onClick={() => setRace(false)} />
                </PropWrapper>
              )}
            </>
          )}
          {activeTab === "Abilities" && (
            <>
              {!completedAbilities && (
                <CharLabAbilities
                  char={newChar}
                  onChange={updateChar}
                  completed={updateAbilities}
                />
              )}
              {completedAbilities && (
                <PropWrapper>
                  <Prop>Would you like to edit abilities again? </Prop>
                  <IconButton
                    icon={faEdit}
                    onClick={() => setAbilities(false)}
                  />
                </PropWrapper>
              )}
            </>
          )}
          {activeTab === "Equipment" && (
            <>
              {!completedEquipment && (
                <CharLabEquipment
                  char={newChar}
                  onChange={updateChar}
                  completed={updateEquipment}
                />
              )}
              {completedEquipment && (
                <PropWrapper>
                  <Prop>Would you like to edit equipment again? </Prop>
                  <IconButton
                    icon={faEdit}
                    onClick={() => setEquipment(false)}
                  />
                </PropWrapper>
              )}
            </>
          )}
          {activeTab === "Finished" && (
            <>
              {(!completedGeneral ||
                !completedClass ||
                !completedRace ||
                !completedAbilities ||
                !completedGeneral||
                !completedEquipment) && (
                <PropWrapper>
                  <Prop>Somthing is not finished!</Prop>
                </PropWrapper>
              )}
              {completedGeneral &&
                completedClass &&
                completedRace &&
                completedAbilities &&
                completedGeneral &&
                completedEquipment && (
                  <PropWrapper>
                    <Prop>Create Char?</Prop>
                    <IconButton
                      icon={faCheckCircle}
                      onClick={() => saveChar()}
                    />
                  </PropWrapper>
                )}
            </>
          )}
        </View>
      </CenterWrapper>
    </AppWrapper>
  );
};

export default CharLab;

const CenterWrapper = styled.div`
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
