import Monster from "../Data/Monster";
import Spell from "../Data/Spell";
import { saveNew } from "./DatabaseService";

export const import5eToolsSpellsFiles = (fileList: FileList | null) => {
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
            if (
              obj.classes !== undefined &&
              obj.classes.fromClassList !== undefined
            ) {
              obj.classes.fromClassList.forEach(
                (classe: { name: string; source: string }) => {
                  classes += classe.name + ", ";
                }
              );
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

            let time =
              obj.time[0].number +
              " " +
              obj.time[0].unit +
              " " +
              (obj.time[0].condition ? obj.time[0].condition : "");

            let range = "";
            if (obj.range !== undefined) {
              range =
                obj.range.type +
                " " +
                (obj.distance
                  ? obj.range.distance.typ +
                    " " +
                    (obj.range.distance.amount ? obj.range.distance.amount : "")
                  : "");
            }

            let components = "";
            if (obj.components !== undefined) {
              components =
                (obj.components.v ? "V, " : "") +
                (obj.components.s ? "S, " : "") +
                (obj.components.m ? "M (" + obj.components.m.text + ")" : "");
            }

            let concentration = obj.duration[0].concentration;
            let duration =
              (concentration ? "Concentration, " : "") +
              obj.duration[0].type +
              " " +
              (obj.duration[0].duration
                ? obj.duration[0].duration.type +
                  " " +
                  obj.duration[0].duration.amount
                : "");

            let text = "";
            obj.entries.forEach((textPart: string) => {
              text += textPart + "\n";
            });

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
        }
      };
      fileReader.readAsText(file);
    });
  }
};

export const import5eToolsMonstersFiles = (fileList: FileList | null) => {
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
                if (typeof value === "string") {
                  speed += key + " " + value + "ft, ";
                } else {
                  speed += key + " ";
                  for (const [key2, value2] of Object.entries(
                    value as Object
                  )) {
                    speed += key2 + " (" + value2 + ")";
                  }
                  speed += key + ", ";
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
              if (obj.skills !== undefined)
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
                obj.trait.forEach(
                  (tra: { name: string; entries: string[] }) => {
                    traits += tra.name + ". \n";
                    tra.entries.forEach((entry: string) => {
                      traits += entry + " \n";
                    });
                    traits += "\n";
                  }
                );
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
                .replaceAll("{@hit", "+");
              traits.trim();

              let actions = "";
              obj.action &&
                obj.action.forEach(
                  (tra: { name: string; entries: string[] }) => {
                    actions += tra.name + ". \n";
                    tra.entries.forEach((entry: string) => {
                      actions += entry + " \n";
                    });
                    actions += " \n";
                  }
                );
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
                .replaceAll("{@hit", "+");
              actions.trim();

              let lactions = "";
              obj.legendary &&
                obj.legendary.forEach(
                  (tra: { name: string; entries: string[] }) => {
                    lactions += tra.name + ". \n";
                    tra.entries.forEach((entry: string) => {
                      lactions += entry + " \n";
                    });
                    lactions += " \n";
                  }
                );
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
                .replaceAll("{@hit", "+");
              lactions.trim();

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
        }
      };
      fileReader.readAsText(file);
      console.log("Done");
    });
  }
};
