import Char from "../Data/Chars/Char";
import Class from "../Data/Classes/Class";
import FeatureSet from "../Data/Classes/FeatureSet";
import Subclass from "../Data/Classes/Subclass";
import Gear from "../Data/Gear";
import Item from "../Data/Item";
import Monster from "../Data/Monster";
import Race from "../Data/Races/Race";
import Subrace from "../Data/Races/Subrace";
import Trait from "../Data/Races/Trait";
import { recivePromiseByAttribute } from "./DatabaseService";

const calcLevel = (char: Char) => {
  let level = 0;
  char.classes.forEach((classe) => {
    level += classe.level;
  });
  return level;
};

export const buildCharacter = async (character: Char) => {
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
  let monsters: Monster[] = [];

  let classList: Promise<Class>[] = [];
  let subclassList: Promise<Subclass>[] = [];
  character.classes.forEach((classe) => {
    classList.push(recivePromiseByAttribute("classes", "name", classe.classe));
    subclassList.push(
      recivePromiseByAttribute("subclasses", "name", classe.subclasse)
    );
  });
  classes = await Promise.all(classList);
  subclasses = await Promise.all(subclassList);
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
    subclasses.forEach((subclass: Subclass) => {
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

  race = await recivePromiseByAttribute("races", "name", character.race.race);
  subrace = await recivePromiseByAttribute(
    "subraces",
    "name",
    character.race.subrace
  );
  race.traits.forEach((trait: Trait) => {
    if (trait !== undefined)
      if (trait.level <= level) {
        raceFeatures.push(trait);
      }
  });
  subrace.traits.forEach((trait: Trait) => {
    if (trait !== undefined)
      if (trait.level <= level) {
        raceFeatures.push(trait);
      }
  });

  let itemList: Promise<Item>[] = [];
  let gearList: Promise<Gear>[] = [];
  character.items.forEach((item) => {
    itemList.push(recivePromiseByAttribute("items", "name", item.origin));
    gearList.push(recivePromiseByAttribute("gears", "name", item.origin));
  });
  let currentItems = await Promise.all(itemList);
  let currentGears = await Promise.all(gearList);

  let baseList: Promise<Gear>[] = [];
  currentItems.forEach((item) => {
    if (item !== undefined)
      baseList.push(recivePromiseByAttribute("gears", "name", item.base));
  });
  let currentBases = await Promise.all(baseList);

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

  let monsterList: Promise<Monster>[] = [];
  character.monsters.forEach((monster: string) => {
    monsterList.push(recivePromiseByAttribute("monsters", "name", monster));
  });
  monsters = await Promise.all(monsterList);

  console.timeEnd("t");
  return {
    character: character,
    level: level,
    prof: prof,
    classes: classes,
    subclasses: subclasses,
    classFeatures: classFeatures,
    race: race,
    subrace: subrace,
    raceFeatures: raceFeatures,
    gears: gears,
    items: items,
    monsters: monsters,
  };
};
