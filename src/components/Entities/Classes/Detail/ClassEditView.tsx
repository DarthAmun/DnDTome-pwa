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
import Feature from "../../../../Data/Feature";

interface $Props {
  classe: Class;
  onEdit: (value: Class) => void;
}

const ClassEditView = ({ classe, onEdit }: $Props) => {
  const onFeatureSetChange = (
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

  const onBoniChange = (
    oldFeature: FeatureSet,
    oldBoni: Boni,
    field: string,
    value: string
  ) => {
    let features = classe.featureSets.map((featureSet: FeatureSet) => {
      if (featureSet === oldFeature && featureSet.bonis !== undefined) {
        let bonis = featureSet.bonis.map((boni: Boni) => {
          if (boni === oldBoni) {
            return {
              ...boni,
              [field]: value,
            };
          } else {
            return boni;
          }
        });
        return { ...featureSet, bonis: bonis };
      } else {
        return featureSet;
      }
    });
    onEdit({ ...classe, featureSets: features });
  };

  const onFeatureChange = (
    oldFeatureSet: FeatureSet,
    oldFeature: Feature,
    field: string,
    value: string
  ) => {
    let features = classe.featureSets.map((featureSet: FeatureSet) => {
      if (featureSet === oldFeatureSet && featureSet.features !== undefined) {
        let features = featureSet.features.map((feature: Feature) => {
          if (feature === oldFeature) {
            return {
              ...feature,
              [field]: value,
            };
          } else {
            return feature;
          }
        });
        return { ...featureSet, features: features };
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
                  onFeatureSetChange(featureSet, "level", level)
                }
              />
              <FeatureNumber
                value={featureSet.profBonus}
                label="Prof. Bonus"
                onChange={(profBonus) =>
                  onFeatureSetChange(featureSet, "profBonus", profBonus)
                }
              />
              <FeatureNumberArray
                values={featureSet.spellslots ? featureSet.spellslots : []}
                label="Spellslots"
                onChange={(spellslots) =>
                  onFeatureSetChange(featureSet, "spellslots", spellslots)
                }
              />
              {featureSet.bonis &&
                featureSet.bonis.map((boni: Boni) => {
                  return (
                    <BoniContainer>
                      <FeatureString
                        value={boni.name}
                        label="Boni Name"
                        onChange={(name) =>
                          onBoniChange(featureSet, boni, "name", name)
                        }
                      />
                      <FeatureString
                        value={boni.value}
                        label="Boni Value"
                        onChange={(value) =>
                          onBoniChange(featureSet, boni, "value", value)
                        }
                      />
                    </BoniContainer>
                  );
                })}
              {featureSet.features &&
                featureSet.features.map((feature: Feature) => {
                  return (
                    <FeatureContainer>
                      <FeatureString
                        value={feature.name}
                        label="Feature Name"
                        onChange={(name) =>
                          onFeatureChange(featureSet, feature, "name", name)
                        }
                      />
                      <FeatureText
                        value={feature.text}
                        label="Beature Text"
                        onChange={(text) =>
                          onFeatureChange(featureSet, feature, "text", text)
                        }
                      />
                    </FeatureContainer>
                  );
                })}
            </FeatureWrapper>
          );
        })}
        <FeatureWrapper></FeatureWrapper>
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
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};

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

const FeatureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex: 1 1 600px;
  border-top: none;
  border-bottom: 2px solid ${({ theme }) => theme.input.backgroundColor};

  &:last-child {
    border-bottom: none;
  }
`;
const BoniContainer = styled(FeatureContainer)``;
