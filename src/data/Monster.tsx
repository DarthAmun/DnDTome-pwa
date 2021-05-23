import IEntity from "./IEntity";

export default class Monster implements IEntity {
  id?: number;
  filename: string;
  name: string;
  pic: string;
  picBase64: string;
  sources: string;
  size: string;
  type: string;
  subtype: string;
  alignment: string;
  ac: number;
  hp: number;
  speed: string;
  cr: number;
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
    id?: number,
    name?: string,
    sources?: string,
    pic?: string,
    picBase64?: string,
    size?: string,
    type?: string,
    subtype?: string,
    alignment?: string,
    ac?: number,
    hp?: number,
    speed?: string,
    cr?: number,
    str?: number,
    dex?: number,
    con?: number,
    int?: number,
    wis?: number,
    cha?: number,
    savingThrows?: string,
    skills?: string,
    senses?: string,
    lang?: string,
    dmgVulnerabilitie?: string,
    dmgResistance?: string,
    dmgImmunities?: string,
    conImmunities?: string,
    sAblt?: string,
    ablt?: string,
    lAblt?: string,
    filename?: string
  ) {
    this.name = name || "";
    this.sources = sources || "";
    this.id = id;
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
    this.size = size || "";
    this.type = type || "";
    this.subtype = subtype || "";
    this.alignment = alignment || "";
    this.ac = ac || 0;
    this.hp = hp || 0;
    this.speed = speed || "";
    this.cr = cr || 0;
    this.str = str || 0;
    this.dex = dex || 0;
    this.con = con || 0;
    this.int = int || 0;
    this.wis = wis || 0;
    this.cha = cha || 0;
    this.savingThrows = savingThrows || "";
    this.skills = skills || "";
    this.senses = senses || "";
    this.lang = lang || "";
    this.dmgVulnerabilitie = dmgVulnerabilitie || "";
    this.dmgResistance = dmgResistance || "";
    this.dmgImmunities = dmgImmunities || "";
    this.conImmunities = conImmunities || "";
    this.sAblt = sAblt || "";
    this.ablt = ablt || "";
    this.lAblt = lAblt || "";
    this.filename = filename || "";
  }
}

export function isMonster(arg: any): arg is Monster {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const picBase64Check = arg.picBase64 !== undefined && typeof arg.picBase64 == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  const sizeCheck = arg.size !== undefined && typeof arg.size == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const subtypeCheck = arg.subtype !== undefined && typeof arg.subtype == "string";
  const alignmentCheck = arg.alignment !== undefined && typeof arg.alignment == "string";
  const acCheck = arg.ac !== undefined && typeof arg.ac == "number";
  const hpCheck = arg.hp !== undefined && typeof arg.hp == "number";
  const speedCheck = arg.speed !== undefined && typeof arg.speed == "string";
  const crCheck = arg.cr !== undefined && typeof arg.cr == "number";
  const strCheck = arg.str !== undefined && typeof arg.str == "number";
  const dexCheck = arg.dex !== undefined && typeof arg.dex == "number";
  const conCheck = arg.con !== undefined && typeof arg.con == "number";
  const intCheck = arg.int !== undefined && typeof arg.int == "number";
  const wisCheck = arg.wis !== undefined && typeof arg.wis == "number";
  const chaCheck = arg.cha !== undefined && typeof arg.cha == "number";
  const savingThrowsCheck = arg.savingThrows !== undefined && typeof arg.savingThrows == "string";
  const skillsCheck = arg.skills !== undefined && typeof arg.skills == "string";
  const sensesCheck = arg.senses !== undefined && typeof arg.senses == "string";
  const langCheck = arg.lang !== undefined && typeof arg.lang == "string";
  const dmgVulnerabilitieCheck =
    arg.dmgVulnerabilitie !== undefined && typeof arg.dmgVulnerabilitie == "string";
  const dmgResistanceCheck =
    arg.dmgResistance !== undefined && typeof arg.dmgResistance == "string";
  const dmgImmunitiesCheck =
    arg.dmgImmunities !== undefined && typeof arg.dmgImmunities == "string";
  const conImmunitiesCheck =
    arg.conImmunities !== undefined && typeof arg.conImmunities == "string";
  const sAbltCheck = arg.sAblt !== undefined && typeof arg.sAblt == "string";
  const abltCheck = arg.ablt !== undefined && typeof arg.ablt == "string";
  const lAbltCheck = arg.lAblt !== undefined && typeof arg.lAblt == "string";

  return (
    arg &&
    nameCheck &&
    (picCheck || picBase64Check) &&
    sourcesCheck &&
    sizeCheck &&
    typeCheck &&
    subtypeCheck &&
    alignmentCheck &&
    acCheck &&
    hpCheck &&
    speedCheck &&
    crCheck &&
    strCheck &&
    dexCheck &&
    conCheck &&
    intCheck &&
    wisCheck &&
    chaCheck &&
    savingThrowsCheck &&
    skillsCheck &&
    sensesCheck &&
    langCheck &&
    dmgVulnerabilitieCheck &&
    dmgResistanceCheck &&
    dmgImmunitiesCheck &&
    conImmunitiesCheck &&
    sAbltCheck &&
    abltCheck &&
    lAbltCheck
  );
}

