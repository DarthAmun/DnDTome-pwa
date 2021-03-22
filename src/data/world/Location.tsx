import { LatLng } from "leaflet";
import IEntity from "../IEntity";

export default class Location implements IEntity {
  id?: number;
  name: string;
  map: string;
  mapBase64: string;
  dimension: { height: number; width: number };
  markers: { position: LatLng; text: string }[];
  sources: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    map?: string,
    mapBase64?: string,
    dimension?: { height: number; width: number },
    markers?: { position: LatLng; text: string }[]
  ) {
    this.id = id;
    this.name = name || "";
    this.sources = sources || "";
    this.map = map || "";
    this.mapBase64 = mapBase64 || "";
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
  const mapBase64Check = arg.mapBase64 !== undefined && typeof arg.mapBase64 == "string";
  const dimensionCheck =
    arg.dimension !== undefined &&
    typeof arg.dimension.height == "number" &&
    typeof arg.dimension.width == "number";
  const markersCheck = arg.markers !== undefined && Array.isArray(arg.markers);
  return (
    arg && nameCheck && sourcesCheck && mapCheck && mapBase64Check && dimensionCheck && markersCheck
  );
}
