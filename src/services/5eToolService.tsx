import Background from "../data/Background";
import Boni from "../data/classes/Boni";
import Class from "../data/classes/Class";
import Feature, { FeatureRest } from "../data/classes/Feature";
import FeatureSet from "../data/classes/FeatureSet";
import Subclass from "../data/classes/Subclass";
import Feat from "../data/Feat";
import Gear from "../data/Gear";
import Item from "../data/Item";
import Monster from "../data/Monster";
import Race from "../data/races/Race";
import Subrace from "../data/races/Subrace";
import Trait from "../data/races/Trait";
import Spell from "../data/Spell";

const replaceTag = (text: string) => {
  let clearText = text.replace("{@", "").replace("}", "").split("|")[0].trim();

  switch (true) {
    case clearText.startsWith("scaledamage"):
      let scaleTextSplit = text.replace("{@", "").replace("}", "").split("|");
      let scaleText = scaleTextSplit[scaleTextSplit.length - 1].trim();
      return scaleText;
    case clearText.startsWith("damage"):
      return "[[dice." + clearText.substring(6, clearText.length).trim() + "]]";
    case clearText.startsWith("dice"):
      return "[[dice.+" + clearText.substring(4, clearText.length).trim() + "]]";
    case clearText.startsWith("hit"):
      return "[[dice.+" + clearText.substring(3, clearText.length).trim() + "]]";
    case clearText.startsWith("recharge"):
      return "(Recharge " + clearText.substring(8, clearText.length).trim() + " [[dice.d6]])";
    case clearText.startsWith("item"):
      return "[[gear." + clearText.substring(4, clearText.length).trim() + "]]";
    case clearText.startsWith("spell"):
      return "[[spell." + clearText.substring(6, clearText.length).trim() + "]]";
    case clearText.startsWith("filter"):
      return "" + clearText.substring(6, clearText.length).trim();
    case clearText.startsWith("bold"):
      return "" + clearText.substring(4, clearText.length).trim();
    default:
      return clearText;
  }
};

const replaceTags = (text: string): string => {
  if (text) {
    text = text
      .replaceAll("{@atk mw", "Melee Weapon Attack: ")
      .replaceAll("{@atk ms", "Melee Spell Attack: ")
      .replaceAll("{@atk rs", "Ranged Spell Attack: ")
      .replaceAll("{@atk rw", "Ranged Weapon Attack: ")
      .replaceAll("{@dc", "DC")
      .replaceAll("[", "")
      .replaceAll("]", "")
      .replaceAll("{@h}", "Hit: ");

    let newText: string = text;
    while (newText.includes("{@")) {
      if (newText.includes("{@") && !newText.includes("}")) {
        newText = newText.replace("{@", "");
        break;
      }
      if (!newText.includes("{@") && newText.includes("}")) {
        newText = newText.replace("}", "");
        break;
      }

      let start = newText.indexOf("{@");
      let end = newText.indexOf("}");
      if (start > end) {
        newText = newText.replace("}", "");
      } else {
        newText =
          newText.substring(0, start) +
          replaceTag(newText.substring(start, end + 1)) +
          newText.substring(end + 1, newText.length);
      }
    }

    newText = newText
      .replaceAll("}", "")
      .replaceAll("{", "")
      .replaceAll(" + ", "+")
      .replaceAll("+ ", "+")
      .replaceAll(" +", "+");
    return newText.trim();
  }
  return "";
};

