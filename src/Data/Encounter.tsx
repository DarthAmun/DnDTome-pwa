import Char from "./Chars/Char";
import IEntity from "./IEntity";
import Monster, { isMonster } from "./Monster";

export default class Encounter implements IEntity {
  id?: number;
  name: string;
  monsters: Monster[];
  players: { name: string; hp: number; tempHp: number; char: Char }[];

  constructor();
  constructor(
    id?: number,
    name?: string,
    monsters?: Monster[],
    players?: { name: string; hp: number; tempHp: number; char: Char }[]
  ) {
    this.id = id;
    this.name = name || "";
    this.monsters = monsters || [];
    this.players = players || [];
  }
}

export function isEncounter(arg: any): arg is Encounter {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const monstersCheck =
    arg.monsters !== undefined &&
    Array.isArray(arg.monsters) &&
    (arg.monsters.length > 0 || isMonster(arg.monsters[0]));
  const playersCheck =
    arg.players !== undefined &&
    Array.isArray(arg.players) &&
    arg.players.length > 0;
  return arg && nameCheck && monstersCheck && playersCheck;
}
