import React from "react";
import styled from "styled-components";
import Race from "../../../../data/races/Race";

import StringField from "../../../form_elements/StringField";
import ShortTextField from "../../../form_elements/ShortTextField";

import { faLink, faImage, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Trait from "../../../../data/races/Trait";
import NumberField from "../../../form_elements/NumberField";
import IconButton from "../../../form_elements/IconButton";
import ImageImportField from "../../../form_elements/ImageField";

interface $Props {
  race: Race;
  onEdit: (value: Race) => void;
}

const RaceEditView = ({ race, onEdit }: $Props) => {
  const onTraitChange = (oldTrait: Trait, field: string, value: string | number) => {
    let traits = race.traits.map((trait: Trait) => {
      if (trait === oldTrait) {
        return {
          ...trait,
          [field]: value,
        };
      } else {
        return trait;
      }
    });
    onEdit({ ...race, traits: traits });
  };

  const addNewTrait = () => {
    onEdit({
      ...race,
      traits: [...race.traits, { name: "New Trait", level: 1, text: "" }],
    });
  };

  const removeTrait = (oldTrait: Trait) => {
    let traits = race.traits;
    const index: number = traits.indexOf(oldTrait);
    if (index !== -1) {
      traits.splice(index, 1);
      onEdit({ ...race, traits: traits });
    }
  };

  return (
    <CenterWrapper>
      <RaceView>
        <StringField
          value={race.name}
          label="Name"
          onChange={(name) => onEdit({ ...race, name: name })}
        />
        <StringField
          value={race.abilityScores}
          label="Ability Scores"
          onChange={(abilityScores) => onEdit({ ...race, abilityScores: abilityScores })}
        />
        <ShortTextField
          value={race.age}
          label="Age"
          onChange={(age) => onEdit({ ...race, age: age })}
        />
        <ShortTextField
          value={race.alignment}
          label="Alignment"
          onChange={(alignment) => onEdit({ ...race, alignment: alignment })}
        />
        <ShortTextField
          value={race.size}
          label="Size"
          onChange={(size) => onEdit({ ...race, size: size })}
        />
        <ShortTextField
          value={race.speed}
          label="Speed"
          onChange={(speed) => onEdit({ ...race, speed: speed })}
        />
        <ShortTextField
          value={race.lang}
          label="Language"
          onChange={(lang) => onEdit({ ...race, lang: lang })}
        />
        <StringField
          value={race.pic}
          label="Picture Link"
          icon={faImage}
          onChange={(pic) => onEdit({ ...race, pic: pic })}
        />
        <FieldGroup>
          <ImageImportField
            label="Picture"
            onFinished={(base64) => onEdit({ ...race, picBase64: base64 })}
          />
          <IconButton icon={faTrash} onClick={() => onEdit({ ...race, picBase64: "" })} />
        </FieldGroup>
        <StringField
          value={race.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...race, sources: sources })}
        />
      </RaceView>
      <TraitView>
        {race.traits.map((trait: Trait, index: number) => {
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

export default RaceEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const RaceView = styled.div`
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

const TraitView = styled(RaceView)``;

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

const FieldGroup = styled.div`
  flex: 2 2 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;
