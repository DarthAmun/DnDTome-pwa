import IEntity from "../IEntity";
import Player from "./Player";

export default class Encounter implements IEntity {
  id?: number;
  name: string;
  enemies: Player[];
  players: Player[];
  isPlaying: boolean;
  currentInit: number;
  roundCounter: number;

  constructor(
    id?: number,
    name?: string,
    enemies?: Player[],
    players?: Player[],
    isPlaying?: boolean,
    currentInit?: number,
    roundCounter?: number
  ) {
    this.id = id;
    this.name = name || "";
    this.enemies = enemies || [];
    this.players = players || [];
    this.isPlaying = isPlaying || false;
    this.currentInit = currentInit || 0;
    this.roundCounter = roundCounter || 0;
  }
}

export function isEncounter(arg: any): arg is Encounter {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const enemiesCheck = arg.enemies !== undefined && Array.isArray(arg.enemies);
  const playersCheck = arg.players !== undefined && Array.isArray(arg.players);
  const isPlayingCheck =
    arg.isPlaying !== undefined && typeof arg.isPlaying == "boolean";
  return arg && nameCheck && enemiesCheck && playersCheck && isPlayingCheck;
}
