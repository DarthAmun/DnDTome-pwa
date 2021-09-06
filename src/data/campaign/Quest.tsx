import IEntity from "../IEntity";

//quests:"++id, name, pic, locations, origin, description, rewards, followQuest, sources, filename",
export default class Quest extends IEntity {
  pic: string;
  picBase64: string;
  description: string;
  rewards: string;
  followQuest: string;

  constructor(
    id?: number,
    name?: string,
    pic?: string,
    picBase64?: string,
    description?: string,
    rewards?: string,
    followQuest?: string,
    sources?: string,
    filename?: string
  ) {
    super(id, name, sources, filename);
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
    this.description = description || "";
    this.rewards = rewards || "";
    this.followQuest = followQuest || "";
  }
}

export function isQuest(arg: any): arg is Quest {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const picBase64Check = arg.picBase64 !== undefined && typeof arg.picBase64 == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const descriptionCheck = arg.description !== undefined && typeof arg.description == "string";
  const followQuestCheck = arg.followQuest !== undefined && typeof arg.followQuest == "string";
  const rewardsCheck = arg.rewards !== undefined && typeof arg.rewards == "string";
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";

  return (
    arg &&
    nameCheck &&
    (picCheck || picBase64Check) &&
    descriptionCheck &&
    followQuestCheck &&
    rewardsCheck &&
    sourcesCheck
  );
}

export function findQuestFormattError(arg: any): {
  nameCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";

  return {
    nameCheck: nameCheck,
  };
}
