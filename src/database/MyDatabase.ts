import Dexie from "dexie";
import Spell from "../components/spell/Spell";
import Item from "../components/item/Item";

export class MyAppDatabase extends Dexie {
  spells: Dexie.Table<Spell, number>; // number = type of the primkey
  items: Dexie.Table<Item, number>; // number = type of the primkey

  constructor() {
    super("MyAppDatabase");
    
    this.version(1).stores({
      spells: "++id, name, classes, sources, level, school, time, range, components, duration, ritual, text, pic",
      items: "++id, name, sources, pic, description, type, rarity, attunment",
    });
    this.spells = this.table("spells");
    this.items = this.table("items");
  }
}
