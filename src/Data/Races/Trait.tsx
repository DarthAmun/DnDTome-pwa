import IEntity from "../IEntity";

export default class Trait implements IEntity {
  name: string;
  text: string;
  level: number;
  constructor(name: string, text: string, level: number) {
    this.name = name;
    this.text = text;
    this.level = level;
  }
}

export function isTrait(arg: any): arg is Trait {
  if (arg !== undefined) {
    const nameCheck = arg.name !== undefined && typeof arg.name == "string";
    const textCheck = arg.text !== undefined && typeof arg.text == "string";
    const levelCheck = arg.level !== undefined && typeof arg.level == "number";
    return arg && nameCheck && textCheck && levelCheck;
  } else {
    return true;
  }
}
