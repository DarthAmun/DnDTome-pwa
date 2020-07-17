import IEntity from "./IEntity";
import FeatureSet from "./FeatureSet";

export default class Class implements IEntity {
  id?: number;
  name: string;
  featureSets: FeatureSet[];
  hitDices: string;
  proficiencies: string;
  equipment: string;
  sources: string;
  filename: string;
  pic: string;

  constructor(
    id: number,
    name: string,
    levels: FeatureSet[],
    hitDices: string,
    proficiencies: string,
    equipment: string,
    filename: string,
    sources: string,
    pic: string
  ) {
    this.id = id;
    this.name = name;
    this.featureSets = levels;
    this.hitDices = hitDices;
    this.proficiencies = proficiencies;
    this.equipment = equipment;
    this.filename = filename;
    this.sources = sources;
    this.pic = pic;
  }
}

export function isClass(arg: any): arg is Class {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const sourcesCheck =
    arg.sources !== undefined && typeof arg.sources == "string";
  return arg && nameCheck && sourcesCheck;
}
