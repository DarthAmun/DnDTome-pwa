import Dexie from 'dexie';

const db = new Dexie('dndTome');
db.version(1).stores({
    spells: '++id, name,classes,sources,level,school,time,range,components,duration,ritual,text',
    monsters: '++id,monster_name,monster_size,monster_type,monster_subtype,monster_cr,' +
                'monster_alignment,monster_armorClass,monster_hitPoints,monster_strength,' +
                'monster_dexterity,monster_constitution,monster_intelligence,monster_wisdom,' +
                'monster_charisma,monster_dmgVulnerabilities,monster_dmgResistance,monster_dmgImmunities,' +
                'monster_conImmunities,monster_senses,monster_lang,monster_source,monster_pic,monster_savingThrows,' +
                'monster_ablt,monster_skills,monster_sAblt,monster_lAbtl,monster_speed'
});

// async function test() {

//     var id = await db.spells.put({
//         name: 'Test' ,
//         classes: 'Test' ,
//         sources: 'Test' ,
//         level: '0',
//         school: 'Test' ,
//         time: 'Test' ,
//         range: 'Test' ,
//         components: 'Test' ,
//         duration: 'Test' ,
//         ritual: 'Test',
//         text: 'Test'
//     });

//     var id2 = await db.monsters.put({
//         monster_name: 'Test',
//         monster_size: 'Test',
//         monster_type: 'Test',
//         monster_subtype: 'Test',
//         monster_cr: 'Test',
//         monster_alignment: 'Test',
//         monster_armorClass: 1,
//         monster_hitPoints: 1,
//         monster_strength: 1,
//         monster_dexterity: 1,
//         monster_constitution: 1,
//         monster_intelligence: 1,
//         monster_wisdom: 1,
//         monster_charisma: 1,
//         monster_dmgVulnerabilities: 'Test',
//         monster_dmgResistance: 'Test',
//         monster_dmgImmunities: 'Test',
//         monster_conImmunities: 'Test',
//         monster_senses: 'Test',
//         monster_lang: 'Test',
//         monster_source: 'Test',
//         monster_pic: 'Test',
//         monster_savingThrows: 'Test',
//         monster_ablt: 'Test',
//         monster_skills: 'Test',
//         monster_sAblt: 'Test',
//         monster_lAbtl: 'Test',
//         monster_speed: 'Test'
//     })
//     console.log("Got id " + id);
//     // Now lets add a bunch of tasks
//     await db.spells.bulkPut([
//         {
//             name: 'Test2' ,
//             classes: 'Test2' ,
//             sources: 'Test2' ,
//             level: '3',
//             school: 'Test2' ,
//             time: 'Test2' ,
//             range: 'Test2' ,
//             components: 'Test2' ,
//             duration: 'Test2' ,
//             ritual: 'Test2',
//             text: 'Test2'
//         },
//         {
//             name: 'Test3' ,
//             classes: 'Test3' ,
//             sources: 'Test3' ,
//             level: '4',
//             school: 'Test3' ,
//             time: 'Test3' ,
//             range: 'Test3' ,
//             components: 'Test3' ,
//             duration: 'Test3' ,
//             ritual: 'Test3',
//             text: 'Test3'
//         }

//     ]);
//     // Ok, so let's query it

//     var spells = await db.spells.where('level').above(0).toArray();
//     //console.log("Found Spells: " + JSON.stringify(spells));

//     // Ok, so let's complete the 'Test Dexie' task.
//     await db.spells
//         .where('school')
//         .startsWithIgnoreCase('Test')
//         .modify({level: 1});

//     console.log ("All tasks should be completed now.");
//     console.log ("Now let's delete all old tasks:");

//     // And let's remove all old tasks:

//     //await db.spells.where('id').above(0).delete();

//     console.log ("Done.");
// }

// test().catch (err => {
//     console.error ("Uh oh! " + err.stack);
// });
export default db;