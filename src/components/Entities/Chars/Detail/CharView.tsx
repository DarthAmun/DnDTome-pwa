import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import {
  reciveAllFiltered,
  reciveByAttribute,
  update,
} from "../../../../Services/DatabaseService";
import Char from "../../../../Data/Chars/Char";
import Class from "../../../../Data/Classes/Class";
// import Subclass from "../../../../Data/Classes/Subclass";
import Feature from "../../../../Data/Classes/Feature";
import FeatureSet from "../../../../Data/Classes/FeatureSet";
// import Race from "../../../../Data/Races/Race";
// import Subrace from "../../../../Data/Races/Subrace";
import Trait from "../../../../Data/Races/Trait";
import SpellTile from "../../Spells/SpellTile";
import Spell, { isSpell } from "../../../../Data/Spell";
import Item, { isItem } from "../../../../Data/Item";
import Gear, { isGear } from "../../../../Data/Gear";
import Monster, { isMonster } from "../../../../Data/Monster";

import TabBar from "../../../GeneralElements/TabBar";
import CharGeneral from "./DetailComponents/CharGeneral";
import CharHeader from "./DetailComponents/CharHeader";
import ItemTile from "../../Item/ItemTile";
import GearTile from "../../Gear/GearTile";
import SmallNumberArrayField from "../../../FormElements/SmallNumberArrayField";
import CharCombat from "./DetailComponents/CharCombat";
import MonsterTile from "../../Monster/MonsterTile";
import FormatedText from "../../../GeneralElements/FormatedText";

interface $Props {
  character: Char;
}

