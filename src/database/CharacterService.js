import { MyAppDatabase } from "./MyDatabase";
import Dexie from "dexie";

const db = new MyAppDatabase();
var all = Dexie.Promise.all;

export function reciveAllChars(callback) {
    db.open()
        .then(function () {
            db.chars.toCollection().sortBy('name', function (array) {
                callback(array);
            })
        })
        .finally(function () {
            db.close();
        });
}

export function reciveChar(id, callback) {
    db.open()
        .then(function () {
            db.chars.where("id").equals(id)
                .then((char) => {
                    callback(char);
                })
                .finally(function () {
                    db.close();
                });
        })
        .finally(function () {
            db.close();
        });
}

export function reciveCharSpells(id, callback) {
    db.open();
    joinCharSpells(db.chars_spells.where('char_id').equals(id)).then(function (spells) {
        callback(spells);
    });
}
function joinCharSpells(charSpellCollection) {

    // Start by getting all bands as an array of band objects
    return charSpellCollection.toArray(function (charSpells) {

        // Query related properties:
        var spellsPromises = charSpells.map(function (charSpell) {
            return db.spells.get(charSpell.spell_id || 0);
        });

        // Await genres and albums queries:
        return all([
            all(spellsPromises),
        ]).then(function (allCharSpells) {

            // Now we have all foreign keys resolved and
            // we can put the results onto the bands array
            // before returning it:
            let spells = []
            charSpells.forEach(function (charSpell, i) {
                spells[i] = allCharSpells[0][i];
                spells[i] = { ...spells[i], "charSpellId": charSpell.id, "prepared": charSpell.prepared };
            });
            return spells;
        });
    });
}

export function reciveCharItems(id, callback) {
    // db.serialize(function () {
    //     db.all("SELECT *, CASE WHEN b.item_name IS NOT NULL THEN b.item_name ELSE c.gear_name END as name FROM 'main'.'tab_characters_items' AS a LEFT JOIN 'main'.'tab_items' AS b ON a.item_id = b.item_id LEFT JOIN 'main'.'tab_gears' AS c ON a.gear_id = c.gear_id WHERE char_id=? ORDER BY name", [id], function (err, rows) {
    //         if (err != null) {
    //             console.log("====>" + err);
    //         }
    //         callback(rows);
    //         console.log("====>" + `getCharItemsResult successfull`)
    //     });
    // });
    db.open();
    joinCharItems(db.chars_items.where('char_id').equals(id)).then(function (items) {
        callback(items);
    });
}
function joinCharItems(charItemCollection) {

    // Start by getting all bands as an array of band objects
    return charItemCollection.toArray(function (charItems) {

        // Query related properties:
        var itemsPromises = charItems.map(function (charItem) {
            if (charItem.item_id != null) {
                return db.items.get(charItem.item_id || 0);
            } else {
                return db.gears.get(charItem.gear_id || 0);
            }
        });

        // Await genres and albums queries:
        return all([
            all(itemsPromises),
        ]).then(function (allCharItems) {

            // Now we have all foreign keys resolved and
            // we can put the results onto the bands array
            // before returning it:
            let items = []
            charItems.forEach(function (charItem, i) {
                items[i] = allCharItems[0][i];
                items[i] = { ...items[i], "charItemId": charItem.id, "amount": charItem.amount, "equiped": charItem.equiped, "damage": charItem.damage, "hit": charItem.hit, "range": charItem.range, "properties": charItem.properties };
            });
            return items;
        });
    });
}


export function reciveCharMonsters(id, callback) {
    db.open();
    joinCharMonsters(db.chars_monsters.where('char_id').equals(id)).then(function (monsters) {
        callback(monsters);
    });
}
function joinCharMonsters(charMonsterCollection) {

    // Start by getting all bands as an array of band objects
    return charMonsterCollection.toArray(function (charMonsters) {

        // Query related properties:
        var monstersPromises = charMonsters.map(function (charMonster) {
            return db.monsters.get(charMonster.monster_id || 0);
        });

        // Await genres and albums queries:
        return all([
            all(monstersPromises),
        ]).then(function (allCharMonsters) {

            // Now we have all foreign keys resolved and
            // we can put the results onto the bands array
            // before returning it:
            let monsters = [];
            charMonsters.forEach(function (charMonster, i) {
                monsters[i] = allCharMonsters[0][i];
            });
            return monsters;
        });
    });
}

