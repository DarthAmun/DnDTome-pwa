import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FileField from "./FileField";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { isGear } from "../../data/Gear";
import { isItem } from "../../data/Item";
import { saveNewFromList } from "../../services/DatabaseService";

import ProgressBar from "@ramonak/react-progress-bar";
import {
  makeClass,
  makeItems,
  makeMonster,
  makeRace,
  makeSpell,
  makeSubclass,
  makeSubrace,
} from "../../services/5eToolService";
import IEntity from "../../data/IEntity";

export enum ImportModus {
  NORMAL,
  ETOOLS,
}

interface $Props {
  modus: ImportModus;
}

const ImportField = ({ modus }: $Props) => {
  const [files, setFiles] = useState<File[]>([]);

  const changeFile = (fileList: FileList | null) => {
    console.log("Start File Upload");
    if (fileList !== null) {
      const files = Array.from(fileList);
      setFiles(files);
    }
  };

  return (
    <>
      <Files>
        <FileField
          label=""
          isMulti={true}
          accept={".json"}
          icon={faFileImport}
          onChange={(file) => changeFile(file)}
        />
      </Files>
      <Files>
        {files &&
          files.map((file: File, index: number) => (
            <FileTile key={index} modus={modus} file={file} />
          ))}
      </Files>
    </>
  );
};

export default ImportField;

interface $FileProps {
  file: File;
  modus: ImportModus;
}

const FileTile = ({ file, modus }: $FileProps) => {
  const [succCount, setSucc] = useState<number>(0);
  const [maxCount, setMax] = useState<number>(0);

  const make5eToolsEntity = (
    key: string,
    obj: any,
    fileName: string,
    json: any,
    listOfNew: { tableName: string; newEntitiy: IEntity }[]
  ) => {
    if (key === "monster") {
      const newMonster = makeMonster(obj);
      if (newMonster.name !== "") listOfNew.push({ tableName: "monsters", newEntitiy: newMonster });
    } else if (key === "spell") {
      const newSpell = makeSpell(obj, fileName);
      if (newSpell.name !== "") listOfNew.push({ tableName: "spells", newEntitiy: newSpell });
    } else if (key === "item" || key === "baseitem") {
      const newItem = makeItems(obj, fileName);
      if (newItem.name !== "")
        if (isGear(newItem)) {
          listOfNew.push({ tableName: "gears", newEntitiy: newItem });
        } else if (isItem(newItem)) {
          listOfNew.push({ tableName: "items", newEntitiy: newItem });
        }
    } else if (key === "race") {
      const newRace = makeRace(obj, fileName);
      if (newRace.name !== "") {
        listOfNew.push({ tableName: "races", newEntitiy: newRace });
        if (obj._copy === undefined && obj.source !== "DMG") {
          if (obj.subraces !== undefined) {
            obj.subraces.forEach(async (subrace: any) => {
              const newSubrace = makeSubrace(subrace, newRace, file.name);
              listOfNew.push({ tableName: "subraces", newEntitiy: newSubrace });
            });
          }
        }
      }
    } else if (key === "class") {
      const newClass = makeClass(obj, json, fileName);
      if (newClass.name !== "") {
        listOfNew.push({ tableName: "classes", newEntitiy: newClass });
        if (obj.subclasses !== undefined) {
          obj.subclasses.forEach(async (subclass: any) => {
            const newSubclass = makeSubclass(subclass, json, newClass.name, file.name);
            listOfNew.push({ tableName: "subclasses", newEntitiy: newSubclass });
          });
        }
      }
    } else if (key === "subclass") {
      if (obj.className !== undefined) {
        const newSubclass = makeSubclass(obj, json, obj.className, file.name);
        if (newSubclass.name !== "")
          listOfNew.push({ tableName: "subclasses", newEntitiy: newSubclass });
      }
    }
    return listOfNew;
  };

  const scanImportFile = async (json: any, fileName: string) => {
    console.log("Start 5eTools Json interpreting " + fileName);

    let listOfNew: { tableName: string; newEntitiy: IEntity }[] = [];

    let newMax: number = 0;
    for (const [key, value] of Object.entries(json)) {
      if (Array.isArray(value)) {
        newMax += value.length;
        if (modus === ImportModus.NORMAL) {
          // eslint-disable-next-line
          value.forEach((obj: any) => listOfNew.push({ tableName: key, newEntitiy: obj }));
        } else if (modus === ImportModus.ETOOLS) {
          // eslint-disable-next-line
          value.forEach((obj: any) => make5eToolsEntity(key, obj, fileName, json, listOfNew));
        }
      }
    }
    setMax(newMax);

    while (listOfNew.length > 0) {
      let newTableName = listOfNew[0].tableName;
      let bulkList: IEntity[] = listOfNew
        .filter((newEntitiy) => newEntitiy.tableName === newTableName)
        .map((entity: { tableName: string; newEntitiy: IEntity }) => {
          return entity.newEntitiy;
        });
      await saveNewFromList(newTableName, bulkList, fileName);
      listOfNew = listOfNew.filter((entity) => entity.tableName !== newTableName);
      setSucc(newMax - listOfNew.length);
    }
  };

  useEffect(() => {
    console.log("Start Filereader " + file.name);
    let fileReader = new FileReader();
    fileReader.onloadend = function () {
      const content = fileReader.result;
      if (content !== null) {
        let json = JSON.parse(content.toString());
        console.log("Json loaded from " + file.name);
        scanImportFile(json, file.name);
      }
    };
    fileReader.readAsText(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <FileWrapper>
      {file.name} {succCount}/{maxCount}
      <ProgressBar
        completed={Math.round((succCount / maxCount) * 100)}
        isLabelVisible={false}
        bgcolor={"#F55C5C"}
        height={"5px"}
        margin={"5px"}
      />
    </FileWrapper>
  );
};

const Files = styled.div`
  flex: 1 1 100%;
`;

const FileWrapper = styled.div`
  width: clac(100% - 20px);
  height: 50px;
  padding: 10px;
`;
