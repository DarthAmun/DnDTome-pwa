import IEntity from "./IEntity";

export default class Feat implements IEntity {
  id?: number;
  name: string;
  sources: string;
  prerequisite: string;
  description: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    prerequisite?: string,
    description?: string
  ) {
    this.id = id;
    this.name = name || "";
    this.description = description || "";
    this.prerequisite = prerequisite || "";
    this.sources = sources || "";
  }
}
