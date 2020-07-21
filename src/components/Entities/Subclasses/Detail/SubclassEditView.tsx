import React from "react";
import styled from "styled-components";
import Subclass from "../../../../Data/Subclass";
import Trait from "../../../../Data/Trait";

import StringField from "../../../FormElements/StringField";
import ShortTextField from "../../../FormElements/ShortTextField";
import NumberField from "../../../FormElements/NumberField";

import { faLink, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../../FormElements/IconButton";

interface $Props {
  subclass: Subclass;
  onEdit: (value: Subclass) => void;
}

const SubclassEditView = ({ subclass, onEdit }: $Props) => {
  const onFeatureChange = (
    oldFeature: Trait,
    field: string,
    value: string | number
  ) => {
    let features = subclass.features.map((feature: Trait) => {
      if (feature === oldFeature) {
        return {
          ...feature,
          [field]: value
        };
      } else {
        return feature;
      }
    });
    onEdit({ ...subclass, features: features });
  };

  const addNewFeature = () => {
    onEdit({
      ...subclass,
      features: [
        ...subclass.features,
        { name: "New Feature", level: 1, text: "" }
      ]
    });
  };

  const removeFeature = (oldFeature: Trait) => {
    let features = subclass.features;
    const index: number = features.indexOf(oldFeature);
    if (index !== -1) {
      features.splice(index, 1);
      onEdit({ ...subclass, features: features });
    }
  };

  return (
    <CenterWrapper>
      <SubclassView>
        <StringField
          value={subclass.name}
          label="Name"
          onChange={name => onEdit({ ...subclass, name: name })}
        />
        <StringField
          value={subclass.type}
          label="Class"
          onChange={(type) =>
            onEdit({ ...subclass, type: type })
          }
        />
        <StringField
          value={subclass.sources}
          label="Sources"
          icon={faLink}
          onChange={sources => onEdit({ ...subclass, sources: sources })}
        />
      </SubclassView>
      <TraitView>
        {subclass.features.map((feature: Trait, index: number) => {
          return (
            <TraitWrapper key={index}>
              <TraitName
                value={feature.name}
                label="Name"
                onChange={name => onFeatureChange(feature, "name", name)}
              />
              <TraitLevel
                value={feature.level}
                label="Level"
                onChange={level => onFeatureChange(feature, "level", level)}
              />
              <IconButton
                icon={faTrash}
                onClick={() => removeFeature(feature)}
              />
              <TraitText
                value={feature.text}
                label="Text"
                onChange={text => onFeatureChange(feature, "text", text)}
              />
            </TraitWrapper>
          );
        })}
        <TraitWrapper>
          <IconButton icon={faPlus} onClick={() => addNewFeature()} />
        </TraitWrapper>
      </TraitView>
    </CenterWrapper>
  );
};

export default SubclassEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const SubclassView = styled.div`
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

const TraitView = styled(SubclassView)``;

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
