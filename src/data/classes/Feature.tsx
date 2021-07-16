import IEntity from "../IEntity";

export const featureTypeArray: { value: string; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "action", label: "Action" },
  { value: "bonusAction", label: "Bonus Action" },
  { value: "reaction", label: "Reaction" },
];
export enum FeatureType {
  normal,
  action,
  bonusAction,
  reaction,
}
export function getOptionFromTypeEnum(value: FeatureType): { value: string; label: string } {
  let opt = undefined;
  featureTypeArray.forEach((option) => {
    if (option.value === value.toString()) opt = option;
  });
  if (opt !== undefined) {
    return opt;
  }
  return { value: "", label: "" };
}

export const featureRestArray: { value: string; label: string }[] = [
  { value: "none", label: "None" },
  { value: "long", label: "Long Rest" },
  { value: "short", label: "Short Rest" },
];
export enum FeatureRest {
  none,
  long,
  short,
}
export function getOptionFromRestEnum(value: FeatureRest): { value: string; label: string } {
  let opt = undefined;
  featureRestArray.forEach((option) => {
    if (value !== undefined && option.value === value.toString()) opt = option;
  });
  if (opt !== undefined) {
    return opt;
  }
  return { value: "", label: "" };
}

export default class Feature implements IEntity {
  name: string;
  text: string;
  type: FeatureType;
  usedCurrency: string;
  uses: number;
  rest: FeatureRest;
  cost: number;
  selections: string[];

  constructor(
    name: string,
    text: string,
    usedCurrency: string,
    uses: number,
    rest: FeatureRest,
    cost: number,
    selections: string[],
    type?: FeatureType
  ) {
    this.name = name;
    this.text = text;
    this.type = type || FeatureType.normal;
    this.usedCurrency = usedCurrency || "";
    this.uses = uses || 0;
    this.rest = rest || FeatureRest.none;
    this.cost = cost || 0;
    this.selections = selections;
  }
}

export function isFeature(arg: any): arg is Feature {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const textCheck = arg.text !== undefined && typeof arg.text == "string";
  const selectionsCheck =
    arg.selections !== undefined &&
    Array.isArray(arg.selections) &&
    typeof arg.selections[0] == "string";
  return arg && nameCheck && textCheck && selectionsCheck;
}
