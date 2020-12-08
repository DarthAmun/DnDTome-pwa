import Char from "../chars/Char";
import Campaign from "./Campaign";

export default class BuildCampaign {
  campaign: Campaign;
  characters: Char[];

  constructor(champaign?: Campaign, characters?: Char[]) {
    this.campaign = champaign || new Campaign();
    this.characters = characters || [];
  }
}
