import IEntity from "../IEntity";

export default class Location implements IEntity {
  id?: number;
  name: string;

  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name || "";
  }
}
