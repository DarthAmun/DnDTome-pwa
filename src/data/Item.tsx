import IEntity from "./IEntity";

export default class Item implements IEntity {
  id?: number;
  name: string;
  sources: string;
  description: string;
  pic: string;
  picBase64: string;
  rarity: string;
  magicBonus: number;
  attunment: number;
  base: string;
  type: string;
  filename: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    description?: string,
    pic?: string,
    picBase64?: string,
    rarity?: string,
    magicBonus?: number,
    attunment?: number,
    base?: string,
    type?: string,
    filename?: string
  ) {
    this.name = name || "";
    this.sources = sources || "";
    this.description = description || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
    this.rarity = rarity || "";
    this.magicBonus = magicBonus || 0;
    this.attunment = attunment || 0;
    this.base = base || "";
    this.type = type || "";
    this.id = id;
    this.filename = filename || "";
  }
}

export function isItem(arg: any): arg is Item {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  const descriptionCheck = arg.description !== undefined && typeof arg.description == "string";
  const magicBonusCheck = arg.magicBonus !== undefined && typeof arg.magicBonus == "number";
  const attunmentCheck = arg.attunment !== undefined && typeof arg.attunment == "number";
  const rarityCheck = arg.rarity !== undefined && typeof arg.rarity == "string";
  const baseCheck = arg.base !== undefined && typeof arg.base == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const picBase64Check = arg.picBase64 !== undefined && typeof arg.picBase64 == "string";
  return (
    arg &&
    nameCheck &&
    sourcesCheck &&
    descriptionCheck &&
    magicBonusCheck &&
    attunmentCheck &&
    rarityCheck &&
    baseCheck &&
    typeCheck &&
    (picCheck || picBase64Check)
  );
}

export function findItemFromattError(arg: any): {
  nameCheck: boolean;
  sourcesCheck: boolean;
  descriptionCheck: boolean;
  magicBonusCheck: boolean;
  attunmentCheck: boolean;
  rarityCheck: boolean;
  baseCheck: boolean;
  typeCheck: boolean;
  picCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";
  const descriptionCheck = arg.description !== undefined && typeof arg.description == "string";
  const magicBonusCheck = arg.magicBonus !== undefined && typeof arg.magicBonus == "number";
  const attunmentCheck = arg.attunment !== undefined && typeof arg.attunment == "number";
  const rarityCheck = arg.rarity !== undefined && typeof arg.rarity == "string";
  const baseCheck = arg.base !== undefined && typeof arg.base == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";

  return {
    nameCheck: nameCheck,
    sourcesCheck: sourcesCheck,
    descriptionCheck: descriptionCheck,
    magicBonusCheck: magicBonusCheck,
    attunmentCheck: attunmentCheck,
    rarityCheck: rarityCheck,
    baseCheck: baseCheck,
    typeCheck: typeCheck,
    picCheck: picCheck,
  };
}
