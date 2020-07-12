import Dexie from "dexie";
import Spell from "../Data/Spell";
import Gear from "../Data/Gear";

export class MyAppDatabase extends Dexie {
  spells: Dexie.Table<Spell, number>; // number = type of the primkey
  gears: Dexie.Table<Gear, number>; // number = type of the primkey

  constructor() {
    super("DnDTomeDB");
    this.version(1).stores({
      spells:
        "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      gears:
        "++id, name, sources, pic, description, type, cost, damage, weight, properties, filename",
    });
    this.spells = this.table("spells");
    this.gears = this.table("gears");
  }
}
