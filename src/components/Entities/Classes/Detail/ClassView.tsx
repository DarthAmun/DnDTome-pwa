import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { reciveAllFiltered } from "../../../../Database/DbService";
import Class from "../../../../Data/Classes/Class";
import Subclass from "../../../../Data/Classes/Subclass";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { GiDiceEightFacesEight } from "react-icons/gi";

interface $Props {
  classe: Class;
}

const ClassView = ({ classe }: $Props) => {
  const [subclasses, setSubclasses] = useState<Subclass[]>([]);
  let history = useHistory();

  useEffect(() => {
    reciveAllFiltered(
      "subclasses",
      [{ fieldName: "type", value: classe.name }],
      (results: any[]) => {
        setSubclasses(results);
      }
    );
  }, [classe]);

  const formatText = useCallback(
    (text: String) => {
      if (classe !== undefined) {
        let parts: string[] = text.split("[[");
        return parts.map((part: string, index: number) => {
          if (part.includes("]]")) {
            const codePart: string[] = part.split("]]");
            const linkParts: string[] = codePart[0].split(".");
            const link: string =
              "/" + linkParts[0] + "-detail/name/" + linkParts[1];
            return (
              <TextPart key={index}>
                <Link onClick={() => history.push(link)}>{linkParts[1]}</Link>
                {codePart[1]}
              </TextPart>
            );
          } else {
            return <TextPart key={index}>{part}</TextPart>;
          }
        });
      }
      return "";
    },
    [classe, history]
  );

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

  const getPicture = useCallback(() => {
    if (classe !== undefined) {
      if (classe.pic === "" || classe.pic === null) {
        return "";
      }
      return classe.pic;
    }
    return "";
  }, [classe]);

  return (
    <>
      <CenterWrapper>
        {getPicture() !== "" ? (
          <ImageView>
            <Image pic={getPicture()}></Image>
          </ImageView>
        ) : (
          ""
        )}
        <View>
          <Name>
            <b>{classe.name}</b>
          </Name>
          <PropWrapper>
            <Prop>
              <GiDiceEightFacesEight />
              {classe.hitDices}
            </Prop>
            <Prop>
              <Icon icon={faLink} />
              {classe.sources}
            </Prop>
            <Text>
              <PropTitle>Proficiencies:</PropTitle>
              {formatText(classe.proficiencies)}
            </Text>
            <Text>
              <PropTitle>Equipment:</PropTitle>
              {formatText(classe.equipment)}
            </Text>
            {subclasses.length !== 0 && (
            <Text>
              <PropTitle>Subclasses:</PropTitle>
              {subclasses.map((subclass: Subclass, index: number) => {
                const link: string = "/subclass-detail/id/" + subclass.id;
                return (
                  <SubclasseLink key={index} onClick={() => history.push(link)}>
                    {subclass.name}
                  </SubclasseLink>
                );
              })}
            </Text>
            )}
          </PropWrapper>
        </View>
        {classe.featureSets.length !== 0 &&
          classe.featureSets[0].spellslots &&
          classe.featureSets[0].spellslots.length > 0 && (
            <View>
              <PropWrapper>
                <FeatureWrapper>
                  <thead>
                    <FeatureRow>
                      <FeatureHeadProp
                        colSpan={classe.featureSets[0].spellslots.length + 1}
                      >
                        Spellslots
                      </FeatureHeadProp>
                    </FeatureRow>
                  </thead>
                  <tbody>
                    <FeatureRow>
                      <SpellProp>Level</SpellProp>
                      <SpellProp>1st</SpellProp>
                      {classe.featureSets[0].spellslots.length >= 2 && (
                        <SpellProp>2nd</SpellProp>
                      )}
                      {classe.featureSets[0].spellslots.length >= 3 && (
                        <SpellProp>3rd</SpellProp>
                      )}
                      {classe.featureSets[0].spellslots.length >= 4 && (
                        <>
                          {printSpellslots(
                            classe.featureSets[0].spellslots.length
                          )}
                        </>
                      )}
                    </FeatureRow>
                    {classe.featureSets.map((featureSet, index:number) => {
                      return (
                        <FeatureRow key={index}>
                          {featureSet.spellslots && (
                            <>
                              <SpellProp>{featureSet.level}</SpellProp>
                              {featureSet.spellslots.map((spellslot, index:number) => {
                                return (
                                  <SpellProp key={index}>
                                    {spellslot === 0 ? "-" : spellslot}
                                  </SpellProp>
                                );
                              })}
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
            {classe.featureSets.length !== 0 && (
              <FeatureWrapper>
                <thead>
                  <FeatureRow>
                    <FeatureHeadProp>Level</FeatureHeadProp>
                    <FeatureHeadProp>Prof. Bonus</FeatureHeadProp>
                    <FeatureHeadProp>Features</FeatureHeadProp>
                    {classe.featureSets[0].bonis &&
                      classe.featureSets[0].bonis.length > 0 &&
                      classe.featureSets[0].bonis?.map((boni, index:number) => {
                        return <FeatureHeadProp key={index}>{boni.name}</FeatureHeadProp>;
                      })}
                  </FeatureRow>
                </thead>
                <tbody>
                  {classe.featureSets.map((featureSet, index: number) => {
                    return (
                      <FeatureRow key={index}>
                        <FeatureProp>{featureSet.level}</FeatureProp>
                        <FeatureProp>{featureSet.profBonus}</FeatureProp>
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
          {classe.featureSets.map((featureSet) => {
            return featureSet.features.map((feature, index: number) => {
              return (
                <Text key={index}>
                  <PropTitle>{feature.name}:</PropTitle>
                  {formatText(feature.text)}
                </Text>
              );
            });
          })}
        </View>
      </CenterWrapper>
    </>
  );
};

export default ClassView;

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
  padding: 5px;
  margin: 5px;
  height: 100%;
  width: min-content;
  min-width: 300px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const TextPart = styled.span`
  white-space: pre-line;
`;

const ImageView = styled(View)`
  justify-content: flex-end;
  flex: 1 1 300px;
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

const Link = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 10px;
  padding: 0px 5px 0px 5px;
  cursor: pointer;
`;

const SubclasseLink = styled(Link)`
  font-size: 16px;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  if (pic !== "") {
    return <ImageElm src={pic}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.img`
  margin: 5px;
  max-height: 60vh;
`;
const Empty = styled.div``;
