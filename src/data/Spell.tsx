import IEntity from "./IEntity";

export default class Spell extends IEntity {
  classes: string[];
  level: number;
  school: string;
  time: string;
  range: string;
  components: string;
  duration: string;
  ritual: boolean;
  description: string;
  higherLevel: string;
  pic: string;
  picBase64: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    filename?: string,
    classes?: string[],
    level?: number,
    school?: string,
    time?: string,
    range?: string,
    components?: string,
    duration?: string,
    ritual?: boolean,
    description?: string,
    higherLevel?: string,
    pic?: string,
    picBase64?: string
  ) {
    super(id, name, sources, filename);
    this.classes = classes || [];
    this.level = level || 0;
    this.school = school || "";
    this.time = time || "";
    this.range = range || "";
    this.components = components || "";
    this.duration = duration || "";
    this.ritual = ritual || false;
    this.description = description || "";
    this.higherLevel = higherLevel || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
  }
}

export function isSpell(arg: any): arg is Spell {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
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
