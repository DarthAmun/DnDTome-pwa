import IEntity from "./IEntity";

export default class Gear extends IEntity {
  description: string;
  pic: string;
  picBase64: string;
  cost: string;
  damage: string;
  weight: string;
  properties: string;
  type: string;

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
    super(id, name, sources, filename);
    this.description = description || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
    this.cost = cost || "";
    this.damage = damage || "";
    this.weight = weight || "";
    this.properties = properties || "";
    this.type = type || "";
    this.id = id;
  }
}
