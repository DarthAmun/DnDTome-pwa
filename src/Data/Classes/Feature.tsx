import IEntity from "../IEntity";

export default class Feature implements IEntity {
  name: string;
  text: string;
  constructor(name: string,text: string) {
    this.name = name;
    this.text = text;
  }
}

export function isFeature(arg: any): arg is Feature {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const textCheck = arg.text !== undefined && typeof arg.text == "string";
  return arg && nameCheck && textCheck;
}
