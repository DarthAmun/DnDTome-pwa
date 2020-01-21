import Dexie from "dexie";
import Spell from "./Spell";

export class MyAppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  spells: Dexie.Table<Spell, number>; // number = type of the primkey
  //...other tables goes here...

  constructor() {
    super("MyAppDatabase");
    this.version(1).stores({
      spells: "++id, name,classes,sources,level,school, time, range,components,duration, ritual,text",
      //...other tables goes here...
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.spells = this.table("spells");
  }

}