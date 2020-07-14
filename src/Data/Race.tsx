import IEntity from "./IEntity";
import Trait, { isTrait } from "./Trait";

export default class Race implements IEntity {
  id?: number;
  name: string;
  type: string;
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
    type: string,
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
    this.type = type;
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
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const abilityScoresCheck =
    arg.abilityScores !== undefined && typeof arg.abilityScores == "string";
  const ageCheck = arg.age !== undefined && typeof arg.age == "string";
  const alignmentCheck =
    arg.alignment !== undefined && typeof arg.alignment == "string";
  const sizeCheck = arg.size !== undefined && typeof arg.size == "string";
  const speedCheck = arg.speed !== undefined && typeof arg.speed == "string";
  const langCheck = arg.lang !== undefined && typeof arg.lang == "string";
  const traitsCheck =
    arg.traits !== undefined &&
    Array.isArray(arg.traits) &&
    isTrait(arg.traits[0]);
  const sourcesCheck =
    arg.sources !== undefined && typeof arg.sources == "string";
  return (
    arg &&
    nameCheck &&
    typeCheck &&
    picCheck &&
    abilityScoresCheck &&
    ageCheck &&
    alignmentCheck &&
    sizeCheck &&
    speedCheck &&
    langCheck &&
    traitsCheck &&
    sourcesCheck
  );
}
