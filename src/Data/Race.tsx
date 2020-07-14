import IEntity from "./IEntity";
import Trait from "./Trait";

export default class Race implements IEntity {
  id?: number;
  name: string;
  abilityScores: string;
  age: string;
  alignment: string;
  size: string;
  speed: string;
  lang: string;
  traits: Trait[];
  sources: string;
  filename: string;
  pic: string;

  constructor(
    name: string,
    id: number,
    filename: string,
    pic: string,
    abilityScores: string,
    age: string,
    alignment: string,
    size: string,
    speed: string,
    lang: string,
    traits: Trait[],
    sources: string
  ) {
    this.name = name;
    this.id = id;
    this.filename = filename;
    this.pic = pic;
    this.abilityScores = abilityScores;
    this.age = age;
    this.alignment = alignment;
    this.size = size;
    this.speed = speed;
    this.lang = lang;
    this.traits = traits;
    this.sources = sources;
  }
}

export function isRace(arg: any): arg is Race {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  return arg && nameCheck && picCheck;
}
