import Char from "../chars/Char";
import Monster from "../Monster";
import Player from "./Player";

export default class BuildPlayer {
  player: Player;
  entity: Char | Monster;

  constructor(player?: Player, entity?: Char | Monster) {
    this.player = player || new Player();
    this.entity = entity || new Monster();
  }
}
