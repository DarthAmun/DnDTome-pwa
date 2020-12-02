import IEntity from "../IEntity";
import Trait, { isTrait } from "./Trait";

export default class Subrace implements IEntity {
  id?: number;
  name: string;
  type: string;
  abilityScores: string;
  traits: Trait[];
  sources: string;
  filename: string;

  constructor(
    name?: string,
    id?: number,
    type?: string,
    filename?: string,
    abilityScores?: string,
    traits?: Trait[],
    sources?: string
  ) {
    this.name = name || "";
    this.id = id;
    this.type = type || "";
    this.filename = filename || "";
    this.abilityScores = abilityScores || "";
    this.traits = traits || [];
    this.sources = sources || "";
  }
}

export function isSubrace(arg: any): arg is Subrace {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const abilityScoresCheck =
    arg.abilityScores !== undefined && typeof arg.abilityScores == "string";
  const traitsCheck =
    arg.traits !== undefined &&
    Array.isArray(arg.traits) &&
    isTrait(arg.traits[0]);
  const sourcesCheck =
    arg.sources !== undefined && typeof arg.sources == "string";
  return (
    arg &&
    nameCheck &&
    typeCheck &&
    abilityScoresCheck &&
    traitsCheck &&
    sourcesCheck
  );
}

export function findSubraceFormattError(
  arg: any
): {
  nameCheck: boolean;
  typeCheck: boolean;
  abilityScoresCheck: boolean;
  traitsCheck: boolean;
  sourcesCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const abilityScoresCheck =
    arg.abilityScores !== undefined && typeof arg.abilityScores == "string";
  const traitsCheck =
    arg.traits !== undefined &&
    Array.isArray(arg.traits) &&
    isTrait(arg.traits[0]);
  const sourcesCheck =
    arg.sources !== undefined && typeof arg.sources == "string";
  return {
    nameCheck: nameCheck,
    typeCheck: typeCheck,
    abilityScoresCheck: abilityScoresCheck,
    traitsCheck: traitsCheck,
    sourcesCheck: sourcesCheck,
  };
}
