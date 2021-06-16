import Skills from "./Skills";
import Saves from "./Saves";
import Money from "./Money";
import IEntity from "../IEntity";
import ClassSet, { isClassSet } from "./ClassSet";
import RaceSet, { isRaceSet } from "./RaceSet";
import { FeatureRest } from "../classes/Feature";

export default class Char implements IEntity {
  id?: number;
  name: string;
  player: string;
  campaign: string;
  pic: string;
  picBase64: string;
  classes: ClassSet[];
  race: RaceSet;
  background: string;
  spells: { origin: string; prepared: boolean }[];
  spellSlots: { origin: string; slots: number[]; max: number[] }[];
  activeSelections: {
    selectionName: string;
    activeOption: {
      entityName: string;
      entityText: string;
      level: number;
    };
    featureName: string;
    featureCount: number;
    className: string;
  }[];
  currencyBonis: { origin: string; value: number; max: number; rest: FeatureRest }[];
  currentFeatureUses: { origin: string; value: number; max: number; rest: FeatureRest }[];
  items: {
    origin: string;
    attuned: boolean;
    prof: boolean;
    attribute: string;
  }[];
  monsters: string[];
  ac: number;
  hp: number;
  currentHp: number;
  init: number;
  speed: string;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  abilityImprovs: { origin: string; level: number; s1: string; s2: string; feat: string }[];
  saves: Saves;
  actions: string;
  profsLangs: string;
  senses: string;
  money: Money;
  skills: Skills;
  spellNotes: string;
  alignment: string;
  inspiration: number;
  castingHit: number;
  castingDC: number;
  deathSaves: number[];

  constructor(
    id?: number,
    name?: string,
    player?: string,
    campaign?: string,
    pic?: string,
    picBase64?: string,
    classes?: ClassSet[],
    race?: RaceSet,
    background?: string,
    spells?: { origin: string; prepared: boolean }[],
    spellSlots?: { origin: string; slots: number[]; max: number[] }[],
    activeSelections?: {
      selectionName: string;
      activeOption: {
        entityName: string;
        entityText: string;
        level: number;
      };
      featureName: string;
      featureCount: number;
      className: string;
    }[],
    currencyBonis?: { origin: string; value: number; max: number; rest: FeatureRest }[],
    currentFeatureUses?: { origin: string; value: number; max: number; rest: FeatureRest }[],
    items?: {
      origin: string;
      attuned: boolean;
      prof: boolean;
      attribute: string;
    }[],
    monsters?: string[],
    ac?: number,
    hp?: number,
    currentHp?: number,
    init?: number,
    speed?: string,
    str?: number,
    dex?: number,
    con?: number,
    int?: number,
    wis?: number,
    cha?: number,
    abilityImprovs?: { origin: string; level: number; s1: string; s2: string; feat: string }[],
    saves?: Saves,
    actions?: string,
    profsLangs?: string,
    senses?: string,
    money?: Money,
    skills?: Skills,
    spellNotes?: string,
    alignment?: string,
    inspiration?: number,
    castingHit?: number,
    castingDC?: number,
    deathSaves?: number[]
  ) {
    this.id = id || -1;
    this.name = name || "";
    this.player = player || "";
    this.campaign = campaign || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
    this.classes = classes || [];
    this.race = race || new RaceSet();
    this.background = background || "";
    this.spells = spells || [];
    this.spellSlots = spellSlots || [];
    this.activeSelections = activeSelections || [];
    this.currencyBonis = currencyBonis || [];
    this.currentFeatureUses = currentFeatureUses || [];
    this.items = items || [];
    this.monsters = monsters || [];
    this.ac = ac || 0;
    this.hp = hp || 0;
    this.currentHp = currentHp || 0;
    this.init = init || 0;
    this.speed = speed || "";
    this.str = str || 0;
    this.dex = dex || 0;
    this.con = con || 0;
    this.int = int || 0;
    this.wis = wis || 0;
    this.cha = cha || 0;
    this.abilityImprovs = abilityImprovs || [];
    this.saves = saves || new Saves();
    this.actions = actions || "";
    this.profsLangs = profsLangs || "";
    this.senses = senses || "";
    this.money = money || new Money();
    this.skills = skills || new Skills();
    this.spellNotes = spellNotes || "";
    this.alignment = alignment || "";
    this.inspiration = inspiration || 0;
    this.castingHit = castingHit || 0;
    this.castingDC = castingDC || 0;
    this.deathSaves = deathSaves || [0, 0, 0, 0, 0, 0];
  }
}

export function isChar(arg: any): arg is Char {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const playerCheck = arg.player !== undefined && typeof arg.player == "string";
  const campaignCheck = arg.campaign !== undefined && typeof arg.campaign == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const picBase64Check = arg.picBase64 !== undefined && typeof arg.picBase64 == "string";
  const raceCheck = arg.race !== undefined && isRaceSet(arg.race);
  const backgroundCheck = arg.background !== undefined && typeof arg.background == "string";
  const acCheck = arg.ac !== undefined && typeof arg.ac == "number";
  const hpCheck = arg.hp !== undefined && typeof arg.hp == "number";
  const currentHpCheck = arg.currentHp !== undefined && typeof arg.currentHp == "number";
  const initCheck = arg.init !== undefined && typeof arg.init == "number";
  const classesCheck =
    arg.classes !== undefined && Array.isArray(arg.classes) && isClassSet(arg.classes[0]);
  return (
    arg &&
    nameCheck &&
    playerCheck &&
    campaignCheck &&
    (picCheck || picBase64Check) &&
    raceCheck &&
    backgroundCheck &&
    acCheck &&
    hpCheck &&
    currentHpCheck &&
    initCheck &&
    classesCheck
  );
}
