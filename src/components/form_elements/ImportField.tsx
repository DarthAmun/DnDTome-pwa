import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import FileField from "./FileField";
import IEntity from "../../data/IEntity";
import Selection from "../../data/Selection";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { isGear } from "../../data/Gear";
import { isItem } from "../../data/Item";
import { reciveAllFilteredPromise, saveNewFromList, update } from "../../services/DatabaseService";

import ProgressBar from "@ramonak/react-progress-bar";
import {
  makeBackground,
  makeClass,
  makeFeat,
  makeItems,
  makeMonster,
  makeRace,
  makeSelection,
  makeSpell,
  makeSubclass,
  makeSubrace,
} from "../../services/5eToolService";
import Filter from "../../data/Filter";

export enum ImportModus {
  NORMAL,
  ETOOLS,
  IMAGE,
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
          accept={
            modus === ImportModus.NORMAL || modus === ImportModus.ETOOLS ? ".json" : "image/*"
          }
          icon={faFileImport}
          onChange={(file) => changeFile(file)}
        />
      </Files>
      <Files>{files && files.length > 0 && <FileTile modus={modus} files={files} />}</Files>
    </>
  );
};

export default ImportField;

interface $FileProps {
  files: File[];
  modus: ImportModus;
}

const FileTile = ({ files, modus }: $FileProps) => {
  const [filesDone, setFilesDone] = useState<number>(0);
  const [fails, setFails] = useState<any[]>([]);
  const [maxCount, setMax] = useState<number>(0);
  const [listOfNewEntities, setListOfNewEntites] = useState<
    { tableName: string; newEntitiy: IEntity }[]
  >([]);

  const convertTypes = useCallback((types: string[]): string[] => {
    let newTypes: string[] = [];
    if (types !== undefined && Array.isArray(types))
      newTypes = types.map((type: string) => {
        if (typeof type == "string")
          switch (type.split(":")[0]) {
            case "OR":
              return "Onomancy Resonant";
            case "EI":
              return "Invocations";
            case "AF":
              return "Alchemical Formular";
            case "MV":
              return "Maneuver";
            case "FS":
              return "Fighting Styles";
            case "AI":
              return "Artificer Infusion";
            case "AS":
              return "Arcane Shot";
            case "ED":
              return "Elemental Disciplin";
            case "MM":
              return "Metamagic";
            case "RN":
              return "Rune";
            case "PB":
              return "Pact Boon";
            default:
              return "Unknown";
          }
        return "Unknown";
      });
    return newTypes;
  }, []);

  const make5eToolsEntity = useCallback(
    (
      key: string,
      obj: any,
      fileName: string,
      json: any,
      listOfNew: { tableName: string; newEntitiy: IEntity }[]
    ) => {
      let newList = [...listOfNew];
      if (key === "monster") {
        const newMonster = makeMonster(obj);
        if (newMonster.name !== "") newList.push({ tableName: "monsters", newEntitiy: newMonster });
      } else if (key === "spell") {
        const newSpell = makeSpell(obj, fileName);
        if (newSpell.name !== "") newList.push({ tableName: "spells", newEntitiy: newSpell });
      } else if (key === "item" || key === "baseitem") {
        const newItem = makeItems(obj, fileName);
        if (newItem.name !== "")
          if (isGear(newItem)) {
            newList.push({ tableName: "gears", newEntitiy: newItem });
          } else if (isItem(newItem)) {
            newList.push({ tableName: "items", newEntitiy: newItem });
          }
      } else if (key === "race") {
        const newRace = makeRace(obj, fileName);
        if (newRace.name !== "") {
          newList.push({ tableName: "races", newEntitiy: newRace });
          if (obj._copy === undefined && obj.source !== "DMG") {
            if (obj.subraces !== undefined) {
              obj.subraces.forEach(async (subrace: any) => {
                const newSubrace = makeSubrace(subrace, newRace, fileName);
                newList.push({ tableName: "subraces", newEntitiy: newSubrace });
              });
            }
          }
        }
      } else if (key === "class") {
        const newClass = makeClass(obj, json, fileName);
        if (newClass.name !== "") {
          newList.push({ tableName: "classes", newEntitiy: newClass });
          if (obj.subclasses !== undefined) {
            obj.subclasses.forEach(async (subclass: any) => {
              const newSubclass = makeSubclass(subclass, json, newClass.name, fileName);
              newList.push({ tableName: "subclasses", newEntitiy: newSubclass });
            });
          }
        }
      } else if (key === "subclass") {
        if (obj.className !== undefined) {
          const newSubclass = makeSubclass(obj, json, obj.className, fileName);
          if (newSubclass.name !== "")
            newList.push({ tableName: "subclasses", newEntitiy: newSubclass });
        }
      } else if (key === "feat") {
        const newFeat = makeFeat(obj, json, fileName);
        if (newFeat.name !== "") newList.push({ tableName: "feats", newEntitiy: newFeat });
      } else if (key === "background") {
        const newBackground = makeBackground(obj, json, fileName);
        if (newBackground.name !== "")
          newList.push({ tableName: "backgrounds", newEntitiy: newBackground });
      }
      return newList;
    },
    []
  );

  const make5eToolsSelections = useCallback(
    (value: any[], fileName: string, listOfNew: { tableName: string; newEntitiy: IEntity }[]) => {
      let newList = [...listOfNew];
      let selections: Selection[] = [];

      value.forEach((obj: any) => {
        convertTypes(obj.featureType).forEach((type: string) => {
          if (type === "Unknown") type = fileName;
          if (selections.filter((selc) => selc.name === type).length <= 0) {
            selections.push({
              name: type,
              filename: fileName,
              selectionOptions: [makeSelection(obj)],
            });
          } else {
            selections = selections.map((selc) => {
              if (selc.name === type) {
                return {
                  ...selc,
                  selectionOptions: [...selc.selectionOptions, makeSelection(obj)],
                };
              }
              return selc;
            });
          }
        });
      });

      selections.forEach((selc: Selection) => {
        newList.push({ tableName: "selections", newEntitiy: selc });
      });
      return newList;
    },
    [convertTypes]
  );

  const scanImportFile = (json: any, filename: string) => {
    for (const [key, value] of Object.entries(json)) {
      if (Array.isArray(value)) {
        setMax((m) => m + value.length);
        if (modus === ImportModus.NORMAL) {
          // eslint-disable-next-line
          value.forEach((obj: IEntity) => {
            setListOfNewEntites((l) => [...l, { tableName: key, newEntitiy: obj }]);
          });
        } else if (modus === ImportModus.ETOOLS) {
          if (key === "optionalfeature") {
            setListOfNewEntites((l) => {
              let list = make5eToolsSelections(value, filename, l);
              if (list.length - l.length === 0)
                setFails((f) =>
                  f.concat(
                    value.map((val) => {
                      return { obj: val, filename: filename };
                    })
                  )
                );
              return list;
            });
          } else {
            // eslint-disable-next-line
            value.forEach((obj: any) => {
              setListOfNewEntites((l) => {
                let list = make5eToolsEntity(key, obj, filename, json, l);
                if (list.length - l.length === 0)
                  setFails((f) => f.concat({ obj: obj, filename: filename }));
                return list;
              });
            });
          }
        }
      }
    }
    setFilesDone((f) => f + 1);
  };

  const importImage = async (base64: string, fileName: string) => {
    let entityTable: string = fileName.split("_")[0];
    let entityName: string = fileName.split("_")[1].split(".")[0].trim();
    console.log(entityTable, entityName);

    let entities = await reciveAllFilteredPromise(entityTable, [new Filter("name", entityName)]);

    let newList: IEntity[] = [];
    if (entities !== undefined) entities.forEach((entity: IEntity) => newList.push(entity));
    console.log("... found " + newList.length + " entities that match " + entityName + " ...");

    newList.forEach((entity: any) => {
      if (
        (entity.picBase64 === "" && entity.pic === "") ||
        entity.name.toLowerCase() === entityName.toLowerCase()
      ) {
        console.log("... updated " + entity.name + " ...");
        update(entityTable, { ...entity, picBase64: base64 });
      } else {
        console.log("... not updated " + entity.name + " since already having a picture...");
      }
    });
    setFilesDone((f) => f + 1);
  };

  useEffect(() => {
    setFilesDone(0);
    setMax(0);
    setFails([]);
    setListOfNewEntites([]);

    console.log("-+ Start Filereader +-");

    if (modus === ImportModus.IMAGE) {
      setMax((m) => m + files.length);
      files.forEach((file) => {
        let fileReader = new FileReader();
        fileReader.onloadend = function (event: any) {
          console.log("Image (" + file.name + ") import started...");
          importImage(event.target.result, file.name);
        };
        fileReader.readAsDataURL(file);
      });
    } else {
      files.forEach((file) => {
        let fileReader = new FileReader();
        fileReader.onloadend = function () {
          const content = fileReader.result;
          if (content !== null) {
            let json = JSON.parse(content.toString());
            console.log("Json loaded from " + file.name);
            scanImportFile(json, file.name);
            console.log("---------");
          }
        };
        fileReader.readAsText(file);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const save = useCallback(async () => {
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
  }, [listOfNewEntities]);

  useEffect(() => {
    if (filesDone === files.length) {
      save();
    }
  }, [filesDone, files.length, save]);

  return (
    <FileWrapper>
      Files done: {filesDone}/{files.length} | Found entities:{maxCount} (Failed entities:{" "}
      {fails.length})
      <ProgressBar
        completed={Math.round((filesDone / files.length) * 100)}
        isLabelVisible={false}
        bgColor={"#F55C5C"}
        height={"5px"}
        margin={"5px"}
      />
      {fails &&
        fails.length > 0 &&
        filesDone === files.length &&
        fails.map((fail) => {
          return (
            <Fails>
              {fail.filename} - {fail.obj.name} ... failed.
            </Fails>
          );
        })}
    </FileWrapper>
  );
};

const Files = styled.div`
  flex: 1 1 100%;
`;

const FileWrapper = styled.div`
  width: clac(100% - 20px);
  padding: 10px;
`;

const Fails = styled.div`
  width: clac(100% - 20px);
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
`;
