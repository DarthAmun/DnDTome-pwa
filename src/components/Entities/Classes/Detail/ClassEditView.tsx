import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Class from "../../../../Data/Classes/Class";
import FeatureSet from "../../../../Data/Classes/FeatureSet";
import Boni from "../../../../Data/Classes/Boni";
import Selection from "../../../../Data/Selection";

import {
  faLink,
  faImage,
  faPlus,
  faTrash,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import Feature, {
  featureType,
  featureTypeArray,
  getOptionFromEnum,
} from "../../../../Data/Classes/Feature";
import TextButton from "../../../FormElements/TextButton";
import CheckField from "../../../FormElements/CheckField";
import EnumField from "../../../FormElements/EnumField";
import NumberField from "../../../FormElements/NumberField";
import IconButton from "../../../FormElements/IconButton";
import TextField from "../../../FormElements/TextField";
import NumberArrayField from "../../../FormElements/NumberArrayField";
import StringField from "../../../FormElements/StringField";
import ShortTextField from "../../../FormElements/ShortTextField";
import { reciveAll } from "../../../../Services/DatabaseService";

interface $Props {
  classe: Class;
  onEdit: (value: Class) => void;
}

const ClassEditView = ({ classe, onEdit }: $Props) => {
  const [selections, setSelections] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    reciveAll("selections", (data: any[]) => {
      let selectionsData = data as Selection[];
      let selectionOptions = selectionsData.map((select: Selection) => {
        return { value: select.name, label: select.name };
      });
      setSelections(selectionOptions);
    });
  }, []);

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
    value: string | boolean
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
  const onSpellslotChange = (oldFeature: FeatureSet, value: number[]) => {
    let features = classe.featureSets.map((featureSet: FeatureSet) => {
      if (featureSet === oldFeature && featureSet.spellslots !== undefined) {
        return { ...featureSet, spellslots: value } as FeatureSet;
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
  const onSelectionChange = (
    oldFeatureSet: FeatureSet,
    oldFeature: Feature,
    oldSelection: string,
    value: string
  ) => {
    let featuresets = classe.featureSets.map((featureSet: FeatureSet) => {
      if (featureSet === oldFeatureSet && featureSet.features !== undefined) {
        let features = featureSet.features.map((feature: Feature) => {
          if (feature === oldFeature) {
            let selections = feature.selections.map((select: string) => {
              if (select === oldSelection) {
                return value;
              } else {
                return select;
              }
            });
            return {...feature, selections: selections};
          } else {
            return feature;
          }
        });
        return { ...featureSet, features: features };
      } else {
        return featureSet;
      }
    });
    onEdit({ ...classe, featureSets: featuresets });
  };

  const removeFeatureSet = (oldFeatureSet: FeatureSet) => {
    let featureSets = classe.featureSets;
    const index: number = featureSets.indexOf(oldFeatureSet);
    if (index !== -1) {
      featureSets.splice(index, 1);
      onEdit({ ...classe, featureSets: featureSets });
    }
  };
  const removeBoni = (oldBoni: Boni) => {
    let featureSets = classe.featureSets.map((featureSet) => {
      let bonis = featureSet.bonis;
      if (bonis !== undefined) {
        const index: number = bonis.indexOf(oldBoni);
        if (index !== -1) {
          bonis.splice(index, 1);
        }
        return { ...featureSet, bonis: bonis };
      }
      return featureSet;
    });
    onEdit({ ...classe, featureSets: featureSets });
  };
  const removeFeature = (oldFeature: Feature) => {
    let featureSets = classe.featureSets.map((featureSet) => {
      let features = featureSet.features;
      const index: number = features.indexOf(oldFeature);
      if (index !== -1) {
        features.splice(index, 1);
      }
      return { ...featureSet, features: features };
    });
    onEdit({ ...classe, featureSets: featureSets });
  };
  const removeSelection = (oldSelection: string) => {
    let featureSets = classe.featureSets.map((featureSet) => {
      let features = featureSet.features.map((feature: Feature) => {
        let selections = feature.selections;
        if (selections !== undefined) {
          const index: number = selections.indexOf(oldSelection);
          if (index !== -1) {
            selections.splice(index, 1);
          }
        }
        return { ...feature, selections: selections };
      })
      return { ...featureSet, features: features };
    });
    onEdit({ ...classe, featureSets: featureSets });
  };
  const removeSpellslot = (oldFeatureSet: FeatureSet) => {
    let featureSets = classe.featureSets.map((featureSet) => {
      if (featureSet.spellslots !== undefined && featureSet === oldFeatureSet) {
        return {
          ...featureSet,
          spellslots: [...featureSet.spellslots].slice(
            0,
            featureSet.spellslots.length - 1
          ),
        };
      }
      return featureSet;
    });
    onEdit({ ...classe, featureSets: featureSets });
  };

  const addNewSpellslot = (oldFeatureSet: FeatureSet) => {
    let featureSets = classe.featureSets.map((featureSet) => {
      if (featureSet.spellslots !== undefined && featureSet === oldFeatureSet) {
        return { ...featureSet, spellslots: [...featureSet.spellslots, 0] };
      }
      return featureSet;
    });
    onEdit({ ...classe, featureSets: featureSets });
  };
  const addNewBoni = (oldFeatureSet: FeatureSet) => {
    let featureSets = classe.featureSets.map((featureSet) => {
      if (featureSet.bonis !== undefined && featureSet === oldFeatureSet) {
        const newBoni = {
          name: "",
          value: "",
          isCurrency: false,
        };
        return { ...featureSet, bonis: [...featureSet.bonis, newBoni] };
      }
      return featureSet;
    });
    onEdit({ ...classe, featureSets: featureSets });
  };
  const addNewFeature = (oldFeatureSet: FeatureSet) => {
    let featureSets = classe.featureSets.map((featureSet) => {
      let features = featureSet.features;
      if (features !== undefined && featureSet === oldFeatureSet) {
        features.push({
          name: "",
          text: "",
          type: featureType.normal,
          selections: []
        });
        return { ...featureSet, features: features };
      }
      return featureSet;
    });
    onEdit({ ...classe, featureSets: featureSets });
  };
  const addNewSelection = (oldFeatureSet: FeatureSet, oldFeature: Feature) => {
    let featureSets = classe.featureSets.map((featureSet) => {
      let features = featureSet.features.map((feature: Feature) => {
        let selections: string[] = feature.selections;
        if (selections === undefined) {
          selections = [];
        }
        if (feature === oldFeature) {
          selections.push("");
          return { ...feature, selections: selections };
        }
        return feature;
      })
      return { ...featureSet, features: features };
    });
    onEdit({ ...classe, featureSets: featureSets });
  };
  const addNewFeatureSet = () => {
    if (classe.featureSets.length - 1 >= 0) {
      onEdit({
        ...classe,
        featureSets: [
          ...classe.featureSets,
          {
            level: classe.featureSets.length + 1,
            profBonus:
              classe.featureSets[classe.featureSets.length - 1].profBonus,
            features: [],
            bonis: classe.featureSets[classe.featureSets.length - 1].bonis,
            spellslots:
              classe.featureSets[classe.featureSets.length - 1].spellslots,
          },
        ],
      });
    } else {
      onEdit({
        ...classe,
        featureSets: [
          ...classe.featureSets,
          {
            level: classe.featureSets.length + 1,
            profBonus: 0,
            features: [],
            bonis: [],
            spellslots: [],
          },
        ],
      });
    }
  };

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
      {classe.featureSets.map((featureSet: FeatureSet, index: number) => {
        return (
          <FeatureView key={index}>
            <FeatureWrapper>
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
              <IconButton
                icon={faTrash}
                onClick={() => removeFeatureSet(featureSet)}
              />
              <FeatureNumberArray
                values={featureSet.spellslots ? featureSet.spellslots : []}
                label="Spellslots"
                onChange={(spellslots) =>
                  onSpellslotChange(featureSet, spellslots)
                }
              />
              <IconButton
                icon={faMinus}
                onClick={() => removeSpellslot(featureSet)}
              />
              <IconButton
                icon={faPlus}
                onClick={() => addNewSpellslot(featureSet)}
              />
              {featureSet.bonis &&
                featureSet.bonis.map((boni: Boni, index: number) => {
                  return (
                    <BoniContainer key={index}>
                      <BoniName
                        value={boni.name}
                        label="Boni"
                        onChange={(name) =>
                          onBoniChange(featureSet, boni, "name", name)
                        }
                      />
                      <IconButton
                        icon={faTrash}
                        onClick={() => removeBoni(boni)}
                      />
                      <FeatureString
                        value={boni.value}
                        label="Boni Value"
                        onChange={(value) =>
                          onBoniChange(featureSet, boni, "value", value)
                        }
                      />
                      <CheckField
                        value={boni.isCurrency}
                        label="is Currency?"
                        onChange={(value) =>
                          onBoniChange(featureSet, boni, "isCurrency", value)
                        }
                      />
                    </BoniContainer>
                  );
                })}
            </FeatureWrapper>
            <FeatureWrapper>
              <TextButton
                text={"Add new Boni"}
                icon={faPlus}
                onClick={() => addNewBoni(featureSet)}
              />
            </FeatureWrapper>
            <FeatureWrapper>
              {featureSet.features &&
                featureSet.features.map((feature: Feature, index: number) => {
                  return (
                    <FeatureContainer key={index}>
                      <FeatureName
                        value={feature.name}
                        label="Feature"
                        onChange={(name) =>
                          onFeatureChange(featureSet, feature, "name", name)
                        }
                      />
                      <EnumField
                        options={featureTypeArray}
                        value={getOptionFromEnum(feature.type)}
                        label="Types"
                        onChange={(type) =>
                          onFeatureChange(featureSet, feature, "type", type)
                        }
                      />
                      <IconButton
                        icon={faTrash}
                        onClick={() => removeFeature(feature)}
                      />
                      <FeatureText
                        value={feature.text}
                        label="Feature Text"
                        onChange={(text) =>
                          onFeatureChange(featureSet, feature, "text", text)
                        }
                      />
                      {feature.selections &&
                        feature.selections.map(
                          (selection: string, index: number) => {
                            return (
                              <FeatureContainer key={index}>
                                <EnumField
                                  options={selections}
                                  value={{ value: selection, label: selection }}
                                  label="Name"
                                  onChange={(name) =>
                                    onSelectionChange(
                                      featureSet,
                                      feature,
                                      selection,
                                      name
                                    )
                                  }
                                />
                                <IconButton
                                  icon={faTrash}
                                  onClick={() => removeSelection(selection)}
                                />
                              </FeatureContainer>
                            );
                          }
                        )}
                      <TextButton
                        text={"Add Selection"}
                        icon={faPlus}
                        onClick={() => addNewSelection(featureSet, feature)}
                      />
                    </FeatureContainer>
                  );
                })}
            </FeatureWrapper>
            <FeatureWrapper>
              <TextButton
                text={"Add new Feature"}
                icon={faPlus}
                onClick={() => addNewFeature(featureSet)}
              />
            </FeatureWrapper>
          </FeatureView>
        );
      })}
      <FeatureView>
        <TextButton
          text={"Add new Level"}
          icon={faPlus}
          onClick={() => addNewFeatureSet()}
        />
      </FeatureView>
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
  align-content: stretch;
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

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

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
const FeatureName = styled(StringField)``;

const BoniContainer = styled(FeatureContainer)``;
const BoniName = styled(FeatureString)``;
