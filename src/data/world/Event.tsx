import IEntity from "../IEntity";

export default class Event extends IEntity {
  description: string;
  date: string;

  constructor(id?: number, name?: string, description?: string, date?: string, sources?: string) {
    super(id, name, sources, "");
    this.description = description || "";
    this.date = date || "";
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
