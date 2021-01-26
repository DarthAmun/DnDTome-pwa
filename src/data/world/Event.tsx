import IEntity from "../IEntity";

export default class Event implements IEntity {
  id?: number;
  name: string;
  description: string;
  date: string;
  sources: string;

  constructor(id?: number, name?: string, description?: string, date?: string, sources?: string) {
    this.id = id;
    this.name = name || "";
    this.description = description || "";
    this.date = date || "";
    this.sources = sources || "";
  }
}
