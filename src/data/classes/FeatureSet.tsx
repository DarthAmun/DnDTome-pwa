import Feature, { isFeature } from "./Feature";
import Boni from "./Boni";

export default class FeatureSet {
  level: number;
  features: Feature[];
  bonis?: Boni[];
  spellslots?: number[];
  isAbilityImprov: boolean;

  constructor(
    level: number,
    features: Feature[],
    bonis?: Boni[],
    spellslots?: number[],
    isAbilityImprov?: boolean
  ) {
    this.level = level;
    this.features = features;
    this.bonis = bonis;
    this.spellslots = spellslots;
    this.isAbilityImprov = isAbilityImprov || false;
  }
}

export function isFeatureSet(arg: any): arg is FeatureSet {
  const levelCheck = arg.level !== undefined && typeof arg.level == "number";
  const featuresCheck =
    arg.features !== undefined && Array.isArray(arg.features) && isFeature(arg.features[0]);
  const isAbilityImprovCheck =
    arg.isAbilityImprov !== undefined && typeof arg.isAbilityImprov == "boolean";

  return arg && levelCheck && featuresCheck && isAbilityImprovCheck;
}