const parseGear = (obj: any, fileName: string) => {
  let text = "";
  let additional: string[] = [];
  if (obj.entries !== undefined) text = recursiveTextAdder(obj.entries, text, additional);
  const description = replaceTags(text);

  let type = "";
  if (obj.type !== undefined) {
    switch (obj.type) {
      case "A":
        type = "ammunition";
        break;
      case "AIR":
        type = "air vehicle";
        break;
      case "AT":
        type = "tools";
        break;
      case "EXP":
        type = "explosive";
        break;
      case "FD":
        type = "food";
        break;
      case "GS":
        type = "game set";
        break;
      case "HA":
        type = "heavy armor";
        break;
      case "INS":
        type = "instrument";
        break;
      case "LA":
        type = "light armor";
        break;
      case "M":
        type = "martial weapon";
        break;
      case "MA":
        type = "medium armor";
        break;
      case "MNT":
        type = "mount";
        break;
      case "R":
        type = "martial ranged weapon";
        break;
      case "S":
        type = "simple weapon";
        break;
      case "SCF":
        type = "spellcasting focus";
        break;
      case "SHP":
        type = "ship";
        break;
      case "TG":
        type = "trade good";
        break;
      case "VEH":
        type = "vehicle";
        break;
      default:
        type = "gear";
    }
  }

  let damage = "";
  if (obj.dmg1 !== undefined) {
    damage += obj.dmg1;
    if (obj.dmgType !== undefined) {
      switch (obj.dmgType) {
        case "S":
          damage += " slashing damage";
          break;
        case "P":
          damage += " piercing damage";
          break;
        case "B":
          damage += " bludgeoning damage";
          break;
        case "R":
          damage += " radiant damage";
      }
    }
  }

  let properties = "";
  if (obj.range !== undefined) {
    properties += "ranged (" + obj.range + "), ";
  }
  if (obj.property !== undefined) {
    obj.property.forEach((prop: string) => {
      switch (prop) {
        case "L":
          properties += "light, ";
          break;
        case "AF":
          properties += "radiant damage, ";
          break;
        case "RLD":
          properties += "loading, ";
          break;
        case "2H":
          properties += "two-handed, ";
          break;
        case "F":
          properties += "finesse, ";
          break;
        case "H":
          properties += "heavy, ";
          break;
        case "R":
          properties += "reach, ";
          break;
        case "T":
          properties += "thrown, ";
          break;
        case "V":
          properties += "versatile, ";
      }
    });
  }
  properties = properties.trim();

  let weight = obj.weight;
  if (typeof weight == "number") {
    weight = weight + "lbs";
  }

  let value = obj.value;
  if (typeof value == "number") {
    if (value / 100 > 1) {
      value = value / 100 + "gp";
    } else if (value / 10 > 1) {
      value = value / 10 + "sp";
    } else {
      value = value + "cp";
    }
  }

  let newGear = new Gear(
    0,
    obj.name,
    obj.source,
    description,
    "",
    "",
    value,
    damage,
    weight,
    properties,
    type,
    fileName
  );
  return newGear;
};

const parseItem = (obj: any, fileName: string) => {
  let text = "";
  let additional: string[] = [];
  if (obj.entries !== undefined) text = recursiveTextAdder(obj.entries, text, additional);
  const description = replaceTags(text);

  let magicBonus = 0;
  if (obj.bonusSpellAttack !== undefined) {
    magicBonus = Number.parseInt(obj.bonusSpellAttack.replaceAll("+", ""));
  } else if (obj.bonusWeapon !== undefined) {
    magicBonus = Number.parseInt(obj.bonusWeapon.replaceAll("+", ""));
  } else if (obj.bonusAc !== undefined) {
    magicBonus = Number.parseInt(obj.bonusAc.replaceAll("+", ""));
  }

  let attunment = 0;
  if (obj.reqAttune !== undefined) {
    attunment = obj.reqAttune ? 1 : 0;
  }

  let base = "";
  if (obj.baseItem !== undefined) {
    let baseParts: string[] = obj.baseItem.split("|");
    base = baseParts[0];
  }
  base = base.toLowerCase().trim();

  let type = "";
  if (obj.type !== undefined) {
    switch (obj.type) {
      case "A":
        type = "ammunition";
        break;
      case "AIR":
        type = "air vehicle";
        break;
      case "AT":
        type = "tools";
        break;
      case "EXP":
        type = "explosive";
        break;
      case "FD":
        type = "food";
        break;
      case "GS":
        type = "game set";
        break;
      case "HA":
        type = "heavy armor";
        break;
      case "INS":
        type = "instrument";
        break;
      case "LA":
        type = "light armor";
        break;
      case "M":
        type = "martial weapon";
        break;
      case "MA":
        type = "medium armor";
        break;
      case "MNT":
        type = "mount";
        break;
      case "R":
        type = "martial ranged weapon";
        break;
      case "S":
        type = "simple weapon";
        break;
      case "SCF":
        type = "spellcasting focus";
        break;
      case "SHP":
        type = "ship";
        break;
      case "TG":
        type = "trade good";
        break;
      case "VEH":
        type = "vehicle";
        break;
      default:
        type = "gear";
    }
  }

  let rarity: string = "";
  if (obj.rarity !== undefined) {
    rarity = obj.rarity;
  }
  rarity = rarity.toLowerCase().trim();

  let newItem = new Item(
    0,
    obj.name,
    obj.source,
    description,
    "",
    "",
    rarity,
    magicBonus,
    attunment,
    base,
    type,
    fileName
  );
  return newItem;
};

export const makeItems = (obj: any, fileName: string): Item | Gear => {
  if (obj !== undefined && obj.rarity !== undefined) {
    if (obj.rarity === "none" || obj.rarity === "unknown") {
      return parseGear(obj, fileName);
    } else {
      return parseItem(obj, fileName);
    }
  }
  return new Item();
};

