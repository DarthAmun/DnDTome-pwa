import BuildPlayer from "./BuildPlayer";
import Encounter from "./Encounter";

export default class BuildEncounter {
  encounter: Encounter;
  characters: BuildPlayer[];
  enemies: BuildPlayer[];
  players: BuildPlayer[];
  difficulty: {
    difficulty: string;
    calcExp: {
      easy: number;
      medium: number;
      hard: number;
      deadly: number;
    };
  };

  constructor(
    encounter?: Encounter,
    characters?: BuildPlayer[],
    enemies?: BuildPlayer[],
    players?: BuildPlayer[],
    difficulty?: {
      difficulty: string;
      calcExp: {
        easy: number;
        medium: number;
        hard: number;
        deadly: number;
      };
    }
  ) {
    this.encounter = encounter || new Encounter();
    this.characters = characters || [];
    this.enemies = enemies || [];
    this.players = players || [];
    this.difficulty = difficulty || {
      difficulty: "",
      calcExp: {
        easy: 0,
        medium: 0,
        hard: 0,
        deadly: 0,
      },
    };
  }
}
