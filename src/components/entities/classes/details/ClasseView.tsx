import {
  faFileExport,
  faLink,
  faPaperPlane,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { GiDiceEightFacesEight } from "react-icons/gi";
import { useHistory } from "react-router";
import styled from "styled-components";
import Class from "../../../../data/classes/Class";
import Subclass from "../../../../data/classes/Subclass";
import { createNewWithId, reciveAllFiltered } from "../../../../services/DatabaseService";
import CheckField from "../../../form_elements/CheckField";
import TextButton from "../../../form_elements/TextButton";
import FormatedText from "../../../general_elements/FormatedText";
import P2PSender from "../../../p2p/P2PSender";

interface $Props {
  classe: Class;
}

const ClasseView = ({ classe }: $Props) => {
  const [send, setSend] = useState<boolean>(false);
  const [subclasses, setSubclasses] = useState<Subclass[]>([]);
  const [hardSubselect, setHardSubselect] = useState<boolean>(true);
  let history = useHistory();

  useEffect(() => {
    reciveAllFiltered(
      "subclasses",
      hardSubselect
        ? [
            { fieldName: "type", value: classe.name, sort: 0 },
            { fieldName: "sources", value: classe.sources, sort: 0 },
          ]
        : [{ fieldName: "type", value: classe.name, sort: 0 }],
      (results: any[]) => {
        setSubclasses(results);
      }
    );
  }, [classe, hardSubselect]);

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
      if (classe.picBase64 !== "" && classe.picBase64 !== null && classe.picBase64 !== undefined) {
        return classe.picBase64;
      } else if (classe.pic !== "" && classe.pic !== null && classe.pic !== undefined) {
        return classe.pic;
      }
    }
    return "";
  }, [classe]);

  const createNewSubclass = () => {
    let newSubclass = new Subclass();
    delete newSubclass.id;
    newSubclass.type = classe.name;
    createNewWithId("subclasses", newSubclass, (id) => {
      history.push(`/subclasse-detail/id/${id}`);
    });
  };

  const exportThis = () => {
    console.time("Remove Base64 Images");
    let newClasse = { ...classe };
    newClasse.picBase64 = "";
    console.timeEnd("Remove Base64 Images");

    let all: any = {
      classes: [newClasse],
      subclasses: subclasses,
    };
    let contentType = "application/json;charset=utf-8;";

    var a = document.createElement("a");
    a.download = classe.name + "|" + classe.sources + ".json";
    a.href = "data:" + contentType + "," + encodeURIComponent(JSON.stringify(all));
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
              <FormatedText text={classe.proficiencies} />
            </Text>
            <Text>
              <PropTitle>Equipment:</PropTitle>
              <FormatedText text={classe.equipment} />
            </Text>
            <Text>
              <CheckField value={hardSubselect} label="Hard Select" onChange={setHardSubselect} />
              <PropTitle>Subclasses:</PropTitle>
              {subclasses.length !== 0 &&
                subclasses.map((subclass: Subclass, index: number) => {
                  const link: string = "/subclasse-detail/id/" + subclass.id;
                  return (
                    <SubclasseLink key={index} onClick={() => history.push(link)}>
                      {subclass.name} | {subclass.sources}
                    </SubclasseLink>
                  );
                })}
              <CreateButton onClick={() => createNewSubclass()}>
                <FontAwesomeIcon icon={faPlusCircle} />
              </CreateButton>
            </Text>
          </PropWrapper>
          <PropWrapper>
            <TextButton
              text={`Export ${classe.name}`}
              icon={faFileExport}
              onClick={() => exportThis()}
            />
            {!send && (
              <TextButton
                text={`Send ${classe.name}`}
                icon={faPaperPlane}
                onClick={() => setSend(true)}
              />
            )}
            {!!send && <P2PSender data={classe} mode={"THIS"} />}
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
                      <FeatureHeadProp colSpan={classe.featureSets[0].spellslots.length + 1}>
                        Spellslots
                      </FeatureHeadProp>
                    </FeatureRow>
                  </thead>
                  <tbody>
                    <FeatureRow>
                      <SpellProp>Level</SpellProp>
                      <SpellProp>1st</SpellProp>
                      {classe.featureSets[0].spellslots.length >= 2 && <SpellProp>2nd</SpellProp>}
                      {classe.featureSets[0].spellslots.length >= 3 && <SpellProp>3rd</SpellProp>}
                      {classe.featureSets[0].spellslots.length >= 4 && (
                        <>{printSpellslots(classe.featureSets[0].spellslots.length)}</>
                      )}
                    </FeatureRow>
                    {classe.featureSets.map((featureSet, index: number) => {
                      return (
                        <FeatureRow key={index}>
                          {featureSet.spellslots && (
                            <>
                              <SpellProp>{featureSet.level}</SpellProp>
                              {featureSet.spellslots.map((spellslot, index: number) => {
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
                    <FeatureHeadProp>Features</FeatureHeadProp>
                    {classe.featureSets[0].bonis &&
                      classe.featureSets[0].bonis.length > 0 &&
                      classe.featureSets[0].bonis?.map((boni, index: number) => {
                        return <FeatureHeadProp key={index}>{boni.name}</FeatureHeadProp>;
                      })}
                  </FeatureRow>
                </thead>
                <tbody>
                  {classe.featureSets.map((featureSet, index: number) => {
                    return (
                      <FeatureRow key={index}>
                        <FeatureProp>{featureSet.level}</FeatureProp>
                        <FeatureProp>
                          {!featureSet.isAbilityImprov &&
                            featureSet.features.map((feature, i) => {
                              if (i === featureSet.features.length - 1) return feature.name;
                              return feature.name + ", ";
                            })}
                          {featureSet.isAbilityImprov && "Abilityscore Improvement or Feat"}
                        </FeatureProp>
                        {featureSet.bonis?.map((boni, index: number) => {
                          return <FeatureProp key={index}>{boni.value}</FeatureProp>;
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
                  <PropTitle>
                    {feature.name}
                    {feature.usedCurrency !== "" && feature.usedCurrency !== undefined
                      ? " (uses " + feature.cost + " " + feature.usedCurrency + ")"
                      : ""}
                    {feature.rest !== undefined && feature.uses > 0
                      ? " (" + feature.uses + " per " + feature.rest + " rest)"
                      : ""}
                    :
                  </PropTitle>
                  <FormatedText text={feature.text} />
                  {feature.selections !== undefined &&
                    feature.selections.map((selection) => {
                      return (
                        <>
                          <PropTitle>Choose from {selection}</PropTitle>
                          <br />
                        </>
                      );
                    })}
                </Text>
              );
            });
          })}
        </View>
      </CenterWrapper>
    </>
  );
};

export default ClasseView;

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

const SubclasseLink = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
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

const CreateButton = styled.button`
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 10px;
  padding: 0px 5px 0px 5px;
  margin: 5px;
  border: none;
  box-sizing: content-box;
  height: 28px;
  line-height: 28px;
  float: right;
  cursor: pointer;
`;
