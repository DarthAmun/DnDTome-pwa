
import { MyAppDatabase } from "./MyDatabase";

const db = new MyAppDatabase();
let searchItemQuery;

export function reciveAllItems(callback) {
    db.open()
        .then(function () {
            db.items.toCollection().sortBy('name', function (array) {
                callback(array);
            })
        })
        .finally(function () {
            db.close();
        });
}
export function reciveItemByName(name, callback) {
    db.open()
        .then(function () {
            db.items.where("name").equalsIgnoreCase(name)
                .then((item) => {
                    callback(item);
                })
                .finally(function () {
                    db.close();
                });
        })
        .finally(function () {
            db.close();
        });
}

export function reciveItems(query, callback) {

    if (query !== null) {
        searchItemQuery = query.query;
    }

    db.open()
        .then(function () {
            console.time("sortItems")
            db.items
                .filter(item => {
                    return true
                })
                .sortBy('name', function (array) {
                    console.timeEnd("sortItems")
                    callback(array);
                })
        })
        .finally(function () {
            db.close();
        });
}

export function reciveItemCount(query, callback) {
    db.open()
        .then(function () {
            db.items.count(count => {
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
            db.items.orderBy(attribute).uniqueKeys(function (array) {
                callback(array);
            })
        })
        .finally(function () {
            db.close();
        });
}

export function saveItem(item) {
    db.open()
        .then(function () {
            db.items.update(item.id, item);
        })
        .finally(function () {
            db.close();
        });
}

export function saveNewItem (item) {

}

export function saveNewItems(items, callback) {
    let itemImportLength = Object.keys(items).length;
    let itemImported = 0;
    db.open()
        .then(function () {
            items.map(item => {
                db.items.put({
                    name: item.item_name,
                    sources: item.item_sources,
                    pic: item.item_pic,
                    description: item.item_description,
                    rarity: item.item_rarity,
                    type: item.item_type,
                    attunment: item.item_attunment
                });
                itemImported++;
                callback({ now: itemImported, full: itemImportLength, name: item.item_name });
            });
        })
        .finally(function () {
            db.close();
        });
}

export function saveNewItemFromJson(item, callback) {

}

export function deleteItem (item) {
    db.open()
        .then(function () {
            db.items.where('id').equals(item.id).delete();
        })
        .finally(function () {
            db.close();
        });
}

export function deleteAllItems() {
    db.open()
    .then(function () {
      db.items.clear();
    })
    .finally(function () {
      db.close();
    });
};

export function addItemToChar(char, item, callback) {

}