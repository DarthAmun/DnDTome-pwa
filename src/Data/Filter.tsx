export default class Filter {
  filedName: string;
  value: string | boolean | number | string[] | boolean[] | number[];
  constructor(
    filedName: string,
    value: string | boolean | number | string[] | boolean[] | number[]
  ) {
    this.filedName = filedName;
    this.value = value;
  }
}
