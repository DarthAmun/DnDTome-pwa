import IEntity from "../IEntity";

export const featureTypeArray: { value: string; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "action", label: "Action" },
  { value: "bonusAction", label: "Bonus Action" },
  { value: "reaction", label: "Reaction" },
];
export enum featureType {
  normal,
  action,
  bonusAction,
  reaction,
}
export function getOptionFromEnum(
  value: featureType
): { value: string; label: string } {
  let opt = undefined;
  featureTypeArray.forEach((option) => {
    if (option.value === value.toString()) opt = option;
  });
  if (opt !== undefined) {
    return opt;
  }
  return { value: "", label: "" };
}

export default class Feature implements IEntity {
  name: string;
  text: string;
  type: featureType;
  constructor(name: string, text: string, type?: featureType) {
    this.name = name;
    this.text = text;
    this.type = type || featureType.normal;
  }
}

export function isFeature(arg: any): arg is Feature {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const textCheck = arg.text !== undefined && typeof arg.text == "string";
  return arg && nameCheck && textCheck;
}