import IEntity from "./IEntity";

export default class Spell implements IEntity {
  id?: number;
  name: string;
  classes: string;
  sources: string;
  level: number;
  school: string;
  time: string;
  range: string;
  components: string;
  duration: string;
  ritual: number;
  text: string;
  filename: string;
  pic: string;
  picBase64: string;

  constructor(
    name?: string,
    classes?: string,
    sources?: string,
    level?: number,
    school?: string,
    time?: string,
    range?: string,
    components?: string,
    duration?: string,
    ritual?: number,
    text?: string,
    id?: number,
    filename?: string,
    pic?: string,
    picBase64?: string
  ) {
    this.name = name || "";
    this.classes = classes || "";
    this.sources = sources || "";
    this.level = level || 0;
    this.school = school || "";
    this.time = time || "";
    this.range = range || "";
    this.components = components || "";
    this.duration = duration || "";
    this.ritual = ritual || 0;
    this.text = text || "";
    this.id = id;
    this.filename = filename || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
  }
}

export function isSpell(arg: any): arg is Spell {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const classesCheck = arg.classes !== undefined && typeof arg.classes == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  const levelCheck = arg.level !== undefined && typeof arg.level == "number";
  const schoolCheck = arg.school !== undefined && typeof arg.school == "string";
  const timeCheck = arg.time !== undefined && typeof arg.time == "string";
  const rangeCheck = arg.range !== undefined && typeof arg.range == "string";
  const compCheck = arg.components !== undefined && typeof arg.components == "string";
  const durationCheck = arg.duration !== undefined && typeof arg.duration == "string";
  const ritualCheck = arg.ritual !== undefined && typeof arg.ritual == "number";
  const textCheck = arg.text !== undefined && typeof arg.text == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const picBase64Check = arg.picBase64 !== undefined && typeof arg.picBase64 == "string";
  return (
    arg &&
    nameCheck &&
    classesCheck &&
    sourcesCheck &&
    levelCheck &&
    schoolCheck &&
    timeCheck &&
    rangeCheck &&
    compCheck &&
    durationCheck &&
    ritualCheck &&
    textCheck &&
    (picCheck || picBase64Check)
  );
}

export function findSpellFormattError(arg: any): {
  nameCheck: boolean;
  classesCheck: boolean;
  sourcesCheck: boolean;
  levelCheck: boolean;
  schoolCheck: boolean;
  timeCheck: boolean;
  rangeCheck: boolean;
  compCheck: boolean;
  durationCheck: boolean;
  ritualCheck: boolean;
  textCheck: boolean;
  picCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const classesCheck = arg.classes !== undefined && typeof arg.classes == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  const levelCheck = arg.level !== undefined && typeof arg.level == "number";
  const schoolCheck = arg.school !== undefined && typeof arg.school == "string";
  const timeCheck = arg.time !== undefined && typeof arg.time == "string";
  const rangeCheck = arg.range !== undefined && typeof arg.range == "string";
  const compCheck = arg.components !== undefined && typeof arg.components == "string";
  const durationCheck = arg.duration !== undefined && typeof arg.duration == "string";
  const ritualCheck = arg.ritual !== undefined && typeof arg.ritual == "number";
  const textCheck = arg.text !== undefined && typeof arg.text == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  return {
    nameCheck: nameCheck,
    classesCheck: classesCheck,
    sourcesCheck: sourcesCheck,
    levelCheck: levelCheck,
    schoolCheck: schoolCheck,
    timeCheck: timeCheck,
    rangeCheck: rangeCheck,
    compCheck: compCheck,
    durationCheck: durationCheck,
    ritualCheck: ritualCheck,
    textCheck: textCheck,
    picCheck: picCheck,
  };
}
