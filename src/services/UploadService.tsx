import { FileType } from "rsuite/esm/Uploader/Uploader";
import IEntity from "../data/IEntity";
import { saveNewFromList } from "./DatabaseService";
import { upgradeTo28 } from "./VersionService";

export const importDTFile = (file: FileType) => {
  console.log(file.blobFile);
  readFile(file, scanImportedJson);
};

const readFile = (file: FileType, callback: (json: any) => void) => {
  if (file.blobFile) {
    let fileReader = new FileReader();
    fileReader.onloadend = function () {
      const content = fileReader.result;
      if (content !== null) {
        let json = JSON.parse(content.toString());
        console.log("Json loaded from " + file.name);
        callback(json);
        console.log("---------");
      }
    };
    fileReader.readAsText(file.blobFile);
  }
};

const scanImportedJson = (json: any) => {
  let listOfNewEntities: { tableName: string; newEntitiy: IEntity }[] = [];
  for (const [key, value] of Object.entries(json)) {
    if (Array.isArray(value)) {
      for (let obj of value) {
        listOfNewEntities = [...listOfNewEntities, { tableName: key, newEntitiy: obj }];
      }
    }
  }
  listOfNewEntities = versionFilter(listOfNewEntities);
  saveInDB(listOfNewEntities);
};

const saveInDB = async (listOfNewEntities: { tableName: string; newEntitiy: IEntity }[]) => {
  let listOfNew = [...listOfNewEntities];
  while (listOfNew.length > 0) {
    let newTableName = listOfNew[0].tableName;
    let bulkList: IEntity[] = listOfNew
      .filter((newEntitiy) => newEntitiy.tableName === newTableName)
      .map((entity: { tableName: string; newEntitiy: IEntity }) => {
        return entity.newEntitiy;
      });
    await saveNewFromList(newTableName, bulkList);
    listOfNew = listOfNew.filter((entity) => entity.tableName !== newTableName);
  }
  console.log("Done saving");
};

const versionFilter = (
  listOfNewEntities: { tableName: string; newEntitiy: IEntity }[]
): { tableName: string; newEntitiy: IEntity }[] => {
  let updatedEntities: { tableName: string; newEntitiy: IEntity }[] = [];
  for (let entity of listOfNewEntities) {
    let updatedEntity = upgradeTo28(entity);
    updatedEntities.push(updatedEntity);
  }
  return updatedEntities;
};
