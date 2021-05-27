import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Char from "../../../../data/chars/Char";
import Class from "../../../../data/classes/Class";
import { recivePromiseByMultiAttribute } from "../../../../services/DatabaseService";

import IconButton from "../../../form_elements/IconButton";
import { faCheckCircle, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import AutoStringField from "../../../form_elements/AutoStringField";
import FormatedText from "../../../general_elements/FormatedText";
import CheckField from "../../../form_elements/CheckField";
import EnumField from "../../../form_elements/EnumField";
import TextButton from "../../../form_elements/TextButton";
import ClassSet from "../../../../data/chars/ClassSet";

interface $Props {
  char: Char;
  onChange: (character: Char) => void;
  completed: (completed: boolean, nextTab: string) => void;
}

const CharLabEquipment = ({ char, onChange, completed }: $Props) => {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    let classList: Promise<Class>[] = [];
    char.classes.forEach((classe: ClassSet) => {
      let [name, sources] = classe.classe.split("|");
      classList.push(recivePromiseByMultiAttribute("classes", { name: name, sources: sources }));
    });
    Promise.all(classList).then(setClasses);
  }, [char.classes]);

  const removeItem = (oldItem: {
    origin: string;
    attuned: boolean;
    prof: boolean;
    attribute: string;
  }) => {
    let newItemList = char.items.filter((item) => item.origin !== oldItem.origin);
    onChange({ ...char, items: newItemList });
  };
  const addNewItem = () => {
    let newItemList = char.items;
    newItemList.push({
      origin: "",
      attuned: false,
      prof: false,
      attribute: "str",
    });
    onChange({ ...char, items: newItemList });
  };
  const onChangeItem = (newItem: string, i: number) => {
    let items = char.items;
    items[i].origin = newItem;
    onChange({ ...char, items: items });
  };
  const onChangeItemAttribute = (
    newItem: {
      origin: string;
      attuned: boolean;
      prof: boolean;
      attribute: string;
    },
    i: number
  ) => {
    let items = char.items;
    items[i] = newItem;
    onChange({ ...char, items: items });
  };

  return (
    <>
      <CenterWrapper>
        <CharView>
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
      <CenterWrapper>
        <CharView>
          {char.items.map(
            (
              item: {
                origin: string;
                attuned: boolean;
                prof: boolean;
                attribute: string;
              },
              index: number
            ) => {
              return (
                <Container key={index}>
                  <AutoStringField
                    optionTable={["items", "gears"]}
                    value={item.origin}
                    label="Item"
                    onChange={(newItem) => onChangeItem(newItem, index)}
                  />
                  <CheckField
                    value={!!item.attuned}
                    label="Attunment"
                    onChange={(attunment) =>
                      onChangeItemAttribute(
                        {
                          ...item,
                          attuned: attunment,
                        },
                        index
                      )
                    }
                  />
                  <CheckField
                    value={!!item.prof}
                    label="Prof"
                    onChange={(prof) => onChangeItemAttribute({ ...item, prof: prof }, index)}
                  />
                  <EnumField
                    options={[
                      { value: "str", label: "Str" },
                      { value: "dex", label: "Dex" },
                      { value: "con", label: "Con" },
                      { value: "int", label: "Int" },
                      { value: "wis", label: "Wis" },
                      { value: "cha", label: "Cha" },
                    ]}
                    value={{
                      value: item.attribute,
                      label: item.attribute.charAt(0).toUpperCase() + item.attribute.slice(1),
                    }}
                    label="Attribute"
                    onChange={(type) => onChangeItemAttribute({ ...item, attribute: type }, index)}
                  />
                  <IconButton icon={faTrash} onClick={() => removeItem(item)} />
                </Container>
              );
            }
          )}
          <TextButton text={"Add new Item"} icon={faPlus} onClick={() => addNewItem()} />
          <IconButton
            icon={faCheckCircle}
            disabled={!(char && char.race && char.race.race.length > 1)}
            onClick={() => completed(true, "Finished")}
          />
        </CharView>
      </CenterWrapper>
    </>
  );
};

export default CharLabEquipment;

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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex: 1 1 600px;
`;
