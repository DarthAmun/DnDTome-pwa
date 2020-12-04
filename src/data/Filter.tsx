export default class Filter {
  fieldName: string;
  value: string | boolean | number | string[] | boolean[] | number[];
  sort: number;
  constructor(
    filedName: string,
    value: string | boolean | number | string[] | boolean[] | number[],
    sort?: number
  ) {
    this.fieldName = filedName;
    this.value = value;
    this.sort = sort || 0;
  }
}
