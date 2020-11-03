import Feature, { isFeature } from "./Feature";
import Boni from "./Boni";

export default class FeatureSet {
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
  const levelCheck = arg.level !== undefined && typeof arg.level == "number";
  const profBonusCheck =
    arg.profBonus !== undefined && typeof arg.profBonus == "number";
  const featuresCheck =
    arg.features !== undefined &&
    Array.isArray(arg.features) &&
    isFeature(arg.features[0]);

  return arg && levelCheck && profBonusCheck && featuresCheck;
}
