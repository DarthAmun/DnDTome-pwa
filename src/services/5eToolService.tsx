import Boni from "../data/classes/Boni";
import Class from "../data/classes/Class";
import Feature from "../data/classes/Feature";
import FeatureSet from "../data/classes/FeatureSet";
import Subclass from "../data/classes/Subclass";
import Gear from "../data/Gear";
import Item from "../data/Item";
import Monster from "../data/Monster";
import Race from "../data/races/Race";
import Subrace from "../data/races/Subrace";
import Trait from "../data/races/Trait";
import Spell from "../data/Spell";
import { saveNew } from "./DatabaseService";

export const import5eToolsClassesFiles = (
  fileList: FileList | null,
  callback: (max: number) => void
) => {
  if (fileList !== null) {
    const files = Array.from(fileList);

    files.forEach((file, i) => {
      let fileReader = new FileReader();
      fileReader.onloadend = async function () {
        const content = fileReader.result;
        if (content !== null) {
          let json = JSON.parse(content.toString());

          let promList: Promise<any>[] = [];
          json.class.forEach((obj: any) => {
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
              proficiencies = proficiencies
                .replaceAll("},", "\n")
                .replaceAll("[", "")
                .replaceAll("]", "")
                .replaceAll("}", "")
                .replaceAll("{@", "")
                .replaceAll("{", "")
                .trim();
            }

            let equipment = "";
            if (obj.startingEquipment) {
              obj.startingEquipment.default?.forEach((eqp: string) => {
                equipment += eqp + ", ";
              });
              equipment = equipment
                .replaceAll("},", "\n")
                .replaceAll("[", "")
                .replaceAll("]", "")
                .replaceAll("}", "")
                .replaceAll("{@", "")
                .replaceAll("{", "")
                .trim();
            }

            let featureSets: FeatureSet[] = [];
            if (obj.classTableGroups !== undefined) {
              obj.classTableGroups.forEach((col: any) => {
                if (col.title !== undefined && col.title.includes("Slots")) {
                  col.rows.forEach((row: number[], rowIndex: number) => {
                    if (featureSets[rowIndex] === undefined) {
                      featureSets.push(
                        new FeatureSet(rowIndex + 1, getProfForLevel(rowIndex + 1), [], [], [])
                      );
                    }
                    featureSets[rowIndex].spellslots = row;
                  });
                } else {
                  col.colLabels.forEach((label: string, colIndex: number) => {
                    let clearLabel = label
                      .replaceAll("},", "\n")
                      .replaceAll("[", "")
                      .replaceAll("]", "")
                      .replaceAll("}", "")
                      .replaceAll("{@", "")
                      .replaceAll("{", "")
                      .replaceAll("filter", "")
                      .split("|")[0]
                      .trim();
                    col.rows.forEach((row: any, rowIndex: number) => {
                      if (featureSets[rowIndex] === undefined) {
                        featureSets.push(
                          new FeatureSet(rowIndex + 1, getProfForLevel(rowIndex + 1), [], [], [])
                        );
                      }
                      let bonis: Boni[] | undefined = featureSets[rowIndex].bonis;
                      if (bonis === undefined) bonis = [];
                      if (typeof row[colIndex] == "string") {
                        let text = row[colIndex]
                          .replaceAll("},", "\n")
                          .replaceAll("[", "")
                          .replaceAll("]", "")
                          .replaceAll("}", "")
                          .replaceAll("{@", "")
                          .replaceAll("{", "")
                          .replaceAll("filter", "")
                          .split("|")[0]
                          .trim();
                        bonis.push(new Boni(clearLabel, text, false));
                      } else {
                        if (row[colIndex].value !== undefined)
                          bonis.push(new Boni(clearLabel, row[colIndex].value + "", false));
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
                json.classFeature.forEach((objFeature: any) => {
                  if (objFeature.name === featureParts[0] && objFeature.source === sources) {
                    text = recursiveTextAdder(objFeature.entries, text);
                  }
                });
                text = text
                  .replaceAll("},", "\n")
                  .replaceAll("[", "")
                  .replaceAll("]", "")
                  .replaceAll("}", "")
                  .replaceAll("{@", "")
                  .replaceAll("{", "")
                  .replaceAll("|", " ")
                  .trim();

                if (text !== undefined && text !== null && text !== "") {
                  if (featureParts[0].toLocaleLowerCase() === "ability score improvement") {
                    text = "";
                  }
                  if (featureSets[+featureParts[3] - 1] === undefined) {
                    featureSets.push(
                      new FeatureSet(
                        +featureParts[3],
                        getProfForLevel(+featureParts[3]),
                        [new Feature(featureParts[0], text, [], undefined)],
                        [],
                        []
                      )
                    );
                  } else {
                    featureSets[+featureParts[3] - 1].features.push(
                      new Feature(featureParts[0], text, [], undefined)
                    );
                  }
                }
              });
            }

            let newClass = new Class(
              0,
              name,
              featureSets,
              hitdice,
              proficiencies,
              equipment,
              file.name,
              sources,
              ""
            );
            promList.push(saveNew("classes", newClass, file.name));

            if (obj.subclasses !== undefined) {
              obj.subclasses.forEach((subclass: any) => {
                let features: FeatureSet[] = [];
                if (subclass.subclassFeatures !== undefined) {
                  subclass.subclassFeatures.forEach((feature: any) => {
                    let featureRaw: string = "";
                    if (typeof feature != "string") {
                      featureRaw = feature.classFeature;
                    } else {
                      featureRaw = feature;
                    }
                    const featureParts: string[] = featureRaw.split("|");

                    let text = "";
                    json.subclassFeature.forEach((objFeature: any) => {
                      if (
                        objFeature.subclassShortName === featureParts[3] &&
                        objFeature.name === featureParts[0]
                      ) {
                        text = recursiveTextAdder(objFeature.entries, text);
                      }
                    });

                    text = text
                      .replaceAll("},", "\n")
                      .replaceAll("[", "")
                      .replaceAll("]", "")
                      .replaceAll("}", "")
                      .replaceAll("{@", "")
                      .replaceAll("{", "")
                      .replaceAll("|", " ")
                      .trim();

                    let filteredFeatures = features.filter(
                      (featureSet) => featureSet.level === +featureParts[5]
                    );
                    if (filteredFeatures.length === 0) {
                      features.push(new FeatureSet(+featureParts[5], 0, [], [], []));
                    }

                    if (text !== undefined && text !== null && text !== "") {
                      if (featureParts[0].toLocaleLowerCase() === "ability score improvement") {
                        text = "";
                      }
                      features
                        .filter((featureSet) => featureSet.level === +featureParts[5])
                        .forEach((feat) => {
                          feat.features.push(new Feature(featureParts[0], text, [], undefined));
                        });
                    }
                  });
                }

                let newSubclass = new Subclass(
                  0,
                  subclass.name,
                  name,
                  features,
                  file.name,
                  subclass.source
                );
                promList.push(saveNew("subclasses", newSubclass, file.name));
              });
            }
          });
          await Promise.all(promList);
          callback(json.class.length);
        }
      };
      fileReader.readAsText(file);
    });
  }
};

const getProfForLevel = (level: number): number => {
  switch (level) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      return 2;
    case 5:
    case 6:
    case 7:
    case 8:
      return 3;
    case 9:
    case 10:
    case 11:
    case 12:
      return 4;
    case 13:
    case 14:
    case 15:
    case 16:
      return 5;
    case 17:
    case 18:
    case 19:
    case 20:
      return 6;
    default:
      return 0;
  }
};

const recursiveTextAdder = (entries: any[], text: string): string => {
  let newText: string = text;
  if (Array.isArray(entries)) {
    entries?.forEach((entry: any) => {
      if (typeof entry == "string") {
        newText += entry + "\n";
      } else if (entry.entries !== undefined) {
        newText += entry.name + "\n";
        newText = recursiveTextAdder(entry.entries, newText);
      } else if (entry.items !== undefined) {
        entry.items.forEach((item: string) => {
          newText += "• " + item + "\n";
        });
      } else {
        for (const value of Object.entries(entry)) {
          newText += value[1] + "\n";
        }
      }
    });
  } else {
    if (typeof entries == "string") {
      newText += entries + "\n";
    } else {
      for (const value of Object.entries(entries)) {
        newText += value[1] + "\n";
      }
    }
  }

  return newText + "\n";
};

export const import5eToolsRacesFiles = (
  fileList: FileList | null,
  callback: (max: number) => void
) => {
  if (fileList !== null) {
    const files = Array.from(fileList);

    files.forEach((file, i) => {
      let fileReader = new FileReader();
      fileReader.onloadend = async function () {
        const content = fileReader.result;
        if (content !== null) {
          let json = JSON.parse(content.toString());

          let promList: Promise<any>[] = [];
          json.race.forEach((obj: any) => {
            if (obj._copy === undefined && obj.source !== "DMG") {
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
                      let convertText = entry.entries[0]
                        .replaceAll("},", "\n")
                        .replaceAll("[", "")
                        .replaceAll("]", "")
                        .replaceAll("}", "")
                        .replaceAll("{@", "")
                        .replaceAll("{", "");
                      convertText = convertText.trim();
                      traits.push(new Trait(entry.name, convertText, 1));
                    } else {
                      traits.push(new Trait(entry.name, "", 1));
                    }
                  }
                });
              }

              if (obj.subraces !== undefined) {
                obj.subraces.forEach((subrace: any) => {
                  const subname = subrace.name;
                  const subtype = name;

                  let subabilityScores = "";
                  if (subrace.ability !== undefined)
                    subrace.ability.forEach((scores: any) => {
                      for (const [key, value] of Object.entries(scores as Object)) {
                        if (typeof value == "number") {
                          if (value >= 0) abilityScores += key + " +" + value + ", ";
                          subabilityScores += key + " " + value + ", ";
                        }
                      }
                    });
                  subabilityScores = subabilityScores.trim();

                  let subtraits: Trait[] = [];
                  if (subrace.entries !== undefined) {
                    obj.entries.forEach((entry: any) => {
                      if (Array.isArray(entry.entries)) {
                        let convertText = entry.entries[0]
                          .replaceAll("},", "\n")
                          .replaceAll("[", "")
                          .replaceAll("]", "")
                          .replaceAll("}", "")
                          .replaceAll("{@", "")
                          .replaceAll("{", "");
                        convertText = convertText.trim();
                        subtraits.push(new Trait(entry.name, convertText, 1));
                      }
                    });
                  }

                  let newSubrace = new Subrace(
                    subname,
                    0,
                    subtype,
                    file.name,
                    subabilityScores,
                    subtraits,
                    sources
                  );
                  promList.push(saveNew("subraces", newSubrace, file.name));
                });
              }

              let newRace = new Race(
                name,
                0,
                file.name,
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
              promList.push(saveNew("races", newRace, file.name));
            }
          });
          await Promise.all(promList);
          callback(json.race.length);
        }
      };
      fileReader.readAsText(file);
    });
  }
};