export function saveNewChar(char, mainWindow) {
    db.open()
        .then(function () {
            db.chars.put(char);
        })
        .finally(function () {
            db.close();
        });
}

export function saveChar(char) {
    db.open()
        .then(function () {
            db.chars.update(char.id, char);
        })
        .finally(function () {
            db.close();
        });
}

export function saveCharItems(items) {
    db.open()
        .then(function () {
            items.forEach(item => {
                db.chars_items.update(item.charItemId, { "amount": item.amount, "equiped": item.equiped, "damage": item.damage, "hit": item.hit, "range": item.range, "properties": item.properties });
            });
        })
        .finally(function () {
            db.close();
        });
}

export function saveCharMonsters(chars) {
}

export function saveCharSpells(spells) {
    db.open()
        .then(function () {
            spells.forEach(spell => {
                db.chars_spells.update(spell.charSpellId, { "prepared": spell.prepared });
            });
        })
        .finally(function () {
            db.close();
        });
}

// export function saveNewChars(chars) {
//     chars.forEach(char => {
//         let data = [char.char_name, char.char_player, char.char_prof, char.char_level, char.char_pic, char.char_classes, char.char_race, char.char_background, char.char_ac, char.char_hp, char.char_hp_current, char.char_hitDice,
//         char.char_init, char.char_speed, char.char_str, char.char_dex, char.char_con, char.char_int, char.char_wis, char.char_cha, char.char_strSave, char.char_dexSave, char.char_conSave, char.char_intSave, char.char_wisSave, char.char_chaSave,
//         char.char_strSaveProf, char.char_dexSaveProf, char.char_conSaveProf, char.char_intSaveProf, char.char_wisSaveProf, char.char_chaSaveProf,
//         char.char_actions, char.char_bonusActions, char.char_reactions, char.char_features, char.char_classFeatures, char.char_racialFeatures,
//         char.char_profs_langs, char.char_senses, char.char_passivPerception, char.char_passivInsight, char.char_passivInvestigation, char.char_notesOne, char.char_notesTwo, char.char_notesThree,
//         char.char_acrobatics, char.char_animalHandling, char.char_arcana, char.char_athletics, char.char_deception, char.char_history, char.char_insight, char.char_intimidation,
//         char.char_investigation, char.char_medicine, char.char_nature, char.char_perception, char.char_performance, char.char_persuasion, char.char_religion, char.char_sleightOfHand,
//         char.char_stealth, char.char_survival,
//         char.char_acrobaticsProf, char.char_animalHandlingProf, char.char_arcanaProf, char.char_athleticsProf, char.char_deceptionProf, char.char_historyProf, char.char_insightProf, char.char_intimidationProf,
//         char.char_investigationProf, char.char_medicineProf, char.char_natureProf, char.char_perceptionProf, char.char_performanceProf, char.char_persuasionProf, char.char_religionProf, char.char_sleightOfHandProf,
//         char.char_stealthProf, char.char_survivalProf, char.char_charNotes];
//         let sql = `INSERT INTO 'main'.'tab_characters'
//                     (char_name, char_player, char_prof, char_level, char_pic, char_classes, char_race, char_background, 
//                     char_ac, char_hp, char_hp_current, char_hitDice, char_init, char_speed, 
//                     char_str, char_dex, char_con, char_int, char_wis, char_cha, char_strSave, char_dexSave, char_conSave, char_intSave, char_wisSave, char_chaSave, 
//                     char_strSaveProf, char_dexSaveProf, char_conSaveProf, char_intSaveProf, char_wisSaveProf, char_chaSaveProf, 
//                     char_actions, char_bonusActions, char_reactions, char_features, char_classFeatures, char_racialFeatures, 
//                     char_profs_langs, char_senses, char_passivPerception, char_passivInsight, char_passivInvestigation, char_notesOne, 
//                     char_notesTwo, char_notesThree, char_acrobatics,   char_animalHandling, 
//                     char_arcana, char_athletics, char_deception, char_history, char_insight, char_intimidation, char_investigation, 
//                     char_medicine, char_nature, char_perception, char_performance, char_persuasion, char_religion, 
//                     char_sleightOfHand, char_stealth, char_survival, char_acrobaticsProf,   char_animalHandlingProf, 
//                     char_arcanaProf, char_athleticsProf, char_deceptionProf, char_historyProf, char_insightProf, char_intimidationProf, char_investigationProf, 
//                     char_medicineProf, char_natureProf, char_perceptionProf, char_performanceProf, char_persuasionProf, char_religionProf, 
//                     char_sleightOfHandProf, char_stealthProf, char_survivalProf, char_charNotes)
//                     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
//         db.serialize(function () {
//             db.run(sql, data, function (err) {
//                 if (err) {
//                     return console.error(err.message);
//                 }
//                 console.log(`====>Added ${char.char_name} successfull`);
//                 ipcRenderer.send('displayMessage', { type: `Added character`, message: `Added ${char.char_name} successful` });
//             });
//         });
//     });
// }

