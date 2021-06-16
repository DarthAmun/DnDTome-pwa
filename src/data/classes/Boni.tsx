import IEntity from "../IEntity";
import { FeatureRest } from "./Feature";

export default class Boni implements IEntity {
  name: string;
  value: string;
  isCurrency: boolean;
  rest: FeatureRest;

  constructor(name: string, value: string, isCurrency: boolean, rest: FeatureRest) {
    this.name = name;
    this.value = value;
    this.isCurrency = isCurrency;
    this.rest = rest | FeatureRest.none;
  }
}

export function isBoni(arg: any): arg is Boni {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const valueCheck = arg.value !== undefined && typeof arg.value == "string";
  const isCurrencyCheck = arg.isCurrency !== undefined && typeof arg.isCurrency == "boolean";
  return arg && nameCheck && valueCheck && isCurrencyCheck;
}
