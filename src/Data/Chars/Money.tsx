export default class Money {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;

  constructor(
    copper: number,
    silver: number,
    electrum: number,
    gold: number,
    platinum: number
  ) {
    this.copper = copper;
    this.silver = silver;
    this.electrum = electrum;
    this.gold = gold;
    this.platinum = platinum;
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