export const makeRace = (obj: any, fileName: string): Race => {
  if (obj._copy === undefined) {
    const name = obj.name;
    const sources = obj.source;

    let speed = "";
    if (obj.speed !== undefined) {
      if (typeof obj.speed == "number") {
        speed += "walk " + obj.speed + "ft.";
      } else if (typeof obj.speed == "number") {
        speed = obj.speed;
      } else {
        for (const [key, value] of Object.entries(obj.speed)) {
          if (typeof value === "number") {
            speed += key + " " + value + "ft, ";
          } else if (typeof value === "boolean") {
          } else {
            speed += key + " ";
            for (const value2 of Object.entries(value as Object)) {
              if (typeof value2[1] === "number") {
                speed += value2[1] + "ft, ";
              } else if (typeof value2[1] === "string") {
                speed += value2[1];
              }
            }
            speed += ", ";
          }
        }
      }
      speed = speed.trim();
    }

    let abilityScores = "";
    if (obj.ability !== undefined)
      obj.ability.forEach((scores: any) => {
        for (const [key, value] of Object.entries(scores as Object)) {
          if (typeof value == "number") {
            if (value >= 0) abilityScores += key + " +" + value + ", ";
            abilityScores += key + " " + value + ", ";
          }
        }
      });
    abilityScores = abilityScores.trim();

    let age = "";
    let alignment = "";
    let size = "";
    let lang = "";
    let traits: Trait[] = [];
    if (obj.entries !== undefined) {
      obj.entries.forEach((entry: any) => {
        if (entry.name === "Age") {
          age += entry.entries[0];
        } else if (entry.name === "Alignment") {
          alignment += entry.entries[0];
        } else if (entry.name === "Size") {
          size += entry.entries[0];
        } else if (entry.name === "Languages") {
          lang += entry.entries[0];
        } else if (Array.isArray(entry.entries)) {
          if (typeof entry.entries[0] == "string") {
            let convertText = replaceTags(entry.entries[0]);
            traits.push(new Trait(entry.name, convertText, 1));
          } else {
            traits.push(new Trait(entry.name, "", 1));
          }
        }
      });
    }

    return new Race(
      name,
      0,
      fileName,
      "",
      "",
      abilityScores,
      age,
      alignment,
      size,
      speed,
      lang,
      traits,
      sources
    );
  }
  return new Race();
};

export const makeSubrace = (obj: any, race: Race, fileName: string): Subrace => {
  const subname = obj.name;
  const subtype = race.name + "|" + race.sources;

  let subabilityScores = "";
  if (obj.ability !== undefined)
    obj.ability.forEach((scores: any) => {
      for (const [key, value] of Object.entries(scores as Object)) {
        if (typeof value == "number") {
          if (value >= 0) race.abilityScores += key + " +" + value + ", ";
          subabilityScores += key + " " + value + ", ";
        }
      }
    });
  subabilityScores = subabilityScores.trim();

  let subtraits: Trait[] = [];
  if (obj.entries !== undefined) {
    obj.entries.forEach((entry: any) => {
      if (Array.isArray(entry.entries)) {
        let convertText = "";
        if (typeof entry.entries[0] == "string") {
          convertText = replaceTags(entry.entries[0]);
        }
        subtraits.push(new Trait(entry.name, convertText, 1));
      }
    });
  }

  return new Subrace(subname, 0, subtype, fileName, subabilityScores, subtraits, race.sources);
};

export const makeSpell = (obj: any, fileName: string): Spell => {
  let classes = "";
  if (obj.classes !== undefined && obj.classes.fromClassList !== undefined) {
    obj.classes.fromClassList.forEach((classe: { name: string; source: string }) => {
      classes += classe.name + ", ";
    });
  }

  let school = "";
  if (obj.school === "V") school = "Evocation";
  else if (obj.school === "D") school = "Divination";
  else if (obj.school === "N") school = "Necromancy";
  else if (obj.school === "T") school = "Transmutation";
  else if (obj.school === "I") school = "Illusion";
  else if (obj.school === "C") school = "Conjuration";
  else if (obj.school === "A") school = "Abjuration";
  else if (obj.school === "E") school = "Enchantment";
  else if (obj.school === "P") school = "Psion";
  else if (obj.school === "CR") school = "Chronomancy";
  else school = obj.school !== undefined && obj.school !== null ? obj.school.toString() : "";
  school = school.trim();

  let time = "";
  if (obj.time !== undefined) {
    time =
      obj.time[0].number +
      " " +
      obj.time[0].unit +
      " " +
      (obj.time[0].condition ? obj.time[0].condition : "");
  }
  time = time.toLowerCase().trim();

  let range = "";
  if (obj.range !== undefined) {
    if (obj.range.type === "point") {
      range =
        (obj.range.distance.amount ? obj.range.distance.amount : "") +
        " " +
        obj.range.distance.type;
    } else if (obj.range.type === "special") {
      range = obj.range.type;
    } else {
      range =
        (obj.range.distance.amount ? obj.range.distance.amount : "") +
        " " +
        obj.range.distance.type +
        " " +
        obj.range.type;
    }
  }
  range = range.trim();

  let components = "";
  if (obj.components !== undefined) {
    components = (obj.components.v ? "V, " : "") + (obj.components.s ? "S, " : "");
    if (obj.components.m !== undefined) {
      if (obj.components.m.text !== undefined) {
        components = "M (" + obj.components.m.text + ")";
      } else {
        components = "M (" + obj.components.m + ")";
      }
    }
  }
  components = components.trim();

  let duration = "";
  if (obj.duration !== undefined) {
    let concentration = obj.duration[0].concentration;
    duration =
      (concentration ? "Concentration, " : "") +
      obj.duration[0].type +
      " " +
      (obj.duration[0].duration !== undefined
        ? obj.duration[0].duration.type + " " + obj.duration[0].duration.amount
        : "");
  }
  duration = duration.trim();

  let text = "";
  let additional: string[] = [];
  if (obj.entries !== undefined) text = recursiveTextAdder(obj.entries, text, additional);
  if (obj.entriesHigherLevel !== undefined && obj.entriesHigherLevel.entries !== undefined) {
    obj.entriesHigherLevel.forEach((entry: any) => {
      text += "At Higher Levels: ";
      if (Array.isArray(entry.entries)) {
        entry.entries.forEach((textPart: string | any) => {
          text += textPart + "\n";
        });
      } else {
        text += entry.entries + "\n";
      }
    });
  }
  text = replaceTags(text);

  return new Spell(
    obj.name,
    classes,
    obj.source,
    obj.level,
    school,
    time,
    range,
    components,
    duration,
    obj.meta && obj.meta.ritual ? 1 : 0,
    text,
    0,
    fileName,
    ""
  );
};

