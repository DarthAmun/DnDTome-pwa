import IEntity from "./IEntity";

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
    ritual?: boolean,
    description?: string,
    higherLevel?: string,
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
}