const CharView = ({ character }: $Props) => {
  const [char, setChar] = useState<Char>(character);

  const [classes, setClasses] = useState<Class[]>([]);
  // const [subclasses, setSubclasses] = useState<Subclass[]>([]);
  const [classesFeatures, setClassesFeatures] = useState<FeatureSet[]>([]);

  // const [race, setRace] = useState<Race>();
  // const [subrace, setSubrace] = useState<Subrace>();
  const [raceFeatures, setRaceFeatures] = useState<Trait[]>([]);

  const [spells, setSpells] = useState<Spell[]>([]);

  const [gears, setGears] = useState<Gear[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [monsters, setMonsters] = useState<Monster[]>([]);

  const [activeTab, setTab] = useState<string>("General");
  const [tabs, setTabs] = useState<string[]>(["General",
    "Combat",
    "Race",
    "Classes",
    "Notes",]);

  const calcLevel = useCallback(() => {
    let level = 0;
    char.classes.forEach((classe) => {
      level += classe.level;
    });
    return level;
  }, [char]);

  useEffect(() => {
    reciveAllFiltered(
      "classes",
      [
        {
          fieldName: "name",
          value: character.classes.map((classe) => {
            return classe.classe;
          }),
        },
      ],
      (results: any[]) => {
        setClasses(results);
        results.forEach((classe) => {
          let classLevel = 0;
          character.classes.forEach((charClass) => {
            if (classe.name === charClass.classe) {
              classLevel = charClass.level;
            }
          });
          classe.featureSets.forEach((featureSet: FeatureSet) => {
            if (featureSet.level <= classLevel) {
              setClassesFeatures((c) => [...c, featureSet]);
            }
          });
        });
      }
    );
  }, [character]);

  useEffect(() => {
    reciveAllFiltered(
      "subclasses",
      [
        {
          fieldName: "name",
          value: character.classes.map((classe) => {
            return classe.subclasse;
          }),
        },
      ],
      (results: any[]) => {
        // setSubclasses(results);
        results.forEach((subclass) => {
          let subclassLevel = 0;
          character.classes.forEach((charClass) => {
            if (subclass.name === charClass.subclasse) {
              subclassLevel = charClass.level;
            }
          });
          subclass.features.forEach((featureSet: FeatureSet) => {
            if (featureSet.level <= subclassLevel) {
              setClassesFeatures((c) => [...c, featureSet]);
            }
          });
        });
      }
    );
  }, [character]);

  useEffect(() => {
    reciveAllFiltered(
      "races",
      [{ fieldName: "name", value: character.race.race }],
      (results: any) => {
        // setRace(results[0]);
        results[0].traits.forEach((trait: Trait) => {
          if (trait.level <= calcLevel()) {
            setRaceFeatures((c) => [...c, trait]);
          }
        });
      }
    );
  }, [character, calcLevel]);

  useEffect(() => {
    reciveAllFiltered(
      "subraces",
      [{ fieldName: "name", value: character.race.subrace }],
      (results: any) => {
        // setRace(results[0]);
        results[0].traits.forEach((trait: Trait) => {
          if (trait.level <= calcLevel()) {
            setRaceFeatures((c) => [...c, trait]);
          }
        });
      }
    );
  }, [character, calcLevel]);

  useEffect(() => {
    character.spells.forEach((spell) => {
      reciveByAttribute("spells", "name", spell, (result) => {
        if (result && isSpell(result)) {
          setSpells((s) => [...s, result]);
        }
      });
    });

  }, [character]);

  useEffect(() => {
    character.items.forEach((item) => {
      reciveByAttribute("items", "name", item, (result) => {
        if (result && isItem(result)) {
          setItems((s) => [...s, result]);
        }
      });
    });
  }, [character]);

  useEffect(() => {
    character.items.forEach((item) => {
      reciveByAttribute("gears", "name", item, (result) => {
        if (result && isGear(result)) {
          setGears((s) => [...s, result]);
        }
      });
    });
  }, [character]);

  useEffect(() => {
    character.monsters.forEach((monster) => {
      reciveByAttribute("monsters", "name", monster, (result) => {
        if (result && isMonster(result)) {
          setMonsters((s) => [...s, result]);
        }
      });
    });
  }, [character]);

  useEffect(() => {
    if (!tabs.includes("Monster") && character.monsters.length > 0)
      setTabs((t) => [...t, "Monster"]);
  }, [character, tabs])
  useEffect(() => {
    if (!tabs.includes("Items") && character.items.length > 0)
      setTabs((t) => [...t, "Items"]);
  }, [character, tabs])
  useEffect(() => {
    if (!tabs.includes("Spells") && character.spells.length > 0)
      setTabs((t) => [...t, "Spells"]);
  }, [character, tabs])

  const onSpellslotChange = (
    oldSlots: { origin: string; slots: number[]; max: number[] },
    value: number[]
  ) => {
    let newSpellSlots = char.spellSlots.map(
      (slots: { origin: string; slots: number[]; max: number[] }) => {
        if (slots === oldSlots) {
          return { ...slots, slots: value };
        } else {
          return slots;
        }
      }
    );
    saveChar({ ...char, spellSlots: newSpellSlots });
  };

  const saveChar = (char: Char) => {
    setChar(char);
    update("chars", char);
  };

  return (
    <CenterWrapper>
      <CharHeader char={char} />
      <TabBar
        children={tabs}
        onChange={(tab: string) => setTab(tab)}
      />
      {activeTab === "General" && (
        <CharGeneral
          char={char}
          onChange={saveChar}
          classes={classes}
        />
      )}
      {activeTab === "Combat" && (
        <CharCombat char={char} items={items} gears={gears} classes={classes} />
      )}
      {activeTab === "Classes" && (
        <View>
          <PropWrapper>
            {classes &&
              classes.map((classe: Class, index: number) => {
                return (
                  <SmallText key={index}>
                    <PropTitle>{classe.name} Proficiencies:</PropTitle>
                    <FormatedText text={classe.proficiencies} />
                  </SmallText>
                );
              })}
          </PropWrapper>
          <PropWrapper>
            {classesFeatures &&
              classesFeatures
                .sort((f1, f2) => f1.level - f2.level)
                .map((featureSet: FeatureSet) => {
                  return featureSet.features.map(
                    (feature: Feature, index: number) => {
                      return (
                        <Text key={index}>
                          <PropTitle>{feature.name}:</PropTitle>
                          <FormatedText text={feature.text} />
                        </Text>
                      );
                    }
                  );
                })}
          </PropWrapper>
        </View>
      )}
      {activeTab === "Race" && (
        <View>
          <PropWrapper>
            {raceFeatures &&
              raceFeatures
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
      {activeTab === "Spells" && (
        <MinView>
          <PropWrapper>
            <Prop>
              <PropTitle>Casting Hit:</PropTitle>
              {char.castingHit}
            </Prop>
            <Prop>
              <PropTitle>Casting Dc:</PropTitle>
              {char.castingDC}
            </Prop>
            {char.spellSlots.map(
              (
                classSlots: {
                  origin: string;
                  slots: number[];
                  max: number[];
                },
                index: number
              ) => {
                return (
                  <SmallNumberArrayField
                    key={index}
                    values={classSlots.slots}
                    max={classSlots.max}
                    label={classSlots.origin}
                    onChange={(slots) => onSpellslotChange(classSlots, slots)}
                  />
                );
              }
            )}
          </PropWrapper>
          <PropWrapper>
            {spells &&
              spells.map((spell, index: number) => {
                return <SpellTile key={index} spell={spell} />;
              })}
          </PropWrapper>
        </MinView>
      )}
      {activeTab === "Items" && (
        <View>
          <PropWrapper>
            {items &&
              items.map((item, index: number) => {
                return <ItemTile key={index} item={item} />;
              })}
            {gears &&
              gears.map((gear, index: number) => {
                return <GearTile key={index} gear={gear} />;
              })}
          </PropWrapper>
        </View>
      )}
      {activeTab === "Monster" && (
        <View>
          <PropWrapper>
            {monsters &&
              monsters.map((monster, index: number) => {
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
              <FormatedText text={char.spellNotes} />
            </Text>
          </PropWrapper>
        </View>
      )}
    </CenterWrapper>
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

const MinView = styled(View)`
  max-width: max-content;
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
  max-width: max-content;
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
