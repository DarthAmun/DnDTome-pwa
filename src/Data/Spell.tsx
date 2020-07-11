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

  constructor(
    name: string,
    classes: string,
    sources: string,
    level: number,
    school: string,
    time: string,
    range: string,
    components: string,
    duration: string,
    ritual: number,
    text: string,
    id: number,
    filename: string,
    pic: string
  ) {
    this.name = name;
    this.classes = classes;
    this.sources = sources;
    this.level = level;
    this.school = school;
    this.time = time;
    this.range = range;
    this.components = components;
    this.duration = duration;
    this.ritual = ritual;
    this.text = text;
    this.id = id;
    this.filename = filename;
    this.pic = pic;
  }
}

export function isSpell(arg: any): arg is Spell {
  const nameCheck = arg.name && typeof arg.name == "string";
  const classesCheck = arg.classes && typeof arg.classes == "string";
  const sourcesCheck = arg.sources && typeof arg.sources == "string";
  const levelCheck = arg.level !== undefined && typeof arg.level == "number";
  const schoolCheck = arg.school && typeof arg.school == "string";
  const timeCheck = arg.time && typeof arg.time == "string";
  const rangeCheck = arg.range && typeof arg.range == "string";
  const compCheck = arg.components && typeof arg.components == "string";
  const durationCheck = arg.duration && typeof arg.duration == "string";
  const ritualCheck = arg.ritual !== undefined && typeof arg.ritual == "number";
  const textCheck = arg.text && typeof arg.text == "string";
  const picCheck = arg.pic && typeof arg.pic == "string";
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
    picCheck
  );
}
