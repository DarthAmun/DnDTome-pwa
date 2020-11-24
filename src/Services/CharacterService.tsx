import BuildChar from "../Data/Chars/BuildChar";
import Char from "../Data/Chars/Char";
import Class from "../Data/Classes/Class";
import FeatureSet from "../Data/Classes/FeatureSet";
import Subclass from "../Data/Classes/Subclass";
import Gear from "../Data/Gear";
import Item from "../Data/Item";
import Modifier, { ModifierOperator } from "../Data/Modifier";
import Monster from "../Data/Monster";
import Race from "../Data/Races/Race";
import Subrace from "../Data/Races/Subrace";
import Trait from "../Data/Races/Trait";
import Spell from "../Data/Spell";
import { recivePromiseByAttribute } from "./DatabaseService";

const calcLevel = (char: Char): number => {
  let level = 0;
  char.classes.forEach((classe) => {
    level += classe.level;
  });
  return level;
};

export const buildCharacter = async (character: Char): Promise<BuildChar> => {
  console.time("t");
  let level: number = calcLevel(character);
  let prof: number = 0;
  let classes: Class[] = [];
  let subclasses: Subclass[] = [];
  let classFeatures: FeatureSet[] = [];
  let race: Race;
  let subrace: Subrace;
  let raceFeatures: Trait[] = [];
  let gears: {
    gear: Gear;
    origin: string;
    attuned: boolean;
    prof: boolean;
    attribute: string;
  }[] = [];
  let items: {
    item: Item;
    base: Gear | undefined;
    origin: string;
    attuned: boolean;
    prof: boolean;
    attribute: string;
  }[] = [];
  let spells: Spell[];
  let monsters: Monster[] = [];

  console.time("load");
  let classList: Promise<Class>[] = [];
  let subclassList: Promise<Subclass>[] = [];
  let itemList: Promise<Item>[] = [];
  let gearList: Promise<Gear>[] = [];
  let baseList: Promise<Gear>[] = [];
  let monsterList: Promise<Monster>[] = [];
  let spellList: Promise<Spell>[] = [];

  character.classes.forEach((classe) => {
    classList.push(recivePromiseByAttribute("classes", "name", classe.classe));
    subclassList.push(recivePromiseByAttribute("subclasses", "name", classe.subclasse));
  });
  character.items.forEach((item) => {
    itemList.push(recivePromiseByAttribute("items", "name", item.origin));
    gearList.push(recivePromiseByAttribute("gears", "name", item.origin));
  });
  character.monsters.forEach((monster: string) => {
    monsterList.push(recivePromiseByAttribute("monsters", "name", monster));
  });
  character.spells.forEach((spell: string) => {
    spellList.push(recivePromiseByAttribute("spells", "name", spell));
  });

  let currentItems = await Promise.all(itemList);
  currentItems.forEach((item) => {
    if (item !== undefined) baseList.push(recivePromiseByAttribute("gears", "name", item.base));
  });

  classes = await Promise.all(classList);
  subclasses = await Promise.all(subclassList);
  monsters = await Promise.all(monsterList);
  spells = await Promise.all(spellList);
  let currentGears = await Promise.all(gearList);
  let currentBases = await Promise.all(baseList);
  race = await recivePromiseByAttribute("races", "name", character.race.race);
  subrace = await recivePromiseByAttribute("subraces", "name", character.race.subrace);

  classes.forEach((classe: Class) => {
    let classLevel = 0;
    character.classes.forEach((charClass) => {
      if (charClass !== undefined)
        if (classe.name === charClass.classe) {
          classLevel = charClass.level;
        }
    });
    classe.featureSets.forEach((featureSet: FeatureSet) => {
      if (featureSet !== undefined) {
        if (featureSet.level <= classLevel) {
          classFeatures.push(featureSet);
        }
        if (featureSet.level === level) {
          prof = featureSet.profBonus;
        }
      }
    });
    subclasses?.forEach((subclass: Subclass) => {
      if (subclass !== undefined)
        if (subclass.type === classe.name) {
          subclass.features.forEach((featureSet: FeatureSet) => {
            if (featureSet.level <= classLevel) {
              classFeatures.push(featureSet);
            }
          });
        }
    });
  });
  race.traits.forEach((trait: Trait) => {
    if (trait !== undefined)
      if (trait.level <= level) {
        raceFeatures.push(trait);
      }
  });
  subrace?.traits.forEach((trait: Trait) => {
    if (trait !== undefined)
      if (trait.level <= level) {
        raceFeatures.push(trait);
      }
  });
  character.items.forEach((originItem) => {
    if (originItem !== undefined) {
      currentItems.forEach(async (item: Item) => {
        if (item !== undefined)
          if (originItem.origin === item.name) {
            if (item.base !== "") {
              currentBases.forEach((base: Gear) => {
                if (base !== undefined && base.name === item.base) {
                  items.push({ ...originItem, item: item, base: base });
                }
              });
            } else {
              items.push({ ...originItem, item: item, base: undefined });
            }
          }
      });
      currentGears.forEach((gear: Gear) => {
        if (gear !== undefined)
          if (originItem.origin === gear.name) {
            gears.push({ ...originItem, gear: gear });
          }
      });
    }
  });
  console.timeEnd("load");

  console.time("modifier");
  let modifiers: Modifier[] = [];
  items.forEach((item) => {
    modifiers = modifiers.concat(extractModifier(item.item.description));
  });
  raceFeatures.forEach((trait) => {
    modifiers = modifiers.concat(extractModifier(trait.text));
  });
  classFeatures.forEach((featureSet) => {
    featureSet.features.forEach((feature) => {
      modifiers = modifiers.concat(extractModifier(feature.text));
    });
  });
  console.timeEnd("modifier");

  console.timeEnd("t");
  return new BuildChar(
    character,
    level,
    prof,
    classes,
    subclasses,
    classFeatures,
    race,
    subrace,
    raceFeatures,
    gears,
    items,
    spells,
    monsters,
    modifiers
  );
};

