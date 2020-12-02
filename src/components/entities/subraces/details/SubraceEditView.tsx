import React from "react";
import styled from "styled-components";
import Subrace from "../../../../data/races/Subrace";

import StringField from "../../../form_elements/StringField";
import ShortTextField from "../../../form_elements/ShortTextField";

import {
  faLink,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Trait from "../../../../data/races/Trait";
import NumberField from "../../../form_elements/NumberField";
import IconButton from "../../../form_elements/IconButton";

interface $Props {
  subrace: Subrace;
  onEdit: (value: Subrace) => void;
}

const SubraceEditView = ({ subrace, onEdit }: $Props) => {
  const onTraitChange = (
    oldTrait: Trait,
    field: string,
    value: string | number
  ) => {
    let traits = subrace.traits.map((trait: Trait) => {
      if (trait === oldTrait) {
        return {
          ...trait,
          [field]: value,
        };
      } else {
        return trait;
      }
    });
    onEdit({ ...subrace, traits: traits });
  };

  const addNewTrait = () => {
    onEdit({
      ...subrace,
      traits: [...subrace.traits, { name: "New Trait", level: 1, text: "" }],
    });
  };

  const removeTrait = (oldTrait: Trait) => {
    let traits = subrace.traits;
    const index: number = traits.indexOf(oldTrait);
    if (index !== -1) {
      traits.splice(index, 1);
      onEdit({ ...subrace, traits: traits });
    }
  };

  return (
    <CenterWrapper>
      <SubraceView>
        <StringField
          value={subrace.name}
          label="Name"
          onChange={(name) => onEdit({ ...subrace, name: name })}
        />
        <StringField
          value={subrace.abilityScores}
          label="Ability Scores"
          onChange={(abilityScores) =>
            onEdit({ ...subrace, abilityScores: abilityScores })
          }
        />
        <StringField
          value={subrace.type}
          label="Race"
          onChange={(type) =>
            onEdit({ ...subrace, type: type })
          }
        />
        <StringField
          value={subrace.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...subrace, sources: sources })}
        />
      </SubraceView>
      <TraitView>
        {subrace.traits.map((trait: Trait, index: number) => {
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
      </TraitView>
    </CenterWrapper>
  );
};

export default SubraceEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const SubraceView = styled.div`
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

const TraitView = styled(SubraceView)``;

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
