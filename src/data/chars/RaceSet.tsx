export default class RaceSet {
  race: string;
  subrace: string;

  constructor(race?: string, subrace?: string) {
    this.race = race || "";
    this.subrace = subrace || "";
  }
}

export function isRaceSet(arg: any): arg is RaceSet {
  const raceCheck = arg.race !== undefined && typeof arg.race == "string";
  const subraceCheck =
    arg.subrace !== undefined && typeof arg.subrace == "string";
  return arg && raceCheck && subraceCheck;
}
