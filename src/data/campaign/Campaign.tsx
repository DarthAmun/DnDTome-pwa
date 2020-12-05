import IEntity from "../IEntity";

// campaigns: "++id, name, pic, description, world, quests, events, notes, sources, filename",
export default class Campaign implements IEntity {
  id?: number;
  name: string;
  pic: string;
  description: string;
  //world: World;
  //quests: Quest[];
  //events: Event[];
  //notes: Notes[];
  sources: string;
  filename?: string;

  constructor(
    id?: number,
    name?: string,
    pic?: string,
    description?: string,
    sources?: string,
    filename?: string
  ) {
    this.id = id;
    this.name = name || "";
    this.pic = pic || "";
    this.description = description || "";
    this.sources = sources || "";
    this.filename = filename || "";
  }
}

export function isCampaign(arg: any): arg is Campaign {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const descriptionCheck = arg.description !== undefined && typeof arg.description == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";

  return arg && nameCheck && picCheck && descriptionCheck && sourcesCheck;
}

export function findCampaignFormattError(
  arg: any
): {
  nameCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";

  return {
    nameCheck: nameCheck,
  };
}
