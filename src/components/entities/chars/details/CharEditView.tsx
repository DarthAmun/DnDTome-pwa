import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Char from "../../../../data/chars/Char";
import Class from "../../../../data/classes/Class";
import FeatureSet from "../../../../data/classes/FeatureSet";
import Skills from "../../../../data/chars/Skills";
import Saves from "../../../../data/chars/Saves";
import ClassSet from "../../../../data/chars/ClassSet";
import Selection from "../../../../data/Selection";
import Feature from "../../../../data/classes/Feature";
import Subclass from "../../../../data/classes/Subclass";
import { buildCharacter } from "../../../../services/CharacterService";
import BuildChar from "../../../../data/chars/BuildChar";
import { reciveAll } from "../../../../services/DatabaseService";

import {
  faTrash,
  faPlus,
  faMinus,
  faAngleUp,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AutoStringField from "../../../form_elements/AutoStringField";
import CheckField from "../../../form_elements/CheckField";
import EnumField from "../../../form_elements/EnumField";
import StringField from "../../../form_elements/StringField";
import TabBar from "../../../general_elements/TabBar";
import NumberField from "../../../form_elements/NumberField";
import TextField from "../../../form_elements/TextField";
import IconButton from "../../../form_elements/IconButton";
import TextButton from "../../../form_elements/TextButton";
import { LoadingSpinner } from "../../../Loading";

interface $Props {
  character: Char;
  onEdit: (value: Char) => void;
}

const CharEditView = ({ character, onEdit }: $Props) => {
  const [activeTab, setTab] = useState<string>("General");
  const [buildChar, setBuildChar] = useState<BuildChar>();
  const [loading, setLoading] = useState<boolean>(true);
  const [selections, setSelections] = useState<Selection[]>([]);

  useEffect(() => {
    buildCharacter(character).then((buildChar) => {
      setBuildChar(buildChar);
      setLoading(false);
    });
  }, [character, setBuildChar]);

  useEffect(() => {
    reciveAll("selections", (data: any[]) => {
      let selectionsData = data as Selection[];
      setSelections(selectionsData);
    });
  }, []);

  const removeSpell = (oldSpell: string) => {
    if (buildChar !== undefined) {
      let newSpellList = buildChar.character.spells.filter((spell) => spell !== oldSpell);
      onEdit({ ...buildChar.character, spells: newSpellList });
    }
  };
  const addNewSpell = () => {
    if (buildChar !== undefined) {
      let newSpellList = buildChar.character.spells;
      newSpellList.push("");
      onEdit({ ...buildChar.character, spells: newSpellList });
    }
  };
  const onChangeSpell = (newSpell: string, oldSpell: string) => {
    if (buildChar !== undefined) {
      let spells = buildChar.character.spells.map((spell) => {
        if (spell === oldSpell) {
          return newSpell;
        } else {
          return spell;
        }
      });
      onEdit({ ...buildChar.character, spells: spells });
    }
  };

  const removeItem = (oldItem: {
    origin: string;
    attuned: boolean;
    prof: boolean;
    attribute: string;
  }) => {
    if (buildChar !== undefined) {
      let newItemList = buildChar.character.items.filter((item) => item.origin !== oldItem.origin);
      onEdit({ ...buildChar.character, items: newItemList });
    }
  };
  const addNewItem = () => {
    if (buildChar !== undefined) {
      let newItemList = buildChar.character.items;
      newItemList.push({
        origin: "",
        attuned: false,
        prof: false,
        attribute: "str",
      });
      onEdit({ ...buildChar.character, items: newItemList });
    }
  };
  const onChangeItem = (newItem: string, i: number) => {
    if (buildChar !== undefined) {
      let items = buildChar.character.items;
      items[i].origin = newItem;
      onEdit({ ...buildChar.character, items: items });
    }
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
    if (buildChar !== undefined) {
      let items = buildChar.character.items;
      items[i] = newItem;
      onEdit({ ...buildChar.character, items: items });
    }
  };

  const removeMonster = (oldMonster: string) => {
    if (buildChar !== undefined) {
      let newMonsterList = buildChar.character.monsters.filter((monster) => monster !== oldMonster);
      onEdit({ ...buildChar.character, monsters: newMonsterList });
    }
  };
  const addNewMonster = () => {
    if (buildChar !== undefined) {
      let newMonsterList = buildChar.character.monsters;
      newMonsterList.push("");
      onEdit({ ...buildChar.character, monsters: newMonsterList });
    }
  };
  const onChangeMonster = (newMonster: string, oldMonster: string) => {
    if (buildChar !== undefined) {
      let monsters = buildChar.character.monsters.map((monster) => {
        if (monster === oldMonster) {
          return newMonster;
        } else {
          return monster;
        }
      });
      onEdit({ ...buildChar.character, monsters: monsters });
    }
  };

  const removeClass = (oldClass: ClassSet) => {
    if (buildChar !== undefined) {
      let newClassList = buildChar.character.classes.filter((classe) => classe !== oldClass);
      onEdit({ ...buildChar.character, classes: newClassList });
    }
  };
  const addNewClass = () => {
    if (buildChar !== undefined) {
      let newClassList = [...buildChar.character.classes];
      newClassList.push(new ClassSet("", 0, ""));
      onEdit({ ...buildChar.character, classes: newClassList });
    }
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
    if (buildChar !== undefined) {
      buildChar.classes.forEach((classe: Class) => {
        classe.featureSets.forEach((featureSet: FeatureSet) => {
          featureSet.features.forEach((feature: Feature) => {
            if (feature.selections !== undefined && feature.selections.length > 0) {
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
        buildChar.subclasses.forEach((subclass: Subclass) => {
          if (subclass !== undefined) {
            if (classe.name === subclass.type) {
              subclass.features.forEach((featureSet: FeatureSet) => {
                featureSet.features.forEach((feature: Feature) => {
                  if (feature.selections !== undefined && feature.selections.length > 0) {
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
          }
        });
      });
    }
    return newActiveSelections;
  }, [buildChar, selections]);

  const changeClassLevel = useCallback(
    (oldClassSet: ClassSet, level: number) => {
      if (buildChar !== undefined) {
        let classes: ClassSet[] = buildChar.character.classes.map((classSet: ClassSet) => {
          if (classSet === oldClassSet) {
            return { ...classSet, level: level };
          } else {
            return classSet;
          }
        });
        let newActiveSelections = recalcSelections();
        onEdit({
          ...buildChar.character,
          classes: classes,
          activeSelections: newActiveSelections,
        });
      }
    },
    [buildChar, onEdit, recalcSelections]
  );
  const changeClass = useCallback(
    (oldClassSet: ClassSet, classe: string) => {
      if (buildChar !== undefined) {
        let classes = buildChar.character.classes.map((classSet: ClassSet) => {
          if (classSet === oldClassSet) {
            return { ...classSet, classe: classe };
          } else {
            return classSet;
          }
        });
        onEdit({ ...buildChar.character, classes: classes });
      }
    },
    [buildChar, onEdit]
  );
  const changeClassSubclass = useCallback(
    (oldClassSet: ClassSet, subclass: string) => {
      if (buildChar !== undefined) {
        let classes = buildChar.character.classes.map((classSet: ClassSet) => {
          if (classSet === oldClassSet) {
            return { ...classSet, subclasse: subclass };
          } else {
            return classSet;
          }
        });
        onEdit({ ...buildChar.character, classes: classes });
      }
    },
    [buildChar, onEdit]
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
      if (buildChar !== undefined) {
        return skillProf * buildChar.prof + formatScore(stat);
      }
      // return `${skill} = ${skillProf * prof} (Prof) + ${formatScore(stat)} (Stat Bonus)`;
    },
    [formatScore, buildChar]
  );

  const changeProf = useCallback(
    (profName: string) => {
      if (buildChar !== undefined) {
        const skills: Skills = buildChar.character.skills;
        let profValue = skills[profName];
        profValue = (profValue + 1) % 3;
        onEdit({
          ...buildChar.character,
          skills: { ...buildChar.character.skills, [profName]: profValue },
        });
      }
    },
    [buildChar, onEdit]
  );

  const changeSaveProf = useCallback(
    (profName: string) => {
      if (buildChar !== undefined) {
        const saves: Saves = buildChar.character.saves;
        let profValue = saves[profName];
        profValue = (profValue + 1) % 2;
        onEdit({
          ...buildChar.character,
          saves: { ...buildChar.character.saves, [profName]: profValue },
        });
      }
    },
    [buildChar, onEdit]
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
      if (buildChar !== undefined) {
        let newActiveSelections = buildChar.character.activeSelections.map(
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
        onEdit({ ...buildChar.character, activeSelections: newActiveSelections });
      }
    },
    [buildChar, selections, onEdit]
  );

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && buildChar && (
        <CenterWrapper>
          <CharView>
            <StringField
              value={buildChar.character.name}
              label="Name"
              onChange={(name) => onEdit({ ...buildChar.character, name: name })}
            />
            <StringField
              value={buildChar.character.player}
              label="Player"
              onChange={(player) => onEdit({ ...buildChar.character, player: player })}
            />
            <AutoStringField
              optionTable={"campaigns"}
              value={buildChar.character.campaign}
              label="Campaign"
              onChange={(campaign) => onEdit({ ...buildChar.character, campaign: campaign })}
            />
            <StringField
              value={buildChar.character.pic}
              label="Picture"
              onChange={(pic) => onEdit({ ...buildChar.character, pic: pic })}
            />
            <StringField
              value={buildChar.character.background}
              label="Background"
              onChange={(background) => onEdit({ ...buildChar.character, background: background })}
            />
            <StringField
              value={buildChar.character.alignment}
              label="Alignment"
              onChange={(alignment) => onEdit({ ...buildChar.character, alignment: alignment })}
            />
            <NumberField
              value={buildChar.character.ac}
              label="Armor Class"
              onChange={(ac) => onEdit({ ...buildChar.character, ac: ac })}
            />
            <NumberField
              value={buildChar.character.hp}
              label="Hit Points"
              onChange={(hp) => onEdit({ ...buildChar.character, hp: hp })}
            />
            <NumberField
              value={buildChar.character.init}
              label="Initiative"
              onChange={(init) => onEdit({ ...buildChar.character, init: init })}
            />
            <NumberField
              value={buildChar.character.str}
              label="Strength"
              onChange={(str) => onEdit({ ...buildChar.character, str: str })}
            />
            <NumberField
              value={buildChar.character.dex}
              label="Dexterity"
              onChange={(dex) => onEdit({ ...buildChar.character, dex: dex })}
            />
            <NumberField
              value={buildChar.character.con}
              label="Constitution"
              onChange={(con) => onEdit({ ...buildChar.character, con: con })}
            />
            <NumberField
              value={buildChar.character.int}
              label="Intelligence"
              onChange={(int) => onEdit({ ...buildChar.character, int: int })}
            />
            <NumberField
              value={buildChar.character.wis}
              label="Wisdom"
              onChange={(wis) => onEdit({ ...buildChar.character, wis: wis })}
            />
            <NumberField
              value={buildChar.character.cha}
              label="Charisma"
              onChange={(cha) => onEdit({ ...buildChar.character, cha: cha })}
            />
            <TextField
              value={buildChar.character.spellNotes}
              label="Notes"
              onChange={(notes) => onEdit({ ...buildChar.character, spellNotes: notes })}
            />
          </CharView>
          <CharView>
            <TabBar
              children={["General", "Abilities", "Classes", "Races", "Spells", "Items", "Monster"]}
              onChange={(tab: string) => setTab(tab)}
              activeTab={activeTab}
            />
            {activeTab === "General" && (
              <>
                <TextField
                  value={buildChar.character.speed}
                  label="Speed"
                  onChange={(speed) => onEdit({ ...buildChar.character, speed: speed })}
                />
                <TextField
                  value={buildChar.character.profsLangs}
                  label="Languages"
                  onChange={(profsLangs) =>
                    onEdit({ ...buildChar.character, profsLangs: profsLangs })
                  }
                />
                <TextField
                  value={buildChar.character.senses}
                  label="Senses"
                  onChange={(senses) => onEdit({ ...buildChar.character, senses: senses })}
                />
              </>
            )}
            {activeTab === "Classes" && (
              <>
                {buildChar.character.classes.map((classSet: ClassSet, index: number) => {
                  return (
                    <PropWrapper key={index}>
                      <NumberField
                        value={classSet.level}
                        label="Level"
                        onChange={(level) => changeClassLevel(classSet, level)}
                      />
                      <IconButton icon={faTrash} onClick={() => removeClass(classSet)} />
                      <AutoStringField
                        optionTable={"classes"}
                        value={classSet.classe}
                        label="Class"
                        onChange={(classe) => changeClass(classSet, classe)}
                      />
                      <StringField
                        value={classSet.subclasse}
                        label="Subclass"
                        onChange={(subclasse) => changeClassSubclass(classSet, subclasse)}
                      />
                    </PropWrapper>
                  );
                })}
                <TextButton text={"Add new Class"} icon={faPlus} onClick={() => addNewClass()} />
                {buildChar.character.activeSelections?.map(
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
                              ?.selectionOptions.filter((option) => option.level <= buildChar.level)
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
                          onChange={(select) => onChangeActiveSelection(activeSelection, select)}
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
                  value={buildChar.character.race.race}
                  label="Race"
                  onChange={(race) =>
                    onEdit({
                      ...buildChar.character,
                      race: { ...buildChar.character.race, race: race },
                    })
                  }
                />
                <StringField
                  value={buildChar.character.race.subrace}
                  label="Subrace"
                  onChange={(subrace) =>
                    onEdit({
                      ...buildChar.character,
                      race: { ...buildChar.character.race, subrace: subrace },
                    })
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
                      {calcSkill(buildChar.character.saves.strSaveProf, buildChar.character.str)}
                    </PropText>
                    <PropProf onClick={(e) => changeSaveProf("strSaveProf")}>
                      <Icon icon={formatProf(buildChar.character.saves.strSaveProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Dex Save:</PropTitle>
                      {calcSkill(buildChar.character.saves.dexSaveProf, buildChar.character.dex)}
                    </PropText>
                    <PropProf onClick={(e) => changeSaveProf("dexSaveProf")}>
                      <Icon icon={formatProf(buildChar.character.saves.dexSaveProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Con Save:</PropTitle>
                      {calcSkill(buildChar.character.saves.conSaveProf, buildChar.character.con)}
                    </PropText>
                    <PropProf onClick={(e) => changeSaveProf("conSaveProf")}>
                      <Icon icon={formatProf(buildChar.character.saves.conSaveProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Int Save:</PropTitle>
                      {calcSkill(buildChar.character.saves.intSaveProf, buildChar.character.int)}
                    </PropText>
                    <PropProf onClick={(e) => changeSaveProf("intSaveProf")}>
                      <Icon icon={formatProf(buildChar.character.saves.intSaveProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Wis Save:</PropTitle>
                      {calcSkill(buildChar.character.saves.wisSaveProf, buildChar.character.wis)}
                    </PropText>
                    <PropProf onClick={(e) => changeSaveProf("wisSaveProf")}>
                      <Icon icon={formatProf(buildChar.character.saves.wisSaveProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Cha Save:</PropTitle>
                      {calcSkill(buildChar.character.saves.chaSaveProf, buildChar.character.cha)}
                    </PropText>
                    <PropProf onClick={(e) => changeSaveProf("chaSaveProf")}>
                      <Icon icon={formatProf(buildChar.character.saves.chaSaveProf)} />
                    </PropProf>
                  </PropWithProf>
                </PropWrapper>
                <PropWrapper>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Acrobatics:</PropTitle>
                      {calcSkill(
                        buildChar.character.skills.acrobaticsProf,
                        buildChar.character.str
                      )}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("acrobaticsProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.acrobaticsProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Animal Handling:</PropTitle>
                      {calcSkill(
                        buildChar.character.skills.animalHandlingProf,
                        buildChar.character.wis
                      )}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("animalHandlingProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.animalHandlingProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Arcana:</PropTitle>
                      {calcSkill(buildChar.character.skills.arcanaProf, buildChar.character.int)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("arcanaProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.arcanaProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Athletics:</PropTitle>
                      {calcSkill(buildChar.character.skills.athleticsProf, buildChar.character.dex)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("athleticsProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.athleticsProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Deception:</PropTitle>
                      {calcSkill(buildChar.character.skills.deceptionProf, buildChar.character.cha)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("deceptionProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.deceptionProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>History:</PropTitle>
                      {calcSkill(buildChar.character.skills.historyProf, buildChar.character.int)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("historyProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.historyProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Insight:</PropTitle>
                      {calcSkill(buildChar.character.skills.insightProf, buildChar.character.wis)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("insightProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.insightProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Intimidation:</PropTitle>
                      {calcSkill(
                        buildChar.character.skills.intimidationProf,
                        buildChar.character.cha
                      )}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("intimidationProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.intimidationProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Investigation:</PropTitle>
                      {calcSkill(
                        buildChar.character.skills.investigationProf,
                        buildChar.character.int
                      )}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("investigationProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.investigationProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Medicine:</PropTitle>
                      {calcSkill(buildChar.character.skills.medicineProf, buildChar.character.wis)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("medicineProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.medicineProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Nature:</PropTitle>
                      {calcSkill(buildChar.character.skills.natureProf, buildChar.character.int)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("natureProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.natureProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Perception:</PropTitle>
                      {calcSkill(
                        buildChar.character.skills.perceptionProf,
                        buildChar.character.wis
                      )}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("perceptionProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.perceptionProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Performance:</PropTitle>
                      {calcSkill(
                        buildChar.character.skills.performanceProf,
                        buildChar.character.cha
                      )}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("performanceProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.performanceProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Persuasion:</PropTitle>
                      {calcSkill(
                        buildChar.character.skills.persuasionProf,
                        buildChar.character.cha
                      )}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("persuasionProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.persuasionProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Religion:</PropTitle>
                      {calcSkill(buildChar.character.skills.religionProf, buildChar.character.int)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("religionProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.religionProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Sleight Of Hand:</PropTitle>
                      {calcSkill(
                        buildChar.character.skills.sleightOfHandProf,
                        buildChar.character.dex
                      )}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("sleightOfHandProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.sleightOfHandProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Stealth:</PropTitle>
                      {calcSkill(buildChar.character.skills.stealthProf, buildChar.character.dex)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("stealthProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.stealthProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Survival:</PropTitle>
                      {calcSkill(buildChar.character.skills.survivalProf, buildChar.character.wis)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("survivalProf")}>
                      <Icon icon={formatProf(buildChar.character.skills.survivalProf)} />
                    </PropProf>
                  </PropWithProf>
                  <TextField
                    value={buildChar.character.actions}
                    label="Actions"
                    onChange={(actions) => onEdit({ ...buildChar.character, actions: actions })}
                  />
                </PropWrapper>
              </>
            )}
            {activeTab === "Spells" && (
              <>
                <NumberField
                  value={buildChar.character.castingHit}
                  label="Casting Hit"
                  onChange={(castingHit) =>
                    onEdit({ ...buildChar.character, castingHit: castingHit })
                  }
                />
                <NumberField
                  value={buildChar.character.castingDC}
                  label="Casting DC"
                  onChange={(castingDC) => onEdit({ ...buildChar.character, castingDC: castingDC })}
                />
                {buildChar.character.spells.map((spell: string, index: number) => {
                  return (
                    <Container key={index}>
                      <AutoStringField
                        optionTable={"spells"}
                        value={spell}
                        label="Spell"
                        onChange={(newSpell) => onChangeSpell(newSpell, spell)}
                      />
                      <IconButton icon={faTrash} onClick={() => removeSpell(spell)} />
                    </Container>
                  );
                })}
                <TextButton text={"Add new Spell"} icon={faPlus} onClick={() => addNewSpell()} />
              </>
            )}
            {activeTab === "Items" && (
              <>
                {buildChar.character.items.map(
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
                          onChange={(prof) => onChangeItemAttribute({ ...item, prof: prof }, index)}
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
                            label: item.attribute.charAt(0).toUpperCase() + item.attribute.slice(1),
                          }}
                          label="Attribute"
                          onChange={(type) =>
                            onChangeItemAttribute({ ...item, attribute: type }, index)
                          }
                        />
                        <IconButton icon={faTrash} onClick={() => removeItem(item)} />
                      </Container>
                    );
                  }
                )}
                <TextButton text={"Add new Item"} icon={faPlus} onClick={() => addNewItem()} />
              </>
            )}
            {activeTab === "Monster" && (
              <>
                {buildChar.character.monsters.map((monster: string, index: number) => {
                  return (
                    <Container key={index}>
                      <AutoStringField
                        optionTable={"monsters"}
                        value={monster}
                        label="Monster"
                        onChange={(newMonster) => onChangeMonster(newMonster, monster)}
                      />
                      <IconButton icon={faTrash} onClick={() => removeMonster(monster)} />
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
      )}
    </>
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
  flex: 1 1 100%;
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
