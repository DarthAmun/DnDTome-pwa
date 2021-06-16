import Class from "../classes/Class";
import FeatureSet from "../classes/FeatureSet";
import Subclass from "../classes/Subclass";
import Feat from "../Feat";
import Gear from "../Gear";
import Item from "../Item";
import Modifier from "../Modifier";
import Monster from "../Monster";
import Race from "../races/Race";
import Subrace from "../races/Subrace";
import Trait from "../races/Trait";
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
  feats: Feat[];
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
  spells: { origin: Spell; prepared: boolean }[];
  monsters: Monster[];
  modifiers: Modifier[];

  constructor(
    character?: Char,
    level?: number,
    prof?: number,
    classes?: Class[],
    subclasses?: Subclass[],
    classFeatures?: FeatureSet[],
    race?: Race,
    subrace?: Subrace,
    raceFeatures?: Trait[],
    feats?: Feat[],
    gears?: {
      gear: Gear;
      origin: string;
      attuned: boolean;
      prof: boolean;
      attribute: string;
    }[],
    items?: {
      item: Item;
      base: Gear | undefined;
      origin: string;
      attuned: boolean;
      prof: boolean;
      attribute: string;
    }[],
    spells?: { origin: Spell; prepared: boolean }[],
    monsters?: Monster[],
    modifiers?: Modifier[]
  ) {
    this.character = character || new Char();
    this.oldCharacter = character || new Char();
    this.level = level || 0;
    this.prof = prof || 0;
    this.classes = classes || [];
    this.subclasses = subclasses || [];
    this.classFeatures = classFeatures || [];
    this.race = race || new Race();
    this.subrace = subrace || new Subrace();
    this.raceFeatures = raceFeatures || [];
    this.feats = feats || [];
    this.gears = gears || [];
    this.items = items || [];
    this.spells = spells || [];
    this.monsters = monsters || [];
    this.modifiers = modifiers || [];
  }
}
