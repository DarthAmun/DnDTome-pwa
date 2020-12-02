export default class Money {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;

  constructor(
    copper?: number,
    silver?: number,
    electrum?: number,
    gold?: number,
    platinum?: number
  ) {
    this.copper = copper || 0;
    this.silver = silver || 0;
    this.electrum = electrum || 0;
    this.gold = gold || 0;
    this.platinum = platinum || 0;
  }
}

export function isMoney(arg: any): arg is Money {
  const copperCheck = arg.copper !== undefined && typeof arg.copper == "number";
  const silverCheck = arg.silver !== undefined && typeof arg.silver == "number";
  const electrumCheck =
    arg.electrum !== undefined && typeof arg.electrum == "number";
  const goldCheck = arg.gold !== undefined && typeof arg.gold == "number";
  const platinumCheck =
    arg.platinum !== undefined && typeof arg.platinum == "number";
  return (
    arg &&
    copperCheck &&
    silverCheck &&
    electrumCheck &&
    goldCheck &&
    platinumCheck
  );
}
