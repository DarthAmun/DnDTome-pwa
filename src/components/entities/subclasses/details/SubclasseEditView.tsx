import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { reciveAll } from "../../../../services/DatabaseService";
import Subclass from "../../../../data/classes/Subclass";
import FeatureSet from "../../../../data/classes/FeatureSet";
import Boni from "../../../../data/classes/Boni";
import Selection from "../../../../data/Selection";
import Feature, {
  FeatureRest,
  featureRestArray,
  FeatureType,
  featureTypeArray,
  getOptionFromRestEnum,
  getOptionFromTypeEnum,
} from "../../../../data/classes/Feature";

import { faLink, faPlus, faTrash, faMinus } from "@fortawesome/free-solid-svg-icons";
import EnumField from "../../../form_elements/EnumField";
import StringField from "../../../form_elements/StringField";
import ShortTextField from "../../../form_elements/ShortTextField";
import NumberField from "../../../form_elements/NumberField";
import NumberArrayField from "../../../form_elements/NumberArrayField";
import IconButton from "../../../form_elements/IconButton";
import TextButton from "../../../form_elements/TextButton";

interface $Props {
  subclasse: Subclass;
  onEdit: (value: Subclass) => void;
}

const SubclasseEditView = ({ subclasse, onEdit }: $Props) => {
  const [selections, setSelections] = useState<{ value: string; label: string }[]>([]);

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
    let features = subclasse.features.map((featureSet: FeatureSet) => {
      if (featureSet === oldFeature) {
        return {
          ...featureSet,
          [field]: value,
        };
      } else {
        return featureSet;
      }
    });
    onEdit({ ...subclasse, features: features });
  };

  const onBoniChange = (oldFeature: FeatureSet, oldBoni: Boni, field: string, value: string) => {
    let features = subclasse.features.map((featureSet: FeatureSet) => {
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
    onEdit({ ...subclasse, features: features });
  };
  const onSpellslotChange = (oldFeature: FeatureSet, value: number[]) => {
    let features = subclasse.features.map((featureSet: FeatureSet) => {
      if (featureSet === oldFeature && featureSet.spellslots !== undefined) {
        return { ...featureSet, spellslots: value } as FeatureSet;
      } else {
        return featureSet;
      }
    });
    onEdit({ ...subclasse, features: features });
  };
  const onFeatureChange = (
    oldFeatureSet: FeatureSet,
    oldFeature: Feature,
    field: string,
    value: string | number
  ) => {
    let features = subclasse.features.map((featureSet: FeatureSet) => {
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
    onEdit({ ...subclasse, features: features });
  };
  const onSelectionChange = (
    oldFeatureSet: FeatureSet,
    oldFeature: Feature,
    oldSelection: string,
    value: string
  ) => {
    let featuresets = subclasse.features.map((featureSet: FeatureSet) => {
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
            return { ...feature, selections: selections };
          } else {
            return feature;
          }
        });
        return { ...featureSet, features: features };
      } else {
        return featureSet;
      }
    });
    onEdit({ ...subclasse, features: featuresets });
  };

  const removeFeatureSet = (oldFeatureSet: FeatureSet) => {
    let features = subclasse.features;
    const index: number = features.indexOf(oldFeatureSet);
    if (index !== -1) {
      features.splice(index, 1);
      onEdit({ ...subclasse, features: features });
    }
  };
  const removeBoni = (oldBoni: Boni) => {
    let features = subclasse.features.map((featureSet) => {
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
    onEdit({ ...subclasse, features: features });
  };
  const removeFeature = (oldFeature: Feature) => {
    let features = subclasse.features.map((featureSet) => {
      let features = featureSet.features;
      const index: number = features.indexOf(oldFeature);
      if (index !== -1) {
        features.splice(index, 1);
      }
      return { ...featureSet, features: features };
    });
    onEdit({ ...subclasse, features: features });
  };
  const removeSelection = (oldSelection: string) => {
    let featureSets = subclasse.features.map((featureSet) => {
      let features = featureSet.features.map((feature: Feature) => {
        let selections = feature.selections;
        if (selections !== undefined) {
          const index: number = selections.indexOf(oldSelection);
          if (index !== -1) {
            selections.splice(index, 1);
          }
        }
        return { ...feature, selections: selections };
      });
      return { ...featureSet, features: features };
    });
    onEdit({ ...subclasse, features: featureSets });
  };
  const removeSpellslot = (oldFeatureSet: FeatureSet) => {
    let features = subclasse.features.map((featureSet) => {
      if (featureSet.spellslots !== undefined && featureSet === oldFeatureSet) {
        return {
          ...featureSet,
          spellslots: [...featureSet.spellslots].slice(0, featureSet.spellslots.length - 1),
        };
      }
      return featureSet;
    });
    onEdit({ ...subclasse, features: features });
  };

  const addNewSpellslot = (oldFeatureSet: FeatureSet) => {
    let features = subclasse.features.map((featureSet) => {
      if (featureSet.spellslots !== undefined && featureSet === oldFeatureSet) {
        return { ...featureSet, spellslots: [...featureSet.spellslots, 0] };
      }
      return featureSet;
    });
    onEdit({ ...subclasse, features: features });
  };
  const addNewBoni = (oldFeatureSet: FeatureSet) => {
    let features = subclasse.features.map((featureSet) => {
      if (featureSet.bonis !== undefined && featureSet === oldFeatureSet) {
        const newBoni = {
          name: "",
          value: "",
          isCurrency: false,
          rest: FeatureRest.none,
        };
        return { ...featureSet, bonis: [...featureSet.bonis, newBoni] };
      }
      return featureSet;
    });
    onEdit({ ...subclasse, features: features });
  };
  const addNewFeature = (oldFeatureSet: FeatureSet) => {
    let features = subclasse.features.map((featureSet) => {
      let features = featureSet.features;
      if (features !== undefined && featureSet === oldFeatureSet) {
        features.push({
          name: "",
          text: "",
          selections: [],
          usedCurrency: "",
          uses: 0,
          rest: FeatureRest.none,
          cost: 0,
          type: FeatureType.normal,
        });
        return { ...featureSet, features: features };
      }
      return featureSet;
    });
    onEdit({ ...subclasse, features: features });
  };
  const addNewSelection = (oldFeatureSet: FeatureSet, oldFeature: Feature) => {
    let featureSets = subclasse.features.map((featureSet) => {
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
      });
      return { ...featureSet, features: features };
    });
    onEdit({ ...subclasse, features: featureSets });
  };
  const addNewFeatureSet = () => {
    if (subclasse.features.length - 1 >= 0) {
      onEdit({
        ...subclasse,
        features: [
          ...subclasse.features,
          {
            level: subclasse.features.length + 1,
            features: [],
            bonis: subclasse.features[subclasse.features.length - 1].bonis,
            spellslots: subclasse.features[subclasse.features.length - 1].spellslots,
            isAbilityImprov: false,
          },
        ],
      });
    } else {
      onEdit({
        ...subclasse,
        features: [
          ...subclasse.features,
          {
            level: subclasse.features.length + 1,
            features: [],
            bonis: [],
            spellslots: [],
            isAbilityImprov: false,
          },
        ],
      });
    }
  };

  return (
    <CenterWrapper>
      <SubclassView>
        <StringField
          value={subclasse.name}
          label="Name"
          onChange={(name) => onEdit({ ...subclasse, name: name })}
        />
        <StringField
          value={subclasse.type}
          label="Class"
          onChange={(type) => onEdit({ ...subclasse, type: type })}
        />
        <StringField
          value={subclasse.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...subclasse, sources: sources })}
        />
      </SubclassView>
      {subclasse.features.map((featureSet: FeatureSet, index: number) => {
        return (
          <FeatureView key={index}>
            <FeatureWrapper>
              <FeatureNumber
                value={featureSet.level}
                label="Level"
                onChange={(level) => onFeatureSetChange(featureSet, "level", level)}
              />
              <IconButton icon={faTrash} onClick={() => removeFeatureSet(featureSet)} />
              <FeatureNumberArray
                values={featureSet.spellslots ? featureSet.spellslots : []}
                label="Spellslots"
                onChange={(spellslots: number[]) => onSpellslotChange(featureSet, spellslots)}
              />
              <IconButton icon={faMinus} onClick={() => removeSpellslot(featureSet)} />
              <IconButton icon={faPlus} onClick={() => addNewSpellslot(featureSet)} />
              {featureSet.bonis &&
                featureSet.bonis.map((boni: Boni, index: number) => {
                  return (
                    <BoniContainer key={index}>
                      <BoniName
                        value={boni.name}
                        label="Boni"
                        onChange={(name) => onBoniChange(featureSet, boni, "name", name)}
                      />
                      <IconButton icon={faTrash} onClick={() => removeBoni(boni)} />
                      <FeatureString
                        value={boni.value}
                        label="Boni Value"
                        onChange={(value) => onBoniChange(featureSet, boni, "value", value)}
                      />
                      {boni.rest !== undefined && (
                        <EnumField
                          options={featureRestArray}
                          value={getOptionFromRestEnum(boni.rest)}
                          label="Reset on"
                          onChange={(rest) => onBoniChange(featureSet, boni, "rest", rest)}
                        />
                      )}
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
                        onChange={(name) => onFeatureChange(featureSet, feature, "name", name)}
                      />
                      <EnumField
                        options={featureTypeArray}
                        value={getOptionFromTypeEnum(feature.type)}
                        label="Types"
                        onChange={(type) => onFeatureChange(featureSet, feature, "type", type)}
                      />
                      <NumberField
                        value={feature.uses}
                        label="Uses"
                        onChange={(uses) => onFeatureChange(featureSet, feature, "uses", uses)}
                      />
                      <EnumField
                        options={featureRestArray}
                        value={getOptionFromRestEnum(feature.rest)}
                        label="per"
                        onChange={(rest) => onFeatureChange(featureSet, feature, "rest", rest)}
                      />
                      <IconButton icon={faTrash} onClick={() => removeFeature(feature)} />
                      <FeatureText
                        value={feature.text}
                        label="Feature Text"
                        onChange={(text) => onFeatureChange(featureSet, feature, "text", text)}
                      />
                      {feature.selections &&
                        feature.selections.map((selection: string, index: number) => {
                          return (
                            <FeatureContainer key={index}>
                              <EnumField
                                options={selections}
                                value={{ value: selection, label: selection }}
                                label="Name"
                                onChange={(name) =>
                                  onSelectionChange(featureSet, feature, selection, name)
                                }
                              />
                              <IconButton
                                icon={faTrash}
                                onClick={() => removeSelection(selection)}
                              />
                            </FeatureContainer>
                          );
                        })}
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
        <TextButton text={"Add new Level"} icon={faPlus} onClick={() => addNewFeatureSet()} />
      </FeatureView>
    </CenterWrapper>
  );
};

export default SubclasseEditView;

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
const FeatureView = styled(SubclassView)``;

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
