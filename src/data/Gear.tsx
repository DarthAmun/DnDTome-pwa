import IEntity from "./IEntity";

export default class Gear implements IEntity {
  id?: number;
  name: string;
  sources: string;
  description: string;
  pic: string;
  picBase64: string;
  cost: string;
  damage: string;
  weight: string;
  properties: string;
  type: string;
  filename: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    description?: string,
    pic?: string,
    picBase64?: string,
    cost?: string,
    damage?: string,
    weight?: string,
    properties?: string,
    type?: string,
    filename?: string
  ) {
    this.name = name || "";
    this.sources = sources || "";
    this.description = description || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
    this.cost = cost || "";
    this.damage = damage || "";
    this.weight = weight || "";
    this.properties = properties || "";
    this.type = type || "";
    this.id = id;
    this.filename = filename || "";
  }
}

export function isGear(arg: any): arg is Gear {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  const descriptionCheck = arg.description !== undefined && typeof arg.description == "string";
  const costCheck = arg.cost !== undefined && typeof arg.cost == "string";
  const damageCheck = arg.damage !== undefined && typeof arg.damage == "string";
  const weightCheck = arg.weight !== undefined && typeof arg.weight == "string";
  const propertiesCheck = arg.properties !== undefined && typeof arg.properties == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const picBase64Check = arg.picBase64 !== undefined && typeof arg.picBase64 == "string";
  return (
    arg &&
    nameCheck &&
    sourcesCheck &&
    descriptionCheck &&
    costCheck &&
    damageCheck &&
    weightCheck &&
    propertiesCheck &&
    typeCheck &&
    (picCheck || picBase64Check)
  );
}

export function findGearFormattError(arg: any): {
  nameCheck: boolean;
  sourcesCheck: boolean;
  descriptionCheck: boolean;
  costCheck: boolean;
  damageCheck: boolean;
  weightCheck: boolean;
  propertiesCheck: boolean;
  typeCheck: boolean;
  picCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  const descriptionCheck = arg.description !== undefined && typeof arg.description == "string";
  const costCheck = arg.cost !== undefined && typeof arg.cost == "string";
  const damageCheck = arg.damage !== undefined && typeof arg.damage == "string";
  const weightCheck = arg.weight !== undefined && typeof arg.weight == "string";
  const propertiesCheck = arg.properties !== undefined && typeof arg.properties == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  return {
    nameCheck: nameCheck,
    sourcesCheck: sourcesCheck,
    descriptionCheck: descriptionCheck,
    costCheck: costCheck,
    damageCheck: damageCheck,
    weightCheck: weightCheck,
    propertiesCheck: propertiesCheck,
    typeCheck: typeCheck,
    picCheck: picCheck,
  };
}
