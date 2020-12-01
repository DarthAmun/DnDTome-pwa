export enum ModifierOperator {
  EQUAL,
  ADD,
  SUBSTRACT,
}

export default class Modifier {
  target: string | string[];
  operator: ModifierOperator;
  value: string | number;
  origin: string;

  constructor(
    target: string | string[],
    operator: ModifierOperator,
    value: string | number,
    origin: string
  ) {
    this.target = target;
    this.operator = operator;
    this.value = value;
    this.origin = origin;
  }

  makeString(): string {
    let op = "";
    if (this.operator === ModifierOperator.ADD) {
      op = "+";
    } else if (this.operator === ModifierOperator.SUBSTRACT) {
      op = "-";
    } else if (this.operator === ModifierOperator.EQUAL) {
      op = "=";
    }

    let tar = "";
    if (Array.isArray(this.target)) {
      tar = `${this.target[0]}.${this.target[1]}`;
    } else {
      tar = this.target;
    }

    return `${tar} ${op} ${this.value}`;
  }
}
