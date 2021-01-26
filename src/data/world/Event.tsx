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

export function isEvent(arg: any): arg is Event {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const descriptionCheck = arg.description !== undefined && typeof arg.description == "string";
  const dateCheck = arg.date !== undefined && typeof arg.date == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  const mapCheck = arg.map !== undefined && typeof arg.map == "string";
  return arg && nameCheck && descriptionCheck && dateCheck && sourcesCheck && mapCheck;
}
