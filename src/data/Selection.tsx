import IEntity, { isIEntity } from "./IEntity";

export default class Selection extends IEntity {
  selectionOptions: {
    entityName: string;
    entityPrerequsite: string;
    entityText: string;
    level: number;
  }[];

  constructor(
    id?: number,
    name?: string,
    filename?: string,
    selectionOptions?: {
      entityName: string;
      entityPrerequsite: string;
      entityText: string;
      level: number;
    }[]
  ) {
    super(id, name, "", filename);
    this.selectionOptions = selectionOptions || [];
  }
}

export function isSelection(arg: any): arg is Selection {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const selectionOptionsCheck =
    arg.selectionOptions !== undefined &&
    Array.isArray(arg.selectionOptions) &&
    isIEntity(arg.selectionOptions[0]);

  return arg && nameCheck && selectionOptionsCheck;
}

export function findSelectionFormattError(arg: any): {
  nameCheck: boolean;
  selectionOptionsCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const selectionOptionsCheck =
    arg.selectionOptions !== undefined &&
    Array.isArray(arg.selectionOptions) &&
    isIEntity(arg.selectionOptions[0]);
  return {
    nameCheck: nameCheck,
    selectionOptionsCheck: selectionOptionsCheck,
  };
}