export const import5eToolsSpellsFiles = (
  fileList: FileList | null,
  callback: (max: number) => void
) => {
  if (fileList !== null) {
    const files = Array.from(fileList);

    files.forEach((file, i) => {
      let fileReader = new FileReader();
      fileReader.onloadend = async function () {
        const content = fileReader.result;
        if (content !== null) {
          let json = JSON.parse(content.toString());

          let promList: Promise<any>[] = [];
          json.spell.forEach((obj: any) => {
            let classes = "";
            if (obj.classes !== undefined && obj.classes.fromClassList !== undefined) {
              obj.classes.fromClassList.forEach((classe: { name: string; source: string }) => {
                classes += classe.name + ", ";
              });
            }

            let school = "";
            if (obj.school === "V") school = "Evocation";
            if (obj.school === "D") school = "Divination";
            if (obj.school === "N") school = "Necromancy";
            if (obj.school === "T") school = "Transmutation";
            if (obj.school === "I") school = "Illusion";
            if (obj.school === "C") school = "Conjuration";
            if (obj.school === "A") school = "Abjuration";
            if (obj.school === "E") school = "Enchantment";

            let time = "";
            if (obj.time !== undefined) {
              time =
                obj.time[0].number +
                " " +
                obj.time[0].unit +
                " " +
                (obj.time[0].condition ? obj.time[0].condition : "");
            }

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

            let text = "";
            obj.entries.forEach((textPart: string | any) => {
              if (typeof textPart === "string") {
                text += textPart + "\n";
              } else {
                if (textPart.name !== undefined && textPart.entries !== undefined) {
                  text += "\n" + textPart.name + ". ";
                  textPart.entries.forEach((entryTextPart: string) => {
                    text += entryTextPart + "\n";
                  });
                } else if (textPart.items !== undefined) {
                  textPart.items.forEach((listItem: string) => {
                    text += "• " + listItem + "\n";
                  });
                } else if (textPart.type !== undefined && textPart.type === "table") {
                  text += "||table||\n";
                  if (textPart.colLabels !== undefined) {
                    text += "||";
                    textPart.colLabels.forEach((listItem: string) => {
                      text += listItem + "|";
                    });
                    text += "|\n";
                  }
                  textPart.rows.forEach((rows: string[]) => {
                    text += "||";
                    rows.forEach((cel: string) => {
                      text += cel + "|";
                    });
                    text += "|\n";
                  });
                  text += "||table||\n";
                } else {
                  let convertText = JSON.stringify(textPart);
                  convertText = convertText
                    .replaceAll("},", "\n")
                    .replaceAll("[", "")
                    .replaceAll("]", "")
                    .replaceAll("}", "")
                    .replaceAll("{@", "")
                    .replaceAll("{", "");
                  convertText = convertText.trim();
                  text += convertText;
                }
              }
            });
            text = text.replaceAll("}", "").replaceAll("{@", "");
            text = text.trim();

            let newSpell = new Spell(
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
              file.name,
              ""
            );
            promList.push(saveNew("spells", newSpell, file.name));
          });
          await Promise.all(promList);
          callback(json.spell.length);
        }
      };
      fileReader.readAsText(file);
    });
  }
};