export const makeMonster = (obj: any): Monster => {
  if (obj._copy === undefined) {
    let type = "";
    let subtype = "";
    if (typeof obj.type === "string") {
      type = obj.type;
    } else {
      type = obj.type.type;
      if (obj.type.tags !== undefined) subtype = obj.type.tags[0];
    }

    let cr = 0;
    if (obj.cr !== undefined) {
      if (typeof obj.cr === "string") {
        if (obj.cr === "1/8") {
          cr = 0.125;
        } else if (obj.cr === "1/4") {
          cr = 0.25;
        } else if (obj.cr === "1/2") {
          cr = 0.5;
        } else {
          cr = +obj.cr;
        }
      } else {
        if (obj.cr.cr === "1/8") {
          cr = 0.125;
        } else if (obj.cr.cr === "1/4") {
          cr = 0.25;
        } else if (obj.cr.cr === "1/2") {
          cr = 0.5;
        } else {
          cr = +obj.cr.cr;
        }
      }
    }

    let alignment = "";
    if (obj.alignment !== undefined) {
      obj.alignment?.forEach((align: string) => {
        if (align === "L") alignment += "lawfull ";
        if (align === "N") alignment += "neutral ";
        if (align === "C") alignment += "chaotic ";
        if (align === "G") alignment += "good ";
        if (align === "E") alignment += "evil ";
      });
    }
    alignment = alignment.trim();

    let size = "";
    if (obj.size !== undefined) {
      if (obj.size === "L") size += "large ";
      else if (obj.size === "H") size += "huge ";
      else if (obj.size === "T") size += "tiny ";
      else if (obj.size === "M") size += "medium ";
      else if (obj.size === "S") size += "small ";
      else if (obj.size === "G") size += "gargantuan ";
    }
    size = size.trim();

    let ac = 0;
    if (typeof obj.ac[0] === "number") {
      ac = obj.ac[0];
    } else {
      ac = obj.ac[0].ac;
    }

    let speed = "";
    for (const [key, value] of Object.entries(obj.speed)) {
      if (typeof value === "number") {
        speed += key + " " + value + "ft, ";
      } else if (typeof value === "boolean") {
      } else {
        speed += key + " ";
        for (const value2 of Object.entries(value as Object)) {
          if (typeof value2[1] === "number") {
            speed += value2[1] + "ft, ";
          } else if (typeof value2[1] === "string") {
            speed += value2[1];
          }
        }
        speed += ", ";
      }
    }
    speed.trim();

    let saves = "";
    if (obj.save !== undefined)
      for (const [key, value] of Object.entries(obj.save)) {
        saves += key + " " + value + ", ";
      }
    saves.trim();

    let skills = "";
    if (obj.skill !== undefined)
      for (const [key, value] of Object.entries(obj.skill)) {
        skills += key + " " + value + ", ";
      }
    skills.trim();

    let senses = "";
    if (obj.senses !== undefined) {
      if (Array.isArray(obj.senses)) {
        obj.senses.forEach((sense: string) => {
          senses += sense + ", ";
        });
      } else {
        senses = obj.senses;
      }
    }
    senses.trim();

    let langs = "";
    if (obj.languages !== undefined) {
      if (Array.isArray(obj.languages)) {
        obj.languages.forEach((lang: string) => {
          langs += lang + ", ";
        });
      } else {
        langs = obj.languages;
      }
    }
    langs.trim();

    let vulnerabilities = "";
    obj.vulnerable &&
      obj.vulnerable.forEach((vul: string) => {
        vulnerabilities += vul + ", ";
      });
    vulnerabilities.trim();

    let resistencies = "";
    obj.resist &&
      obj.resist.forEach((res: string) => {
        resistencies += res + ", ";
      });
    resistencies.trim();

    let immunities = "";
    obj.immune &&
      obj.immune.forEach((imu: string) => {
        immunities += imu + ", ";
      });
    immunities.trim();

    let conImmunities = "";
    obj.conditionImmune &&
      obj.conditionImmune.forEach((imu: string) => {
        conImmunities += imu + ", ";
      });
    conImmunities.trim();

    let traits = "";
    obj.trait &&
      obj.trait.forEach((tra: { name: string; entries: string[] }) => {
        traits += tra.name + ". \n";
        if (tra.entries !== undefined) {
          tra.entries.forEach((entry: string) => {
            traits += entry + " \n";
          });
          traits += "\n";
        }
      });
    obj.spellcasting &&
      obj.spellcasting.forEach((spellcast: any) => {
        traits += spellcast.name + " \n";
        traits += spellcast.headerEntries + " \n";
        if (spellcast.spells !== undefined) {
          for (const [key, value] of Object.entries(spellcast.spells)) {
            const spellSlotInfo: any = value;
            traits += key + " level ";
            if (spellSlotInfo.slots !== undefined) traits += `(${spellSlotInfo.slots} Slots)`;
            traits += ": ";
            if (
              spellSlotInfo !== undefined &&
              spellSlotInfo.spells !== undefined &&
              Array.isArray(spellSlotInfo.spells)
            ) {
              // eslint-disable-next-line
              spellSlotInfo.spells.forEach((spell: any) => {
                if (typeof spell == "string") {
                  traits += spell + ", ";
                }
              });
            }
            traits += "\n";
          }
          traits += "\n";
        }
        if (spellcast.will !== undefined) {
          traits += "At will: ";
          // eslint-disable-next-line
          spellcast.will.forEach((spell: any) => {
            if (typeof spell == "string") {
              traits += spell + ", ";
            }
          });
          traits += "\n";
        }
        if (spellcast.daily !== undefined) {
          for (const [key, value] of Object.entries(spellcast.daily)) {
            const spellTime: any = value;
            switch (key) {
              case "1e":
                traits += "1/day each: ";
                break;
              case "2e":
                traits += "2/day each: ";
                break;
              case "3e":
                traits += "3/day each: ";
                break;
              case "1":
                traits += "1/day: ";
                break;
              case "2":
                traits += "2/day: ";
                break;
              case "3":
                traits += "3/day: ";
                break;
            }
            if (spellTime !== undefined && Array.isArray(value)) {
              // eslint-disable-next-line
              value.forEach((spell: any) => {
                if (typeof spell == "string") {
                  traits += spell + ", ";
                }
              });
            }
            traits += "\n";
          }
          traits += "\n";
        }
      });
    traits = replaceTags(traits);

    let actions = "";
    obj.action &&
      obj.action.forEach((tra: { name: string; entries: string[] }) => {
        actions += tra.name + ". \n";
        if (tra.entries !== undefined) {
          tra.entries.forEach((entry: string) => {
            actions += entry + " \n";
          });
          actions += " \n";
        }
      });
    actions = replaceTags(actions);

    let lactions = "";
    obj.legendary &&
      obj.legendary.forEach((tra: { name: string; entries: string[] }) => {
        lactions += tra.name + ". \n";
        if (tra.entries !== undefined) {
          tra.entries.forEach((entry: string) => {
            lactions += entry + " \n";
          });
          lactions += " \n";
        }
      });
    lactions = replaceTags(lactions);

    return new Monster(
      0,
      obj.name,
      obj.source,
      "",
      "",
      size,
      type,
      subtype,
      alignment,
      ac,
      obj.hp.average,
      speed,
      cr,
      obj.str,
      obj.dex,
      obj.con,
      obj.int,
      obj.wis,
      obj.cha,
      saves,
      skills,
      senses,
      langs,
      vulnerabilities,
      resistencies,
      immunities,
      conImmunities,
      traits,
      actions,
      lactions
    );
  }
  return new Monster();
};

