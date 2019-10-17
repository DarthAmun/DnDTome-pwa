import Dexie from "dexie";

export default function foo() {}

export const dnDTomeDatabase = new Dexie("dndtomedb");

dnDTomeDatabase.version(1).stores({
  spellsdb:
    "++id",
  monstersdb:
    "++id"
});

export const spellsdb = dnDTomeDatabase.table<any>("spellsdb");

export const readSpellsByStep = async (step: number): Promise<any[]> => {
  return spellsdb.offset(step).limit(10).toArray();
};

export const writeSpells = (spells: any[]) => {
  spellsdb.bulkPut(spells);
}
