import BuildCampaign from "../data/campaign/BuildCampaign";
import Campaign from "../data/campaign/Campaign";
import Npc from "../data/campaign/Npc";
import Quest from "../data/campaign/Quest";
import Char from "../data/chars/Char";
import { recivePromiseByAttribute } from "./DatabaseService";

export const buildCampaign = async (campaign: Campaign): Promise<BuildCampaign> => {
  console.time("t");
  let characters: Char[];
  let npcs: Npc[];
  let quests: Quest[];

  console.time("load");
  let characterList: Promise<Char>[] = [];
  let npcList: Promise<Npc>[] = [];
  let questList: Promise<Quest>[] = [];

  campaign.players.forEach((player: string) => {
    characterList.push(recivePromiseByAttribute("chars", "name", player));
  });
  campaign.npcs.forEach((npc: string) => {
    npcList.push(recivePromiseByAttribute("npcs", "name", npc));
  });
  campaign.quests.forEach((quest: string) => {
    questList.push(recivePromiseByAttribute("quests", "name", quest));
  });

  characters = await Promise.all(characterList);
  npcs = await Promise.all(npcList);
  quests = await Promise.all(questList);
  console.timeEnd("load");

  console.timeEnd("t");
  return new BuildCampaign(campaign, characters, npcs, quests);
};