const addAdditionalClassFeatures = (
  additional: string[],
  featureSets: FeatureSet[],
  json: any,
  sources: string
) => {
  additional.forEach((feature: any) => {
    const featureParts: string[] = feature.split("|");

    let text = "";
    let additional: string[] = [];
    json.classFeature.forEach((objFeature: any) => {
      if (
        objFeature.name === featureParts[0] &&
        objFeature.className === featureParts[1] &&
        objFeature.source === sources
      ) {
        text = recursiveTextAdder(objFeature.entries, text, additional);
      }
    });
    text = replaceTags(text);

    if (text !== undefined && text !== null && text !== "") {
      if (featureParts[0].toLocaleLowerCase() === "ability score improvement") {
      }
      if (featureSets[+featureParts[3] - 1] === undefined) {
        featureSets.push(
          new FeatureSet(
            +featureParts[3],
            [new Feature(featureParts[0], text, "", 0, FeatureRest.none, 0, [], undefined)],
            [],
            []
          )
        );
      } else {
        featureSets[+featureParts[3] - 1].features.push(
          new Feature(featureParts[0], text, "", 0, FeatureRest.none, 0, [], undefined)
        );
      }
    }
  });
};

export const makeClass = (obj: any, json: any, fileName: string): Class => {
  const name = obj.name;
  const sources = obj.source;
  const hitdice = obj.hd ? "d" + obj.hd.faces : "";

  let proficiencies = "";
  if (obj.startingProficiencies !== undefined) {
    if (obj.startingProficiencies.armor !== undefined) {
      proficiencies = "Armor: ";
      obj.startingProficiencies.armor?.forEach((armor: string) => {
        proficiencies += armor + ", ";
      });
    }
    if (obj.startingProficiencies.weapons !== undefined) {
      proficiencies += "\nWeapons: ";
      obj.startingProficiencies.weapons?.forEach((wpn: string) => {
        proficiencies += wpn + ", ";
      });
    }
    if (obj.startingProficiencies.skills !== undefined) {
      proficiencies += "\nSkills: ";
      obj.startingProficiencies.skills[0]?.choose.from.forEach((skill: string) => {
        proficiencies += skill + ", ";
      });
    }
    proficiencies = replaceTags(proficiencies);
  }

  let equipment = "";
  if (obj.startingEquipment) {
    obj.startingEquipment.default?.forEach((eqp: string) => {
      equipment += eqp + ", ";
    });
    equipment = replaceTags(equipment);
  }

  let featureSets: FeatureSet[] = [];
  if (obj.classTableGroups !== undefined) {
    obj.classTableGroups.forEach((col: any) => {
      if (col.title !== undefined && col.title.includes("Slots")) {
        col.rows.forEach((row: number[], rowIndex: number) => {
          if (featureSets[rowIndex] === undefined) {
            featureSets.push(new FeatureSet(rowIndex + 1, [], [], []));
          }
          featureSets[rowIndex].spellslots = row;
        });
      } else {
        col.colLabels.forEach((label: string, colIndex: number) => {
          let clearLabel = replaceTags(label).split("|")[0].trim();
          col.rows.forEach((row: any, rowIndex: number) => {
            if (featureSets[rowIndex] === undefined) {
              featureSets.push(new FeatureSet(rowIndex + 1, [], [], []));
            }
            let bonis: Boni[] | undefined = featureSets[rowIndex].bonis;
            if (bonis === undefined) bonis = [];
            if (typeof row[colIndex] == "number") {
              bonis.push(new Boni(clearLabel, row[colIndex] + "", true, FeatureRest.none));
            } else if (typeof row[colIndex] == "string") {
              let text = replaceTags(row[colIndex]).split("|")[0].trim();
              bonis.push(new Boni(clearLabel, text, false, FeatureRest.none));
            } else {
              if (row[colIndex].value !== undefined) {
                bonis.push(new Boni(clearLabel, row[colIndex].value + "", false, FeatureRest.none));
              } else if (row[colIndex].toRoll !== undefined) {
                let text = row[colIndex].toRoll[0].number + "d" + row[colIndex].toRoll[0].faces;
                bonis.push(new Boni(clearLabel, text, false, FeatureRest.none));
              }
            }
            featureSets[rowIndex].bonis = bonis;
          });
        });
      }
    });
  }

  if (obj.classFeatures !== undefined) {
    obj.classFeatures.forEach((feature: any) => {
      let featureRaw: string = "";
      if (typeof feature === "string") {
        featureRaw = feature;
      }
      const featureParts: string[] = featureRaw.split("|");

      let text = "";
      let additional: string[] = [];
      let selections: { count: number } = { count: 0 };
      json.classFeature?.forEach((objFeature: any) => {
        if (objFeature.name === featureParts[0] && objFeature.source === sources) {
          const newText = recursiveTextAdder(objFeature.entries, text, additional, selections);
          if (additional.length > 0)
            addAdditionalClassFeatures(additional, featureSets, json, sources);
          text = newText;
        }
      });
      text = replaceTags(text);

      if (text !== undefined && text !== null && text !== "") {
        let isAbilityImprov: boolean = false;
        if (featureParts[0].toLocaleLowerCase() === "ability score improvement") {
          isAbilityImprov = true;
        }
        let newFeature: Feature = new Feature(
          featureParts[0],
          text,
          "",
          0,
          FeatureRest.none,
          0,
          [],
          undefined
        );
        [...Array(selections.count)].forEach(() => {
          newFeature.selections.push(featureParts[0]);
        });
        if (featureSets[+featureParts[3] - 1] === undefined) {
          featureSets.push(
            new FeatureSet(
              +featureParts[3],
              isAbilityImprov ? [] : [newFeature],
              [],
              [],
              isAbilityImprov
            )
          );
        } else {
          if (!isAbilityImprov) featureSets[+featureParts[3] - 1].features.push(newFeature);
          if (isAbilityImprov) featureSets[+featureParts[3] - 1].isAbilityImprov = isAbilityImprov;
        }
      }
    });
  }

  return new Class(0, name, featureSets, hitdice, proficiencies, equipment, fileName, sources, "");
};

