import IEntity from "../IEntity";

export default class Boni implements IEntity {
  name: string;
  value: string;
  isCurrency: boolean;
  constructor(name: string, value: string, isCurrency: boolean) {
    this.name = name;
    this.value = value;
    this.isCurrency = isCurrency;
  }
}

export function isBoni(arg: any): arg is Boni {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const valueCheck = arg.value !== undefined && typeof arg.value == "string";
  const isCurrencyCheck = arg.isCurrency !== undefined && typeof arg.isCurrency == "boolean";
  return arg && nameCheck && valueCheck && isCurrencyCheck;
}
