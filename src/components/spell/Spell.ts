export default class Spell {
  id: number;
  name: string;
  classes: string;
  sources: string;
  level: number;
  school: string;
  time: string;
  range: string;
  components: string;
  duration: string;
  ritual: number;
  text: string;

  constructor(name: string, classes: string, sources: string, level: number, 
    school: string, time: string, range: string, components: string, 
    duration: string, ritual: number, text: string, id: number) {
    this.name = name;
    this.classes = classes;
    this.sources = sources;
    this.level = level;
    this.school = school;
    this.time = time;
    this.range = range;
    this.components = components;
    this.duration = duration;
    this.ritual = ritual;
    this.text = text;
    this.id = id;
  }
}