const addAdditionalSubclassFeatures = (additional: string[], features: FeatureSet[], json: any) => {
  additional.forEach((feature: any) => {
    const featureParts: string[] = feature.split("|");

    let text = "";
    json.subclassFeature.forEach((objFeature: any) => {
      if (
        objFeature.subclassShortName === featureParts[3] &&
        objFeature.className === featureParts[1] &&
        objFeature.name === featureParts[0]
      ) {
        text = recursiveTextAdder(objFeature.entries, text, additional);
      }
    });
    text = replaceTags(text);

    let filteredFeatures = features.filter((featureSet) => featureSet.level === +featureParts[5]);
    if (filteredFeatures.length === 0) {
      features.push(new FeatureSet(+featureParts[5], [], [], []));
    }

    if (text !== undefined && text !== null && text !== "") {
      if (featureParts[0].toLocaleLowerCase() === "ability score improvement") {
        text = "";
      } else
        features
          .filter((featureSet) => featureSet.level === +featureParts[5])
          .forEach((feat) => {
            feat.features.push(
              new Feature(featureParts[0], text, "", 0, FeatureRest.none, 0, [], undefined)
            );
          });
    }
  });
};

export const makeSubclass = (obj: any, json: any, classe: string, fileName: string): Subclass => {
  let features: FeatureSet[] = [];
  if (obj.subclassFeatures !== undefined) {
    obj.subclassFeatures.forEach((feature: any) => {
      let featureRaw: string = "";
      if (typeof feature != "string") {
        featureRaw = feature.classFeature || "";
      } else {
        featureRaw = feature;
      }
      const featureParts: string[] = featureRaw.split("|");

      let text = "";
      let additional: string[] = [];
      json.subclassFeature?.forEach((objFeature: any) => {
        if (
          objFeature.subclassShortName === featureParts[3] &&
          objFeature.name === featureParts[0]
        ) {
          const newText = recursiveTextAdder(objFeature.entries, text, additional);
          if (additional.length > 0) addAdditionalSubclassFeatures(additional, features, json);
          text = newText;
        }
      });
      text = replaceTags(text);

      let filteredFeatures = features.filter((featureSet) => featureSet.level === +featureParts[5]);
      if (filteredFeatures.length === 0) {
        features.push(new FeatureSet(+featureParts[5], [], [], []));
      }

      if (text !== undefined && text !== null && text !== "") {
        if (featureParts[0].toLocaleLowerCase() === "ability score improvement") {
          text = "";
        }
        features
          .filter((featureSet) => featureSet.level === +featureParts[5])
          .forEach((feat) => {
            feat.features.push(
              new Feature(featureParts[0], text, "", 0, FeatureRest.none, 0, [], undefined)
            );
          });
      }
    });
  }
  return new Subclass(0, obj.name, classe, features, fileName, obj.source);
};

