import Dexie from "dexie";
import Spell from "../Data/Spell";
import Gear from "../Data/Gear";
import Item from "../Data/Item";
import Monster from "../Data/Monster";
import Race from "../Data/Race";
import Subrace from "../Data/Subrace";
import Class from "../Data/Class";
import Subclass from "../Data/Subclass";

export class MyAppDatabase extends Dexie {
  spells: Dexie.Table<Spell, number>; // number = type of the primkey
  items: Dexie.Table<Item, number>; // number = type of the primkey
  gears: Dexie.Table<Gear, number>; // number = type of the primkey
  monsters: Dexie.Table<Monster, number>; // number = type of the primkey
  races: Dexie.Table<Race, number>; // number = type of the primkey
  subraces: Dexie.Table<Subrace, number>; // number = type of the primkey
  classes: Dexie.Table<Class, number>; // number = type of the primkey
  subclasses: Dexie.Table<Subclass, number>; // number = type of the primkey

  constructor() {
    super("DnDTomeDB");
    this.version(8).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes:
        "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
    });
    this.version(9).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes:
        "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
        subclasses:
        "++id, name, features, sources, filename",
    });
    this.version(10).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes:
        "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
        subclasses:
        "++id, name, type, features, sources, filename",
    });
    this.spells = this.table("spells");
    this.items = this.table("items");
    this.gears = this.table("gears");
    this.monsters = this.table("monsters");
    this.races = this.table("races");
    this.subraces = this.table("subraces");
    this.classes = this.table("classes");
    this.subclasses = this.table("subclasses");
  }
}
