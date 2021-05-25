import IEntity from "./IEntity";

export default class Background implements IEntity {
  id?: number;
  name: string;
  sources: string;
  proficiencies: string;
  description: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    proficiencies?: string,
    description?: string
  ) {
    this.id = id;
    this.name = name || "";
    this.description = description || "";
    this.proficiencies = proficiencies || "";
    this.sources = sources || "";
  }
}
