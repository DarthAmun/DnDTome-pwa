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
import Item, { isItem } from "../../../../Data/Item";
import Gear, { isGear } from "../../../../Data/Gear";
import Monster, { isMonster } from "../../../../Data/Monster";

import TabBar from "../../../GeneralElements/TabBar";
import CharGeneral from "./DetailComponents/CharGeneral";
import CharHeader from "./DetailComponents/CharHeader";
import ItemTile from "../../Item/ItemTile";
import GearTile from "../../Gear/GearTile";
import CharCombat from "./DetailComponents/CharCombat";
import MonsterTile from "../../Monster/MonsterTile";
import FormatedText from "../../../GeneralElements/FormatedText";
import CharSpell from "./DetailComponents/CharSpells";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../../../FormElements/TextButton";
import P2PSender from "../../../P2P/P2PSender";

interface $Props {
  character: Char;
}

const CharView = ({ character }: $Props) => {
  const [send, setSend] = useState<boolean>(false);
  const [char, setChar] = useState<Char>(character);

  const [classes, setClasses] = useState<Class[]>([]);
  // const [subclasses, setSubclasses] = useState<Subclass[]>([]);
  const [classesFeatures, setClassesFeatures] = useState<FeatureSet[]>([]);

  // const [race, setRace] = useState<Race>();
  // const [subrace, setSubrace] = useState<Subrace>();
  const [raceFeatures, setRaceFeatures] = useState<Trait[]>([]);

  const [gears, setGears] = useState<
    {
      gear: Gear;
      origin: string;
      attuned: boolean;
      prof: boolean;
      attribute: string;
    }[]
  >([]);
  const [items, setItems] = useState<
    {
      item: Item;
      origin: string;
      attuned: boolean;
      prof: boolean;
      attribute: string;
    }[]
  >([]);
  const [monsters, setMonsters] = useState<Monster[]>([]);

  const [activeTab, setTab] = useState<string>("General");
  const [tabs, setTabs] = useState<string[]>([
    "General",
    "Combat",
    "Race",
    "Classes",
    "Notes",
  ]);

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
          sort: 0,
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
          sort: 0,
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
      [{ fieldName: "name", value: character.race.race, sort: 0 }],
      (results: any[]) => {
        // setRace(results[0]);
        if (results.length > 0) {
          results[0].traits.forEach((trait: Trait) => {
            if (trait.level <= calcLevel()) {
              setRaceFeatures((c) => [...c, trait]);
            }
          });
        }
      }
    );
  }, [character, calcLevel]);

  useEffect(() => {
    reciveAllFiltered(
      "subraces",
      [{ fieldName: "name", value: character.race.subrace, sort: 0 }],
      (results: any[]) => {
        // setRace(results[0]);
        if (results.length > 0) {
          results[0].traits.forEach((trait: Trait) => {
            if (trait.level <= calcLevel()) {
              setRaceFeatures((c) => [...c, trait]);
            }
          });
        }
      }
    );
  }, [character, calcLevel]);

  useEffect(() => {
    character.items.forEach(
      (item: {
        origin: string;
        attuned: boolean;
        prof: boolean;
        attribute: string;
      }) => {
        reciveByAttribute("items", "name", item.origin, (result) => {
          if (result && isItem(result)) {
            setItems((s) => [...s, { ...item, item: result }]);
          }
        });
      }
    );
  }, [character]);

  useEffect(() => {
    character.items.forEach(
      (item: {
        origin: string;
        attuned: boolean;
        prof: boolean;
        attribute: string;
      }) => {
        reciveByAttribute("gears", "name", item.origin, (result) => {
          if (result && isGear(result)) {
            setGears((s) => [...s, { ...item, gear: result }]);
          }
        });
      }
    );
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
  }, [character, tabs]);
  useEffect(() => {
    if (!tabs.includes("Items") && character.items.length > 0)
      setTabs((t) => [...t, "Items"]);
  }, [character, tabs]);
  useEffect(() => {
    if (!tabs.includes("Spells") && character.spells.length > 0)
      setTabs((t) => [...t, "Spells"]);
  }, [character, tabs]);

  const saveChar = (char: Char) => {
    setChar(char);
    update("chars", char);
  };

  return (
    <CenterWrapper>
      <CharHeader char={char} />
      <TabBar children={tabs} onChange={(tab: string) => setTab(tab)} />
      {activeTab === "General" && (
        <CharGeneral char={char} onChange={saveChar} classes={classes} />
      )}
      {activeTab === "Combat" && (
        <CharCombat
          char={char}
          items={items}
          gears={gears}
          classes={classes}
          classesFeatures={classesFeatures}
        />
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
      {activeTab === "Spells" && <CharSpell char={char} saveChar={saveChar} />}
      {activeTab === "Items" && (
        <View>
          <PropWrapper>
            {items &&
              items.map((item, index: number) => {
                return <ItemTile key={index} item={item.item} />;
              })}
            {gears &&
              gears.map((gear, index: number) => {
                return <GearTile key={index} gear={gear.gear} />;
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
      <View>
        <PropWrapper>
          {!send && (
            <TextButton
              text={`Send ${char.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={char} mode={"THIS"} />}
        </PropWrapper>
      </View>
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

const PropWrapper = styled.div`
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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
