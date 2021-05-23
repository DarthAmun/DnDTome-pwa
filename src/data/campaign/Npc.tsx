import Char from "../chars/Char";
import IEntity from "../IEntity";
import Monster from "../Monster";

//npcs: "++id, name, pic, char, traits, description, sources, filename",
export default class Npc implements IEntity {
  id?: number;
  name: string;
  pic: string;
  picBase64: string;
  char: Char | undefined;
  monster: Monster | undefined;
  traits: string;
  description: string;
  sources: string;
  filename?: string;

  constructor(
    id?: number,
    name?: string,
    pic?: string,
    picBase64?: string,
    char?: Char | undefined,
    monster?: Monster | undefined,
    traits?: string,
    description?: string,
    sources?: string,
    filename?: string
  ) {
    this.id = id;
    this.name = name || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
    this.char = char || undefined;
    this.monster = monster || undefined;
    this.traits = traits || "";
    this.description = description || "";
    this.sources = sources || "";
    this.filename = filename || "";
  }
}

export function isNpc(arg: any): arg is Npc {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const picBase64Check = arg.picBase64 !== undefined && typeof arg.picBase64 == "string";
  const traitsCheck = arg.traits !== undefined && typeof arg.traits == "string";
  const descriptionCheck = arg.description !== undefined && typeof arg.description == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";

  return (
    arg &&
    nameCheck &&
    (picCheck || picBase64Check) &&
    descriptionCheck &&
    traitsCheck &&
    sourcesCheck
  );
}

export function findNpcFormattError(arg: any): {
  nameCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";

  return {
    nameCheck: nameCheck,
  };
}
