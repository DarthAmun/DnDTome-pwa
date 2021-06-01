import BuildGroup from "../data/campaign/BuildGroup";
import Group from "../data/campaign/Group";
import Npc from "../data/campaign/Npc";
import Char from "../data/chars/Char";
import Monster from "../data/Monster";
import { recivePromiseByAttribute } from "./DatabaseService";

export const buildGroup = async (group: Group): Promise<BuildGroup> => {
  console.time("t");
  let characters: Char[];
  let npcs: Npc[];
  let monsters: Monster[];

  console.time("load");
  let characterList: Promise<Char>[] = [];
  let npcList: Promise<Npc>[] = [];
  let monsterList: Promise<Monster>[] = [];

  group.players?.forEach((player: string) => {
    characterList.push(recivePromiseByAttribute("chars", "name", player));
  });
  group.npcs?.forEach((npc: string) => {
    npcList.push(recivePromiseByAttribute("npcs", "name", npc));
  });
  group.monsters?.forEach((monster: string) => {
    monsterList.push(recivePromiseByAttribute("monsters", "name", monster));
  });
  characters = await Promise.all(characterList);
  npcs = await Promise.all(npcList);
  monsters = await Promise.all(monsterList);
  console.timeEnd("load");

  characters = characters.filter((char) => char !== undefined);
  npcs = npcs.filter((npc) => npc !== undefined);
  monsters = monsters.filter((monster) => monster !== undefined);

  console.timeEnd("t");
  return new BuildGroup(group, characters, npcs, monsters);
};
