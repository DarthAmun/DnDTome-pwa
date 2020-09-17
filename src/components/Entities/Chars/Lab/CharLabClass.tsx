import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Char from "../../../../Data/Chars/Char";
import { reciveAllFiltered } from "../../../../Services/DatabaseService";
import Class from "../../../../Data/Classes/Class";
import ClassSet from "../../../../Data/Chars/ClassSet";

import IconButton from "../../../FormElements/IconButton";
import {
  faCheckCircle,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AutoStringField from "../../../FormElements/AutoStringField";
import NumberField from "../../../FormElements/NumberField";
import TextButton from "../../../FormElements/TextButton";
import FormatedText from "../../../GeneralElements/FormatedText";

interface $Props {
  char: Char;
  onChange: (character: Char) => void;
  completed: (completed: boolean, nextTab: string) => void;
}

const CharLabClass = ({ char, onChange, completed }: $Props) => {
  const [classes, setClasses] = useState<Class[]>([]);

  const removeClass = (oldClass: ClassSet) => {
    let newClassList = char.classes.filter((classe) => classe !== oldClass);
    onChange({ ...char, classes: newClassList });
  };
  const addNewClass = () => {
    let newClassList = char.classes;
    newClassList.push({ classe: "", subclasse: "", level: 0 });
    onChange({ ...char, classes: newClassList });
  };
  const changeClassLevel = useCallback(
    (oldClassSet: ClassSet, level: number) => {
      let classes = char.classes.map((classSet: ClassSet) => {
        if (classSet === oldClassSet) {
          return { ...classSet, level: level };
        } else {
          return classSet;
        }
      });
      onChange({ ...char, classes: classes });
    },
    [char, onChange]
  );
  const changeClass = useCallback(
    (oldClassSet: ClassSet, classe: string) => {
      let classes = char.classes.map((classSet: ClassSet) => {
        if (classSet === oldClassSet) {
          return { ...classSet, classe: classe };
        } else {
          return classSet;
        }
      });
      onChange({ ...char, classes: classes });
    },
    [char, onChange]
  );
  const changeClassSubclass = useCallback(
    (oldClassSet: ClassSet, subclass: string) => {
      let classes = char.classes.map((classSet: ClassSet) => {
        if (classSet === oldClassSet) {
          return { ...classSet, subclasse: subclass };
        } else {
          return classSet;
        }
      });
      onChange({ ...char, classes: classes });
    },
    [char, onChange]
  );

  useEffect(() => {
    if (char.classes.length > 0) {
      reciveAllFiltered(
        "classes",
        [
          {
            fieldName: "name",
            value: char.classes.map((classe) => {
              return classe.classe;
            }),
          },
        ],
        (results: any[]) => {
          setClasses(results);
        }
      );
    }
  }, [char]);

  return (
    <CenterWrapper>
      <CharView>
        {char.classes.map((classSet: ClassSet, index: number) => {
          return (
            <PropWrapper key={index}>
              <NumberField
                value={classSet.level}
                label="Level *"
                onChange={(level) => changeClassLevel(classSet, level)}
              />
              <IconButton
                icon={faTrash}
                onClick={() => removeClass(classSet)}
              />
              <AutoStringField
                optionTable={"classes"}
                value={classSet.classe}
                label="Class *"
                onChange={(classe) => changeClass(classSet, classe)}
              />
              <AutoStringField
                optionTable={"subclasses"}
                value={classSet.subclasse}
                label="Subclass"
                onChange={(subclasse) =>
                  changeClassSubclass(classSet, subclasse)
                }
              />
            </PropWrapper>
          );
        })}
        <TextButton
          text={"Add new Class"}
          icon={faPlus}
          onClick={() => addNewClass()}
        />
        <IconButton
          icon={faCheckCircle}
          disabled={
            !(
              char &&
              char.classes.length > 0 &&
              char.classes[0].classe.length > 1 &&
              char.classes[0].level > 0
            )
          }
          onClick={() => completed(true, "Race")}
        />
        <PropWrapper>
          {classes &&
            classes.map((classe: Class, index: number) => {
              return (
                <Text key={index}>
                  <PropTitle>{classe.name}:</PropTitle>
                  <FormatedText text={classe.proficiencies} />
                  <br />
                  <FormatedText text={classe.equipment} />
                </Text>
              );
            })}
        </PropWrapper>
      </CharView>
    </CenterWrapper>
  );
};

export default CharLabClass;

const CenterWrapper = styled.div`
  overflow: visible;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CharView = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 600px;
  padding: 5px;
  margin: 5px;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: stretch;
`;

const PropWrapper = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 20px);
  margin: 0 0 5px 0;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;
