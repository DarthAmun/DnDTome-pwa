import Dexie from "dexie";
import Book from "../data/Book";
import Campaign from "../data/campaign/Campaign";
import Npc from "../data/campaign/Npc";
import Quest from "../data/campaign/Quest";
import Char from "../data/chars/Char";
import Class from "../data/classes/Class";
import Subclass from "../data/classes/Subclass";
import Encounter from "../data/encounter/Encounter";
import Gear from "../data/Gear";
import Item from "../data/Item";
import Monster from "../data/Monster";
import Race from "../data/races/Race";
import Subrace from "../data/races/Subrace";
import RandomTable from "../data/RandomTable";
import Selection from "../data/Selection";
import Spell from "../data/Spell";
import World from "../data/world/World";
import Location from "../data/world/Location";
import Event from "../data/world/Event";

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
  encounters: Dexie.Table<Encounter, number>; // number = type of the primkey
  books: Dexie.Table<Book, number>; // number = type of the primkey
  selections: Dexie.Table<Selection, number>; // number = type of the primkey
  randomTables: Dexie.Table<RandomTable, number>; // number = type of the primkey
  campaigns: Dexie.Table<Campaign, number>; // number = type of the primkey
  quests: Dexie.Table<Quest, number>; // number = type of the primkey
  npcs: Dexie.Table<Npc, number>; // number = type of the primkey
  worlds: Dexie.Table<World, number>; // number = type of the primkey
  locations: Dexie.Table<Location, number>; // number = type of the primkey
  events: Dexie.Table<Event, number>; // number = type of the primkey

  constructor() {
    super("DnDTomeDB");
    this.version(1).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
    });
    this.version(2).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items: "++id, name, sources, pic, description, type, rarity, attunment",
    });
    this.version(3).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items: "++id, name, sources, pic, description, type, rarity, attunment",
      gears: "++id, name, sources, pic, description, type, cost, damage, weight, properties",
    });
    this.version(4).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items: "++id, name, sources, pic, description, type, rarity, attunment",
      gears: "++id, name, sources, pic, description, type, cost, damage, weight, properties",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
    });
    this.version(5).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items: "++id, name, sources, pic, description, type, rarity, attunment",
      gears: "++id, name, sources, pic, description, type, cost, damage, weight, properties",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      chars:
        "++id, name, player, prof, level, pic, classes, race, background, ac, hp, currentHp, hitDice, init, speed, str, dex, con, int, wis, cha, strSave, dexSave, conSave, intSave, wisSave, chaSave, strSaveProf, dexSaveProf, conSaveProf, intSaveProf, wisSaveProf, chaSaveProf, actions, bonusActions, reactions, features, classFeatures, racialFeatures, profsLangs, senses, passivPerception, passivInsight, passivInvestigation, notesOne, notesTwo, notesThree, acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, acrobaticsProf, animalHandlingProf, arcanaProf, athleticsProf, deceptionProf, historyProf, insightProf, intimidationProf, investigationProf, medicineProf, natureProf, perceptionProf, performanceProf, persuasionProf, religionProf, sleightOfHandProf, stealthProf, survivalProf, spellNotes, alignment, inspiration, castingHit, castingDC",
    });
    this.version(6).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items: "++id, name, sources, pic, description, type, rarity, attunment",
      gears: "++id, name, sources, pic, description, type, cost, damage, weight, properties",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      chars:
        "++id, name, player, prof, level, pic, classes, race, background, ac, hp, currentHp, hitDice, init, speed, str, dex, con, int, wis, cha, strSave, dexSave, conSave, intSave, wisSave, chaSave, strSaveProf, dexSaveProf, conSaveProf, intSaveProf, wisSaveProf, chaSaveProf, actions, bonusActions, reactions, features, classFeatures, racialFeatures, profsLangs, senses, passivPerception, passivInsight, passivInvestigation, notesOne, notesTwo, notesThree, acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, acrobaticsProf, animalHandlingProf, arcanaProf, athleticsProf, deceptionProf, historyProf, insightProf, intimidationProf, investigationProf, medicineProf, natureProf, perceptionProf, performanceProf, persuasionProf, religionProf, sleightOfHandProf, stealthProf, survivalProf, spellNotes, alignment, inspiration, castingHit, castingDC",
      chars_spells: "++id, char_id, spell_id, prepared",
      chars_monsters: "++id, char_id, monster_id",
      chars_items:
        "++id, char_id, item_id, gear_id, amount, equiped, attuned, damage, hit, range, properties",
    });
    this.version(7).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes: "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, pic, classes, race, background, spells, spellSlots, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
    });
    this.version(8).stores({
      chars_spells: null,
      chars_monsters: null,
      chars_items: null,

      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes: "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, pic, classes, race, background, spells, spellSlots, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters: "++id, name, monsters, players",
    });
    this.version(9).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes: "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, pic, classes, race, background, spells, spellSlots, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters: "++id, name, monsters, players",
      books: "++id, name, cover, data, pages, tags",
    });
    this.version(10).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes: "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, pic, classes, race, background, spells, spellSlots, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters: "++id, name, monsters, players",
      books: "++id, name, cover, data, pages, tags",
      selections: "++id, name, selectionOptions, filename",
    });
    this.version(11).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes: "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, pic, classes, race, background, spells, spellSlots, activeSelections, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters: "++id, name, monsters, players",
      books: "++id, name, cover, data, pages, tags",
      selections: "++id, name, selectionOptions, filename",
    });
    this.version(12).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes: "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, pic, classes, race, background, spells, spellSlots, activeSelections, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters: "++id, name, monsters, players",
      books: "++id, name, cover, data, pages, tags",
      selections: "++id, name, selectionOptions, filename",
      randomTables: "++id, name, rows, header, filename",
    });
    this.version(13).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic, filename",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes: "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, pic, classes, race, background, spells, spellSlots, activeSelections, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters: "++id, name, monsters, players",
      books: "++id, name, cover, data, pages, tags",
      selections: "++id, name, selectionOptions, filename",
      randomTables: "++id, name, rows, header, filename",
    });
    this.version(14).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic, filename",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes: "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, pic, classes, race, background, spells, spellSlots, activeSelections, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters: "++id, name, monsters, players",
      books: "++id, name, cover, data, pages, tags",
      selections: "++id, name, selectionOptions, filename",
      randomTables: "++id, name, rows, header, filename",
      campaigns:
        "++id, name, pic, description, world, quests, npcs, notes, players, sources, filename",
    });
    this.version(15).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic, filename",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes: "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, pic, classes, race, background, spells, spellSlots, activeSelections, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters: "++id, name, monsters, players",
      books: "++id, name, cover, data, pages, tags",
      selections: "++id, name, selectionOptions, filename",
      randomTables: "++id, name, rows, header, filename",
      campaigns:
        "++id, name, pic, description, world, quests, npcs, notes, players, sources, filename",
      quests:
        "++id, name, pic, locations, origin, description, rewards, followQuest, sources, filename",
      npcs: "++id, name, pic, char, traits, description, sources, filename",
      worlds: "++id, name, map, description, locations, events, notes, sources, filename",
      locations: "++id, name, map, description, events, notes, sources, filename",
      events: "++id, name, description, locations, npcs, notes, sources, filename",
    });
    this.version(16).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic, filename",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes: "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, pic, classes, race, background, spells, spellSlots, activeSelections, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters: "++id, name, monsters, players",
      books: "++id, name, cover, data, pages, tags",
      selections: "++id, name, selectionOptions, filename",
      randomTables: "++id, name, rows, header, filename",
      campaigns:
        "++id, name, pic, description, world, quests, npcs, notes, players, map, sources, filename",
      quests:
        "++id, name, pic, locations, origin, description, rewards, followQuest, sources, filename",
      npcs: "++id, name, pic, char, traits, description, sources, filename",
      worlds: "++id, name, map, description, locations, events, notes, sources, filename",
      locations: "++id, name, map, description, events, notes, sources, filename",
      events: "++id, name, description, locations, npcs, notes, sources, filename",
    });
    this.version(17).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic, filename",
      items:
        "++id, name, sources, pic, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment",
      races:
        "++id, name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, filename",
      subraces: "++id, name, type, abilityScores, traits, sources, filename",
      classes: "++id, name, featureSets, hitDice, proficiencies, equipment, sources, pic, filename",
      subclasses: "++id, name, type, features, sources, filename",
      chars:
        "++id, name, player, pic, classes, race, background, spells, spellSlots, activeSelections, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters: "++id, name, monsters, players",
      books: "++id, name, cover, data, pages, tags",
      selections: "++id, name, selectionOptions, filename",
      randomTables: "++id, name, rows, header, filename",
      campaigns:
        "++id, name, pic, description, world, npcs, notes, logs, players, flow, map, sources, filename",
      quests: "++id, name, pic, description, rewards, followQuest, sources, filename",
      npcs: "++id, name, pic, char, traits, description, sources, filename",
      worlds: "++id, name, map, description, events, notes, sources, filename",
      locations:
        "++id, name, map, dimension, description, events, notes, markers, sources, filename",
      events: "++id, name, description, npcs, notes, sources, filename",
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
    this.encounters = this.table("encounters");
    this.books = this.table("books");
    this.selections = this.table("selections");
    this.randomTables = this.table("randomTables");
    this.campaigns = this.table("campaigns");
    this.quests = this.table("quests");
    this.npcs = this.table("npcs");
    this.worlds = this.table("worlds");
    this.locations = this.table("locations");
    this.events = this.table("events");
  }
}
