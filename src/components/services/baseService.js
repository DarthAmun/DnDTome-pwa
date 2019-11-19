import {
    idbCon, initJsStore
} from "./database";
export class BaseService {

    constructor() {
        initJsStore();
    }

    get connection() {
        return idbCon;
    }

}