const recursiveTextAdder = (
  entries: any,
  text: string,
  additional: string[],
  selections?: { count: number },
  seperator?: string
): string => {
  let newText: string = text;
  if (entries !== undefined && entries !== null) {
    if (typeof entries == "string" || typeof entries == "number") {
      newText += entries + "";
    } else if (entries.type !== undefined && entries.type === "options") {
      if (entries.count !== undefined && selections !== undefined) selections.count = entries.count;
    } else if (Array.isArray(entries)) {
      entries.forEach((entry) => {
        const text = recursiveTextAdder(entry, newText, additional, selections, seperator);
        newText = text;
        // additional.concat(additional);
      });
      newText += "\n";
    } else if (entries.entries !== undefined) {
      if (entries.name !== undefined) newText += entries.name + "\n";
      const text = recursiveTextAdder(entries.entries, newText, additional, selections, seperator);
      newText = text + "\r\n";
      // newAdditional.concat(additional);
    } else if (entries.items !== undefined) {
      entries.items.forEach((item: any) => {
        if (typeof item == "string" || typeof item == "number") {
          newText += "\r\n• " + item;
        } else if (item.type !== undefined && item.type === "item") {
          newText += "\r\n• " + item.name + ": " + item.entry;
        }
      });
      newText += "\n\n";
    } else if (entries.type !== undefined && entries.type === "refClassFeature") {
      additional.push(entries.classFeature);
    } else if (entries.type !== undefined && entries.type === "refSubclassFeature") {
      additional.push(entries.subclassFeature);
    } else if (entries.type !== undefined && entries.type === "table") {
      newText += "\n ||tableStart||";
      if (entries.colLabels) {
        newText += "||";
        entries.colLabels.forEach((s: string) => (newText += s + "|"));
        newText += "|";
      }
      if (entries.rows) {
        newText += "||";
        entries.rows.forEach((row: string[]) => {
          newText += "||";
          if (Array.isArray(row))
            row.forEach((s: string) => {
              newText += s + "|";
            });
          newText += "|";
        });
        newText += "|";
      }
      newText += "||tableEnd||\r\n";
    } else if (typeof entries == "object") {
      for (const value of Object.entries(entries)) {
        if (value[0] !== undefined) {
          const text = recursiveTextAdder(value[0], newText, additional, selections, seperator);
          newText = text + (seperator || ": ");
          // newAdditional.concat(additional);
        }
        if (value[1] !== undefined) {
          const text = recursiveTextAdder(value[1], newText, additional, selections, seperator);
          newText = text;
          // newAdditional.concat(additional);
        }
        newText += "\r\n";
      }
    }
  }
  return newText;
};

