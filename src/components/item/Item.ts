export default class Item {
  id: number;
  name: string;
  descirption: string;
  pic: string;
  rarity: string;
  type: string;
  sources: string;
  attunment: number;

  constructor(
    name: string,
    sources: string,
    id: number,
    descirption: string,
    pic: string,
    rarity: string,
    type: string,
    attunment: number
  ) {
    this.name = name;
    this.sources = sources;
    this.id = id;
    this.descirption = descirption;
    this.pic = pic;
    this.rarity = rarity;
    this.type = type;
    this.attunment = attunment;
  }
}
