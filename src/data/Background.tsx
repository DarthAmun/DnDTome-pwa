import IEntity from "./IEntity";

export default class Background extends IEntity {
  proficiencies: string;
  description: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    proficiencies?: string,
    description?: string
  ) {
    super(id, name, sources, "");
    this.description = description || "";
    this.proficiencies = proficiencies || "";
  }
}
