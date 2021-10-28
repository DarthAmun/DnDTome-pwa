import { CreatableSetString, SearchableString, SetString } from "./Datatypes";

export default class IEntity {
  id?: number;
  name: string;
  sources: string;
  filename?: string;

  constructor(id?: number, name?: string, sources?: string, filename?: string) {
    this.id = id;
    this.name = name || "";
    this.sources = sources || "";
    this.filename = filename || "";
  }

  getConfig = () => new IEntityConfig();
}

export function isIEntity(arg: any): arg is IEntity {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";

  return arg && nameCheck;
}

export class IEntityConfig {
  name: SearchableString;
  sources: CreatableSetString;
  filename: SetString;
  constructor() {
    this.name = new SearchableString();
    this.sources = new CreatableSetString();
    this.filename = new SetString();
  }
}
