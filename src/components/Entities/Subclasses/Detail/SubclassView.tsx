import React from "react";
import styled from "styled-components";
import Subclass from "../../../../Data/Classes/Subclass";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import FormatedText from "../../../GeneralElements/FormatedText";

interface $Props {
  subclass: Subclass;
}

const SubclassView = ({ subclass }: $Props) => {
  const printSpellslots = (length: number) => {
    let count = length - 3;
    let levels = [];
    for (let i = 0; i < count; i++) {
      levels.push(i + 4);
    }
    return levels.map((level: number, index: number) => {
      return <SpellProp key={index}>{level}th</SpellProp>;
    });
  };

  return (
    <>
      <CenterWrapper>
        <View>
          <Name>
            <b>{subclass.name}</b>
          </Name>
          <PropWrapper>
            <Prop>
              <PropTitle>Class:</PropTitle>
              {subclass.type}
            </Prop>
            <Prop>
              <Icon icon={faLink} />
              {subclass.sources}
            </Prop>
          </PropWrapper>
        </View>
        {subclass.features.length !== 0 &&
          subclass.features[0].spellslots &&
          subclass.features[0].spellslots.length > 0 && (
            <View>
              <PropWrapper>
                <FeatureWrapper>
                  <thead>
                    <FeatureRow>
                      <FeatureHeadProp
                        colSpan={subclass.features[0].spellslots.length + 1}
                      >
                        Spellslots
                      </FeatureHeadProp>
                    </FeatureRow>
                  </thead>
                  <tbody>
                    <FeatureRow>
                      <SpellProp>Level</SpellProp>
                      <SpellProp>1st</SpellProp>
                      {subclass.features[0].spellslots.length >= 2 && (
                        <SpellProp>2nd</SpellProp>
                      )}
                      {subclass.features[0].spellslots.length >= 3 && (
                        <SpellProp>3rd</SpellProp>
                      )}
                      {subclass.features[0].spellslots.length >= 4 && (
                        <>
                          {printSpellslots(
                            subclass.features[0].spellslots.length
                          )}
                        </>
                      )}
                    </FeatureRow>
                    {subclass.features.map((featureSet, index: number) => {
                      return (
                        <FeatureRow key={index}>
                          {featureSet.spellslots && (
                            <>
                              <SpellProp>{featureSet.level}</SpellProp>
                              {featureSet.spellslots.map(
                                (spellslot, index: number) => {
                                  return (
                                    <SpellProp key={index}>
                                      {spellslot === 0 ? "-" : spellslot}
                                    </SpellProp>
                                  );
                                }
                              )}
                            </>
                          )}
                        </FeatureRow>
                      );
                    })}
                  </tbody>
                </FeatureWrapper>
              </PropWrapper>
            </View>
          )}
        <View>
          <PropWrapper>
            {subclass.features.length !== 0 && (
              <FeatureWrapper>
                <thead>
                  <FeatureRow>
                    <FeatureHeadProp>Level</FeatureHeadProp>
                    <FeatureHeadProp>Features</FeatureHeadProp>
                    {subclass.features[0].bonis &&
                      subclass.features[0].bonis.length > 0 &&
                      subclass.features[0].bonis?.map((boni, index: number) => {
                        return (
                          <FeatureHeadProp key={index}>
                            {boni.name}
                          </FeatureHeadProp>
                        );
                      })}
                  </FeatureRow>
                </thead>
                <tbody>
                  {subclass.features.map((featureSet, index: number) => {
                    return (
                      <FeatureRow key={index}>
                        <FeatureProp>{featureSet.level}</FeatureProp>
                        <FeatureProp>
                          {featureSet.features.map((feature) => {
                            return feature.name + ", ";
                          })}
                        </FeatureProp>
                        {featureSet.bonis?.map((boni, index: number) => {
                          return (
                            <FeatureProp key={index}>{boni.value}</FeatureProp>
                          );
                        })}
                      </FeatureRow>
                    );
                  })}
                </tbody>
              </FeatureWrapper>
            )}
          </PropWrapper>
        </View>
      </CenterWrapper>
      <CenterWrapper>
        <View>
          {subclass.features.map((featureSet) => {
            return featureSet.features.map((feature, index: number) => {
              return (
                <Text key={index}>
                  <PropTitle>{feature.name}:</PropTitle>
                  <FormatedText text={feature.text} />
                </Text>
              );
            });
          })}
        </View>
      </CenterWrapper>
    </>
  );
};

export default SubclassView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 auto;
  max-width: 600px;
  padding: 5px;
  margin: 5px;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px 5px 10px 5px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Prop = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
  float: left;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};

  svg {
    margin-right: 5px;
    height: auto;
    border-radius: 150px;
    transition: color 0.2s;
    color: ${({ theme }) => theme.main.highlight};
  }
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 24px);
  margin: 2px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const FeatureWrapper = styled.table`
  width: 100%;
  padding: 0px;
  margin: 2px 0px 2px 0px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const FeatureRow = styled.tr``;

const FeatureHeadProp = styled.th`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  border-radius: 5px;
`;

const FeatureProp = styled.td`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  border-radius: 5px;
  padding: 5px;
  text-align: center;
`;

const SpellProp = styled(FeatureProp)``;
