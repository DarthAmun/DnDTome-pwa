import Dexie from "dexie";
import Background from "../data/Background";
import Book from "../data/Book";
import Campaign from "../data/campaign/Campaign";
import Group from "../data/campaign/Group";
import Npc from "../data/campaign/Npc";
import Quest from "../data/campaign/Quest";
import Char from "../data/chars/Char";
import Class from "../data/classes/Class";
import Subclass from "../data/classes/Subclass";
import Encounter from "../data/encounter/Encounter";
import Feat from "../data/Feat";
import Gear from "../data/Gear";
import Item from "../data/Item";
import Monster from "../data/Monster";
import Note from "../data/Note";
import Race from "../data/races/Race";
import Subrace from "../data/races/Subrace";
import RandomTable from "../data/RandomTable";
import Selection from "../data/Selection";
import Spell from "../data/Spell";
import Event from "../data/world/Event";
import Location from "../data/world/Location";
import World from "../data/world/World";

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
  groups: Dexie.Table<Group, number>; // number = type of the primkey
  feats: Dexie.Table<Feat, number>; // number = type of the primkey
  backgrounds: Dexie.Table<Background, number>; // number = type of the primkey
  notes: Dexie.Table<Note, number>; // number = type of the primkey

  constructor() {
    super("DnDTomeDB");
    this.version(24).stores({
      spells:
        "++id, [name+sources], name, classes, sources, level, school, time, range, components, duration, ritual, text, pic, picBase64, filename",
      items:
        "++id, [name+sources], name, sources, pic, picBase64, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, [name+sources], name, sources, pic, picBase64, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, [name+sources], name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, sources, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, picBase64, size, alignment",
      races:
        "++id, [name+sources], name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, picBase64, filename",
      subraces: "++id, [name+sources], name, type, abilityScores, traits, sources, filename",
      classes:
        "++id, [name+sources], name, featureSets, hitDice, proficiencies, equipment, sources, pic, picBase64, filename",
      subclasses: "++id, [name+sources], name, type, features, sources, filename",
      chars:
        "++id, [name+sources], name, player, campaign, pic, picBase64, classes, race, background, spells, spellSlots, activeSelections, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters:
        "++id, [name+sources], name, enemies, players, isPlaying, currentInit, roundCounter, map, mapBase64, dimension",
      books: "++id, [name+sources], name, cover, data, pages, tags",
      selections: "++id, [name+sources], name, selectionOptions, filename",
      randomTables: "++id, [name+sources], name, rows, header, filename",
      campaigns:
        "++id, [name+sources], name, pic, picBase64, description, world, npcs, notes, logs, players, flow, map, sources, filename",
      quests:
        "++id, [name+sources], name, pic, picBase64, description, rewards, followQuest, sources, filename",
      npcs: "++id, [name+sources], name, pic, picBase64, char, monster, traits, description, sources, filename",
      worlds: "++id, [name+sources], name, map, description, locations, events, sources, filename",
      locations:
        "++id, [name+sources], name, map, mapBase64, dimension, markers, sources, filename",
      events: "++id, [name+sources], name, description, date, sources, filename",
      groups:
        "++id, [name+sources], name, pic, picBase64, description, notes, npcs, players, monsters, flow, sources, filename",
    });
    this.version(25).stores({
      spells:
        "++id, [name+sources], name, classes, sources, level, school, time, range, components, duration, ritual, text, pic, picBase64, filename",
      items:
        "++id, [name+sources], name, sources, pic, picBase64, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, [name+sources], name, sources, pic, picBase64, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, [name+sources], name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, sources, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, picBase64, size, alignment",
      races:
        "++id, [name+sources], name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, picBase64, filename",
      subraces: "++id, [name+sources], name, type, abilityScores, traits, sources, filename",
      classes:
        "++id, [name+sources], name, featureSets, hitDice, proficiencies, equipment, sources, pic, picBase64, filename",
      subclasses: "++id, [name+sources], name, type, features, sources, filename",
      chars:
        "++id, [name+sources], name, player, campaign, pic, picBase64, classes, race, background, spells, spellSlots, activeSelections, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters:
        "++id, [name+sources], name, enemies, players, isPlaying, currentInit, roundCounter, map, mapBase64, dimension",
      books: "++id, [name+sources], name, cover, data, pages, tags",
      selections: "++id, [name+sources], name, selectionOptions, filename",
      randomTables: "++id, [name+sources], name, rows, header, filename",
      campaigns:
        "++id, [name+sources], name, pic, picBase64, description, world, npcs, notes, logs, players, flow, map, sources, filename",
      quests:
        "++id, [name+sources], name, pic, picBase64, description, rewards, followQuest, sources, filename",
      npcs: "++id, [name+sources], name, pic, picBase64, char, monster, traits, description, sources, filename",
      worlds: "++id, [name+sources], name, map, description, locations, events, sources, filename",
      locations:
        "++id, [name+sources], name, map, mapBase64, dimension, markers, sources, filename",
      events: "++id, [name+sources], name, description, date, sources, filename",
      groups:
        "++id, [name+sources], name, pic, picBase64, description, notes, npcs, players, monsters, flow, sources, filename",
      feats: "++id, [name+sources], name, description, prerequisite, sources, filename",
      backgrounds: "++id, [name+sources], name, description, proficiencies, sources, filename",
    });
    this.version(26).stores({
      spells:
        "++id, [name+sources], name, classes, sources, level, school, time, range, components, duration, ritual, text, pic, picBase64, filename",
      items:
        "++id, [name+sources], name, sources, pic, picBase64, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, [name+sources], name, sources, pic, picBase64, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, [name+sources], name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, sources, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, picBase64, size, alignment",
      races:
        "++id, [name+sources], name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, picBase64, filename",
      subraces: "++id, [name+sources], name, type, abilityScores, traits, sources, filename",
      classes:
        "++id, [name+sources], name, featureSets, hitDice, proficiencies, equipment, sources, pic, picBase64, filename",
      subclasses: "++id, [name+sources], name, type, features, sources, filename",
      chars:
        "++id, [name+sources], name, player, campaign, pic, picBase64, classes, race, background, spells, spellSlots, activeSelections, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC",
      encounters:
        "++id, [name+sources], name, enemies, players, isPlaying, currentInit, roundCounter, map, mapBase64, dimension",
      books: "++id, [name+sources], name, cover, data, pages, tags",
      selections: "++id, [name+sources], name, selectionOptions, filename",
      randomTables: "++id, [name+sources], name, rows, header, filename",
      campaigns:
        "++id, [name+sources], name, pic, picBase64, description, world, npcs, notes, logs, players, flow, map, sources, filename",
      quests:
        "++id, [name+sources], name, pic, picBase64, description, rewards, followQuest, sources, filename",
      npcs: "++id, [name+sources], name, pic, picBase64, char, monster, traits, description, sources, filename",
      worlds: "++id, [name+sources], name, map, description, locations, events, sources, filename",
      locations:
        "++id, [name+sources], name, map, mapBase64, dimension, markers, sources, filename",
      events: "++id, [name+sources], name, description, date, sources, filename",
      groups:
        "++id, [name+sources], name, pic, picBase64, description, notes, npcs, players, monsters, flow, sources, filename",
      feats: "++id, [name+sources], name, description, prerequisite, sources, filename",
      backgrounds: "++id, [name+sources], name, description, proficiencies, sources, filename",
      notes: "++id, [name+sources], name, text, sources, filename",
    });
    this.version(27).stores({
      spells:
        "++id, [name+sources], name, classes, sources, level, school, time, range, components, duration, ritual, text, pic, picBase64, filename",
      items:
        "++id, [name+sources], name, sources, pic, picBase64, description, type, rarity, attunment, magicBonus, base, filename",
      gears:
        "++id, [name+sources], name, sources, pic, picBase64, description, type, cost, damage, weight, properties, filename",
      monsters:
        "++id, [name+sources], name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, sources, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, picBase64, size, alignment",
      races:
        "++id, [name+sources], name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, picBase64, filename",
      subraces: "++id, [name+sources], name, type, abilityScores, traits, sources, filename",
      classes:
        "++id, [name+sources], name, featureSets, hitDice, proficiencies, equipment, sources, pic, picBase64, filename",
      subclasses: "++id, [name+sources], name, type, features, sources, filename",
      chars:
        "++id, [name+sources], name, player, campaign, pic, picBase64, classes, race, background, spells, spellSlots, activeSelections, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC, deathSaves, currentFeatureUses, currencyBonis",
      encounters:
        "++id, [name+sources], name, enemies, players, isPlaying, currentInit, roundCounter, map, mapBase64, dimension",
      books: "++id, [name+sources], name, cover, data, pages, tags",
      selections: "++id, [name+sources], name, selectionOptions, filename",
      randomTables: "++id, [name+sources], name, rows, header, filename",
      campaigns:
        "++id, [name+sources], name, pic, picBase64, description, world, npcs, notes, logs, players, flow, map, sources, filename",
      quests:
        "++id, [name+sources], name, pic, picBase64, description, rewards, followQuest, sources, filename",
      npcs: "++id, [name+sources], name, pic, picBase64, char, monster, traits, description, sources, filename",
      worlds: "++id, [name+sources], name, map, description, locations, events, sources, filename",
      locations:
        "++id, [name+sources], name, map, mapBase64, dimension, markers, sources, filename",
      events: "++id, [name+sources], name, description, date, sources, filename",
      groups:
        "++id, [name+sources], name, pic, picBase64, description, notes, npcs, players, monsters, flow, sources, filename",
      feats: "++id, [name+sources], name, description, prerequisite, sources, filename",
      backgrounds: "++id, [name+sources], name, description, proficiencies, sources, filename",
      notes: "++id, [name+sources], name, text, sources, filename",
    });
    this.version(28)
      .stores({
        spells:
          "++id, [name+sources], name, classes, sources, level, school, time, range, components, duration, ritual, description, pic, picBase64, filename",
        items:
          "++id, [name+sources], name, sources, pic, picBase64, description, type, rarity, attunment, magicBonus, base, filename",
        gears:
          "++id, [name+sources], name, sources, pic, picBase64, description, type, cost, damage, weight, properties, filename",
        monsters:
          "++id, [name+sources], name, type, subtype, cr, ac, hp, str, dex, con, int, wis, cha, senses, lang, speed, sources, skills, savingThrows, dmgImmunities, dmgResistance, dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, picBase64, size, alignment",
        races:
          "++id, [name+sources], name, abilityScores, age, alignment, size, speed, lang, traits, sources, pic, picBase64, filename",
        subraces: "++id, [name+sources], name, type, abilityScores, traits, sources, filename",
        classes:
          "++id, [name+sources], name, featureSets, hitDice, proficiencies, equipment, sources, pic, picBase64, filename",
        subclasses: "++id, [name+sources], name, type, features, sources, filename",
        chars:
          "++id, [name+sources], name, player, campaign, pic, picBase64, classes, race, background, spells, spellSlots, activeSelections, items, monsters, ac, hp, currentHp, init, speed, str, dex, con, int, wis, cha, saves, actions, bonusActions, reactions, profsLangs, senses, money, skills, spellNotes, alignment, inspiration, castingHit, castingDC, deathSaves, currentFeatureUses, currencyBonis",
        encounters:
          "++id, [name+sources], name, enemies, players, isPlaying, currentInit, roundCounter, map, mapBase64, dimension",
        books: "++id, [name+sources], name, cover, data, pages, tags",
        selections: "++id, [name+sources], name, selectionOptions, filename",
        randomTables: "++id, [name+sources], name, rows, header, filename",
        campaigns:
          "++id, [name+sources], name, pic, picBase64, description, world, npcs, notes, logs, players, flow, map, sources, filename",
        quests:
          "++id, [name+sources], name, pic, picBase64, description, rewards, followQuest, sources, filename",
        npcs: "++id, [name+sources], name, pic, picBase64, char, monster, traits, description, sources, filename",
        worlds:
          "++id, [name+sources], name, map, description, locations, events, sources, filename",
        locations:
          "++id, [name+sources], name, map, mapBase64, dimension, markers, sources, filename",
        events: "++id, [name+sources], name, description, date, sources, filename",
        groups:
          "++id, [name+sources], name, pic, picBase64, description, notes, npcs, players, monsters, flow, sources, filename",
        feats: "++id, [name+sources], name, description, prerequisite, sources, filename",
        backgrounds: "++id, [name+sources], name, description, proficiencies, sources, filename",
        notes: "++id, [name+sources], name, text, sources, filename",
      })
      .upgrade((tx) => {
        return tx
          .table("spells")
          .toCollection()
          .modify((spell) => {
            spell.description = spell.text;
            delete spell.text;
          });
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
    this.groups = this.table("groups");
    this.feats = this.table("feats");
    this.backgrounds = this.table("backgrounds");
    this.notes = this.table("notes");
  }
}
