import Char from "../chars/Char";
import Monster from "../Monster";
import Group from "./Group";
import Npc from "./Npc";

export default class BuildGroup {
  group: Group;
  characters: Char[];
  npcs: Npc[];
  monsters: Monster[]

  constructor(champaign?: Group, characters?: Char[], npcs?: Npc[], monsters?: Monster[]) {
    this.group = champaign || new Group();
    this.characters = characters || [];
    this.npcs = npcs || [];
    this.monsters = monsters || [];
  }
}
