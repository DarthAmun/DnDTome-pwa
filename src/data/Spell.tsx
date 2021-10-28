import {
  CreatableSetString,
  CompletableString,
  SearchableString,
  SwitchBoolean,
  CreatableSetNumber,
  SetEntity,
} from "./Datatypes";
import IEntity, { IEntityConfig } from "./IEntity";

export default class Spell extends IEntity {
  classes: string[];
  level: number;
  school: string;
  time: string;
  range: string;
  components: string;
  duration: string;
  ritual: boolean;
  description: string;
  higherLevel: string;
  pic: string;
  picBase64: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    filename?: string,
    classes?: string[],
    level?: number,
    school?: string,
    time?: string,
    range?: string,
    components?: string,
    duration?: string,
    description?: string,
    higherLevel?: string,
    ritual?: boolean,
    pic?: string,
    picBase64?: string
  ) {
    super(id, name, sources, filename);
    this.classes = classes || [];
    this.level = level || 0;
    this.school = school || "";
    this.time = time || "";
    this.range = range || "";
    this.components = components || "";
    this.duration = duration || "";
    this.ritual = ritual || false;
    this.description = description || "";
    this.higherLevel = higherLevel || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
  }

  getConfig = () => new SpellConfig();
}

export class SpellConfig extends IEntityConfig {
  classes: SetEntity;
  level: CreatableSetNumber;
  school: CreatableSetString;
  time: CompletableString;
  range: CompletableString;
  components: SearchableString;
  duration: CompletableString;
  description: SearchableString;
  higherLevel: SearchableString;
  ritual: SwitchBoolean;

  constructor() {
    super();
    this.classes = new SetEntity();
    this.level = new CreatableSetNumber();
    this.school = new CreatableSetString();
    this.time = new CompletableString();
    this.range = new CompletableString();
    this.components = new SearchableString();
    this.duration = new CompletableString();
    this.ritual = new SwitchBoolean();
    this.description = new SearchableString();
    this.higherLevel = new SearchableString();
  }
}
