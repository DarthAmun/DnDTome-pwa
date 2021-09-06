export type Spell = {
  [k: string]: unknown;
};

export interface Spells {
  spell: Spell[];
}

export interface SpellData {
  name?: string;
  level?: number;
  school?: string;
  subschools?: string[];
  meta?: {
    ritual?: boolean;
    technomagic?: boolean;
  };
  time?: Time[];
  range?: {
    type: string;
    distance?: {
      type: string;
      amount?: number;
      typeSecondary?: string;
      amountSecondary?: number;
    };
  };
  components?: {
    verbal?: boolean;
    somatic?: boolean;
    material?:
      | {
          text: string;
          cost?: number;
          consume?: boolean | "optional";
        }
      | (boolean | string);
    royal?: boolean;
  };
  duration?: Duration[];
  entries?: string[];
  entriesHigherLevel?: string[];
  classes?: {
    fromClassList?: Class[];
    fromClassListVariant?: Class[];
    fromSubclass?: {
      class: Class;
      subclass: {
        name: string;
        source: string;
        subSubclass?: string;
      };
    }[];
  };
  races?: {
    name: string;
    source: string;
    baseName?: string;
    baseSource?: string;
    [k: string]: unknown;
  }[];
  backgrounds?: {
    name: string;
    source: string;
    [k: string]: unknown;
  }[];
  eldritchInvocations?: {
    name: string;
    source: string;
    [k: string]: unknown;
  }[];
  source?: string;
  page?: number;
  damageInflict?: string[];
  damageResist?: string[];
  damageImmune?: string[];
  damageVulnerable?: string[];
  savingThrow?: string[];
  abilityCheck?: string[];
  spellAttack?: string[];
  scalingLevelDice?: ScalingLevelDiceItem[] | ScalingLevelDiceItem;
  hasFluff?: boolean;
  hasFluffImages?: boolean;
}

export interface Time {
  number?: number;
  unit: string;
  condition?: string;
}

export interface Duration {
  type: "instant" | "timed" | "permanent" | "special";
  duration?: {
    type: "hour" | "minute" | "turn" | "round" | "week" | "day" | "year";
    amount?: number;
    upTo?: boolean;
  };
  concentration?: boolean;
  ends?: ("dispel" | "trigger" | "discharge")[];
  condition?: string;
}

export interface Class {
  name: string;
  source: string;
  definedInSource?: string;
}

export interface ScalingLevelDiceItem {
  label?: string;
  scaling?: {
    [k: string]: string;
  };
}
