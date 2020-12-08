import BuildCampaign from "../data/campaign/BuildCampaign";
import Campaign from "../data/campaign/Campaign";
import Char from "../data/chars/Char";
import { recivePromiseByAttribute } from "./DatabaseService";

export const buildCampaign = async (campaign: Campaign): Promise<BuildCampaign> => {
  console.time("t");
  let characters: Char[];

  console.time("load");
  let characterList: Promise<Char>[] = [];

  campaign.players.forEach((player: string) => {
    characterList.push(recivePromiseByAttribute("chars", "name", player));
  });

  characters = await Promise.all(characterList);
  console.timeEnd("load");

  console.timeEnd("t");
  return new BuildCampaign(campaign, characters);
};