export const import5eToolsMonstersFiles = (
  fileList: FileList | null,
  callback: (max: number) => void
) => {
  if (fileList !== null) {
    const files = Array.from(fileList);

    files.forEach((file, i) => {
      let fileReader = new FileReader();
      fileReader.onloadend = async function () {
        const content = fileReader.result;
        if (content !== null) {
          let json = JSON.parse(content.toString());

          let promList: Promise<any>[] = [];
          json.monster.forEach((obj: any) => {
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
                obj.alignment.forEach((align: string) => {
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
              obj.senses &&
                obj.senses.forEach((sense: string) => {
                  senses += sense + ", ";
                });
              senses.trim();

              let langs = "";
              obj.languages &&
                obj.languages.forEach((lang: string) => {
                  langs += lang + ", ";
                });
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
              traits = traits
                .replaceAll("}", "")
                .replaceAll("{@damage ", "")
                .replaceAll("{@recharge", "(Recharge 6)")
                .replaceAll("{@atk mw", "Melee Weapon Attack: ")
                .replaceAll("{@atk mw", "Ranged Weapon Attack: ")
                .replaceAll("{@atk ms", "Melee Spell Attack: ")
                .replaceAll("{@atk rs", "Ranged Spell Attack: ")
                .replaceAll("{@h", "Hit: ")
                .replaceAll("{@dc", "DC")
                .replaceAll("{@hit", "+")
                .replaceAll("{@", "");
              traits = traits.trim();

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
              actions = actions
                .replaceAll("}", "")
                .replaceAll("{@damage ", "")
                .replaceAll("{@recharge", "(Recharge 6)")
                .replaceAll("{@atk mw", "Melee Weapon Attack: ")
                .replaceAll("{@atk mw", "Ranged Weapon Attack: ")
                .replaceAll("{@atk ms", "Melee Spell Attack: ")
                .replaceAll("{@atk rs", "Ranged Spell Attack: ")
                .replaceAll("{@h", "Hit: ")
                .replaceAll("{@dc", "DC")
                .replaceAll("{@hit", "+")
                .replaceAll("{@", "");
              actions = actions.trim();

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
              lactions = lactions
                .replaceAll("}", "")
                .replaceAll("{@damage ", "")
                .replaceAll("{@recharge", "(Recharge 6)")
                .replaceAll("{@atk mw", "Melee Weapon Attack: ")
                .replaceAll("{@atk mw", "Ranged Weapon Attack: ")
                .replaceAll("{@atk ms", "Melee Spell Attack: ")
                .replaceAll("{@atk rs", "Ranged Spell Attack: ")
                .replaceAll("{@h", "Hit: ")
                .replaceAll("{@dc", "DC")
                .replaceAll("{@hit", "+")
                .replaceAll("{@", "");
              lactions = lactions.trim();

              let newMonster = new Monster(
                0,
                obj.name,
                obj.source,
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
              promList.push(saveNew("monsters", newMonster, file.name));
            }
          });
          await Promise.all(promList);
          callback(json.monster.length);
        }
      };
      fileReader.readAsText(file);
      console.log("Done");
    });
  }
};

export const import5eToolsItemsFiles = (
  fileList: FileList | null,
  callback: (max: number) => void
) => {
  if (fileList !== null) {
    const files = Array.from(fileList);

    files.forEach((file, i) => {
      let fileReader = new FileReader();
      fileReader.onloadend = async function () {
        const content = fileReader.result;
        if (content !== null) {
          let json = JSON.parse(content.toString());

          let promList: Promise<any>[] = [];

          let items: any[] = [];
          if (json.item !== undefined) items = json.item;
          if (json.baseitem !== undefined) items = json.baseitem;

          items.forEach((obj: any) => {
            if (obj.rarity !== undefined) {
              if (obj.rarity === "none" || obj.rarity === "unknown") {
                let newGear: Gear = parseGear(obj, file.name);
                promList.push(saveNew("gears", newGear, file.name));
              } else {
                let newItem: Item = parseItem(obj, file.name);
                promList.push(saveNew("items", newItem, file.name));
              }
            }
          });
          await Promise.all(promList);
          callback(items.length);
        }
      };
      fileReader.readAsText(file);
    });
  }
};

const parseGear = (obj: any, fileName: string) => {
  let text = "";
  if (obj.entries !== undefined) {
    obj.entries.forEach((textPart: string | any) => {
      if (typeof textPart === "string") {
        text += textPart + "\n";
      } else {
        if (textPart.name !== undefined && textPart.entries !== undefined) {
          text += "\n" + textPart.name + ". ";
          textPart.entries.forEach((entryTextPart: string) => {
            text += entryTextPart + "\n";
          });
        } else if (textPart.items !== undefined) {
          textPart.items.forEach((listItem: string) => {
            text += "• " + listItem + "\n";
          });
        } else if (textPart.type !== undefined && textPart.type === "table") {
          text += "||table||\n";
          if (textPart.colLabels !== undefined) {
            text += "||";
            textPart.colLabels.forEach((listItem: string) => {
              text += listItem + "|";
            });
            text += "|\n";
          }
          textPart.rows.forEach((rows: string[]) => {
            text += "||";
            rows.forEach((cel: string) => {
              text += cel + "|";
            });
            text += "|\n";
          });
          text += "||table||\n";
        } else {
          let convertText = JSON.stringify(textPart);
          convertText = convertText
            .replaceAll("},", "\n")
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll("}", "")
            .replaceAll("{@", "")
            .replaceAll("{", "");
          convertText = convertText.trim();
          text += convertText;
        }
      }
    });
    text = text.replaceAll("}", "").replaceAll("{@", "");
  }
  const description = text.trim();

  let type = "";
  if (obj.type !== undefined) {
    type = obj.type;
  }

  let damage = "";
  if (obj.dmg1 !== undefined) {
    damage += obj.dmg1;
    if (obj.dmgType !== undefined) {
      if (obj.dmgType === "S") damage += " slashing damage";
      else if (obj.dmgType === "P") damage += " piercing damage";
      else if (obj.dmgType === "B") damage += " bludgeoning damage";
      else if (obj.dmgType === "R") damage += " radiant damage";
    }
  }

  let properties = "";
  if (obj.range !== undefined) {
    properties += "ranged (" + obj.range + "), ";
  }
  if (obj.property !== undefined) {
    obj.property.forEach((prop: string) => {
      if (prop === "L") properties += "light, ";
      else if (prop === "AF") properties += "radiant damage, ";
      else if (prop === "RLD") properties += "loading, ";
      else if (prop === "2H") properties += "two-handed, ";
      else if (prop === "F") properties += "finesse, ";
      else if (prop === "H") properties += "heavy, ";
      else if (prop === "R") properties += "reach, ";
      else if (prop === "T") properties += "thrown, ";
      else if (prop === "V") properties += "versatile, ";
    });
  }
  properties = properties.trim();

  let newGear = new Gear(
    0,
    obj.name,
    obj.source,
    description,
    "",
    obj.value,
    damage,
    obj.weight,
    properties,
    type,
    fileName
  );
  return newGear;
};

const parseItem = (obj: any, fileName: string) => {
  let text = "";
  if (obj.entries !== undefined) {
    obj.entries.forEach((textPart: string | any) => {
      if (typeof textPart === "string") {
        text += textPart + "\n";
      } else {
        if (textPart.name !== undefined && textPart.entries !== undefined) {
          text += "\n" + textPart.name + ". ";
          textPart.entries.forEach((entryTextPart: string) => {
            text += entryTextPart + "\n";
          });
        } else if (textPart.items !== undefined) {
          textPart.items.forEach((listItem: string) => {
            text += "• " + listItem + "\n";
          });
        } else if (textPart.type !== undefined && textPart.type === "table") {
          text += "||table||\n";
          if (textPart.colLabels !== undefined) {
            text += "||";
            textPart.colLabels.forEach((listItem: string) => {
              text += listItem + "|";
            });
            text += "|\n";
          }
          textPart.rows.forEach((rows: string[]) => {
            text += "||";
            rows.forEach((cel: string) => {
              text += cel + "|";
            });
            text += "|\n";
          });
          text += "||table||\n";
        } else {
          let convertText = JSON.stringify(textPart);
          convertText = convertText
            .replaceAll("},", "\n")
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll("}", "")
            .replaceAll("{@", "")
            .replaceAll("{", "");
          convertText = convertText.trim();
          text += convertText;
        }
      }
    });
    text = text.replaceAll("}", "").replaceAll("{@", "");
  }
  const description = text.trim();

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
  let type = "";
  if (obj.baseItem !== undefined) {
    let baseParts: string[] = obj.baseItem.split("|");
    base = baseParts[0];
    type = baseParts[0];
  }

  let newItem = new Item(
    0,
    obj.name,
    obj.source,
    description,
    "",
    obj.rarity,
    magicBonus,
    attunment,
    base,
    type,
    fileName
  );
  return newItem;
};
