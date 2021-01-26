import IEntity from "../IEntity";

export default class World implements IEntity {
  id?: number;
  name: string;
  description: string;
  locations: string[];
  events: string[];
  map: string;
  sources: string;

  constructor(
    id?: number,
    name?: string,
    description?: string,
    locations?: string[],
    events?: string[],
    map?: string,
    sources?: string
  ) {
    this.id = id;
    this.name = name || "";
    this.description = description || "";
    this.locations = locations || [];
    this.events = events || [];
    this.map = map || "";
    this.sources = sources || "";
  }
}
