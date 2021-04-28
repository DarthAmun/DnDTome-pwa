import IEntity from "../IEntity";
import Player from "./Player";
import Slot from "./Slot";

export default class Encounter implements IEntity {
  id?: number;
  name: string;
  enemies: Player[];
  players: Player[];
  isPlaying: boolean;
  currentInit: number;
  roundCounter: number;
  map: string;
  mapBase64: string;
  dimension: { width: number; height: number; size: number; zoom: number };
  board: Slot[];

  constructor(
    id?: number,
    name?: string,
    enemies?: Player[],
    players?: Player[],
    isPlaying?: boolean,
    currentInit?: number,
    roundCounter?: number,
    map?: string,
    mapBase64?: string,
    dimension?: { width: number; height: number; size: number; zoom: number },
    board?: Slot[]
  ) {
    this.id = id;
    this.name = name || "";
    this.enemies = enemies || [];
    this.players = players || [];
    this.isPlaying = isPlaying || false;
    this.currentInit = currentInit || 0;
    this.roundCounter = roundCounter || 0;
    this.map = map || "";
    this.mapBase64 = mapBase64 || "";
    this.dimension = dimension || { width: 20, height: 20, size: 20, zoom: 100 };
    this.board = board || [];
  }
}

export function isEncounter(arg: any): arg is Encounter {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const enemiesCheck = arg.enemies !== undefined && Array.isArray(arg.enemies);
  const playersCheck = arg.players !== undefined && Array.isArray(arg.players);
  const isPlayingCheck = arg.isPlaying !== undefined && typeof arg.isPlaying == "boolean";
  const mapCheck = arg.map !== undefined && typeof arg.map == "string";
  const mapBase64Check = arg.mapBase64 !== undefined && typeof arg.mapBase64 == "string";
  const currentInitCheck = arg.currentInit !== undefined && typeof arg.currentInit == "number";
  const roundCounterCheck = arg.roundCounter !== undefined && typeof arg.roundCounter == "number";
  const boardCheck = arg.board !== undefined && Array.isArray(arg.board);
  return (
    arg &&
    nameCheck &&
    enemiesCheck &&
    playersCheck &&
    isPlayingCheck &&
    mapCheck &&
    mapBase64Check &&
    currentInitCheck &&
    boardCheck &&
    roundCounterCheck
  );
}
