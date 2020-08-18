import React from "react";
import styled from "styled-components";
import Subclass from "../../../../Data/Classes/Subclass";
import FeatureSet from "../../../../Data/Classes/FeatureSet";
import Boni from "../../../../Data/Classes/Boni";
import Feature from "../../../../Data/Classes/Feature";

import StringField from "../../../FormElements/StringField";
import ShortTextField from "../../../FormElements/ShortTextField";
import NumberField from "../../../FormElements/NumberField";
import NumberArrayField from "../../../FormElements/NumberArrayField";
import IconButton from "../../../FormElements/IconButton";
import TextButton from "../../../FormElements/TextButton";

import {
  faLink,
  faPlus,
  faTrash,
  faMinus
} from "@fortawesome/free-solid-svg-icons";

interface $Props {
  subclass: Subclass;
  onEdit: (value: Subclass) => void;
}

const SubclassEditView = ({ subclass, onEdit }: $Props) => {
  const onFeatureSetChange = (
    oldFeature: FeatureSet,
    field: string,
    value: string | number | any[]
  ) => {
    let features = subclass.features.map((featureSet: FeatureSet) => {
      if (featureSet === oldFeature) {
        return {
          ...featureSet,
          [field]: value
        };
      } else {
        return featureSet;
      }
    });
    onEdit({ ...subclass, features: features });
  };

  const onBoniChange = (
    oldFeature: FeatureSet,
    oldBoni: Boni,
    field: string,
    value: string
  ) => {
    let features = subclass.features.map((featureSet: FeatureSet) => {
      if (featureSet === oldFeature && featureSet.bonis !== undefined) {
        let bonis = featureSet.bonis.map((boni: Boni) => {
          if (boni === oldBoni) {
            return {
              ...boni,
              [field]: value
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
    onEdit({ ...subclass, features: features });
  };
  const onSpellslotChange = (oldFeature: FeatureSet, value: number[]) => {
    let features = subclass.features.map((featureSet: FeatureSet) => {
      if (featureSet === oldFeature && featureSet.spellslots !== undefined) {
        return { ...featureSet, spellslots: value } as FeatureSet;
      } else {
        return featureSet;
      }
    });
    onEdit({ ...subclass, features: features });
  };
  const onFeatureChange = (
    oldFeatureSet: FeatureSet,
    oldFeature: Feature,
    field: string,
    value: string
  ) => {
    let features = subclass.features.map((featureSet: FeatureSet) => {
      if (featureSet === oldFeatureSet && featureSet.features !== undefined) {
        let features = featureSet.features.map((feature: Feature) => {
          if (feature === oldFeature) {
            return {
              ...feature,
              [field]: value
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
    onEdit({ ...subclass, features: features });
  };

  const removeFeatureSet = (oldFeatureSet: FeatureSet) => {
    let features = subclass.features;
    const index: number = features.indexOf(oldFeatureSet);
    if (index !== -1) {
      features.splice(index, 1);
      onEdit({ ...subclass, features: features });
    }
  };
  const removeBoni = (oldBoni: Boni) => {
    let features = subclass.features.map(featureSet => {
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
    onEdit({ ...subclass, features: features });
  };
  const removeFeature = (oldFeature: Feature) => {
    let features = subclass.features.map(featureSet => {
      let features = featureSet.features;
      const index: number = features.indexOf(oldFeature);
      if (index !== -1) {
        features.splice(index, 1);
      }
      return { ...featureSet, features: features };
    });
    onEdit({ ...subclass, features: features });
  };
  const removeSpellslot = (oldFeatureSet: FeatureSet) => {
    let features = subclass.features.map(featureSet => {
      if (featureSet.spellslots !== undefined && featureSet === oldFeatureSet) {
        return {
          ...featureSet,
          spellslots: [...featureSet.spellslots].slice(
            0,
            featureSet.spellslots.length - 1
          )
        };
      }
      return featureSet;
    });
    onEdit({ ...subclass, features: features });
  };

  const addNewSpellslot = (oldFeatureSet: FeatureSet) => {
    let features = subclass.features.map(featureSet => {
      if (featureSet.spellslots !== undefined && featureSet === oldFeatureSet) {
        return { ...featureSet, spellslots: [...featureSet.spellslots, 0] };
      }
      return featureSet;
    });
    onEdit({ ...subclass, features: features });
  };
  const addNewBoni = (oldFeatureSet: FeatureSet) => {
    let features = subclass.features.map(featureSet => {
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
    onEdit({ ...subclass, features: features });
  };
  const addNewFeature = (oldFeatureSet: FeatureSet) => {
    let features = subclass.features.map(featureSet => {
      let features = featureSet.features;
      if (features !== undefined && featureSet === oldFeatureSet) {
        features.push({
          name: "",
          text: ""
        });
        return { ...featureSet, features: features };
      }
      return featureSet;
    });
    onEdit({ ...subclass, features: features });
  };
  const addNewFeatureSet = () => {
    if (subclass.features.length - 1 >= 0) {
      onEdit({
        ...subclass,
        features: [
          ...subclass.features,
          {
            level: subclass.features.length + 1,
            profBonus: 0,
            features: [],
            bonis: subclass.features[subclass.features.length - 1].bonis,
            spellslots:
              subclass.features[subclass.features.length - 1].spellslots
          }
        ]
      });
    } else {
      onEdit({
        ...subclass,
        features: [
          ...subclass.features,
          {
            level: subclass.features.length + 1,
            profBonus: 0,
            features: [],
            bonis: [],
            spellslots: []
          }
        ]
      });
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
          onChange={type => onEdit({ ...subclass, type: type })}
        />
        <StringField
          value={subclass.sources}
          label="Sources"
          icon={faLink}
          onChange={sources => onEdit({ ...subclass, sources: sources })}
        />
      </SubclassView>
      {subclass.features.map((featureSet: FeatureSet, index: number) => {
        return (
          <FeatureView key={index}>
            <FeatureWrapper>
              <FeatureNumber
                value={featureSet.level}
                label="Level"
                onChange={level =>
                  onFeatureSetChange(featureSet, "level", level)}
              />
              <IconButton
                icon={faTrash}
                onClick={() => removeFeatureSet(featureSet)}
              />
              <FeatureNumberArray
                values={featureSet.spellslots ? featureSet.spellslots : []}
                label="Spellslots"
                onChange={(spellslots: number[]) =>
                  onSpellslotChange(featureSet, spellslots)}
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
                        onChange={name =>
                          onBoniChange(featureSet, boni, "name", name)}
                      />
                      <IconButton
                        icon={faTrash}
                        onClick={() => removeBoni(boni)}
                      />
                      <FeatureString
                        value={boni.value}
                        label="Boni Value"
                        onChange={value =>
                          onBoniChange(featureSet, boni, "value", value)}
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
                        onChange={name =>
                          onFeatureChange(featureSet, feature, "name", name)}
                      />
                      <IconButton
                        icon={faTrash}
                        onClick={() => removeFeature(feature)}
                      />
                      <FeatureText
                        value={feature.text}
                        label="Feature Text"
                        onChange={text =>
                          onFeatureChange(featureSet, feature, "text", text)}
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
