import Char from "../chars/Char";
import Campaign from "./Campaign";
import Npc from "./Npc";
import Quest from "./Quest";

export default class BuildCampaign {
  campaign: Campaign;
  characters: Char[];
  npcs: Npc[];
  quests: Quest[];

  constructor(champaign?: Campaign, characters?: Char[], npcs?: Npc[], quests?: Quest[]) {
    this.campaign = champaign || new Campaign();
    this.characters = characters || [];
    this.npcs = npcs || [];
    this.quests = quests || [];
  }
}
