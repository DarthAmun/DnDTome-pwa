export enum ModifierOperator {
  EQUAL,
  ADD,
  SUBSTRACT,
}

export default class Modifier {
  target: string;
  operator: ModifierOperator;
  value: string | number;

  constructor(target: string, operator: ModifierOperator, value: string | number) {
    this.target = target;
    this.operator = operator;
    this.value = value;
  }
}