export const makeSelection = (
  obj: any
): {
  entityName: string;
  entityPrerequsite: string;
  entityText: string;
  level: number;
} => {
  let text = "";
  let additional: string[] = [];
  if (obj.entries !== undefined) text = recursiveTextAdder(obj.entries, text, additional);
  text = replaceTags(text);

  let level: number = 0;
  let prequisite: string = "";
  if (
    obj.prerequisite !== undefined &&
    Array.isArray(obj.prerequisite) &&
    obj.prerequisite.length > 0
  ) {
    for (const [key, value] of Object.entries(obj.prerequisite[0])) {
      if (key === "level") {
        for (const [key2, value2] of Object.entries(value as Object)) {
          if (key2 === "level") {
            level = value2;
          } else {
            prequisite += key2 + ": " + value2.name + ", ";
          }
        }
      } else if (typeof value === "number") {
        prequisite += key + ": " + value + ", ";
      } else if (typeof value === "string") {
        prequisite += key + ": " + value + ", ";
      } else if (Array.isArray(value)) {
        prequisite += key + ": ";
        // eslint-disable-next-line
        value.forEach((val) => {
          prequisite += val + ", ";
        });
      } else {
        prequisite += key + " ";
        for (const [key2, value2] of Object.entries(value as Object)) {
          if (typeof value2 === "number") {
            prequisite += key2 + ": " + value2 + ", ";
          } else if (typeof value2 === "string") {
            prequisite += key2 + ": " + value2 + ", ";
          } else {
            prequisite += key + " ";
            for (const [key3, value3] of Object.entries(value as Object)) {
              if (typeof value3 === "number") {
                prequisite += key3 + ": " + value3 + ", ";
              } else if (typeof value3 === "string") {
                prequisite += key3 + ": " + value3 + ", ";
              }
            }
            prequisite += ", ";
          }
        }
        prequisite += ", ";
      }
    }
  }

  let name = obj.name;
  name = obj.source !== undefined ? name + " (" + obj.source + ")" : name;

  return {
    entityName: name,
    entityPrerequsite: prequisite,
    entityText: text,
    level: level,
  };
};

export const makeFeat = (obj: any, json: any, fileName: string): Feat => {
  let text = "";
  let additional: string[] = [];
  if (obj.ability !== undefined) text = recursiveTextAdder(obj.ability, text, additional);
  if (obj.entries !== undefined) text = recursiveTextAdder(obj.entries, text, additional);
  text = replaceTags(text);

  let prequisite = "";
  if (obj.prerequisite !== undefined)
    prequisite = recursiveTextAdder(obj.prerequisite, prequisite, additional);
  prequisite = replaceTags(prequisite);

  return {
    name: obj.name,
    prerequisite: prequisite,
    description: text,
    sources: obj.source,
  };
};

export const makeBackground = (obj: any, json: any, fileName: string): Background => {
  let proficiencies = "";
  let text = "";
  let additional: string[] = [];
  if (obj.entries !== undefined) {
    let entries = [...obj.entries];
    if (entries[0].type === "list") {
      proficiencies = recursiveTextAdder(entries[0], proficiencies, additional);
      entries = entries.slice(1);
    }
    proficiencies = replaceTags(proficiencies);

    text = recursiveTextAdder(entries, text, additional);
    text = replaceTags(text);
  }

  return {
    name: obj.name,
    proficiencies: proficiencies,
    description: text,
    sources: obj.source,
  };
};
