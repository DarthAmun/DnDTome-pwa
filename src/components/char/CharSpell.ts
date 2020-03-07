export default class CharSpell {
    id: number;
    char_id: number;
    spell_id: number;
    prepared: number;
  
    constructor(
        id: number,
        char_id: number,
        spell_id: number,
        prepared: number,
    ) {
      this.id = id;
      this.char_id = char_id;
      this.spell_id = spell_id;
      this.prepared = prepared;
    }
  }
  