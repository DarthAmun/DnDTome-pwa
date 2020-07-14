import IEntity from "./IEntity";

export default class Trait implements IEntity {
  id?: number;
  name: string;
  text: string;
  level: number;
  constructor(name: string, id: number, text: string, level: number) {
    this.name = name;
    this.id = id;
    this.text = text;
    this.level = level;
  }
}
