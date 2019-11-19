import {
    BaseService
} from "./baseService";

export class SpellService extends BaseService {

    constructor() {
        super();
        this.tableName = "spells";
    }

    getSpells() {
        return this.connection.select({
            from: this.tableName,
        })
    }

    addSpell(Spell) {
        return this.connection.insert({
            into: this.tableName,
            values: [Spell],
            return: true // since Spellid is autoincrement field and we need id, 
            // so we are making return true which will return the whole data inserted.
        })
    }

    getSpellById(id) {
        return this.connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    removeSpell(id) {
        return this.connection.remove({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    updateSpellById(id, updateData) {
        return this.connection.update({ in: this.tableName,
            set: updateData,
            where: {
                id: id
            }
        })
    }
}