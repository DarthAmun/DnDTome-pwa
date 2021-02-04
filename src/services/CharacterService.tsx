import BuildChar from "../data/chars/BuildChar";
import Char from "../data/chars/Char";
import Class from "../data/classes/Class";
import FeatureSet from "../data/classes/FeatureSet";
import Subclass from "../data/classes/Subclass";
import Gear from "../data/Gear";
import Item from "../data/Item";
import Modifier, { ModifierOperator } from "../data/Modifier";
import Monster from "../data/Monster";
import Race from "../data/races/Race";
import Subrace from "../data/races/Subrace";
import Trait from "../data/races/Trait";
import Spell from "../data/Spell";
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
    if (classe !== undefined) {
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
    }
  });
  if (race !== undefined) {
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
  }
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
    modifiers = modifiers.concat(
      extractModifier(item.item.description, "Magic Item: " + item.origin)
    );
  });
  raceFeatures.forEach((trait) => {
    modifiers = modifiers.concat(extractModifier(trait.text, "Race Feature: " + trait.name));
  });
  classFeatures.forEach((featureSet) => {
    featureSet.features.forEach((feature) => {
      modifiers = modifiers.concat(extractModifier(feature.text, "Class Feature: " + feature.name));
    });
  });
  console.timeEnd("modifier");

  items = items.filter((item) => item !== undefined);
  gears = gears.filter((gear) => gear !== undefined);
  spells = spells.filter((spell) => spell !== undefined);
  monsters = monsters.filter((monster) => monster !== undefined);

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

const extractTarget = (target: string): string | string[] => {
  if (target.includes(".")) {
    return target.split(".");
  }
  return target;
};

const extractModifier = (text: string, origin: string): Modifier[] => {
  let newModifiers: Modifier[] = [];

  while (text.includes("{{")) {
    const cutStart = text.indexOf("{{");
    const cutEnd = text.indexOf("}}");
    const rawModifier = text.substring(cutStart + 2, cutEnd);
    text = cut(text, cutStart, cutEnd + 1);

    if (rawModifier.includes("=")) {
      const split = rawModifier.split("=");

      newModifiers.push(
        new Modifier(
          extractTarget(split[0]),
          ModifierOperator.EQUAL,
          split[1].includes('"') ? split[1] : parseInt(split[1]),
          origin
        )
      );
    } else if (rawModifier.includes("+")) {
      const split = rawModifier.split("+");
      newModifiers.push(
        new Modifier(
          extractTarget(split[0]),
          ModifierOperator.ADD,
          split[1].includes('"') ? split[1] : parseInt(split[1]),
          origin
        )
      );
    } else if (rawModifier.includes("-")) {
      const split = rawModifier.split("-");
      newModifiers.push(
        new Modifier(
          extractTarget(split[0]),
          ModifierOperator.SUBSTRACT,
          split[1].includes('"') ? split[1] : parseInt(split[1]),
          origin
        )
      );
    }
  }
  return newModifiers;
};

