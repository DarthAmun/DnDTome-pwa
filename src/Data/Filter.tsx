export default class Filter {
  fieldName: string;
  value: string | boolean | number | string[] | boolean[] | number[];
  constructor(
    filedName: string,
    value: string | boolean | number | string[] | boolean[] | number[]
  ) {
    this.fieldName = filedName;
    this.value = value;
  }
}
