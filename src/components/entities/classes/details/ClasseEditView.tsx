import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Class from "../../../../data/classes/Class";
import FeatureSet from "../../../../data/classes/FeatureSet";
import Boni from "../../../../data/classes/Boni";
import Selection from "../../../../data/Selection";

import { faLink, faImage, faPlus, faTrash, faMinus } from "@fortawesome/free-solid-svg-icons";
import Feature, {
  FeatureRest,
  featureRestArray,
  FeatureType,
  featureTypeArray,
  getOptionFromRestEnum,
  getOptionFromTypeEnum,
} from "../../../../data/classes/Feature";
import TextButton from "../../../form_elements/TextButton";
import CheckField from "../../../form_elements/CheckField";
import EnumField from "../../../form_elements/EnumField";
import NumberField from "../../../form_elements/NumberField";
import IconButton from "../../../form_elements/IconButton";
import TextField from "../../../form_elements/TextField";
import NumberArrayField from "../../../form_elements/NumberArrayField";
import StringField from "../../../form_elements/StringField";
import ShortTextField from "../../../form_elements/ShortTextField";
import { reciveAll } from "../../../../services/DatabaseService";
import ImageImportField from "../../../form_elements/ImageField";

interface $Props {
  classe: Class;
  onEdit: (value: Class) => void;
}

const ClasseEditView = ({ classe, onEdit }: $Props) => {
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
    value: string | number | boolean | any[]
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
  const onSpellslotChange = (index: number, value: number[]) => {
    let featureSets = [...classe.featureSets];
    let newSet = featureSets[index];
    if (newSet.spellslots !== undefined) {
      let newSlots = [...newSet.spellslots];
      newSet.spellslots = newSlots.map((s, i) => {
        return value[i];
      });
      onEdit({ ...classe, featureSets: featureSets });
    }
  };
  const onFeatureChange = (
    oldFeatureSet: FeatureSet,
    oldFeature: Feature,
    field: string,
    value: string | number
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
    onEdit({ ...classe, featureSets: featuresets });
  };

  const removeFeatureSet = (index: number) => {
    let featureSets = [...classe.featureSets];
    featureSets.splice(index, 1);
    onEdit({ ...classe, featureSets: featureSets });
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
      });
      return { ...featureSet, features: features };
    });
    onEdit({ ...classe, featureSets: featureSets });
  };
  const removeSpellslot = (index: number) => {
    let featureSets = [...classe.featureSets];
    let newSet = featureSets[index];
    if (newSet.spellslots !== undefined) {
      let newSlots = [...newSet.spellslots];
      newSet.spellslots = newSlots.slice(0, newSlots.length - 1);
      onEdit({ ...classe, featureSets: featureSets });
    }
  };

  const addNewSpellslot = (index: number) => {
    let featureSets = [...classe.featureSets];
    let newSet = featureSets[index];
    if (newSet.spellslots !== undefined) {
      let newSlots = [...newSet.spellslots];
      newSet.spellslots = [...newSlots, 0];
      onEdit({ ...classe, featureSets: featureSets });
    }
  };
  const addNewBoni = (oldFeatureSet: FeatureSet) => {
    let featureSets = classe.featureSets.map((featureSet) => {
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
    onEdit({ ...classe, featureSets: featureSets });
  };
  const addNewFeature = (oldFeatureSet: FeatureSet) => {
    let featureSets = classe.featureSets.map((featureSet) => {
      let features = featureSet.features;
      if (features !== undefined && featureSet === oldFeatureSet) {
        features.push({
          name: "",
          text: "",
          type: FeatureType.normal,
          uses: 0,
          rest: FeatureRest.none,
          usedCurrency: "",
          cost: 0,
          selections: [],
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
      });
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
            features: [],
            bonis: classe.featureSets[classe.featureSets.length - 1].bonis,
            spellslots: classe.featureSets[classe.featureSets.length - 1].spellslots,
            isAbilityImprov: false,
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
          label="Picture Link"
          icon={faImage}
          onChange={(pic) => onEdit({ ...classe, pic: pic })}
        />
        <FieldGroup>
          <ImageImportField
            label="Picture"
            onFinished={(base64) => onEdit({ ...classe, picBase64: base64 })}
          />
          <IconButton icon={faTrash} onClick={() => onEdit({ ...classe, picBase64: "" })} />
        </FieldGroup>
        <StringField
          value={classe.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...classe, sources: sources })}
        />
        <TextField
          value={classe.proficiencies}
          label="Proficiencies"
          onChange={(proficiencies) => onEdit({ ...classe, proficiencies: proficiencies })}
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
                onChange={(level) => onFeatureSetChange(featureSet, "level", level)}
              />
              <IconButton icon={faTrash} onClick={() => removeFeatureSet(index)} />
              <CheckField
                value={featureSet.isAbilityImprov}
                label="is Ability Improvement?"
                onChange={(value) => onFeatureSetChange(featureSet, "isAbilityImprov", value)}
              />
              <FeatureNumberArray
                values={featureSet.spellslots ? featureSet.spellslots : []}
                label="Spellslots"
                onChange={(spellslots) => onSpellslotChange(index, spellslots)}
              />
              <IconButton icon={faMinus} onClick={() => removeSpellslot(index)} />
              <IconButton icon={faPlus} onClick={() => addNewSpellslot(index)} />
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
                      <CheckField
                        value={boni.isCurrency}
                        label="is Currency?"
                        onChange={(value) => onBoniChange(featureSet, boni, "isCurrency", value)}
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
                      {featureSet.bonis !== undefined && (
                        <>
                          <EnumField
                            options={featureSet.bonis.map((boni) => {
                              return { value: boni.name, label: boni.name };
                            })}
                            value={{ value: feature.usedCurrency, label: feature.usedCurrency }}
                            label="Currency"
                            onChange={(curr) =>
                              onFeatureChange(featureSet, feature, "usedCurrency", curr)
                            }
                          />
                          <FeatureNumber
                            value={feature.cost || 0}
                            label="Cost"
                            onChange={(cost) => onFeatureChange(featureSet, feature, "cost", cost)}
                          />
                        </>
                      )}
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

export default ClasseEditView;

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

const FieldGroup = styled.div`
  flex: 2 2 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;
