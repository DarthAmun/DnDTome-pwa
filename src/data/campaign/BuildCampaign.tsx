import Char from "../chars/Char";
import Location from "../world/Location";
import Campaign from "./Campaign";
import Npc from "./Npc";

export default class BuildCampaign {
  campaign: Campaign;
  characters: Char[];
  npcs: Npc[];
  map: Location;

  constructor(champaign?: Campaign, characters?: Char[], npcs?: Npc[], map?: Location) {
    this.campaign = champaign || new Campaign();
    this.characters = characters || [];
    this.npcs = npcs || [];
    this.map = map || new Location();
  }
}
