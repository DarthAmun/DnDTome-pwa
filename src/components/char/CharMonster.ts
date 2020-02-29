export default class CharMonster{
    id: number;
    char_id: number;
    monster_id: number;
  
    constructor(
        id: number,
        char_id: number,
        monster_id: number,
    ) {
      this.id = id;
      this.char_id = char_id;
      this.monster_id = monster_id;
    }
  }
  