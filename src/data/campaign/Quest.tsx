import IEntity from "../IEntity";

//quests:"++id, name, pic, locations, origin, description, rewards, followQuest, sources, filename",
export default class Quest implements IEntity {
  id?: number;
  name: string;
  pic: string;
  description: string;
  rewards: string;
  followQuest: string;
  sources: string;
  filename?: string;

  constructor(
    id?: number,
    name?: string,
    pic?: string,
    description?: string,
    rewards?: string,
    followQuest?: string,
    sources?: string,
    filename?: string
  ) {
    this.id = id;
    this.name = name || "";
    this.pic = pic || "";
    this.description = description || "";
    this.rewards = rewards || "";
    this.followQuest = followQuest || "";
    this.sources = sources || "";
    this.filename = filename || "";
  }
}

export function isQuest(arg: any): arg is Quest {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const descriptionCheck = arg.description !== undefined && typeof arg.description == "string";
  const locationsCheck = arg.locations !== undefined && Array.isArray(arg.locations);
  const rewardsCheck = arg.rewards !== undefined && typeof arg.rewards == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";

  return (
    arg &&
    nameCheck &&
    picCheck &&
    descriptionCheck &&
    locationsCheck &&
    rewardsCheck &&
    sourcesCheck
  );
}

export function findQuestFormattError(
  arg: any
): {
  nameCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";

  return {
    nameCheck: nameCheck,
  };
}
