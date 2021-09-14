export default class Filter {
  fieldName: string;
  value: string | boolean | number | string[] | boolean[] | number[];
  sort: number;
  constructor(
    fieldName: string,
    value: string | boolean | number | string[] | boolean[] | number[],
    sort?: number
  ) {
    this.fieldName = fieldName;
    this.value = value;
    this.sort = sort || 0;
  }
}
