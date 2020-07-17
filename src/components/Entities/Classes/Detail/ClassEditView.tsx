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
import NumberField from "../../../FormElements/NumberField";
import IconButton from "../../../FormElements/IconButton";
import TextField from "../../../FormElements/TextField";
import FeatureSet from "../../../../Data/FeatureSet";
import NumberArrayField from "../../../FormElements/NumberArrayField";
import Boni from "../../../../Data/Boni";

interface $Props {
  classe: Class;
  onEdit: (value: Class) => void;
}

const ClassEditView = ({ classe, onEdit }: $Props) => {
  const onFeatureChange = (
    oldFeature: FeatureSet,
    field: string,
    value: string | number | any[]
  ) => {
    let features = classe.featureSets.map((featureSet: FeatureSet) => {
      if (featureSet === oldFeature) {
        return {
          ...featureSet,
          [field]: value,
        };
      } else {
        return featureSet;
      }
    });
    onEdit({ ...classe, featureSets: features });
  };

  // const addNewFeature = () => {
  //   onEdit({
  //     ...classe,
  //     traits: [...classe.traits, { name: "New Feature", level: 1, text: "" }],
  //   });
  // };

  // const removeFeature = (oldFeature: Feature) => {
  //   let traits = classe.traits;
  //   const index: number = traits.indexOf(oldFeature);
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
          value={classe.hitDices}
          label="Hit Dice"
          onChange={(hitDices) => onEdit({ ...classe, hitDices: hitDices })}
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
        <TextField
          value={classe.proficiencies}
          label="Proficiencies"
          onChange={(proficiencies) =>
            onEdit({ ...classe, proficiencies: proficiencies })
          }
        />
        <TextField
          value={classe.equipment}
          label="Equipment"
          onChange={(equipment) => onEdit({ ...classe, equipment: equipment })}
        />
      </ClassView>
      <FeatureView>
        {classe.featureSets.map((featureSet: FeatureSet, index: number) => {
          return (
            <FeatureWrapper key={index}>
              <FeatureNumber
                value={featureSet.level}
                label="Level"
                onChange={(level) =>
                  onFeatureChange(featureSet, "level", level)
                }
              />
              <FeatureNumber
                value={featureSet.profBonus}
                label="Prof. Bonus"
                onChange={(profBonus) =>
                  onFeatureChange(featureSet, "profBonus", profBonus)
                }
              />
              <FeatureNumberArray
                values={featureSet.spellslots ? featureSet.spellslots : []}
                label="Spellslots"
                onChange={(spellslots) =>
                  onFeatureChange(featureSet, "spellslots", spellslots)
                }
              />
              {/* {featureSet.bonis && featureSet.bonis.map((boni: Boni, index: number) => {
                <FeatureString
                  value={boni.name}
                  label="Boni Name"
                  onChange={(name) =>
                    onFeatureChange(boni, "name", name)
                  }
                />;
              })} */}
              {/* <IconButton icon={faTrash} onClick={() => removeFeature(trait)} /> */}
            </FeatureWrapper>
          );
        })}
        <FeatureWrapper>
          {/* <IconButton icon={faPlus} onClick={() => addNewFeature()} /> */}
        </FeatureWrapper>
      </FeatureView>
      {/* <FeatureView>
        {classe.traits.map((trait: Feature, index: number) => {
          return (
            <FeatureWrapper key={index}>
              <FeatureName
                value={trait.name}
                label="Name"
                onChange={(name) => onFeatureChange(trait, "name", name)}
              />
              <FeatureLevel
                value={trait.level}
                label="Level"
                onChange={(level) => onFeatureChange(trait, "level", level)}
              />
              <IconButton icon={faTrash} onClick={() => removeFeature(trait)} />
              <FeatureText
                value={trait.text}
                label="Text"
                onChange={(text) => onFeatureChange(trait, "text", text)}
              />
            </FeatureWrapper>
          );
        })}
        <FeatureWrapper>
          <IconButton icon={faPlus} onClick={() => addNewFeature()} />
        </FeatureWrapper>
      </FeatureView> */}
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

const FeatureView = styled(ClassView)``;

const FeatureWrapper = styled.div`
  flex: 1 1 600px;
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  label {
    margin: 2px;
  }
`;
const FeatureString = styled(StringField)``;
const FeatureNumber = styled(NumberField)``;
const FeatureText = styled(ShortTextField)``;
const FeatureNumberArray = styled(NumberArrayField)``;
