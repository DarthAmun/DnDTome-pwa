import React from "react";
import styled from "styled-components";
import Class from "../../../../Data/Class";

import StringField from "../../../FormElements/StringField";
import ShortTextField from "../../../FormElements/ShortTextField";

import {
  faLink,
  faImage,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Trait from "../../../../Data/Trait";
import NumberField from "../../../FormElements/NumberField";
import IconButton from "../../../FormElements/IconButton";

interface $Props {
  classe: Class;
  onEdit: (value: Class) => void;
}

const ClassEditView = ({ classe, onEdit }: $Props) => {
  // const onTraitChange = (
  //   oldTrait: Trait,
  //   field: string,
  //   value: string | number
  // ) => {
  //   let traits = classe.traits.map((trait: Trait) => {
  //     if (trait === oldTrait) {
  //       return {
  //         ...trait,
  //         [field]: value,
  //       };
  //     } else {
  //       return trait;
  //     }
  //   });
  //   onEdit({ ...classe, traits: traits });
  // };

  // const addNewTrait = () => {
  //   onEdit({
  //     ...classe,
  //     traits: [...classe.traits, { name: "New Trait", level: 1, text: "" }],
  //   });
  // };

  // const removeTrait = (oldTrait: Trait) => {
  //   let traits = classe.traits;
  //   const index: number = traits.indexOf(oldTrait);
  //   if (index !== -1) {
  //     traits.splice(index, 1);
  //     onEdit({ ...classe, traits: traits });
  //   }
  // };

  return (
    <CenterWrapper>
      <ClassView>
        <StringField
          value={classe.name}
          label="Name"
          onChange={(name) => onEdit({ ...classe, name: name })}
        />
        <StringField
          value={classe.pic}
          label="Picture"
          icon={faImage}
          onChange={(pic) => onEdit({ ...classe, pic: pic })}
        />
        <StringField
          value={classe.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...classe, sources: sources })}
        />
      </ClassView>
      {/* <TraitView>
        {classe.traits.map((trait: Trait, index: number) => {
          return (
            <TraitWrapper key={index}>
              <TraitName
                value={trait.name}
                label="Name"
                onChange={(name) => onTraitChange(trait, "name", name)}
              />
              <TraitLevel
                value={trait.level}
                label="Level"
                onChange={(level) => onTraitChange(trait, "level", level)}
              />
              <IconButton icon={faTrash} onClick={() => removeTrait(trait)} />
              <TraitText
                value={trait.text}
                label="Text"
                onChange={(text) => onTraitChange(trait, "text", text)}
              />
            </TraitWrapper>
          );
        })}
        <TraitWrapper>
          <IconButton icon={faPlus} onClick={() => addNewTrait()} />
        </TraitWrapper>
      </TraitView> */}
    </CenterWrapper>
  );
};

export default ClassEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ClassView = styled.div`
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
  align-content: flex-start;
`;

const TraitView = styled(ClassView)``;

const TraitWrapper = styled.div`
  flex: 1 1 600px;
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const TraitName = styled(StringField)`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
  flex: 3 3 auto;
`;
const TraitLevel = styled(NumberField)`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
  flex: 1 1 auto;
`;
const TraitText = styled(ShortTextField)`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
  flex: 4 4 auto;
`;
