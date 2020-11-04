import IEntity from "../IEntity";
import FeatureSet, { isFeatureSet } from "./FeatureSet";

export default class Subclass implements IEntity {
  id?: number;
  name: string;
  type: string;
  features: FeatureSet[];
  sources: string;
  filename: string;

  constructor(
    id?: number,
    name?: string,
    type?: string,
    features?: FeatureSet[],
    filename?: string,
    sources?: string
  ) {
    this.id = id;
    this.name = name || "";
    this.type = type || "";
    this.features = features || [];
    this.filename = filename || "";
    this.sources = sources || "";
  }
}

export function isSubclass(arg: any): arg is Subclass {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const featuresCheck =
    arg.features !== undefined &&
    Array.isArray(arg.features) &&
    isFeatureSet(arg.features[0]);
  const sourcesCheck =
    arg.sources !== undefined && typeof arg.sources == "string";
  return arg && nameCheck && typeCheck && sourcesCheck && featuresCheck;
}

export function formattSubclassFromattError(
  arg: any
): {
  nameCheck: boolean;
  typeCheck: boolean;
  sourcesCheck: boolean;
  featuresCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const featuresCheck =
    arg.features !== undefined &&
    Array.isArray(arg.features) &&
    isFeatureSet(arg.features[0]);
  const sourcesCheck =
    arg.sources !== undefined && typeof arg.sources == "string";
  return {
    nameCheck: nameCheck,
    typeCheck: typeCheck,
    sourcesCheck: sourcesCheck,
    featuresCheck: featuresCheck,
  };
}
