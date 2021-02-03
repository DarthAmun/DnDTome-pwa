import BuildCampaign from "../data/campaign/BuildCampaign";
import Campaign from "../data/campaign/Campaign";
import Npc from "../data/campaign/Npc";
import Char from "../data/chars/Char";
import Location from "../data/world/Location";
import { recivePromiseByAttribute } from "./DatabaseService";

export const buildCampaign = async (campaign: Campaign): Promise<BuildCampaign> => {
  console.time("t");
  let characters: Char[];
  let npcs: Npc[];
  let map: Location;

  console.time("load");
  let characterList: Promise<Char>[] = [];
  let npcList: Promise<Npc>[] = [];

  campaign.players.forEach((player: string) => {
    characterList.push(recivePromiseByAttribute("chars", "name", player));
  });
  campaign.npcs.forEach((npc: string) => {
    npcList.push(recivePromiseByAttribute("npcs", "name", npc));
  });
  characters = await Promise.all(characterList);
  npcs = await Promise.all(npcList);
  map = await recivePromiseByAttribute("locations", "name", campaign.map);
  console.timeEnd("load");

  characters = characters.filter((char) => char !== undefined);
  npcs = npcs.filter((npc) => npc !== undefined);

  console.timeEnd("t");
  return new BuildCampaign(campaign, characters, npcs, map);
};
