import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  reciveAllFiltered,
  reciveByAttribute,
} from "../../../../Database/DbService";
import Char from "../../../../Data/Chars/Char";
import Class from "../../../../Data/Classes/Class";
import Subclass from "../../../../Data/Classes/Subclass";
import Feature from "../../../../Data/Classes/Feature";
import FeatureSet from "../../../../Data/Classes/FeatureSet";
import Race from "../../../../Data/Races/Race";
import Subrace from "../../../../Data/Races/Subrace";
import Trait from "../../../../Data/Races/Trait";
import SpellTile from "../../Spells/SpellTile";
import Spell, { isSpell } from "../../../../Data/Spell";
import Item, { isItem } from "../../../../Data/Item";
import Gear, { isGear } from "../../../../Data/Gear";

import TabBar from "../../../GeneralElements/TabBar";
import CharGeneral from "./DetailComponents/CharGeneral";
import CharHeader from "./DetailComponents/CharHeader";
import NumberArrayField from "../../../FormElements/NumberArrayField";
import ItemTile from "../../Item/ItemTile";
import GearTile from "../../Gear/GearTile";

interface $Props {
  char: Char;
}

const CharView = ({ char }: $Props) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [subclasses, setSubclasses] = useState<Subclass[]>([]);
  const [classesFeatures, setClassesFeatures] = useState<FeatureSet[]>([]);

  const [race, setRace] = useState<Race>();
  const [subrace, setSubrace] = useState<Subrace>();
  const [raceFeatures, setRaceFeatures] = useState<Trait[]>([]);

  const [spells, setSpells] = useState<Spell[]>([]);
  const [spellSlots, setSpellSlots] = useState<
    { name: string; slots: number[] }[]
  >([]);

  const [gears, setGears] = useState<Gear[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [activeTab, setTab] = useState<string>("General");
  let history = useHistory();

  useEffect(() => {
    reciveAllFiltered(
      "classes",
      char.classes.map((classe) => {
        return { fieldName: "name", value: classe.classe };
      }),
      (results: any[]) => {
        setClasses(results);
        results.forEach((classe) => {
          let classLevel = 0;
          char.classes.forEach((charClass) => {
            if (classe.name === charClass.classe) {
              classLevel = charClass.level;
            }
          });
          classe.featureSets.forEach((featureSet: FeatureSet) => {
            if (featureSet.level <= classLevel) {
              setClassesFeatures((c) => [...c, featureSet]);
            }
            if (
              featureSet.level === classLevel &&
              featureSet.spellslots !== undefined &&
              featureSet.spellslots.length > 0
            ) {
              const slots = featureSet.spellslots;
              setSpellSlots((s) => [
                ...s,
                {
                  name: classe.name,
                  slots: slots,
                },
              ]);
            }
          });
        });
      }
    );
    reciveAllFiltered(
      "subclasses",
      char.classes.map((classe) => {
        return { fieldName: "name", value: classe.subclasse };
      }),
      (results: any[]) => {
        setSubclasses(results);
        results.forEach((subclass) => {
          let subclassLevel = 0;
          char.classes.forEach((charClass) => {
            if (subclass.name === charClass.subclasse) {
              subclassLevel = charClass.level;
            }
          });
          subclass.features.forEach((featureSet: FeatureSet) => {
            if (featureSet.level <= subclassLevel) {
              setClassesFeatures((c) => [...c, featureSet]);
            }
            if (
              featureSet.level === subclassLevel &&
              featureSet.spellslots !== undefined &&
              featureSet.spellslots.length > 0
            ) {
              const slots = featureSet.spellslots;
              setSpellSlots((s) => [
                ...s,
                {
                  name: subclass.name,
                  slots: slots,
                },
              ]);
            }
          });
        });
      }
    );
    reciveAllFiltered(
      "races",
      [{ fieldName: "name", value: char.race.race }],
      (results: any) => {
        setRace(results[0]);
        results[0].traits.forEach((trait: Trait) => {
          if (trait.level <= char.level) {
            setRaceFeatures((c) => [...c, trait]);
          }
        });
      }
    );
    reciveAllFiltered(
      "subraces",
      [{ fieldName: "name", value: char.race.subrace }],
      (results: any) => {
        setRace(results[0]);
        results[0].traits.forEach((trait: Trait) => {
          if (trait.level <= char.level) {
            setRaceFeatures((c) => [...c, trait]);
          }
        });
      }
    );
    char.spells.forEach((spell) => {
      reciveByAttribute("spells", "name", spell, (result) => {
        if (result && isSpell(result)) {
          setSpells((s) => [...s, result]);
        }
      });
    });

    char.items.forEach((item) => {
      reciveByAttribute("items", "name", item, (result) => {
        if (result && isItem(result)) {
          setItems((s) => [...s, result]);
        }
      });
    });
    char.items.forEach((item) => {
      reciveByAttribute("gears", "name", item, (result) => {
        if (result && isGear(result)) {
          setGears((s) => [...s, result]);
        }
      });
    });
  }, [char]);

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

  const onSpellslotChange = (
    oldSlots: { name: string; slots: number[] },
    value: number[]
  ) => {
    let features = spellSlots.map(
      (slots: { name: string; slots: number[] }) => {
        if (slots === oldSlots) {
          return { name: oldSlots.name, slots: value };
        } else {
          return slots;
        }
      }
    );
    setSpellSlots(features);
  };

  return (
    <>
      <CenterWrapper>
        <CharHeader char={char} />
        <TabBar
          children={["General", "Race", "Classes", "Spells", "Items"]}
          onChange={(tab: string) => setTab(tab)}
        />
        {activeTab === "General" && (
          <CharGeneral char={char} classes={classes} />
        )}
        {activeTab === "Classes" && (
          <View>
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
                            {formatText(feature.text)}
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
                        <TraitText>{formatText(trait.text)}</TraitText>
                      </TraitWrapper>
                    );
                  })}
            </PropWrapper>
          </View>
        )}
        {activeTab === "Spells" && (
          <View>
            <PropWrapper>
              {spellSlots.map((classSlots) => {
                return (
                  <NumberArrayField
                    values={classSlots.slots}
                    max={classSlots.slots}
                    label={classSlots.name}
                    onChange={(slots) => onSpellslotChange(classSlots, slots)}
                  />
                );
              })}
            </PropWrapper>
            <PropWrapper>
              {spells &&
                spells.map((spell, index: number) => {
                  return <SpellTile key={index} spell={spell}></SpellTile>;
                })}
            </PropWrapper>
          </View>
        )}
        {activeTab === "Items" && (
          <View>
            <PropWrapper>
              {items &&
                items.map((item, index: number) => {
                  return <ItemTile key={index} item={item}></ItemTile>;
                })}
              {gears &&
                gears.map((gear, index: number) => {
                  return <GearTile key={index} gear={gear}></GearTile>;
                })}
            </PropWrapper>
          </View>
        )}
      </CenterWrapper>
    </>
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

const TextPart = styled.span`
  white-space: pre-line;
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

const SubcharLink = styled(Link)`
  font-size: 16px;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
`;
