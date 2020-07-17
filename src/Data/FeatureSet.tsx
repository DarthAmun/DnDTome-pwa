import Feature from "./Feature";
import Boni from "./Boni";

export default class FeatureSet{
  level: number;
  profBonus: number;
  features: Feature[];
  bonis?: Boni[];
  spellslots?: number[];

  constructor(
    level: number,
    profBonus: number,
    features: Feature[],
    bonis?: Boni[],
    spellslots?: number[]
  ) {
    this.level = level;
    this.profBonus = profBonus;
    this.features = features;
    this.bonis = bonis;
    this.spellslots = spellslots;
  }
}

export function isFeatureSet(arg: any): arg is FeatureSet {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const sourcesCheck =
    arg.sources !== undefined && typeof arg.sources == "string";
  return arg && nameCheck && sourcesCheck;
}
