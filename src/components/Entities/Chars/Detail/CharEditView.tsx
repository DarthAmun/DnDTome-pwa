import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Char from "../../../../Data/Chars/Char";
import Class from "../../../../Data/Classes/Class";
import FeatureSet from "../../../../Data/Classes/FeatureSet";
import Skills from "../../../../Data/Chars/Skills";
import Saves from "../../../../Data/Chars/Saves";
import ClassSet from "../../../../Data/Chars/ClassSet";
import Selection from "../../../../Data/Selection";
import Feature from "../../../../Data/Classes/Feature";
import Subclass from "../../../../Data/Classes/Subclass";
import {
  reciveAll,
  reciveAllFiltered,
} from "../../../../Services/DatabaseService";

import {
  faTrash,
  faPlus,
  faMinus,
  faAngleUp,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AutoStringField from "../../../FormElements/AutoStringField";
import CheckField from "../../../FormElements/CheckField";
import EnumField from "../../../FormElements/EnumField";
import StringField from "../../../FormElements/StringField";
import TabBar from "../../../GeneralElements/TabBar";
import NumberField from "../../../FormElements/NumberField";
import TextField from "../../../FormElements/TextField";
import IconButton from "../../../FormElements/IconButton";
import TextButton from "../../../FormElements/TextButton";

interface $Props {
  char: Char;
  onEdit: (value: Char) => void;
}

const CharEditView = ({ char, onEdit }: $Props) => {
  const [activeTab, setTab] = useState<string>("General");
  const [classes, setClasses] = useState<Class[]>([]);
  const [subclasses, setSubclasses] = useState<Subclass[]>([]);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [prof, setProf] = useState<number>(0);

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
    reciveAllFiltered(
      "subclasses",
      [
        {
          fieldName: "name",
          value: char.classes.map((classe) => {
            return classe.subclasse;
          }),
          sort: 0,
        },
      ],
      (results: any[]) => {
        setSubclasses(results);
      }
    );
  }, [char.classes, calcLevel]);

  useEffect(() => {
    reciveAll("selections", (data: any[]) => {
      let selectionsData = data as Selection[];
      setSelections(selectionsData);
    });
  }, []);

  const removeSpell = (oldSpell: string) => {
    let newSpellList = char.spells.filter((spell) => spell !== oldSpell);
    onEdit({ ...char, spells: newSpellList });
  };
  const addNewSpell = () => {
    let newSpellList = char.spells;
    newSpellList.push("");
    onEdit({ ...char, spells: newSpellList });
  };
  const onChangeSpell = (newSpell: string, oldSpell: string) => {
    let spells = char.spells.map((spell) => {
      if (spell === oldSpell) {
        return newSpell;
      } else {
        return spell;
      }
    });
    onEdit({ ...char, spells: spells });
  };

  const removeItem = (oldItem: {
    origin: string;
    attuned: boolean;
    prof: boolean;
    attribute: string;
  }) => {
    let newItemList = char.items.filter(
      (item) => item.origin !== oldItem.origin
    );
    onEdit({ ...char, items: newItemList });
  };
  const addNewItem = () => {
    let newItemList = char.items;
    newItemList.push({
      origin: "",
      attuned: false,
      prof: false,
      attribute: "str",
    });
    onEdit({ ...char, items: newItemList });
  };
  const onChangeItem = (newItem: string, i: number) => {
    let items = char.items;
    items[i].origin = newItem;
    onEdit({ ...char, items: items });
  };
  const onChangeItemAttribute = (
    newItem: {
      origin: string;
      attuned: boolean;
      prof: boolean;
      attribute: string;
    },
    i: number
  ) => {
    let items = char.items;
    items[i] = newItem;
    onEdit({ ...char, items: items });
  };

  const removeMonster = (oldMonster: string) => {
    let newMonsterList = char.monsters.filter(
      (monster) => monster !== oldMonster
    );
    onEdit({ ...char, monsters: newMonsterList });
  };
  const addNewMonster = () => {
    let newMonsterList = char.monsters;
    newMonsterList.push("");
    onEdit({ ...char, monsters: newMonsterList });
  };
  const onChangeMonster = (newMonster: string, oldMonster: string) => {
    let monsters = char.monsters.map((monster) => {
      if (monster === oldMonster) {
        return newMonster;
      } else {
        return monster;
      }
    });
    onEdit({ ...char, monsters: monsters });
  };

  const removeClass = (oldClass: ClassSet) => {
    let newClassList = char.classes.filter((classe) => classe !== oldClass);
    onEdit({ ...char, classes: newClassList });
  };
  const addNewClass = () => {
    let newClassList = char.classes;
    newClassList.push({ classe: "", subclasse: "", level: 0 });
    onEdit({ ...char, classes: newClassList });
  };

  const recalcSelections = useCallback(() => {
    let newActiveSelections: {
      selectionName: string;
      activeOption: {
        entityName: string;
        entityText: string;
        level: number;
      };
      featureName: string;
      featureCount: number;
      className: string;
    }[] = [];
    classes.forEach((classe: Class) => {
      classe.featureSets.forEach((featureSet: FeatureSet) => {
        featureSet.features.forEach((feature: Feature) => {
          if (
            feature.selections !== undefined &&
            feature.selections.length > 0
          ) {
            let count = 1;
            feature.selections.forEach((select: string) => {
              selections.forEach((selection: Selection) => {
                if (selection.name === select) {
                  newActiveSelections.push({
                    selectionName: selection.name,
                    activeOption: selection.selectionOptions[0],
                    featureName: feature.name,
                    featureCount: count,
                    className: classe.name,
                  });
                  count++;
                }
              });
            });
          }
        });
      });
      subclasses.forEach((subclass: Subclass) => {
        if (classe.name === subclass.type) {
          subclass.features.forEach((featureSet: FeatureSet) => {
            featureSet.features.forEach((feature: Feature) => {
              if (
                feature.selections !== undefined &&
                feature.selections.length > 0
              ) {
                let count = 1;
                feature.selections.forEach((select: string) => {
                  selections.forEach((selection: Selection) => {
                    if (selection.name === select) {
                      newActiveSelections.push({
                        selectionName: selection.name,
                        activeOption: selection.selectionOptions[0],
                        featureName: feature.name,
                        featureCount: count,
                        className: subclass.name,
                      });
                      count++;
                    }
                  });
                });
              }
            });
          });
        }
      });
    });
    return newActiveSelections;
  }, [classes, subclasses, selections]);

  const changeClassLevel = useCallback(
    (oldClassSet: ClassSet, level: number) => {
      let classes: ClassSet[] = char.classes.map((classSet: ClassSet) => {
        if (classSet === oldClassSet) {
          return { ...classSet, level: level };
        } else {
          return classSet;
        }
      });
      let newActiveSelections = recalcSelections();
      onEdit({
        ...char,
        classes: classes,
        activeSelections: newActiveSelections,
      });
    },
    [char, onEdit, recalcSelections]
  );
  const changeClass = useCallback(
    (oldClassSet: ClassSet, classe: string) => {
      let classes = char.classes.map((classSet: ClassSet) => {
        if (classSet === oldClassSet) {
          return { ...classSet, classe: classe };
        } else {
          return classSet;
        }
      });
      onEdit({ ...char, classes: classes });
    },
    [char, onEdit]
  );
  const changeClassSubclass = useCallback(
    (oldClassSet: ClassSet, subclass: string) => {
      let classes = char.classes.map((classSet: ClassSet) => {
        if (classSet === oldClassSet) {
          return { ...classSet, subclasse: subclass };
        } else {
          return classSet;
        }
      });
      onEdit({ ...char, classes: classes });
    },
    [char, onEdit]
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

  const formatScore = useCallback((score: number) => {
    let mod = Math.floor((score - 10) / 2);
    return mod;
  }, []);

  const calcSkill = useCallback(
    (skillProf: number, stat: number) => {
      return skillProf * prof + formatScore(stat);
      // return `${skill} = ${skillProf * prof} (Prof) + ${formatScore(stat)} (Stat Bonus)`;
    },
    [formatScore, prof]
  );

  const changeProf = useCallback(
    (profName: string) => {
      const skills: Skills = char.skills;
      let profValue = skills[profName];
      profValue = (profValue + 1) % 3;
      onEdit({ ...char, skills: { ...char.skills, [profName]: profValue } });
    },
    [char, onEdit]
  );

  const changeSaveProf = useCallback(
    (profName: string) => {
      const saves: Saves = char.saves;
      let profValue = saves[profName];
      profValue = (profValue + 1) % 2;
      onEdit({ ...char, saves: { ...char.saves, [profName]: profValue } });
    },
    [char, onEdit]
  );

  const onChangeActiveSelection = useCallback(
    (
      oldActiveSelection: {
        selectionName: string;
        activeOption: {
          entityName: string;
          entityText: string;
          level: number;
        };
        featureName: string;
        className: string;
      },
      select: string
    ) => {
      let newActiveSelections = char.activeSelections.map(
        (activeSelection: {
          selectionName: string;
          activeOption: {
            entityName: string;
            entityText: string;
            level: number;
          };
          featureName: string;
          featureCount: number;
          className: string;
        }) => {
          if (activeSelection === oldActiveSelection) {
            let activSelect = {
              entityName: "",
              entityText: "",
              level: 0,
            };
            selections.forEach((selection: Selection) => {
              if (selection.name === activeSelection.selectionName) {
                selection.selectionOptions.forEach((option) => {
                  if (option.entityName === select) {
                    activSelect = option;
                  }
                });
              }
            });
            return { ...activeSelection, activeOption: activSelect };
          } else {
            return activeSelection;
          }
        }
      );
      onEdit({ ...char, activeSelections: newActiveSelections });
    },
    [char, selections, onEdit]
  );

  return (
    <CenterWrapper>
      <CharView>
        <StringField
          value={char.name}
          label="Name"
          onChange={(name) => onEdit({ ...char, name: name })}
        />
        <StringField
          value={char.player}
          label="Player"
          onChange={(player) => onEdit({ ...char, player: player })}
        />
        <StringField
          value={char.pic}
          label="Picture"
          onChange={(pic) => onEdit({ ...char, pic: pic })}
        />
        <StringField
          value={char.background}
          label="Background"
          onChange={(background) => onEdit({ ...char, background: background })}
        />
        <StringField
          value={char.alignment}
          label="Alignment"
          onChange={(alignment) => onEdit({ ...char, alignment: alignment })}
        />
        <NumberField
          value={char.ac}
          label="Armor Class"
          onChange={(ac) => onEdit({ ...char, ac: ac })}
        />
        <NumberField
          value={char.hp}
          label="Hit Points"
          onChange={(hp) => onEdit({ ...char, hp: hp })}
        />
        <NumberField
          value={char.init}
          label="Initiative"
          onChange={(init) => onEdit({ ...char, init: init })}
        />
        <NumberField
          value={char.str}
          label="Strength"
          onChange={(str) => onEdit({ ...char, str: str })}
        />
        <NumberField
          value={char.dex}
          label="Dexterity"
          onChange={(dex) => onEdit({ ...char, dex: dex })}
        />
        <NumberField
          value={char.con}
          label="Constitution"
          onChange={(con) => onEdit({ ...char, con: con })}
        />
        <NumberField
          value={char.int}
          label="Intelligence"
          onChange={(int) => onEdit({ ...char, int: int })}
        />
        <NumberField
          value={char.wis}
          label="Wisdome"
          onChange={(wis) => onEdit({ ...char, wis: wis })}
        />
        <NumberField
          value={char.cha}
          label="Charisma"
          onChange={(cha) => onEdit({ ...char, cha: cha })}
        />
        <TextField
          value={char.spellNotes}
          label="Notes"
          onChange={(notes) => onEdit({ ...char, spellNotes: notes })}
        />
      </CharView>
      <CharView>
        <TabBar
          children={[
            "General",
            "Abilities",
            "Classes",
            "Races",
            "Spells",
            "Items",
            "Monster",
          ]}
          onChange={(tab: string) => setTab(tab)}
        />
        {activeTab === "General" && (
          <>
            <TextField
              value={char.speed}
              label="Speed"
              onChange={(speed) => onEdit({ ...char, speed: speed })}
            />
            <TextField
              value={char.profsLangs}
              label="Languages"
              onChange={(profsLangs) =>
                onEdit({ ...char, profsLangs: profsLangs })
              }
            />
            <TextField
              value={char.senses}
              label="Senses"
              onChange={(senses) => onEdit({ ...char, senses: senses })}
            />
          </>
        )}
        {activeTab === "Classes" && (
          <>
            {char.classes.map((classSet: ClassSet, index: number) => {
              return (
                <PropWrapper key={index}>
                  <NumberField
                    value={classSet.level}
                    label="Level"
                    onChange={(level) => changeClassLevel(classSet, level)}
                  />
                  <IconButton
                    icon={faTrash}
                    onClick={() => removeClass(classSet)}
                  />
                  <AutoStringField
                    optionTable={"classes"}
                    value={classSet.classe}
                    label="Class"
                    onChange={(classe) => changeClass(classSet, classe)}
                  />
                  <StringField
                    value={classSet.subclasse}
                    label="Subclass"
                    onChange={(subclasse) =>
                      changeClassSubclass(classSet, subclasse)
                    }
                  />
                </PropWrapper>
              );
            })}
            <TextButton
              text={"Add new Class"}
              icon={faPlus}
              onClick={() => addNewClass()}
            />
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
                      {activeSelection.featureName} of{" "}
                      {activeSelection.className}
                    </SelectionTitle>
                    <EnumField
                      options={
                        selections
                          .find(
                            (select) =>
                              select.name === activeSelection.selectionName
                          )
                          ?.selectionOptions.map((option) => {
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
                      onChange={(select) =>
                        onChangeActiveSelection(activeSelection, select)
                      }
                    />
                  </PropWrapper>
                );
              }
            )}
          </>
        )}
        {activeTab === "Races" && (
          <PropWrapper>
            <AutoStringField
              optionTable={"races"}
              value={char.race.race}
              label="Race"
              onChange={(race) =>
                onEdit({ ...char, race: { ...char.race, race: race } })
              }
            />
            <StringField
              value={char.race.subrace}
              label="Subrace"
              onChange={(subrace) =>
                onEdit({ ...char, race: { ...char.race, subrace: subrace } })
              }
            />
          </PropWrapper>
        )}
        {activeTab === "Abilities" && (
          <>
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
              <TextField
                value={char.actions}
                label="Actions"
                onChange={(actions) => onEdit({ ...char, actions: actions })}
              />
            </PropWrapper>
          </>
        )}
        {activeTab === "Spells" && (
          <>
            <NumberField
              value={char.castingHit}
              label="Casting Hit"
              onChange={(castingHit) =>
                onEdit({ ...char, castingHit: castingHit })
              }
            />
            <NumberField
              value={char.castingDC}
              label="Casting DC"
              onChange={(castingDC) =>
                onEdit({ ...char, castingDC: castingDC })
              }
            />
            {char.spells.map((spell: string, index: number) => {
              return (
                <Container key={index}>
                  <AutoStringField
                    optionTable={"spells"}
                    value={spell}
                    label="Spell"
                    onChange={(newSpell) => onChangeSpell(newSpell, spell)}
                  />
                  <IconButton
                    icon={faTrash}
                    onClick={() => removeSpell(spell)}
                  />
                </Container>
              );
            })}
            <TextButton
              text={"Add new Spell"}
              icon={faPlus}
              onClick={() => addNewSpell()}
            />
          </>
        )}
        {activeTab === "Items" && (
          <>
            {char.items.map(
              (
                item: {
                  origin: string;
                  attuned: boolean;
                  prof: boolean;
                  attribute: string;
                },
                index: number
              ) => {
                return (
                  <Container key={index}>
                    <AutoStringField
                      optionTable={["items", "gears"]}
                      value={item.origin}
                      label="Item"
                      onChange={(newItem) => onChangeItem(newItem, index)}
                    />
                    <CheckField
                      value={!!item.attuned}
                      label="Attunment"
                      onChange={(attunment) =>
                        onChangeItemAttribute(
                          {
                            ...item,
                            attuned: attunment,
                          },
                          index
                        )
                      }
                    />
                    <CheckField
                      value={!!item.prof}
                      label="Prof"
                      onChange={(prof) =>
                        onChangeItemAttribute({ ...item, prof: prof }, index)
                      }
                    />
                    <EnumField
                      options={[
                        { value: "str", label: "Str" },
                        { value: "dex", label: "Dex" },
                        { value: "con", label: "Con" },
                        { value: "int", label: "Int" },
                        { value: "wis", label: "Wis" },
                        { value: "cha", label: "Cha" },
                      ]}
                      value={{
                        value: item.attribute,
                        label:
                          item.attribute.charAt(0).toUpperCase() +
                          item.attribute.slice(1),
                      }}
                      label="Attribute"
                      onChange={(type) =>
                        onChangeItemAttribute(
                          { ...item, attribute: type },
                          index
                        )
                      }
                    />
                    <IconButton
                      icon={faTrash}
                      onClick={() => removeItem(item)}
                    />
                  </Container>
                );
              }
            )}
            <TextButton
              text={"Add new Item"}
              icon={faPlus}
              onClick={() => addNewItem()}
            />
          </>
        )}
        {activeTab === "Monster" && (
          <>
            {char.monsters.map((monster: string, index: number) => {
              return (
                <Container key={index}>
                  <AutoStringField
                    optionTable={"monsters"}
                    value={monster}
                    label="Monster"
                    onChange={(newMonster) =>
                      onChangeMonster(newMonster, monster)
                    }
                  />
                  <IconButton
                    icon={faTrash}
                    onClick={() => removeMonster(monster)}
                  />
                </Container>
              );
            })}
            <TextButton
              text={"Add new Monster"}
              icon={faPlus}
              onClick={() => addNewMonster()}
            />
          </>
        )}
      </CharView>
    </CenterWrapper>
  );
};

export default CharEditView;

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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex: 1 1 600px;
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

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;
