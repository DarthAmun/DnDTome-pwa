import IEntity from "../IEntity";

export default class World extends IEntity {
  description: string;
  locations: string[];
  events: string[];
  map: string;

  constructor(
    id?: number,
    name?: string,
    description?: string,
    locations?: string[],
    events?: string[],
    map?: string,
    sources?: string
  ) {
    super(id, name, sources, "");
    this.description = description || "";
    this.locations = locations || [];
    this.events = events || [];
    this.map = map || "";
  }
}

export function isWorld(arg: any): arg is World {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const descriptionCheck = arg.description !== undefined && typeof arg.description == "string";
  const locationCheck = arg.locations !== undefined && Array.isArray(arg.locations);
  const eventCheck = arg.events !== undefined && Array.isArray(arg.events);
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  const mapCheck = arg.map !== undefined && typeof arg.map == "string";
  return (
    arg && nameCheck && descriptionCheck && locationCheck && eventCheck && sourcesCheck && mapCheck
  );
}
