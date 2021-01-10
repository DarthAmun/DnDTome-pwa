import { LatLng } from "leaflet";
import IEntity from "../IEntity";

export default class Location implements IEntity {
  id?: number;
  name: string;
  map: string;
  dimension: { height: number; width: number };
  markers: { position: LatLng; text: string }[];
  sources: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    map?: string,
    dimension?: { height: number; width: number },
    markers?: { position: LatLng; text: string }[]
  ) {
    this.id = id;
    this.name = name || "";
    this.sources = sources || "";
    this.map = map || "";
    this.dimension = dimension || {
      height: 1,
      width: 1,
    };
    this.markers = markers || [];
  }
}

export function isLocation(arg: any): arg is Location {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  const mapCheck = arg.map !== undefined && typeof arg.map == "string";
  return arg && nameCheck && sourcesCheck && mapCheck;
}
