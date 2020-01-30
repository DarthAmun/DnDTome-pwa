export default class Monster {
  id: number;
  name: string;
  pic: string;
  sources: string;
  size: string;
  type: string;
  subtype: string;
  alignment: string;
  ac: number;
  hp: number;
  speed: string;
  cr: string;
  source: string;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  savingThrows: string;
  skills: string;
  senses: string;
  lang: string;
  dmgVulnerabilitie: string;
  dmgResistance: string;
  dmgImmunities: string;
  conImmunities: string;
  sAblt: string;
  ablt: string;
  lAblt: string;

  constructor(
    id: number,
    name: string,
    sources: string,
    pic: string,
    size: string,
    type: string,
    subtype: string,
    alignment: string,
    ac: number,
    hp: number,
    speed: string,
    cr: string,
    source: string,
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number,
    savingThrows: string,
    skills: string,
    senses: string,
    lang: string,
    dmgVulnerabilitie: string,
    dmgResistance: string,
    dmgImmunities: string,
    conImmunities: string,
    sAblt: string,
    ablt: string,
    lAblt: string
  ) {
    this.name = name;
    this.sources = sources;
    this.id = id;
    this.pic = pic;
    this.size = size;
    this.type = type;
    this.subtype = subtype;
    this.alignment = alignment;
    this.ac = ac;
    this.hp = hp;
    this.speed = speed;
    this.cr = cr;
    this.source = source;
    this.str = str;
    this.dex = dex;
    this.con = con;
    this.int = int;
    this.wis = wis;
    this.cha = cha;
    this.savingThrows = savingThrows;
    this.skills = skills;
    this.senses = senses;
    this.lang = lang;
    this.dmgVulnerabilitie = dmgVulnerabilitie;
    this.dmgResistance = dmgResistance;
    this.dmgImmunities = dmgImmunities;
    this.conImmunities = conImmunities;
    this.sAblt = sAblt;
    this.ablt = ablt;
    this.lAblt = lAblt;
  }
}
