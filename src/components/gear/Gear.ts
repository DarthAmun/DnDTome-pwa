export default class Gear {
  id: number;
  name: string;
  sources: string;
  description: string;
  pic: string;
  cost: string;
  damage: string;
  weight: string;
  properties: string;
  type: string;

  constructor(
    id: number,
    name: string,
    sources: string,
    description: string,
    pic: string,
    cost: string,
    damage: string,
    weight: string,
    properties: string,
    type: string
  ) {
    this.name = name;
    this.sources = sources;
    this.description = description;
    this.pic = pic;
    this.cost = cost;
    this.damage = damage;
    this.weight = weight;
    this.properties = properties;
    this.type = type;
    this.id = id;
  }
}
