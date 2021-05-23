import IEntity from "../IEntity";
import Trait, { isTrait } from "./Trait";

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
  picBase64: string;

  constructor(
    name?: string,
    id?: number,
    filename?: string,
    pic?: string,
    picBase64?: string,
    abilityScores?: string,
    age?: string,
    alignment?: string,
    size?: string,
    speed?: string,
    lang?: string,
    traits?: Trait[],
    sources?: string
  ) {
    this.name = name || "";
    this.id = id;
    this.filename = filename || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
    this.abilityScores = abilityScores || "";
    this.age = age || "";
    this.alignment = alignment || "";
    this.size = size || "";
    this.speed = speed || "";
    this.lang = lang || "";
    this.traits = traits || [];
    this.sources = sources || "";
  }
}

export function isRace(arg: any): arg is Race {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const picBase64Check = arg.picBase64 !== undefined && typeof arg.picBase64 == "string";
  const abilityScoresCheck =
    arg.abilityScores !== undefined && typeof arg.abilityScores == "string";
  const ageCheck = arg.age !== undefined && typeof arg.age == "string";
  const alignmentCheck = arg.alignment !== undefined && typeof arg.alignment == "string";
  const sizeCheck = arg.size !== undefined && typeof arg.size == "string";
  const speedCheck = arg.speed !== undefined && typeof arg.speed == "string";
  const langCheck = arg.lang !== undefined && typeof arg.lang == "string";
  const traitsCheck =
    arg.traits !== undefined && Array.isArray(arg.traits) && isTrait(arg.traits[0]);
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  return (
    arg &&
    nameCheck &&
    (picCheck || picBase64Check) &&
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

export function findRaceFormattError(arg: any): {
  nameCheck: boolean;
  picCheck: boolean;
  abilityScoresCheck: boolean;
  ageCheck: boolean;
  alignmentCheck: boolean;
  sizeCheck: boolean;
  speedCheck: boolean;
  langCheck: boolean;
  traitsCheck: boolean;
  sourcesCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const abilityScoresCheck =
    arg.abilityScores !== undefined && typeof arg.abilityScores == "string";
  const ageCheck = arg.age !== undefined && typeof arg.age == "string";
  const alignmentCheck = arg.alignment !== undefined && typeof arg.alignment == "string";
  const sizeCheck = arg.size !== undefined && typeof arg.size == "string";
  const speedCheck = arg.speed !== undefined && typeof arg.speed == "string";
  const langCheck = arg.lang !== undefined && typeof arg.lang == "string";
  const traitsCheck =
    arg.traits !== undefined && Array.isArray(arg.traits) && isTrait(arg.traits[0]);
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  return {
    nameCheck: nameCheck,
    picCheck: picCheck,
    abilityScoresCheck: abilityScoresCheck,
    ageCheck: ageCheck,
    alignmentCheck: alignmentCheck,
    sizeCheck: sizeCheck,
    speedCheck: speedCheck,
    langCheck: langCheck,
    traitsCheck: traitsCheck,
    sourcesCheck: sourcesCheck,
  };
}