const cut = (str: string, cutStart: number, cutEnd: number) => {
  return str.substr(0, cutStart) + str.substr(cutEnd + 1);
};

const extractModifier = (text: string): Modifier[] => {
  let newModifiers: Modifier[] = [];

  while (text.includes("{{")) {
    const cutStart = text.indexOf("{{");
    const cutEnd = text.indexOf("}}");
    const rawModifier = text.substring(cutStart + 2, cutEnd);
    text = cut(text, cutStart, cutEnd + 1);

    if (rawModifier.includes("=")) {
      const split = rawModifier.split("=");
      newModifiers.push(new Modifier(split[0], ModifierOperator.EQUAL, split[1]));
    } else if (rawModifier.includes("+")) {
      const split = rawModifier.split("+");
      newModifiers.push(new Modifier(split[0], ModifierOperator.ADD, split[1]));
    } else if (rawModifier.includes("-")) {
      const split = rawModifier.split("-");
      newModifiers.push(new Modifier(split[0], ModifierOperator.SUBSTRACT, split[1]));
    }
  }

  return newModifiers;
};

export const applyMods = (char: BuildChar, modifiers: boolean): BuildChar => {
  if (modifiers) {
    let newChar = char;
    char.modifiers.forEach((mod: Modifier) => {
      if (mod.operator === ModifierOperator.EQUAL) {
        newChar = {
          ...char,
          character: { ...char.character, [mod.target]: replacePlaceholder(char, mod.value) },
        };
      } else if (mod.operator === ModifierOperator.ADD) {
        newChar = {
          ...char,
          character: { ...char.character, [mod.value]: char.character[mod.target] + mod.value },
        };
      } else if (mod.operator === ModifierOperator.SUBSTRACT && typeof mod.value == "number") {
        newChar = {
          ...char,
          character: { ...char.character, [mod.value]: char.character[mod.target] - mod.value },
        };
      }
    });
    return newChar;
  } else {
    return { ...char, character: char.oldCharacter };
  }
};

export const replacePlaceholder = (char: BuildChar, text: string | number) => {
  if (typeof text == "string" && text.includes("[") && text.includes("]")) {
    while (text.includes("[") && text.includes("]")) {
      const cutStart = text.indexOf("[");
      const cutEnd = text.indexOf("]");
      const rawPlaceholder = text.substring(cutStart + 1, cutEnd);
      text = text.replace(text.substring(cutStart, cutEnd + 1), char.oldCharacter[rawPlaceholder]);
    }
    return Math.floor(eval(text));
  }
  return text;
};
