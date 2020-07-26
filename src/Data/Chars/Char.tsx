import Skills from "./Skills";
import Saves from "./Saves";
import Money from "./Money";
import IEntity from "../IEntity";
import ClassSet from "./ClassSet";

export default class Char implements IEntity {
  id?: number;
  name: string;
  player: string;
  prof: string;
  level: number;
  pic: string;
  classes: ClassSet[];
  race: string;
  background: string;
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
  saves: Saves;
  actions: string;
  bonusActions: string;
  reactions: string;
  features: string;
  profsLangs: string;
  senses: string;
  passivPerception: number;
  passivInsight: number;
  passivInvestigation: number;
  notesOne: string;
  notesTwo: string;
  notesThree: string;
  money: Money;
  skills: Skills;
  spellNotes: string;
  alignment: string;
  inspiration: number;
  castingHit: number;
  castingDC: number;

  constructor(
    id: number,
    name: string,
    player: string,
    prof: string,
    level: number,
    pic: string,
    classes: ClassSet[],
    race: string,
    background: string,
    ac: number,
    hp: number,
    currentHp: number,
    init: number,
    speed: string,
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number,
    saves: Saves,
    actions: string,
    bonusActions: string,
    reactions: string,
    features: string,
    profsLangs: string,
    senses: string,
    passivPerception: number,
    passivInsight: number,
    passivInvestigation: number,
    notesOne: string,
    notesTwo: string,
    notesThree: string,
    money: Money,
    skills: Skills,
    spellNotes: string,
    alignment: string,
    inspiration: number,
    castingHit: number,
    castingDC: number
  ) {
    this.id = id;
    this.name = name;
    this.player = player;
    this.prof = prof;
    this.level = level;
    this.pic = pic;
    this.classes = classes;
    this.race = race;
    this.background = background;
    this.ac = ac;
    this.hp = hp;
    this.currentHp = currentHp;
    this.init = init;
    this.speed = speed;
    this.str = str;
    this.dex = dex;
    this.con = con;
    this.int = int;
    this.wis = wis;
    this.cha = cha;
    this.saves = saves;
    this.actions = actions;
    this.bonusActions = bonusActions;
    this.reactions = reactions;
    this.features = features;
    this.profsLangs = profsLangs;
    this.senses = senses;
    this.passivPerception = passivPerception;
    this.passivInsight = passivInsight;
    this.passivInvestigation = passivInvestigation;
    this.notesOne = notesOne;
    this.notesTwo = notesTwo;
    this.notesThree = notesThree;
    this.money = money;
    this.skills = skills;
    this.spellNotes = spellNotes;
    this.alignment = alignment;
    this.inspiration = inspiration;
    this.castingHit = castingHit;
    this.castingDC = castingDC;
  }
}

export function isChar(arg: any): arg is Char {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  return arg && nameCheck;
}
