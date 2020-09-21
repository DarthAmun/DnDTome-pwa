import IEntity from "../IEntity";
import Player from "./Player";

export default class Encounter implements IEntity {
  id?: number;
  name: string;
  enemies: Player[];
  players: Player[];

  constructor();
  constructor(
    id?: number,
    name?: string,
    enemies?: Player[],
    players?: Player[]
  ) {
    this.id = id;
    this.name = name || "";
    this.enemies = enemies || [];
    this.players = players || [];
  }
}

export function isEncounter(arg: any): arg is Encounter {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const enemiesCheck = arg.enemies !== undefined && Array.isArray(arg.enemies);
  const playersCheck = arg.players !== undefined && Array.isArray(arg.players);
  return arg && nameCheck && enemiesCheck && playersCheck;
}
