import Dexie from "dexie";
import Spell from "../Data/Spell";
import Gear from "../Data/Gear";
import Item from "../Data/Item";
import Monster from "../Data/Monster";
import Race from "../Data/Races/Race";
import Subrace from "../Data/Races/Subrace";
import Class from "../Data/Classes/Class";
import Subclass from "../Data/Classes/Subclass";
import Char from "../Data/Chars/Char";

export class MyAppDatabase extends Dexie {
  spells: Dexie.Table<Spell, number>; // number = type of the primkey
  items: Dexie.Table<Item, number>; // number = type of the primkey
  gears: Dexie.Table<Gear, number>; // number = type of the primkey
  monsters: Dexie.Table<Monster, number>; // number = type of the primkey
  races: Dexie.Table<Race, number>; // number = type of the primkey
  subraces: Dexie.Table<Subrace, number>; // number = type of the primkey
  classes: Dexie.Table<Class, number>; // number = type of the primkey
  subclasses: Dexie.Table<Subclass, number>; // number = type of the primkey
  chars: Dexie.Table<Char, number>; // number = type of the primkey

  constructor() {
    super("DnDTomeDB");
    this.version(12).stores({
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
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, level, pic, classes, race, background, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, features, profsLangs, senses, passivPerception, passivInsight, passivInvestigation, notesOne, notesTwo, notesThree, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
    });
    this.version(13).stores({
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
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, level, pic, classes, race, background, spells, items, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, features, profsLangs, senses, passivPerception, passivInsight, passivInvestigation, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
    });
    this.version(14).stores({
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
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, level, pic, classes, race, background, spells, spellSlots, items, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, features, profsLangs, senses, passivPerception, passivInsight, passivInvestigation, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
    });
    this.version(15).stores({
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
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, level, pic, classes, race, background, spells, spellSlots, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, passivPerception, passivInsight, passivInvestigation, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
    });
    this.spells = this.table("spells");
    this.items = this.table("items");
    this.gears = this.table("gears");
    this.monsters = this.table("monsters");
    this.races = this.table("races");
    this.subraces = this.table("subraces");
    this.classes = this.table("classes");
    this.subclasses = this.table("subclasses");
    this.chars = this.table("chars");
  }
}

//Saves = strSave, dexSave, conSave, intSave, wisSave, chaSave, strSaveProf, dexSaveProf, conSaveProf, intSaveProf, wisSaveProf, chaSaveProf
//Skills =  acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, acrobaticsProf, animalHandlingProf, arcanaProf, athleticsProf, deceptionProf, historyProf, insightProf, intimidationProf, investigationProf, medicineProf, natureProf, perceptionProf, performanceProf, persuasionProf, religionProf, sleightOfHandProf, stealthProf, survivalProf,