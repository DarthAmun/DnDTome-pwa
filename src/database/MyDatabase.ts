import Dexie from "dexie";
import Spell from "../components/spell/Spell";
export class MyAppDatabase extends Dexie {
  spells: Dexie.Table<Spell, number>; // number = type of the primkey

  constructor() {
    super("MyAppDatabase");
    this.version(1).stores({
      spells: "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
    });
    this.spells = this.table("spells");
  }
}
