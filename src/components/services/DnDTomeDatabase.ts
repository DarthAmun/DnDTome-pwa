import Dexie from "dexie";

export default function foo() {}

export const dnDTomeDatabase = new Dexie("dndtomedb");

dnDTomeDatabase.version(1).stores({
  spellsdb:
    "++id, spell_name, spell_classes, spell_sources,spell_level,spell_school,spell_time,spell_range,spell_components,spell_duration,spell_ritual,spell_text",
  monstersdb:
    "++id,monster_name,monster_size,monster_type,monster_subtype,monster_cr," +
    "monster_alignment,monster_armorClass,monster_hitPoints,monster_strength," +
    "monster_dexterity,monster_constitution,monster_intelligence,monster_wisdom," +
    "monster_charisma,monster_dmgVulnerabilities,monster_dmgResistance,monster_dmgImmunities," +
    "monster_conImmunities,monster_senses,monster_lang,monster_source,monster_pic,monster_savingThrows," +
    "monster_ablt,monster_skills,monster_sAblt,monster_lAbtl,monster_speed"
});

export const spellsdb = dnDTomeDatabase.table<any>("spellsdb");
let searchObj: {};

export const readSpellsByStep = async (step: number): Promise<any[]> => {
  if (searchObj !== undefined) {
    return spellsdb.where(searchObj).offset(step).limit(10).toArray();
  }
  return spellsdb.offset(step).limit(10).toArray();
};

export const writeSpells = (spells: any[]) => {
  spellsdb.bulkPut(spells);
};

export const searchSpells = (searchObject: {}) => {
  console.log(searchObj);
  return spellsdb.where(searchObj).offset(0).limit(10).toArray();
};
