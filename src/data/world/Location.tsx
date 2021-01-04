import IEntity from "../IEntity";

export default class Location implements IEntity {
  id?: number;
  name: string;
  map: string;
  dimension: { height: number; width: number };
  sources: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    map?: string,
    dimension?: { height: number; width: number }
  ) {
    this.id = id;
    this.name = name || "";
    this.sources = sources || "";
    this.map = map || "";
    this.dimension = dimension || {
      height: 0,
      width: 0,
    };
  }
}
