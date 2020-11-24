import Class from "../Classes/Class";
import FeatureSet from "../Classes/FeatureSet";
import Subclass from "../Classes/Subclass";
import Gear from "../Gear";
import Item from "../Item";
import Modifier from "../Modifier";
import Monster from "../Monster";
import Race from "../Races/Race";
import Subrace from "../Races/Subrace";
import Trait from "../Races/Trait";
import Spell from "../Spell";
import Char from "./Char";

export default class BuildChar {
  character: Char;
  oldCharacter: Char;
  level: number;
  prof: number;
  classes: Class[];
  subclasses: Subclass[];
  classFeatures: FeatureSet[];
  race: Race;
  subrace: Subrace;
  raceFeatures: Trait[];
  gears: {
    gear: Gear;
    origin: string;
    attuned: boolean;
    prof: boolean;
    attribute: string;
  }[];
  items: {
    item: Item;
    base: Gear | undefined;
    origin: string;
    attuned: boolean;
    prof: boolean;
    attribute: string;
  }[];
  spells: Spell[];
  monsters: Monster[];
  modifiers: Modifier[];

  constructor(
    character: Char,
    level: number,
    prof: number,
    classes: Class[],
    subclasses: Subclass[],
    classFeatures: FeatureSet[],
    race: Race,
    subrace: Subrace,
    raceFeatures: Trait[],
    gears: {
      gear: Gear;
      origin: string;
      attuned: boolean;
      prof: boolean;
      attribute: string;
    }[],
    items: {
      item: Item;
      base: Gear | undefined;
      origin: string;
      attuned: boolean;
      prof: boolean;
      attribute: string;
    }[],
    spells: Spell[],
    monsters: Monster[],
    modifiers: Modifier[]
  ) {
    this.character = character;
    this.oldCharacter = character;
    this.level = level;
    this.prof = prof;
    this.classes = classes;
    this.subclasses = subclasses;
    this.classFeatures = classFeatures;
    this.race = race;
    this.subrace = subrace;
    this.raceFeatures = raceFeatures;
    this.gears = gears;
    this.items = items;
    this.spells = spells;
    this.monsters = monsters;
    this.modifiers = modifiers;
  }
}

