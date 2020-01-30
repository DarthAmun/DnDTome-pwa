import Dexie from "dexie";
import Spell from "../components/spell/Spell";
import Item from "../components/item/Item";
import Gear from "../components/gear/Gear";
import Monster from "../components/monster/Monster";
import Char from "../components/char/Char";

export class MyAppDatabase extends Dexie {
  spells: Dexie.Table<Spell, number>; // number = type of the primkey
  items: Dexie.Table<Item, number>; // number = type of the primkey
  gears: Dexie.Table<Gear, number>; // number = type of the primkey
  monsters: Dexie.Table<Monster, number>; // number = type of the primkey
  chars: Dexie.Table<Char, number>; // number = type of the primkey

  constructor() {
    super("MyAppDatabase");
    
    this.version(1).stores({
      spells: "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
    });
    this.version(2).stores({
      spells: "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items: "++id, name, sources, pic, description, type, rarity, attunment",
    });
    this.version(3).stores({
      spells: "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items: "++id, name, sources, pic, description, type, rarity, attunment",
      gears: "++id, name, sources, pic, description, type, cost, damage, weight, properties",
    });
    this.version(4).stores({
      spells: "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items: "++id, name, sources, pic, description, type, rarity, attunment",
      gears: "++id, name, sources, pic, description, type, cost, damage, weight, properties",
      monsters: "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
    });
    this.version(5).stores({
      spells: "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items: "++id, name, sources, pic, description, type, rarity, attunment",
      gears: "++id, name, sources, pic, description, type, cost, damage, weight, properties",
      monsters: "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      chars: "++id, name, player, prof, level, pic, classes, race, background, ac, hp, currentHp, hitDice, init, speed, str, dex, con, int, wis, cha, strSave, dexSave, conSave, intSave, wisSave, chaSave, strSaveProf, dexSaveProf, conSaveProf, intSaveProf, wisSaveProf, chaSaveProf, actions, bonusActions, reactions, features, classFeatures, racialFeatures, profsLangs, senses, passivPerception, passivInsight, passivInvestigation, notesOne, notesTwo, notesThree, acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, acrobaticsProf, animalHandlingProf, arcanaProf, athleticsProf, deceptionProf, historyProf, insightProf, intimidationProf, investigationProf, medicineProf, natureProf, perceptionProf, performanceProf, persuasionProf, religionProf, sleightOfHandProf, stealthProf, survivalProf, spellNotes, alignment, inspiration, castingHit, castingDC",
    });
    this.spells = this.table("spells");
    this.items = this.table("items");
    this.gears = this.table("gears");
    this.monsters = this.table("monsters");
    this.chars = this.table("chars");
  }
}
