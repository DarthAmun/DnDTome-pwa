import * as JsStore from 'jsstore';
import { IDataBase, DATA_TYPE, ITable } from 'jsstore';

const getWorkerPath = () => {
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line import/no-webpack-loader-syntax
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
    }
    else {
        // eslint-disable-next-line import/no-webpack-loader-syntax
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
    }
};

// This will ensure that we are using only one instance. 
// Otherwise due to multiple instance multiple worker will be created.
const workerPath = getWorkerPath();
export const idbCon = new JsStore.Instance(new Worker(workerPath));
export const dbname = 'Demo';

const getDatabase = () => {
    const tblSpell = {
        name: 'spells',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                notNull: true,
                dataType: DATA_TYPE.String
            }
        }
    };
    const dataBase = {
        name: dbname,
        tables: [tblSpell]
    };
    return dataBase;
};

export const initJsStore = () => {
    try {
        const dataBase = getDatabase();
        idbCon.initDb(dataBase);
    }
    catch (ex) {
        console.error(ex);
    }
};

// export const readSpellsByStep = async (step: number): Promise<any[]> => {
//   if (searchObj !== undefined) {
//     return spellsdb.where(searchObj).offset(step).limit(10).toArray();
//   }
//   return spellsdb.offset(step).limit(10).toArray();
// };

// export const writeSpells = (spells: any[]) => {
//   spellsdb.bulkPut(spells);
// };

// export const searchSpells = (searchObject: {}) => {
//   console.log(searchObj);
// };
