export type Subclass = {
  [k: string]: unknown;
};

export type Class = {
  [k: string]: unknown;
};

export type SpellRef =
  | {
      name: string;
      source: string;
    }
  | {
      className: string;
      classSource: string;
      subclassName?: string;
      subclassSource?: string;
      subSubclassName?: string;
      subSubclassSource?: string;
    }
  | string;

export interface Demo {
  class?: unknown[];
  subclass?: unknown[];
  classFeature?: unknown[];
  subclassFeature?: unknown[];
}

export interface ClassTableGroup {
  title?: string;
  subclasses?: {
    name: string;
    source: string;
  }[];
  colLabels: string[];
  rows: "string"[][];
}

export interface ClassFeature {
  name: string;
  source: string;
  srd?: boolean;
  className: string;
  classSource: string;
  level: number;
  header?: number;
  page?: number;
  type?: "inset";
  entries: "string"[];
  isClassFeatureVariant?: boolean;
  otherSources?: "string";
}

export interface SubclassFeature {
  name: string;
  source: string;
  srd?: boolean;
  className: string;
  classSource: string;
  subclassShortName: string;
  subclassSource: string;
  level: number;
  header?: number;
  page?: number;
  type?: "inset";
  entries: "string"[];
  isClassFeatureVariant?: boolean;
  isGainAtNextFeatureLevel?: boolean;
  otherSources?: "string";
}

export interface Proficiencies {
  armor?: (
    | ("light" | "medium" | "heavy" | "{@item shield|phb|shields}")
    | {
        proficiency: "light" | "medium" | "heavy" | "{@item shield|phb|shields}" | "special";
        full: string;
        [k: string]: unknown;
      }
  )[];
  weapons?: (
    | string
    | {
        proficiency: string;
        optional: boolean;
      }
  )[];
  tools?: string[];
  skills?: "string";
  [k: string]: unknown;
}

export interface SubclassData {
  name?: string;
  shortName?: string;
  source?: string;
  className?: string;
  classSource?: string;
  isReprinted?: boolean;
  srd?: boolean;
  page?: number;
  casterProgression?: "full" | "1/2" | "1/3" | "pact" | "artificer";
  spellcastingAbility?: "str" | "dex" | "con" | "int" | "wis" | "cha";
  cantripProgression?: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  spellsKnownProgression?: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  subclassFeatures?: (
    | string
    | {
        subclassFeature: string;
        gainSubclassFeature?: boolean;
        [k: string]: unknown;
      }
  )[];
  subclassTableGroups?: "string"[];
  otherSources?: "string";
  additionalSpells?: "string";
  subclassSpells?: "string"[];
  subSubclassSpells?: "string"[];
}

export interface Requirements {
  str?: number;
  dex?: number;
  con?: number;
  int?: number;
  wis?: number;
  cha?: number;
  or?: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
  }[];
  entries?: "string"[];
}

export interface ClassData {
  name?: string;
  source?: string;
  otherSources?: "string";
  srd?: boolean;
  isReprinted?: boolean;
  isSidekick?: boolean;
  hd?: {
    number: number;
    faces: number;
  };
  proficiency?: ("str" | "dex" | "con" | "int" | "wis" | "cha")[];
  classTableGroups?: "string"[];
  startingProficiencies?: "string";
  startingEquipment?: {
    additionalFromBackground: boolean;
    default: string[];
    defaultData?: "string";
    goldAlternative?: string;
  };
  requirements?: "string";
  multiclassing?: {
    requirements?: "string";
    proficienciesGained?: "string";
    entries?: "string"[];
  };
  casterProgression?: "full" | "1/2" | "1/3" | "pact" | "artificer";
  preparedSpells?: string;
  spellcastingAbility?: "str" | "dex" | "con" | "int" | "wis" | "cha";
  cantripProgression?: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  spellsKnownProgression?: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  spellsKnownProgressionFixed?: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  spellsKnownProgressionFixedAllowLowerLevel?: boolean;
  spellsKnownProgressionFixedByLevel?: {
    [k: string]: {
      "1"?: number;
      "2"?: number;
      "3"?: number;
      "4"?: number;
      "5"?: number;
      "6"?: number;
      "7"?: number;
      "8"?: number;
      "9"?: number;
    };
  };
  optionalfeatureProgression?: {
    name: string;
    featureType: "string";
    progression: [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ];
    [k: string]: unknown;
  }[];
  classFeatures?: (
    | string
    | {
        classFeature: string;
        gainSubclassFeature?: boolean;
        [k: string]: unknown;
      }
  )[];
  subclassTitle?: string;
  page?: number;
  fluff?: {
    name?: string;
    entries: "string"[];
    page?: number;
    source: string;
    type?: string;
  }[];
  additionalSpells?: "string";
  classSpells?: "string"[];
}
