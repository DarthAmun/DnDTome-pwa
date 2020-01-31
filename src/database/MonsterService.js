import { MyAppDatabase } from "./MyDatabase";

const db = new MyAppDatabase();
let searchMonsterQuery;

export function reciveAllMonsters(callback) {
    db.open()
        .then(function () {
            db.monsters.toCollection().sortBy('name', function (array) {
                callback(array);
            })
        })
        .finally(function () {
            db.close();
        });
}

export function reciveMonstersByName(name, callback) {
    db.open()
        .then(function () {
            db.monsters.where("name").equalsIgnoreCase(name)
                .then((monster) => {
                    callback(monster);
                })
                .finally(function () {
                    db.close();
                });
        })
        .finally(function () {
            db.close();
        });
}

export function reciveMonstersByCertainName(name, callback) {
    db.open()
        .then(function () {
            db.monsters.where("name").equalsIgnoreCase(name)
                .then((monster) => {
                    callback(monster);
                })
                .finally(function () {
                    db.close();
                });
        })
        .finally(function () {
            db.close();
        });
}

export function reciveMonsters(query, callback) {

    if (query !== null) {
        searchMonsterQuery = query.query;
    }

    db.open()
        .then(function () {
            console.time("sortMonsters")
            db.monsters
                .filter(monster => {
                    return true;
                })
                .sortBy('name', function (array) {
                    console.timeEnd("sortMonsters")
                    callback(array);
                })
        })
        .finally(function () {
            db.close();
        });
}

export function reciveMonsterCount(query, callback) {
    db.open()
        .then(function () {
            db.monsters.count(count => {
                callback(count);
            })
        })
        .finally(function () {
            db.close();
        });
}

export function reciveAttributeSelection(attribute, callback) {
    db.open()
        .then(function () {
            db.monsters.orderBy(attribute).uniqueKeys(function (array) {
                callback(array);
            })
        })
        .finally(function () {
            db.close();
        });
}

export function saveMonster(monster) {
    db.open()
        .then(function () {
            db.monsters.update(monster.id, monster);
        })
        .finally(function () {
            db.close();
        });
}

export function saveNewMonster(monster) {
    db.open()
        .then(function () {
            db.monsters.put(monster);
        })
        .finally(function () {
            db.close();
        });
}

export function saveNewMonsters(monsters, callback) {
    let monsterImportLength = Object.keys(monsters).length;
    let monsterImported = 0;
    db.open()
        .then(function () {
            monsters.map(monster => {
                db.monsters.put({
                    name: monster.monster_name !== undefined ? monster.monster_name : "",
                    source: monster.monster_source !== undefined ? monster.monster_source : "",
                    pic: monster.monster_pic !== undefined ? monster.monster_pic : "",
                    size: monster.monster_size !== undefined ? monster.monster_size : "",
                    type: monster.monster_type !== undefined ? monster.monster_type : "",
                    subtype: monster.monster_subtype !== undefined ? monster.monster_subtype : "",
                    alignment: monster.monster_alignment !== undefined ? monster.monster_alignment : "",
                    ac: monster.monster_ac !== undefined ? monster.monster_ac : 0,
                    hp: monster.monster_hp !== undefined ? monster.monster_hp : 0,
                    speed: monster.monster_speed !== undefined ? monster.monster_speed : "",
                    cr: monster.monster_cr !== undefined ? monster.monster_cr : "",
                    str: monster.monster_str !== undefined ? monster.monster_str : 0,
                    dex: monster.monster_dex !== undefined ? monster.monster_dex : 0,
                    con: monster.monster_con !== undefined ? monster.monster_con : 0,
                    int: monster.monster_int !== undefined ? monster.monster_int : 0,
                    wis: monster.monster_wis !== undefined ? monster.monster_wis : 0,
                    cha: monster.monster_cha !== undefined ? monster.monster_cha : 0,
                    savingThrows: monster.monster_savingThrows !== undefined ? monster.monster_savingThrows : "",
                    skills: monster.monster_skills !== undefined ? monster.monster_skills : "",
                    senses: monster.monster_senses !== undefined ? monster.monster_senses : "",
                    lang: monster.monster_lang !== undefined ? monster.monster_lang : "",
                    dmgVulnerabilitie: monster.monster_dmgVulnerabilitie !== undefined ? monster.monster_dmgVulnerabilitie : "",
                    dmgResistance: monster.monster_dmgResistance !== undefined ? monster.monster_dmgResistance : "",
                    dmgImmunities: monster.monster_dmgImmunities !== undefined ? monster.monster_dmgImmunities : "",
                    conImmunities: monster.monster_conImmunities !== undefined ? monster.monster_conImmunities : "",
                    sAblt: monster.monster_sAblt !== undefined ? monster.monster_sAblt : "",
                    ablt: monster.monster_ablt !== undefined ? monster.monster_ablt : "",
                    lAblt: monster.monster_lAblt !== undefined ? monster.monster_lAblt : "",
                }).then(() => {
                    monsterImported++;
                    callback({ now: monsterImported, full: monsterImportLength, name: monster.monster_name });
                });
            });
        })
        .finally(function () {
            db.close();
        });
}

export function saveNewMonsterFromJson(monster, callback) {

}

export function deleteMonster(monster) {
    db.open()
        .then(function () {
            db.monsters.where('id').equals(monster.id).delete();
        })
        .finally(function () {
            db.close();
        });
}

export function deleteAllMonsters() {
    db.open()
        .then(function () {
            db.monsters.clear();
        })
        .finally(function () {
            db.close();
        });
};

export function addMonsterToChar(char, monster, callback) {

}