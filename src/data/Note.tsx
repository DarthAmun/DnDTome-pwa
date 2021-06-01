import IEntity from "./IEntity";

export default class Note implements IEntity {
  id?: number;
  name: string;
  sources: string;
  text: string;
  tags: string;

  constructor(id?: number, name?: string, sources?: string, text?: string, tags?: string) {
    this.id = id;
    this.name = name || "";
    this.text = text || "";
    this.tags = tags || "";
    this.sources = sources || "";
  }
}
