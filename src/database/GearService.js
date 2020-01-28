
import { MyAppDatabase } from "./MyDatabase";

const db = new MyAppDatabase();
let searchGearQuery;

export function reciveAllGears(callback) {
    db.open()
        .then(function () {
            db.gears.toCollection().sortBy('name', function (array) {
                callback(array);
            })
        })
        .finally(function () {
            db.close();
        });
}

export function reciveGearByName(name, callback) {
    db.open()
        .then(function () {
            db.gears.where("name").equalsIgnoreCase(name)
                .then((gear) => {
                    callback(gear);
                })
                .finally(function () {
                    db.close();
                });
        })
        .finally(function () {
            db.close();
        });
}

export function reciveGears(query, callback) {
    if (query !== null) {
        searchGearQuery = query.query;
    }

    db.open()
        .then(function () {
            console.time("sortgears")
            db.gears
                .filter(gear => {
                    let typebool = true;
                    if (searchGearQuery.type !== null && searchGearQuery.type.length !== 0) {
                        typebool = false;
                        searchGearQuery.type.map(type => {
                            if (gear.type === type.value) typebool = true;
                        });
                    }
                    console.log(gear)
                    return (
                        (searchGearQuery.name !== undefined && gear.name.includes(searchGearQuery.name))
                        && (searchGearQuery.description !== undefined && gear.description.includes(searchGearQuery.description))
                        && (searchGearQuery.sources !== undefined && gear.sources.includes(searchGearQuery.sources))
                        && (searchGearQuery.cost !== undefined && gear.cost.includes(searchGearQuery.cost))
                        && (searchGearQuery.damage !== undefined && gear.damage.includes(searchGearQuery.damage))
                        && (searchGearQuery.weight !== undefined && gear.weight.includes(searchGearQuery.weight))
                        && (searchGearQuery.properties !== undefined && gear.properties.includes(searchGearQuery.properties))
                        && typebool
                    );
                })
                .sortBy('name', function (array) {
                    console.timeEnd("sortgears")
                    callback(array);
                })
        })
        .finally(function () {
            db.close();
        });
}

export function reciveGearCount(query, callback) {
    db.open()
        .then(function () {
            db.gears.count(count => {
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
            db.gears.orderBy(attribute).uniqueKeys(function (array) {
                callback(array);
            })
        })
        .finally(function () {
            db.close();
        });
}

export function saveGear(gear) {
    db.open()
        .then(function () {
            db.gears.update(gear.id, gear);
        })
        .finally(function () {
            db.close();
        });
}

export function saveNewGear(gear) {

}

export function saveNewGears(gears, callback) {
    let gearImportLength = Object.keys(gears).length;
    let gearImported = 0;
    db.open()
        .then(function () {
            gears.map(gear => {
                db.gears.put({
                    name: gear.gear_name !== undefined ? gear.gear_name : "",
                    sources: gear.gear_sources !== undefined ? gear.gear_sources : "",
                    pic: gear.gear_pic !== undefined ? gear.gear_pic : "",
                    description: gear.gear_description !== undefined ? gear.gear_description : "",
                    cost: gear.gear_cost !== undefined ? gear.gear_cost : "",
                    damage: gear.gear_damage !== undefined ? gear.gear_damage : "",
                    weight: gear.gear_weight !== undefined ? gear.gear_weight : "",
                    properties: gear.gear_properties !== undefined ? gear.gear_properties : "",
                    type: gear.gear_type !== undefined ? gear.gear_type : "",
                });
                gearImported++;
                callback({ now: gearImported, full: gearImportLength, name: gear.gear_name });
            });
        })
        .finally(function () {
            db.close();
        });
}

export function saveNewGearFromJson(gear, callback) {

}

export function addGearToChar(char, gear, callback) {

}

export function deleteGear(gear) {
    db.open()
        .then(function () {
            db.gears.where('id').equals(gear.id).delete();
        })
        .finally(function () {
            db.close();
        });
}

export function deleteAllGear() {
    db.open()
        .then(function () {
            db.gears.clear();
        })
        .finally(function () {
            db.close();
        });
};

export function addGearToCharFromJson(char, gear, callback) {

}