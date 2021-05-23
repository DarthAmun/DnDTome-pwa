import IEntity from "../IEntity";
import FeatureSet, { isFeatureSet } from "./FeatureSet";

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
  picBase64: string;

  constructor(
    id?: number,
    name?: string,
    featureSets?: FeatureSet[],
    hitDices?: string,
    proficiencies?: string,
    equipment?: string,
    filename?: string,
    sources?: string,
    pic?: string,
    picBase64?: string
  ) {
    this.id = id;
    this.name = name || "";
    this.featureSets = featureSets || [];
    this.hitDices = hitDices || "";
    this.proficiencies = proficiencies || "";
    this.equipment = equipment || "";
    this.filename = filename || "";
    this.sources = sources || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
  }
}

export function isClass(arg: any): arg is Class {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const featureSetsCheck =
    arg.featureSets !== undefined &&
    Array.isArray(arg.featureSets) &&
    isFeatureSet(arg.featureSets[0]);
  const hitDicesCheck = arg.hitDices !== undefined && typeof arg.hitDices == "string";
  const proficienciesCheck =
    arg.proficiencies !== undefined && typeof arg.proficiencies == "string";
  const equipmentCheck = arg.equipment !== undefined && typeof arg.equipment == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const picBase64Check = arg.picBase64 !== undefined && typeof arg.picBase64 == "string";
  return (
    arg &&
    nameCheck &&
    sourcesCheck &&
    featureSetsCheck &&
    hitDicesCheck &&
    proficienciesCheck &&
    equipmentCheck &&
    (picCheck || picBase64Check)
  );
}

export function findClassFormattError(arg: any): {
  nameCheck: boolean;
  sourcesCheck: boolean;
  featureSetsCheck: boolean;
  hitDicesCheck: boolean;
  proficienciesCheck: boolean;
  equipmentCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const featureSetsCheck =
    arg.featureSets !== undefined &&
    Array.isArray(arg.featureSets) &&
    isFeatureSet(arg.featureSets[0]);
  const hitDicesCheck = arg.hitDices !== undefined && typeof arg.hitDices == "string";
  const proficienciesCheck =
    arg.proficiencies !== undefined && typeof arg.proficiencies == "string";
  const equipmentCheck = arg.equipment !== undefined && typeof arg.equipment == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  return {
    nameCheck: nameCheck,
    sourcesCheck: sourcesCheck,
    featureSetsCheck: featureSetsCheck,
    hitDicesCheck: hitDicesCheck,
    proficienciesCheck: proficienciesCheck,
    equipmentCheck: equipmentCheck,
  };
}
