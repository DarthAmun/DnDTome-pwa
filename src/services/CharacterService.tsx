import BuildChar from "../data/chars/BuildChar";
import Char from "../data/chars/Char";
import ClassSet from "../data/chars/ClassSet";
import Boni from "../data/classes/Boni";
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

export const recalcClasses = async (char: Char) => {
  let bonis: { origin: string; value: number; max: number }[] = [];
  let spellSlots: {
    origin: string;
    slots: number[];
    max: number[];
  }[] = [];
  let fullClassList: { class: Class; classSet: ClassSet }[] = [];
  let classList: Promise<Class>[] = [];

  char.classes.forEach((classe) => {
    classList.push(recivePromiseByAttribute("classes", "name", classe.classe));
  });
  const results = await Promise.all(classList);
  results.forEach((classe: Class) => {
    char.classes.forEach((classSet) => {
      if (classe.name === classSet.classe) {
        fullClassList.push({ class: classe, classSet: classSet });
      }
    });
  });

  fullClassList.forEach((classe: { class: Class; classSet: ClassSet }) => {
    let featureSet = classe.class.featureSets[classe.classSet.level - 1];
    if (featureSet.bonis) {
      featureSet.bonis.forEach((boni: Boni) => {
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
      let updatedOldBonis = char.currencyBonis.map((old) => {
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
    let updatedSpellSlots = spellSlots.map((newSpellSlots) => {
      let updatedOldSlots = char.spellSlots.map((old) => {
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
  return updatedChar;
};

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
        if (item !== undefined) {
          if (originItem.origin.toLowerCase() === item.name.toLowerCase()) {
            if (item.base !== "") {
              currentBases.forEach((base: Gear) => {
                if (base !== undefined && base.name.toLowerCase() === item.base.toLowerCase()) {
                  items.push({ ...originItem, item: item, base: base });
                }
              });
            } else {
              items.push({ ...originItem, item: item, base: undefined });
            }
          }
        }
      });
      currentGears.forEach((gear: Gear) => {
        if (gear !== undefined)
          if (originItem.origin.toLowerCase() === gear.name.toLowerCase()) {
            gears.push({ ...originItem, gear: gear });
          }
      });
    }
  });
  console.timeEnd("load");

  console.time("modifier");
  let modifiers: Modifier[] = [];
  gears.forEach((gear) => {
    modifiers = modifiers.concat(extractModifier(gear.gear.description, "Gear: " + gear.origin));
  });
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
    char.modifiers
      .sort((a, b) => a.operator - b.operator)
      .forEach((mod: Modifier) => {
        if (typeof mod.target == "string") {
          const target: string = mod.target;
          if (mod.operator === ModifierOperator.EQUAL) {
            newChar = {
              ...newChar,
              character: {
                ...newChar.character,
                [target]: replacePlaceholder(newChar, mod.value),
              },
            };
          } else if (mod.operator === ModifierOperator.ADD && typeof mod.value == "string") {
            newChar = {
              ...newChar,
              character: {
                ...newChar.character,
                [target]: newChar.character[target] + mod.value,
              },
            };
          } else if (mod.operator === ModifierOperator.ADD && typeof mod.value == "number") {
            const value: number = mod.value;
            newChar = {
              ...newChar,
              character: {
                ...newChar.character,
                [target]: (newChar.character[target] as number) + value,
              },
            };
          } else if (mod.operator === ModifierOperator.SUBSTRACT && typeof mod.value == "number") {
            const value: number = mod.value;
            newChar = {
              ...newChar,
              character: {
                ...newChar.character,
                [target]: (newChar.character[target] as number) - value,
              },
            };
          }
        } else if (Array.isArray(mod.target) && mod.target[1] !== "add") {
          if (mod.operator === ModifierOperator.EQUAL) {
            newChar = {
              ...newChar,
              character: {
                ...newChar.character,
                [mod.target[0]]: {
                  ...newChar.character[mod.target[0]],
                  [mod.target[1]]: replacePlaceholder(newChar, mod.value),
                },
              },
            };
          } else if (mod.operator === ModifierOperator.ADD && typeof mod.value == "string") {
            newChar = {
              ...newChar,
              character: {
                ...newChar.character,
                [mod.target[0]]: {
                  ...newChar.character[mod.target[0]],
                  [mod.target[1]]: newChar.character[mod.target[0]][mod.target[1]] + mod.value,
                },
              },
            };
          } else if (mod.operator === ModifierOperator.ADD && typeof mod.value == "number") {
            const value: number = mod.value;
            newChar = {
              ...newChar,
              character: {
                ...newChar.character,
                [mod.target[0]]: {
                  ...newChar.character[mod.target[0]],
                  [mod.target[1]]:
                    (newChar.character[mod.target[0]][mod.target[1]] as number) + value,
                },
              },
            };
          } else if (mod.operator === ModifierOperator.SUBSTRACT && typeof mod.value == "number") {
            const value: number = mod.value;
            newChar = {
              ...newChar,
              character: {
                ...newChar.character,
                [mod.target[0]]: {
                  ...newChar.character[mod.target[0]],
                  [mod.target[1]]:
                    (newChar.character[mod.target[0]][mod.target[1]] as number) - value,
                },
              },
            };
          }
        }
      });

    let modPromises: Promise<boolean>[] = [];
    char.modifiers
      .sort((a, b) => a.operator - b.operator)
      .forEach((mod: Modifier) => {
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
        }
      });
    await Promise.all(modPromises);
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
      text = text.replace(text.substring(cutStart, cutEnd + 1), char.character[rawPlaceholder]);
    }
    // eslint-disable-next-line
    return Math.floor(eval(text));
  }
  return text;
};
