//Name, Description, Components, Weight, Cost
export class SearchableString {
  val: string;
  sortable?: boolean;

  constructor(val: string, sortable?: boolean) {
    this.val = val;
    this.sortable = sortable;
  }
}
//Classes
export class SetString {
  val: string;
  sortable?: boolean;

  constructor(val: string, sortable?: boolean) {
    this.val = val;
    this.sortable = sortable;
  }
}
//School, Sources, Geartype, Properties
export class CreatableSetString {
  val: string;
  sortable?: boolean;

  constructor(val: string, sortable?: boolean) {
    this.val = val;
    this.sortable = sortable;
  }
}
//Time, Range, Duration
export class CompletableString {
  val: string;
  sortable?: boolean;

  constructor(val: string, sortable?: boolean) {
    this.val = val;
    this.sortable = sortable;
  }
}
//Level
export class SetNumber {
  val: number;
  sortable?: boolean;

  constructor(val: number, sortable?: boolean) {
    this.val = val;
    this.sortable = sortable;
  }
}
