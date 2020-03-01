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
                    name: monster.name !== undefined ? monster.name : "",
                    source: monster.source !== undefined ? monster.source : "",
                    pic: monster.pic !== undefined ? monster.pic : "",
                    size: monster.size !== undefined ? monster.size : "",
                    type: monster.type !== undefined ? monster.type : "",
                    subtype: monster.subtype !== undefined ? monster.subtype : "",
                    alignment: monster.alignment !== undefined ? monster.alignment : "",
                    ac: monster.ac !== undefined ? monster.ac : 0,
                    hp: monster.hp !== undefined ? monster.hp : 0,
                    speed: monster.speed !== undefined ? monster.speed : "",
                    cr: monster.cr !== undefined ? monster.cr : "",
                    str: monster.str !== undefined ? monster.str : 0,
                    dex: monster.dex !== undefined ? monster.dex : 0,
                    con: monster.con !== undefined ? monster.con : 0,
                    int: monster.int !== undefined ? monster.int : 0,
                    wis: monster.wis !== undefined ? monster.wis : 0,
                    cha: monster.cha !== undefined ? monster.cha : 0,
                    savingThrows: monster.savingThrows !== undefined ? monster.savingThrows : "",
                    skills: monster.skills !== undefined ? monster.skills : "",
                    senses: monster.senses !== undefined ? monster.senses : "",
                    lang: monster.lang !== undefined ? monster.lang : "",
                    dmgVulnerabilitie: monster.dmgVulnerabilitie !== undefined ? monster.dmgVulnerabilitie : "",
                    dmgResistance: monster.dmgResistance !== undefined ? monster.dmgResistance : "",
                    dmgImmunities: monster.dmgImmunities !== undefined ? monster.dmgImmunities : "",
                    conImmunities: monster.conImmunities !== undefined ? monster.conImmunities : "",
                    sAblt: monster.sAblt !== undefined ? monster.sAblt : "",
                    ablt: monster.ablt !== undefined ? monster.ablt : "",
                    lAblt: monster.lAblt !== undefined ? monster.lAblt : "",
                }).then(() => {
                    monsterImported++;
                    callback({ now: monsterImported, full: monsterImportLength, name: monster.name });
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
    db.open()
    .then(function () {
      db.chars_monsters.put({"char_id": char, "monster_id": monster.id});
    })
    .finally(function () {
      db.close();
    });
}
