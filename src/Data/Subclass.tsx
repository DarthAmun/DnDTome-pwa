import IEntity from "./IEntity";
import Trait, { isTrait } from "./Trait";

export default class Subclass implements IEntity {
  id?: number;
  name: string;
  type: string;
  features: Trait[];
  sources: string;
  filename: string;

  constructor(
    id: number,
    name: string,
    type: string,
    features: Trait[],
    filename: string,
    sources: string,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.features = features;
    this.filename = filename;
    this.sources = sources;
  }
}

export function isSubclass(arg: any): arg is Subclass {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const featuresCheck =
    arg.features !== undefined &&
    Array.isArray(arg.features) &&
    isTrait(arg.features[0]);
  const sourcesCheck =
    arg.sources !== undefined && typeof arg.sources == "string";
  return (
    arg &&
    nameCheck &&
    typeCheck &&
    sourcesCheck &&
    featuresCheck
  );
}
