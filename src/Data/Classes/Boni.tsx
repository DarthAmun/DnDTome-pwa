import IEntity from "../IEntity";

export default class Boni implements IEntity {
  name: string;
  value: string;
  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

export function isBoni(arg: any): arg is Boni {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const valueCheck = arg.value !== undefined && typeof arg.value == "string";
  return arg && nameCheck && valueCheck;
}
