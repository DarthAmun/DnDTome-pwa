import IEntity from "./IEntity";

export default class Feat extends IEntity {
  prerequisite: string;
  description: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    prerequisite?: string,
    description?: string
  ) {
    super(id, name, sources, "");
    this.description = description || "";
    this.prerequisite = prerequisite || "";
  }
}
