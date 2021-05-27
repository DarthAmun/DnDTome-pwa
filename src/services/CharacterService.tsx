import Background from "../data/Background";
import BuildChar from "../data/chars/BuildChar";
import Char from "../data/chars/Char";
import ClassSet from "../data/chars/ClassSet";
import Boni from "../data/classes/Boni";
import Class from "../data/classes/Class";
import FeatureSet from "../data/classes/FeatureSet";
import Subclass from "../data/classes/Subclass";
import Feat from "../data/Feat";
import Gear from "../data/Gear";
import Item from "../data/Item";
import Modifier, { ModifierOperator } from "../data/Modifier";
import Monster from "../data/Monster";
import Race from "../data/races/Race";
import Subrace from "../data/races/Subrace";
import Trait from "../data/races/Trait";
import Spell from "../data/Spell";
import { recivePromiseByAttribute, recivePromiseByMultiAttribute } from "./DatabaseService";

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
    let [name, sources] = classe.classe.split("|");
    classList.push(recivePromiseByMultiAttribute("classes", { name: name, sources: sources }));
  });
  const results = await Promise.all(classList);
  results.forEach((classe: Class) => {
    char.classes.forEach((classSet) => {
      if (classe.name === classSet.classe.split("|")[0]) {
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

export const calcLevel = (char: Char): number => {
  let level = 0;
  char.classes.forEach((classe) => {
    level += classe.level;
  });
  return level;
};

export const calcProf = (char: Char): number => {
  let level = calcLevel(char);
  return Math.ceil(level / 4) + 1;
};

export const buildCharacter = async (character: Char): Promise<BuildChar> => {
  console.time("build Character");
  let level: number = calcLevel(character);
  let prof: number = calcProf(character);
  let classes: Class[] = [];
  let subclasses: Subclass[] = [];
  let classFeatures: FeatureSet[] = [];
  let race: Race;
  let subrace: Subrace;
  let raceFeatures: Trait[] = [];
  let feats: Feat[] = [];
  let background: Background;
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
  let featList: Promise<Feat>[] = [];

  character.classes.forEach((classe) => {
    let [name, sources] = classe.classe.split("|");
    classList.push(recivePromiseByMultiAttribute("classes", { name: name, sources: sources }));
    [name, sources] = classe.subclasse.split("|");
    subclassList.push(
      recivePromiseByMultiAttribute("subclasses", { name: name, sources: sources })
    );
  });
  character.items.forEach((item) => {
    let [name, sources] = item.origin.split("|");
    itemList.push(recivePromiseByMultiAttribute("items", { name: name, sources: sources }));
    gearList.push(recivePromiseByMultiAttribute("gears", { name: name, sources: sources }));
  });
  character.monsters.forEach((monster: string) => {
    let [name, sources] = monster.split("|");
    monsterList.push(recivePromiseByMultiAttribute("monsters", { name: name, sources: sources }));
  });
  character.spells.forEach((spell: string) => {
    let [name, sources] = spell.split("|");
    spellList.push(recivePromiseByMultiAttribute("spells", { name: name, sources: sources }));
  });
  character.abilityImprovs?.forEach((a) => {
    if (a.feat !== "") {
      let [name, sources] = a.feat.split("|");
      featList.push(recivePromiseByMultiAttribute("feats", { name: name, sources: sources }));
    }
  });

  let currentItems = await Promise.all(itemList);
  currentItems.forEach((item) => {
    if (item !== undefined) {
      let [name, sources] = item.base.split("|");
      if (sources !== undefined) {
        baseList.push(recivePromiseByMultiAttribute("gears", { name: name, sources: sources }));
      } else {
        baseList.push(recivePromiseByAttribute("gears", "name", name));
      }
    }
  });

  classes = await Promise.all(classList);
  subclasses = await Promise.all(subclassList);
  monsters = await Promise.all(monsterList);
  spells = await Promise.all(spellList);
  feats = await Promise.all(featList);
  let currentGears = await Promise.all(gearList);
  let currentBases = await Promise.all(baseList);

  currentBases = currentBases
    .filter((q) => q !== undefined)
    .filter((q, idx) => currentBases.findIndex((g) => g.name === q.name) === idx);

  let [name, sources] = character.race.race.split("|");
  race = await recivePromiseByMultiAttribute("races", { name: name, sources: sources });
  [name, sources] = character.race.subrace.split("|");
  subrace = await recivePromiseByMultiAttribute("subraces", { name: name, sources: sources });
  [name, sources] = character.background.split("|");
  background = await recivePromiseByMultiAttribute("backgrounds", { name: name, sources: sources });

  classes.forEach((classe: Class) => {
    if (classe !== undefined) {
      let classLevel = 0;
      character.classes.forEach((charClass) => {
        if (charClass !== undefined)
          if (classe.name === charClass.classe.split("|")[0]) {
            classLevel = charClass.level;
          }
      });
      classe.featureSets.forEach((featureSet: FeatureSet) => {
        if (featureSet !== undefined) {
          if (featureSet.level <= classLevel) {
            classFeatures.push(featureSet);
          }
        }
      });
      subclasses?.forEach((subclass: Subclass) => {
        if (subclass !== undefined)
          if (subclass.type.split("|")[0] === classe.name) {
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
      if (trait !== undefined) {
        if (trait.level <= level) {
          raceFeatures.push(trait);
        }
      }
    });
    subrace?.traits.forEach((trait: Trait) => {
      if (trait !== undefined) {
        if (trait.level <= level) {
          raceFeatures.push(trait);
        }
      }
    });
  }
  character.items.forEach((originItem) => {
    if (originItem !== undefined) {
      currentItems.forEach(async (item: Item) => {
        if (item !== undefined) {
          if (
            originItem.origin.toLowerCase() ===
            item.name.toLowerCase() + "|" + item.sources.toLowerCase()
          ) {
            if (item.base !== "") {
              currentBases.forEach((base: Gear) => {
                if (base !== undefined) {
                  let [name, sources] = item.base.split("|");
                  if (
                    (sources !== undefined &&
                      base.name.toLowerCase() + "|" + base.sources.toLowerCase() ===
                        name.toLowerCase()) ||
                    (sources === undefined && base.name.toLowerCase() === name.toLowerCase())
                  ) {
                    items.push({ ...originItem, item: item, base: base });
                  }
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
          if (
            originItem.origin.toLowerCase() ===
            gear.name.toLowerCase() + "|" + gear.sources.toLowerCase()
          ) {
            gears.push({ ...originItem, gear: gear });
          }
      });
    }
  });
  console.timeEnd("load");

  items = items.filter((item) => item !== undefined);
  gears = gears.filter((gear) => gear !== undefined);
  spells = spells.filter((spell) => spell !== undefined);
  monsters = monsters.filter((monster) => monster !== undefined);
  feats = feats.filter((feat) => feat !== undefined);

  console.time("modifier");
  let modifiers: Modifier[] = [];
  gears?.forEach((gear) => {
    modifiers = modifiers.concat(extractModifier(gear.gear.description, "Gear: " + gear.origin));
  });
  items?.forEach((item) => {
    modifiers = modifiers.concat(
      extractModifier(item.item.description, "Magic Item: " + item.origin)
    );
  });
  raceFeatures?.forEach((trait) => {
    modifiers = modifiers.concat(extractModifier(trait.text, "Race Feature: " + trait.name));
  });
  classFeatures?.forEach((featureSet) => {
    featureSet.features.forEach((feature) => {
      modifiers = modifiers.concat(extractModifier(feature.text, "Class Feature: " + feature.name));
    });
  });
  character.abilityImprovs
    ?.filter((a) => a.level <= level)
    .forEach((a) => {
      if (a.feat === "") {
        modifiers = modifiers.concat(
          extractModifier(
            `{{${a.s1}+1}}{{${a.s2}+1}}`,
            "Ability improvement from " + a.origin + " on level " + a.level + ": "
          )
        );
      }
    });
  feats?.forEach((f) => {
    modifiers = modifiers.concat(extractModifier(f.description, "Feat: " + f.name));
  });
  if (background !== undefined) {
    modifiers = modifiers.concat(
      extractModifier(background.description, "Background: " + background.name)
    );
    modifiers = modifiers.concat(
      extractModifier(background.proficiencies, "Background: " + background.name)
    );
  }
  console.timeEnd("modifier");

  console.timeEnd("build Character");
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
    feats,
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
