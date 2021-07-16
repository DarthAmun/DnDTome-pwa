import {
  faAngleDoubleUp,
  faAngleUp,
  faCalculator,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Char from "../../../../data/chars/Char";
import Class from "../../../../data/classes/Class";
import ClassSet from "../../../../data/chars/ClassSet";
import Saves from "../../../../data/chars/Saves";
import Skills from "../../../../data/chars/Skills";
import Selection from "../../../../data/Selection";
import { calcLevel, calcProf, recalcSelections } from "../../../../services/CharacterService";
import { reciveAll, recivePromiseByMultiAttribute } from "../../../../services/DatabaseService";
import AutoStringField from "../../../form_elements/AutoStringField";
import CheckField from "../../../form_elements/CheckField";
import DataSelectField from "../../../form_elements/DataSelectField";
import EnumField from "../../../form_elements/EnumField";
import IconButton from "../../../form_elements/IconButton";
import NumberField from "../../../form_elements/NumberField";
import StringField from "../../../form_elements/StringField";
import TextButton from "../../../form_elements/TextButton";
import TextField from "../../../form_elements/TextField";
import TabBar from "../../../general_elements/TabBar";
import ImageImportField from "../../../form_elements/ImageField";
import SingleSelectField from "../../../form_elements/SingleSelectField";

interface $Props {
  character: Char;
  onEdit: (value: Char) => void;
  isNpc?: boolean;
}

const CharEditView = ({ character, onEdit, isNpc }: $Props) => {
  const [activeTab, setTab] = useState<string>("General");
  const [selections, setSelections] = useState<Selection[]>([]);
  const [spellAttr, setSpellAttr] = useState<string>("str");

  useEffect(() => {
    reciveAll("selections", (data: any[]) => {
      let selectionsData = data as Selection[];
      setSelections(selectionsData);
    });
  }, []);

  const removeSpell = (index: number) => {
    let newSpellList = [...character.spells];
    newSpellList.splice(index, 1);
    onEdit({ ...character, spells: newSpellList });
  };
  const addNewSpell = () => {
    let newSpellList = [...character.spells];
    newSpellList.push({ origin: "", prepared: false });
    onEdit({ ...character, spells: newSpellList });
  };
  const onChangeSpell = (newSpell: string, i: number) => {
    let spells = [...character.spells];
    spells[i].origin = newSpell;
    onEdit({ ...character, spells: spells });
  };
  const onPrepareSpell = (i: number) => {
    let spells = [...character.spells];
    spells[i].prepared = !spells[i].prepared;
    onEdit({ ...character, spells: spells });
  };

  const removeItem = (index: number) => {
    let newItemList = [...character.items];
    newItemList.splice(index, 1);
    onEdit({ ...character, items: newItemList });
  };
  const addNewItem = () => {
    let newItemList = [...character.items];
    newItemList.push({
      origin: "",
      attuned: false,
      prof: false,
      attribute: "str",
    });
    onEdit({ ...character, items: newItemList });
  };
  const onChangeItem = (newItem: string, i: number) => {
    let items = character.items;
    items[i].origin = newItem;
    onEdit({ ...character, items: items });
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
    let items = character.items;
    items[i] = newItem;
    onEdit({ ...character, items: items });
  };

  const removeMonster = (index: number) => {
    let newMonsterList = [...character.monsters];
    newMonsterList.splice(index, 1);
    onEdit({ ...character, monsters: newMonsterList });
  };
  const addNewMonster = () => {
    let newMonsterList = [...character.monsters];
    newMonsterList.push("");
    onEdit({ ...character, monsters: newMonsterList });
  };
  const onChangeMonster = (newMonster: string, i: number) => {
    let monsters = [...character.monsters];
    monsters[i] = newMonster;
    onEdit({ ...character, monsters: monsters });
  };

  const removeClass = (index: number) => {
    let newClassList = [...character.classes];
    newClassList.splice(index, 1);
    onEdit({ ...character, classes: newClassList });
  };
  const addNewClass = () => {
    let newClassList = [...character.classes];
    newClassList.push(new ClassSet("", 0, ""));
    onEdit({ ...character, classes: newClassList });
  };

  const changeClassLevel = useCallback(
    (oldClassSet: ClassSet, level: number) => {
      if (character !== undefined) {
        let classes: ClassSet[] = character.classes.map((classSet: ClassSet) => {
          if (classSet === oldClassSet) {
            return { ...classSet, level: level };
          } else {
            return classSet;
          }
        });

        recalcSelections(character).then((char) => {
          onEdit({
            ...char,
            classes: classes,
          });
        });
      }
    },
    [character, onEdit]
  );
  const changeClass = useCallback(
    (oldClassSet: ClassSet, classe: string) => {
      if (character !== undefined) {
        let classes = character.classes.map((classSet: ClassSet) => {
          if (classSet === oldClassSet) {
            return { ...classSet, classe: classe };
          } else {
            return classSet;
          }
        });
        recalcSelections(character).then((char) => {
          onEdit({
            ...char,
            classes: classes,
          });
        });
      }
    },
    [character, onEdit]
  );
  const changeClassSubclass = useCallback(
    (oldClassSet: ClassSet, subclass: string) => {
      if (character !== undefined) {
        let classes = character.classes.map((classSet: ClassSet) => {
          if (classSet === oldClassSet) {
            return { ...classSet, subclasse: subclass };
          } else {
            return classSet;
          }
        });
        onEdit({ ...character, classes: classes });
      }
    },
    [character, onEdit]
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
      if (character !== undefined) {
        return skillProf * calcProf(character) + formatScore(stat);
      }
      // return `${skill} = ${skillProf * prof} (Prof) + ${formatScore(stat)} (Stat Bonus)`;
    },
    [formatScore, character]
  );

  const changeProf = useCallback(
    (profName: string) => {
      if (character !== undefined) {
        const skills: Skills = character.skills;
        let profValue = skills[profName];
        profValue = (profValue + 1) % 3;
        onEdit({
          ...character,
          skills: { ...character.skills, [profName]: profValue },
        });
      }
    },
    [character, onEdit]
  );

  const changeSaveProf = useCallback(
    (profName: string) => {
      if (character !== undefined) {
        const saves: Saves = character.saves;
        let profValue = saves[profName];
        profValue = (profValue + 1) % 2;
        onEdit({
          ...character,
          saves: { ...character.saves, [profName]: profValue },
        });
      }
    },
    [character, onEdit]
  );

  const onChangeActiveSelection = useCallback(
    (id: number, select: string) => {
      if (character !== undefined) {
        let newActiveSelections = [...character.activeSelections];
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
        onEdit({ ...character, activeSelections: newActiveSelections });
      }
    },
    [character, selections, onEdit]
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
      let newAbilityImprovs = character.abilityImprovs.map(
        (set: { origin: string; level: number; s1: string; s2: string; feat: string }) => {
          if (abilityImprov.level === set.level && abilityImprov.origin === set.origin) {
            return { ...set, [name]: value };
          } else {
            return set;
          }
        }
      );
      onEdit({ ...character, abilityImprovs: newAbilityImprovs });
    },
    [character, onEdit]
  );

  const calcSpellValues = () => {
    if (character !== undefined) {
      let newCastingHit = formatScore(character[spellAttr]) + calcProf(character);
      let newCastingDC = newCastingHit + 8;

      onEdit({ ...character, castingHit: newCastingHit, castingDC: newCastingDC });
    }
  };

  const calcHpValues = async () => {
    if (character !== undefined) {
      let newConMod = formatScore(character["con"]);

      let classes: Class[] = [];
      let classList: Promise<Class>[] = [];
      character.classes.forEach((classe) => {
        let [name, sources] = classe.classe.split("|");
        classList.push(recivePromiseByMultiAttribute("classes", { name: name, sources: sources }));
      });
      classes = await Promise.all(classList);

      let newHp: number = parseInt(classes[0].hitDices.replaceAll("d", "").trim()) + newConMod;
      classes.forEach((classe: Class, index: number) => {
        if (index === 0)
          [...Array(character.classes[index].level - 1)].forEach(() => {
            newHp += parseInt(classe.hitDices.replaceAll("d", "").trim()) / 2 + 1 + newConMod;
          });
        else
          [...Array(character.classes[index].level)].forEach(() => {
            newHp += parseInt(classe.hitDices.replaceAll("d", "").trim()) / 2 + 1 + newConMod;
          });
      });

      onEdit({ ...character, hp: newHp });
    }
  };

  return (
    <>
      {character && (
        <CenterWrapper>
          <CharView>
            {!isNpc && (
              <>
                <StringField
                  value={character.name}
                  label="Name"
                  onChange={(name) => onEdit({ ...character, name: name })}
                />
                <StringField
                  value={character.player}
                  label="Player"
                  onChange={(player) => onEdit({ ...character, player: player })}
                />
                <DataSelectField
                  optionTable={["campaigns"]}
                  value={character.campaign}
                  label="Campaign"
                  onChange={(campaign) => onEdit({ ...character, campaign: campaign })}
                />
              </>
            )}
            <StringField
              value={character.pic}
              label="Picture Link"
              onChange={(pic) => onEdit({ ...character, pic: pic })}
            />
            <FieldGroup>
              <ImageImportField
                label="Picture"
                onFinished={(base64) => onEdit({ ...character, picBase64: base64 })}
              />
              <IconButton icon={faTrash} onClick={() => onEdit({ ...character, picBase64: "" })} />
            </FieldGroup>
            <DataSelectField
              optionTable={["backgrounds"]}
              value={character.background}
              label="Background"
              onChange={(background) =>
                onEdit({
                  ...character,
                  background: background,
                })
              }
            />
            <StringField
              value={character.alignment}
              label="Alignment"
              onChange={(alignment) => onEdit({ ...character, alignment: alignment })}
            />
            <NumberField
              value={character.ac}
              label="Armor Class"
              onChange={(ac) => onEdit({ ...character, ac: ac })}
            />
            <NumberField
              value={character.hp}
              label="Hit Points"
              onChange={(hp) => onEdit({ ...character, hp: hp })}
            />
            <TextButton text={"Autocalc"} icon={faCalculator} onClick={() => calcHpValues()} />
            <NumberField
              value={character.init}
              label="Initiative"
              onChange={(init) => onEdit({ ...character, init: init })}
            />
            <NumberField
              value={character.str}
              label="Strength"
              onChange={(str) => onEdit({ ...character, str: str })}
            />
            <NumberField
              value={character.dex}
              label="Dexterity"
              onChange={(dex) => onEdit({ ...character, dex: dex })}
            />
            <NumberField
              value={character.con}
              label="Constitution"
              onChange={(con) => onEdit({ ...character, con: con })}
            />
            <NumberField
              value={character.int}
              label="Intelligence"
              onChange={(int) => onEdit({ ...character, int: int })}
            />
            <NumberField
              value={character.wis}
              label="Wisdom"
              onChange={(wis) => onEdit({ ...character, wis: wis })}
            />
            <NumberField
              value={character.cha}
              label="Charisma"
              onChange={(cha) => onEdit({ ...character, cha: cha })}
            />
            <TextField
              value={character.spellNotes}
              label="Notes"
              onChange={(notes) => onEdit({ ...character, spellNotes: notes })}
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
                  value={character.speed}
                  label="Speed"
                  onChange={(speed) => onEdit({ ...character, speed: speed })}
                />
                <TextField
                  value={character.profsLangs}
                  label="Proficiencies"
                  onChange={(profsLangs) => onEdit({ ...character, profsLangs: profsLangs })}
                />
                <TextField
                  value={character.senses}
                  label="Senses"
                  onChange={(senses) => onEdit({ ...character, senses: senses })}
                />
              </>
            )}
            {activeTab === "Classes" && (
              <>
                {character.classes.map((classSet: ClassSet, index: number) => {
                  return (
                    <PropWrapper key={index}>
                      <NumberField
                        value={classSet.level}
                        label="Level"
                        onChange={(level) => changeClassLevel(classSet, level)}
                      />
                      <IconButton icon={faTrash} onClick={() => removeClass(index)} />
                      <DataSelectField
                        optionTable={["classes"]}
                        value={classSet.classe}
                        label="Class"
                        onChange={(classe) => changeClass(classSet, classe)}
                      />
                      <DataSelectField
                        optionTable={["subclasses"]}
                        filters={[
                          { fieldName: "type", value: classSet.classe.split("|")[0], sort: 0 },
                        ]}
                        value={classSet.subclasse}
                        label="Subclass"
                        onChange={(subclasse) => changeClassSubclass(classSet, subclasse)}
                      />
                    </PropWrapper>
                  );
                })}
                <TextButton text={"Add new Class"} icon={faPlus} onClick={() => addNewClass()} />
                {character.activeSelections?.map(
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
                              ?.selectionOptions.filter(
                                (option) => option.level <= calcLevel(character)
                              )
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
                {character.abilityImprovs &&
                  character.abilityImprovs
                    .filter((a) => a.level <= calcLevel(character))
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
              </>
            )}
            {activeTab === "Races" && (
              <PropWrapper>
                <DataSelectField
                  optionTable={["races"]}
                  value={character.race.race}
                  label="Race"
                  onChange={(race) =>
                    onEdit({
                      ...character,
                      race: { ...character.race, race: race },
                    })
                  }
                />
                <DataSelectField
                  optionTable={["subraces"]}
                  filters={[{ fieldName: "type", value: character.race.race, sort: 0 }]}
                  value={character.race.subrace}
                  label="Subrace"
                  onChange={(subrace) =>
                    onEdit({
                      ...character,
                      race: { ...character.race, subrace: subrace },
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
                      {calcSkill(character.saves.strSaveProf, character.str)}
                    </PropText>
                    <PropProf onClick={(e) => changeSaveProf("strSaveProf")}>
                      <Icon icon={formatProf(character.saves.strSaveProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Dex Save:</PropTitle>
                      {calcSkill(character.saves.dexSaveProf, character.dex)}
                    </PropText>
                    <PropProf onClick={(e) => changeSaveProf("dexSaveProf")}>
                      <Icon icon={formatProf(character.saves.dexSaveProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Con Save:</PropTitle>
                      {calcSkill(character.saves.conSaveProf, character.con)}
                    </PropText>
                    <PropProf onClick={(e) => changeSaveProf("conSaveProf")}>
                      <Icon icon={formatProf(character.saves.conSaveProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Int Save:</PropTitle>
                      {calcSkill(character.saves.intSaveProf, character.int)}
                    </PropText>
                    <PropProf onClick={(e) => changeSaveProf("intSaveProf")}>
                      <Icon icon={formatProf(character.saves.intSaveProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Wis Save:</PropTitle>
                      {calcSkill(character.saves.wisSaveProf, character.wis)}
                    </PropText>
                    <PropProf onClick={(e) => changeSaveProf("wisSaveProf")}>
                      <Icon icon={formatProf(character.saves.wisSaveProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Cha Save:</PropTitle>
                      {calcSkill(character.saves.chaSaveProf, character.cha)}
                    </PropText>
                    <PropProf onClick={(e) => changeSaveProf("chaSaveProf")}>
                      <Icon icon={formatProf(character.saves.chaSaveProf)} />
                    </PropProf>
                  </PropWithProf>
                </PropWrapper>
                <PropWrapper>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Acrobatics:</PropTitle>
                      {calcSkill(character.skills.acrobaticsProf, character.dex)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("acrobaticsProf")}>
                      <Icon icon={formatProf(character.skills.acrobaticsProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Animal Handling:</PropTitle>
                      {calcSkill(character.skills.animalHandlingProf, character.wis)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("animalHandlingProf")}>
                      <Icon icon={formatProf(character.skills.animalHandlingProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Arcana:</PropTitle>
                      {calcSkill(character.skills.arcanaProf, character.int)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("arcanaProf")}>
                      <Icon icon={formatProf(character.skills.arcanaProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Athletics:</PropTitle>
                      {calcSkill(character.skills.athleticsProf, character.str)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("athleticsProf")}>
                      <Icon icon={formatProf(character.skills.athleticsProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Deception:</PropTitle>
                      {calcSkill(character.skills.deceptionProf, character.cha)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("deceptionProf")}>
                      <Icon icon={formatProf(character.skills.deceptionProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>History:</PropTitle>
                      {calcSkill(character.skills.historyProf, character.int)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("historyProf")}>
                      <Icon icon={formatProf(character.skills.historyProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Insight:</PropTitle>
                      {calcSkill(character.skills.insightProf, character.wis)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("insightProf")}>
                      <Icon icon={formatProf(character.skills.insightProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Intimidation:</PropTitle>
                      {calcSkill(character.skills.intimidationProf, character.cha)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("intimidationProf")}>
                      <Icon icon={formatProf(character.skills.intimidationProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Investigation:</PropTitle>
                      {calcSkill(character.skills.investigationProf, character.int)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("investigationProf")}>
                      <Icon icon={formatProf(character.skills.investigationProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Medicine:</PropTitle>
                      {calcSkill(character.skills.medicineProf, character.wis)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("medicineProf")}>
                      <Icon icon={formatProf(character.skills.medicineProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Nature:</PropTitle>
                      {calcSkill(character.skills.natureProf, character.int)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("natureProf")}>
                      <Icon icon={formatProf(character.skills.natureProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Perception:</PropTitle>
                      {calcSkill(character.skills.perceptionProf, character.wis)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("perceptionProf")}>
                      <Icon icon={formatProf(character.skills.perceptionProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Performance:</PropTitle>
                      {calcSkill(character.skills.performanceProf, character.cha)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("performanceProf")}>
                      <Icon icon={formatProf(character.skills.performanceProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Persuasion:</PropTitle>
                      {calcSkill(character.skills.persuasionProf, character.cha)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("persuasionProf")}>
                      <Icon icon={formatProf(character.skills.persuasionProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Religion:</PropTitle>
                      {calcSkill(character.skills.religionProf, character.int)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("religionProf")}>
                      <Icon icon={formatProf(character.skills.religionProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Sleight Of Hand:</PropTitle>
                      {calcSkill(character.skills.sleightOfHandProf, character.dex)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("sleightOfHandProf")}>
                      <Icon icon={formatProf(character.skills.sleightOfHandProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Stealth:</PropTitle>
                      {calcSkill(character.skills.stealthProf, character.dex)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("stealthProf")}>
                      <Icon icon={formatProf(character.skills.stealthProf)} />
                    </PropProf>
                  </PropWithProf>
                  <PropWithProf>
                    <PropText>
                      <PropTitle>Survival:</PropTitle>
                      {calcSkill(character.skills.survivalProf, character.wis)}
                    </PropText>
                    <PropProf onClick={(e) => changeProf("survivalProf")}>
                      <Icon icon={formatProf(character.skills.survivalProf)} />
                    </PropProf>
                  </PropWithProf>
                  <TextField
                    value={character.actions}
                    label="Actions"
                    onChange={(actions) => onEdit({ ...character, actions: actions })}
                  />
                </PropWrapper>
              </>
            )}
            {activeTab === "Spells" && (
              <>
                <NumberField
                  value={character.castingHit}
                  label="Casting Hit"
                  onChange={(castingHit) => onEdit({ ...character, castingHit: castingHit })}
                />
                <NumberField
                  value={character.castingDC}
                  label="Casting DC"
                  onChange={(castingDC) => onEdit({ ...character, castingDC: castingDC })}
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
                    value: spellAttr,
                    label: spellAttr.charAt(0).toUpperCase() + spellAttr.slice(1),
                  }}
                  label="Attribute"
                  onChange={(type) => setSpellAttr(type)}
                />
                <TextButton
                  text={"Autocalc"}
                  icon={faCalculator}
                  onClick={() => calcSpellValues()}
                />
                {character.spells.map(
                  (spell: { origin: string; prepared: boolean }, index: number) => {
                    return (
                      <Container key={index}>
                        <AutoStringField
                          optionTable={"spells"}
                          value={spell.origin}
                          label="Spell"
                          onChange={(newSpell) => onChangeSpell(newSpell, index)}
                        />
                        <CheckField
                          value={spell.prepared}
                          label="Prepared"
                          onChange={(value) => onPrepareSpell(index)}
                        />
                        <IconButton icon={faTrash} onClick={() => removeSpell(index)} />
                      </Container>
                    );
                  }
                )}
                <TextButton text={"Add new Spell"} icon={faPlus} onClick={() => addNewSpell()} />
              </>
            )}
            {activeTab === "Items" && (
              <>
                {character.items.map(
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
                          onChange={(newItem: string) => onChangeItem(newItem, index)}
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
                        <IconButton icon={faTrash} onClick={() => removeItem(index)} />
                      </Container>
                    );
                  }
                )}
                <TextButton text={"Add new Item"} icon={faPlus} onClick={() => addNewItem()} />
              </>
            )}
            {activeTab === "Monster" && (
              <>
                {character.monsters.map((monster: string, index: number) => {
                  return (
                    <Container key={index}>
                      <AutoStringField
                        optionTable={["monsters"]}
                        value={monster}
                        label="Monster"
                        onChange={(newMonster) => onChangeMonster(newMonster, index)}
                      />
                      <IconButton icon={faTrash} onClick={() => removeMonster(index)} />
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

const FieldGroup = styled.div`
  flex: 2 2 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

const AbilitySeperator = styled.div`
  width: 100%;
  text-align: center;
`;