export function saveNewCharFromJson(char, callback) {
    console.log(char)
    let character = char;
    char = char.char;
    db.open()
        .then(function () {
            db.chars.put({
                name: char.char_name !== undefined ? char.char_name : "",
                player: char.char_player !== undefined ? char.char_player : "",
                prof: char.char_prof !== undefined ? char.char_prof : "",
                level: char.char_level !== undefined ? char.char_level : 1,
                pic: char.char_pic !== undefined ? char.char_pic : "",
                classes: char.char_classes !== undefined ? char.char_classes : "",
                race: char.char_race !== undefined ? char.char_race : "",
                background: char.char_background !== undefined ? char.char_background : "",
                ac: char.char_ac !== undefined ? char.char_ac : 0,
                hp: char.char_hp !== undefined ? char.char_hp : 0,
                currentHp: char.char_currentHp !== undefined ? char.char_currentHp : 0,
                hitDice: char.char_hitDice !== undefined ? char.char_hitDice : "",
                init: char.char_init !== undefined ? char.char_init : 0,
                speed: char.char_speed !== undefined ? char.char_speed : "",
                str: char.char_str !== undefined ? char.char_str : 0,
                dex: char.char_dex !== undefined ? char.char_dex : 0,
                con: char.char_con !== undefined ? char.char_con : 0,
                int: char.char_int !== undefined ? char.char_int : 0,
                wis: char.char_wis !== undefined ? char.char_wis : 0,
                cha: char.char_cha !== undefined ? char.char_cha : 0,
                strSave: char.char_strSave !== undefined ? char.char_strSave : 0,
                dexSave: char.char_dexSave !== undefined ? char.char_dexSave : 0,
                conSave: char.char_conSave !== undefined ? char.char_conSave : 0,
                intSave: char.char_intSave !== undefined ? char.char_intSave : 0,
                wisSave: char.char_wisSave !== undefined ? char.char_wisSave : 0,
                chaSave: char.char_chaSave !== undefined ? char.char_chaSave : 0,
                strSaveProf: char.char_strSaveProf !== undefined ? char.char_strSaveProf : 0,
                dexSaveProf: char.char_dexSaveProf !== undefined ? char.char_dexSaveProf : 0,
                conSaveProf: char.char_conSaveProf !== undefined ? char.char_conSaveProf : 0,
                intSaveProf: char.char_intSaveProf !== undefined ? char.char_intSaveProf : 0,
                wisSaveProf: char.char_wisSaveProf !== undefined ? char.char_wisSaveProf : 0,
                chaSaveProf: char.char_chaSaveProf !== undefined ? char.char_chaSaveProf : 0,
                actions: char.char_actions !== undefined ? char.char_actions : "",
                bonusActions: char.char_bonusActions !== undefined ? char.char_bonusActions : "",
                reactions: char.char_reactions !== undefined ? char.char_reactions : "",
                features: char.char_features !== undefined ? char.char_features : "",
                classFeatures: char.char_classFeatures !== undefined ? char.char_classFeatures : "",
                racialFeatures: char.char_racialFeatures !== undefined ? char.char_racialFeatures : "",
                profsLangs: char.char_profsLangs !== undefined ? char.char_profsLangs : "",
                senses: char.char_senses !== undefined ? char.char_senses : "",
                passivPerception: char.char_passivPerception !== undefined ? char.char_passivPerception : 0,
                passivInsight: char.char_passivInsight !== undefined ? char.char_passivInsight : 0,
                passivInvestigation: char.char_passivInvestigation !== undefined ? char.char_passivInvestigation : 0,
                notesOne: char.char_noteOne !== undefined ? char.char_noteOne : "",
                notesTwo: char.char_noteTwo !== undefined ? char.char_noteTwo : "",
                notesThree: char.char_noteThree !== undefined ? char.char_noteThree : "",
                acrobatics: char.char_acrobatics !== undefined ? char.char_acrobatics : 0,
                animalHandling: char.char_animalHandling !== undefined ? char.char_animalHandling : 0,
                arcana: char.char_arcana !== undefined ? char.char_arcana : 0,
                athletics: char.char_athletics !== undefined ? char.char_athletics : 0,
                deception: char.char_deception !== undefined ? char.char_deception : 0,
                history: char.char_history !== undefined ? char.char_history : 0,
                insight: char.char_insight !== undefined ? char.char_insight : 0,
                intimidation: char.char_intimidation !== undefined ? char.char_intimidation : 0,
                investigation: char.char_investigation !== undefined ? char.char_investigation : 0,
                medicine: char.char_medicine !== undefined ? char.char_medicine : 0,
                nature: char.char_nature !== undefined ? char.char_nature : 0,
                perception: char.char_perception !== undefined ? char.char_perception : 0,
                performance: char.char_performance !== undefined ? char.char_performance : 0,
                persuasion: char.char_persuasion !== undefined ? char.char_persuasion : 0,
                religion: char.char_religion !== undefined ? char.char_religion : 0,
                sleightOfHand: char.char_sleightOfHand !== undefined ? char.char_sleightOfHand : 0,
                stealth: char.char_stealth !== undefined ? char.char_stealth : 0,
                survival: char.char_survival !== undefined ? char.char_survival : 0,
                acrobaticsProf: char.char_acrobaticsProf !== undefined ? char.char_acrobaticsProf : 0,
                animalHandlingProf: char.char_animalHandlingProf !== undefined ? char.char_animalHandlingProf : 0,
                arcanaProf: char.char_arcanaProf !== undefined ? char.char_arcanaProf : 0,
                athleticsProf: char.char_athleticsProf !== undefined ? char.char_athleticsProf : 0,
                deceptionProf: char.char_deceptionProf !== undefined ? char.char_deceptionProf : 0,
                historyProf: char.char_historyProf !== undefined ? char.char_historyProf : 0,
                insightProf: char.char_insightProf !== undefined ? char.char_insightProf : 0,
                intimidationProf: char.char_intimidationProf !== undefined ? char.char_intimidationProf : 0,
                investigationProf: char.char_investigationProf !== undefined ? char.char_investigationProf : 0,
                medicineProf: char.char_medicineProf !== undefined ? char.char_medicineProf : 0,
                natureProf: char.char_natureProf !== undefined ? char.char_natureProf : 0,
                perceptionProf: char.char_perceptionProf !== undefined ? char.char_perceptionProf : 0,
                performanceProf: char.char_performanceProf !== undefined ? char.char_performanceProf : 0,
                persuasionProf: char.char_persuasionProf !== undefined ? char.char_persuasionProf : 0,
                religionProf: char.char_religionProf !== undefined ? char.char_religionProf : 0,
                sleightOfHandProf: char.char_sleightOfHandProf !== undefined ? char.char_sleightOfHandProf : 0,
                stealthProf: char.char_stealthProf !== undefined ? char.char_stealthProf : 0,
                survivalProf: char.char_survivalProf !== undefined ? char.char_survivalProf : 0,
                spellNotes: char.char_spellNotes !== undefined ? char.char_spellNotes : "",
                alignment: char.char_alignment !== undefined ? char.char_alignment : "",
                inspiration: char.char_inspiration !== undefined ? char.char_inspiration : 0,
                castingHit: char.char_castingHit !== undefined ? char.char_castingHit : 0,
                castingDC: char.char_castingDC !== undefined ? char.char_castingDC : 0,
            });
        })
        .finally(function () {
            db.close();
        });
}

export function deleteCharSpell(char, spell, callback) {
    db.open()
        .then(function () {
            db.chars_spells.where({ char_id: char, spell_id: spell.id }).delete().then(callback());
        })
}


export function deleteCharItem(char, item, callback) {
    db.open()
        .then(function () {
            db.chars_items.where({ id: item.charItemId }).delete().then(callback());
        })
}

export function deleteCharMonster(char, monster, callback) {
    db.open()
        .then(function () {
            db.chars_monsters.where({ char_id: char, monster_id: monster.id }).delete().then(callback());
        })
}

export function deleteChar(char) {
    db.open()
        .then(function () {
            db.chars.where('id').equals(char.id).delete();
        })
        .finally(function () {
            db.close();
        });
}

export function deleteAllCharacters() {
    db.open()
        .then(function () {
            db.chars.clear();
        })
        .finally(function () {
            db.close();
        });
};