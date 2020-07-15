import Dexie from "dexie";
import Spell from "../Data/Spell";
import Gear from "../Data/Gear";
import Monster from "../Data/Monster";
import Race from "../Data/Race";
import Subrace from "../Data/Subrace";

export class MyAppDatabase extends Dexie {
  spells: Dexie.Table<Spell, number>; // number = type of the primkey
  gears: Dexie.Table<Gear, number>; // number = type of the primkey
  monsters: Dexie.Table<Monster, number>; // number = type of the primkey
  races: Dexie.Table<Race, number>; // number = type of the primkey
  subraces: Dexie.Table<Subrace, number>; // number = type of the primkey

  constructor() {
    super("DnDTomeDB");
    this.version(1).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
    });
    this.version(2).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
    });
    this.version(3).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, type, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
    });
    this.version(4).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
    });
    this.spells = this.table("spells");
    this.gears = this.table("gears");
    this.monsters = this.table("monsters");
    this.races = this.table("races");
    this.subraces = this.table("subraces");
  }
}