export const applyMods = async (char: BuildChar, modifiers: boolean): Promise<BuildChar> => {
  if (modifiers) {
    let newChar = char;
    let modPromises: Promise<boolean>[] = [];
    char.modifiers.forEach((mod: Modifier) => {
      if (typeof mod.target == "string") {
        const target: string = mod.target;
        if (mod.operator === ModifierOperator.EQUAL) {
          modPromises.push(
            new Promise((resolve, reject) => {
              newChar = {
                ...newChar,
                character: {
                  ...newChar.character,
                  [target]: replacePlaceholder(char, mod.value),
                },
              };
              resolve(true);
            })
          );
        } else if (mod.operator === ModifierOperator.ADD && typeof mod.value == "string") {
          modPromises.push(
            new Promise((resolve, reject) => {
              newChar = {
                ...newChar,
                character: {
                  ...newChar.character,
                  [target]: char.character[target] + mod.value,
                },
              };
              resolve(true);
            })
          );
        } else if (mod.operator === ModifierOperator.ADD && typeof mod.value == "number") {
          const value: number = mod.value;
          modPromises.push(
            new Promise((resolve, reject) => {
              newChar = {
                ...newChar,
                character: {
                  ...newChar.character,
                  [target]: (char.character[target] as number) + value,
                },
              };
              resolve(true);
            })
          );
        } else if (mod.operator === ModifierOperator.SUBSTRACT && typeof mod.value == "number") {
          const value: number = mod.value;
          modPromises.push(
            new Promise((resolve, reject) => {
              newChar = {
                ...newChar,
                character: {
                  ...newChar.character,
                  [target]: (char.character[target] as number) - value,
                },
              };
              resolve(true);
            })
          );
        }
      } else if (Array.isArray(mod.target)) {
        if (mod.target[1] === "add" && typeof mod.value == "string") {
          const value: string = mod.value;
          modPromises.push(
            new Promise((resolve, reject) => {
              recivePromiseByAttribute(mod.target[0], "name", value.replaceAll('"', "")).then(
                (entity) => {
                  newChar = { ...newChar, [mod.target[0]]: [...newChar[mod.target[0]], entity] };
                  resolve(true);
                }
              );
            })
          );
        } else if (mod.operator === ModifierOperator.EQUAL) {
          modPromises.push(
            new Promise((resolve, reject) => {
              newChar = {
                ...newChar,
                character: {
                  ...newChar.character,
                  [mod.target[0]]: {
                    ...newChar.character[mod.target[0]],
                    [mod.target[1]]: replacePlaceholder(char, mod.value),
                  },
                },
              };
              resolve(true);
            })
          );
        } else if (mod.operator === ModifierOperator.ADD && typeof mod.value == "string") {
          modPromises.push(
            new Promise((resolve, reject) => {
              newChar = {
                ...newChar,
                character: {
                  ...newChar.character,
                  [mod.target[0]]: {
                    ...newChar.character[mod.target[0]],
                    [mod.target[1]]: char.character[mod.target[0]][mod.target[1]] + mod.value,
                  },
                },
              };
              resolve(true);
            })
          );
        } else if (mod.operator === ModifierOperator.ADD && typeof mod.value == "number") {
          const value: number = mod.value;
          modPromises.push(
            new Promise((resolve, reject) => {
              newChar = {
                ...newChar,
                character: {
                  ...newChar.character,
                  [mod.target[0]]: {
                    ...newChar.character[mod.target[0]],
                    [mod.target[1]]:
                      (char.character[mod.target[0]][mod.target[1]] as number) + value,
                  },
                },
              };
              resolve(true);
            })
          );
        } else if (mod.operator === ModifierOperator.SUBSTRACT && typeof mod.value == "number") {
          const value: number = mod.value;
          modPromises.push(
            new Promise((resolve, reject) => {
              newChar = {
                ...newChar,
                character: {
                  ...newChar.character,
                  [mod.target[0]]: {
                    ...newChar.character[mod.target[0]],
                    [mod.target[1]]:
                      (char.character[mod.target[0]][mod.target[1]] as number) - value,
                  },
                },
              };
              resolve(true);
            })
          );
        }
      }
    });
    await Promise.all(modPromises);
    console.log(newChar);
    return newChar;
  } else {
    return { ...char, character: char.oldCharacter };
  }
};

export const replacePlaceholder = (char: BuildChar, text: string | number) => {
  if (typeof text == "string" && text.includes("[") && text.includes("]")) {
    text = text.replaceAll('"', "");
    while (text.includes("[") && text.includes("]")) {
      const cutStart = text.indexOf("[");
      const cutEnd = text.indexOf("]");
      const rawPlaceholder = text.substring(cutStart + 1, cutEnd);
      text = text.replace(text.substring(cutStart, cutEnd + 1), char.oldCharacter[rawPlaceholder]);
    }
    // eslint-disable-next-line
    return Math.floor(eval(text));
  }
  return text;
};
