import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { reciveAllFiltered } from "../../../../Database/DbService";
import Class from "../../../../Data/Class";
import Trait from "../../../../Data/Trait";
// import Subclasse from "../../../../Data/Subclasse";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { GiUpgrade, GiDiceEightFacesEight } from "react-icons/gi";

interface $Props {
  classe: Class;
}

const ClassView = ({ classe }: $Props) => {
  // const [subclasses, setSubclasses] = useState<Subclasse[]>([]);
  let history = useHistory();

  // useEffect(() => {
  //   reciveAllFiltered(
  //     "subclasses",
  //     [{ fieldName: "type", value: classe.name }],
  //     (results: any[]) => {
  //       setSubclasses(results);
  //     }
  //   );
  // }, [classe]);

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
          {/* {subclasses.length !== 0 && (
            <Text>
              <PropTitle>Subclasses:</PropTitle>
              {subclasses.map((subclasse: Subclasse, index: number) => {
                const link: string = "/subclasse-detail/id/" + subclasse.id;
                return (
                  <SubclasseLink key={index} onClick={() => history.push(link)}>
                    {subclasse.name}
                  </SubclasseLink>
                );
              })}
            </Text>
          )} */}
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
        </PropWrapper>
      </View>
      <View>
        <PropWrapper>
          {classe.featureSets.length !== 0 && classe.featureSets[0].spellslots && (
            <FeatureWrapper>
              <FeatureRow>
                <FeatureProp>Spellslots</FeatureProp>
              </FeatureRow>
              <FeatureRow>
                {classe.featureSets[0].spellslots.length >= 1 && (
                  <SpellProp>1st</SpellProp>
                )}
                {classe.featureSets[0].spellslots.length >= 2 && (
                  <SpellProp>2nd</SpellProp>
                )}
                {classe.featureSets[0].spellslots.length >= 3 && (
                  <SpellProp>3rd</SpellProp>
                )}
                {classe.featureSets[0].spellslots.length >= 4 && (
                  <SpellProp>4th</SpellProp>
                )}
                {classe.featureSets[0].spellslots.length >= 5 && (
                  <SpellProp>5th</SpellProp>
                )}
                {classe.featureSets[0].spellslots.length >= 6 && (
                  <SpellProp>6th</SpellProp>
                )}
                {classe.featureSets[0].spellslots.length >= 7 && (
                  <SpellProp>7th</SpellProp>
                )}
                {classe.featureSets[0].spellslots.length >= 8 && (
                  <SpellProp>8th</SpellProp>
                )}
                {classe.featureSets[0].spellslots.length >= 9 && (
                  <SpellProp>9th</SpellProp>
                )}
              </FeatureRow>
              {classe.featureSets.map((featureSet) => {
                return (
                  <FeatureRow>
                    {featureSet.spellslots &&
                      featureSet.spellslots.map((spellslot) => {
                        return (
                          <SpellProp>
                            {spellslot === 0 ? "-" : spellslot}
                          </SpellProp>
                        );
                      })}
                  </FeatureRow>
                );
              })}
            </FeatureWrapper>
          )}
        </PropWrapper>
      </View>
      <View>
        <PropWrapper>
          {classe.featureSets.length !== 0 && (
            <FeatureWrapper>
              <FeatureRow>
                <FeatureProp>Level</FeatureProp>
                <FeatureProp>Prof. Bonus</FeatureProp>
                <FeatureProp>Features</FeatureProp>
                {classe.featureSets[0].bonis?.map((boni) => {
                  return <FeatureProp>{boni.name}</FeatureProp>;
                })}
              </FeatureRow>
              {classe.featureSets.map((featureSet) => {
                return (
                  <FeatureRow>
                    <FeatureProp>{featureSet.level}</FeatureProp>
                    <FeatureProp>{featureSet.profBonus}</FeatureProp>
                    <FeatureProp>
                      {featureSet.features.map((feature) => {
                        return feature.name + ", ";
                      })}
                    </FeatureProp>
                    {featureSet.bonis?.map((boni) => {
                      return <FeatureProp>{boni.value}</FeatureProp>;
                    })}
                  </FeatureRow>
                );
              })}
            </FeatureWrapper>
          )}
        </PropWrapper>
      </View>
      {/* <View>
        <PropWrapper>
          {classe.traits.map((trait: Trait, index: number) => {
            return (
              <TraitWrapper key={index}>
                <TraitName>{trait.name}</TraitName>
                <TraitLevel>{trait.level}</TraitLevel>
                <TraitText>{formatText(trait.text)}</TraitText>
              </TraitWrapper>
            );
          })}
        </PropWrapper>
      </View> */}
      <View>
        <PropWrapper>
          {classe.featureSets.map((featureSet) => {
            return featureSet.features.map((feature) => {
              return (
                <PropWrapper>
                  <FeatureName>{feature.name}</FeatureName>
                  <FeatureText>{formatText(feature.text)}</FeatureText>
                </PropWrapper>
              );
            });
          })}
        </PropWrapper>
      </View>
    </CenterWrapper>
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

const FeatureWrapper = styled(PropWrapper)`
  width: 100%;
  padding: 0px;
  margin: 2px 0px 2px 0px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const FeatureRow = styled.div`
  min-width: 100%;
  flex: 1 1 auto;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const FeatureProp = styled(Prop)`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
`;

const SpellProp = styled(FeatureProp)`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  padding: 5px;
  text-align: center;
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

const FeatureName = styled.div`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
  flex: 3 3 auto;
`;

const FeatureText = styled(FeatureName)`
  flex: 4 4 auto;
`;