export function findMonsterFormattError(arg: any): {
  nameCheck: boolean;
  picCheck: boolean;
  sourcesCheck: boolean;
  sizeCheck: boolean;
  typeCheck: boolean;
  subtypeCheck: boolean;
  alignmentCheck: boolean;
  acCheck: boolean;
  hpCheck: boolean;
  speedCheck: boolean;
  crCheck: boolean;
  strCheck: boolean;
  dexCheck: boolean;
  conCheck: boolean;
  intCheck: boolean;
  wisCheck: boolean;
  chaCheck: boolean;
  savingThrowsCheck: boolean;
  skillsCheck: boolean;
  sensesCheck: boolean;
  langCheck: boolean;
  dmgVulnerabilitieCheck: boolean;
  dmgResistanceCheck: boolean;
  dmgImmunitiesCheck: boolean;
  conImmunitiesCheck: boolean;
  sAbltCheck: boolean;
  abltCheck: boolean;
  lAbltCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  const sizeCheck = arg.size !== undefined && typeof arg.size == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const subtypeCheck = arg.subtype !== undefined && typeof arg.subtype == "string";
  const alignmentCheck = arg.alignment !== undefined && typeof arg.alignment == "string";
  const acCheck = arg.ac !== undefined && typeof arg.ac == "number";
  const hpCheck = arg.hp !== undefined && typeof arg.hp == "number";
  const speedCheck = arg.speed !== undefined && typeof arg.speed == "string";
  const crCheck = arg.cr !== undefined && typeof arg.cr == "number";
  const strCheck = arg.str !== undefined && typeof arg.str == "number";
  const dexCheck = arg.dex !== undefined && typeof arg.dex == "number";
  const conCheck = arg.con !== undefined && typeof arg.con == "number";
  const intCheck = arg.int !== undefined && typeof arg.int == "number";
  const wisCheck = arg.wis !== undefined && typeof arg.wis == "number";
  const chaCheck = arg.cha !== undefined && typeof arg.cha == "number";
  const savingThrowsCheck = arg.savingThrows !== undefined && typeof arg.savingThrows == "string";
  const skillsCheck = arg.skills !== undefined && typeof arg.skills == "string";
  const sensesCheck = arg.senses !== undefined && typeof arg.senses == "string";
  const langCheck = arg.lang !== undefined && typeof arg.lang == "string";
  const dmgVulnerabilitieCheck =
    arg.dmgVulnerabilitie !== undefined && typeof arg.dmgVulnerabilitie == "string";
  const dmgResistanceCheck =
    arg.dmgResistance !== undefined && typeof arg.dmgResistance == "string";
  const dmgImmunitiesCheck =
    arg.dmgImmunities !== undefined && typeof arg.dmgImmunities == "string";
  const conImmunitiesCheck =
    arg.conImmunities !== undefined && typeof arg.conImmunities == "string";
  const sAbltCheck = arg.sAblt !== undefined && typeof arg.sAblt == "string";
  const abltCheck = arg.ablt !== undefined && typeof arg.ablt == "string";
  const lAbltCheck = arg.lAblt !== undefined && typeof arg.lAblt == "string";

  return {
    nameCheck: nameCheck,
    picCheck: picCheck,
    sourcesCheck: sourcesCheck,
    sizeCheck: sizeCheck,
    typeCheck: typeCheck,
    subtypeCheck: subtypeCheck,
    alignmentCheck: alignmentCheck,
    acCheck: acCheck,
    hpCheck: hpCheck,
    speedCheck: speedCheck,
    crCheck: crCheck,
    strCheck: strCheck,
    dexCheck: dexCheck,
    conCheck: conCheck,
    intCheck: intCheck,
    wisCheck: wisCheck,
    chaCheck: chaCheck,
    savingThrowsCheck: savingThrowsCheck,
    skillsCheck: skillsCheck,
    sensesCheck: sensesCheck,
    langCheck: langCheck,
    dmgVulnerabilitieCheck: dmgVulnerabilitieCheck,
    dmgResistanceCheck: dmgResistanceCheck,
    dmgImmunitiesCheck: dmgImmunitiesCheck,
    conImmunitiesCheck: conImmunitiesCheck,
    sAbltCheck: sAbltCheck,
    abltCheck: abltCheck,
    lAbltCheck: lAbltCheck,
  };
}
