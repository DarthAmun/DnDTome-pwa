import IEntity from "../IEntity";
import FeatureSet, { isFeatureSet } from "./FeatureSet";

export default class Subclass extends IEntity {
  type: string;
  features: FeatureSet[];

  constructor(
    id?: number,
    name?: string,
    type?: string,
    features?: FeatureSet[],
    filename?: string,
    sources?: string
  ) {
    super(id, name, sources, filename);
    this.type = type || "";
    this.features = features || [];
  }
}

export function isSubclass(arg: any): arg is Subclass {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const featuresCheck =
    arg.features !== undefined && Array.isArray(arg.features) && isFeatureSet(arg.features[0]);
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  return arg && nameCheck && typeCheck && sourcesCheck && featuresCheck;
}

export function formattSubclassFromattError(arg: any): {
  nameCheck: boolean;
  typeCheck: boolean;
  sourcesCheck: boolean;
  featuresCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const featuresCheck =
    arg.features !== undefined && Array.isArray(arg.features) && isFeatureSet(arg.features[0]);
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  return {
    nameCheck: nameCheck,
    typeCheck: typeCheck,
    sourcesCheck: sourcesCheck,
    featuresCheck: featuresCheck,
  };
}
