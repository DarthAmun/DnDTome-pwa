import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { reciveAllFiltered } from "../../../../Database/DbService";
import Char from "../../../../Data/Chars/Char";
import ClassSet from "../../../../Data/Chars/ClassSet";
import Class from "../../../../Data/Classes/Class";
import Subclass from "../../../../Data/Classes/Subclass";
import Feature from "../../../../Data/Classes/Feature";
import FeatureSet from "../../../../Data/Classes/FeatureSet";
import TabBar from "../../../GeneralElements/TabBar";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

interface $Props {
  char: Char;
}

const CharView = ({ char }: $Props) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [subclasses, setSubclasses] = useState<Subclass[]>([]);
  const [classesFeatures, setClassesFeatures] = useState<FeatureSet[]>([]);
  const [activeTab, setTab] = useState<string>("General");
  let history = useHistory();

  useEffect(() => {
    reciveAllFiltered(
      "classes",
      char.classes.map((classe) => {
        return { fieldName: "name", value: classe.classe };
      }),
      (results: any[]) => {
        setClasses(results);
        results.forEach((classe) => {
          let classLevel = 0;
          char.classes.forEach((charClass) => {
            if (classe.name === charClass.classe) {
              classLevel = charClass.level;
            }
          });
          classe.featureSets.forEach((featureSet: FeatureSet) => {
            if (featureSet.level <= classLevel) {
              setClassesFeatures((c) => [...c, featureSet]);
            }
          });
        });
      }
    );
    reciveAllFiltered(
      "subclasses",
      char.classes.map((classe) => {
        return { fieldName: "name", value: classe.subclasse };
      }),
      (results: any[]) => {
        setSubclasses(results);
        results.forEach((subclass) => {
          let subclassLevel = 0;
          char.classes.forEach((charClass) => {
            if (subclass.name === charClass.subclasse) {
              subclassLevel = charClass.level;
            }
          });
          subclass.features.forEach((featureSet: FeatureSet) => {
            if (featureSet.level <= subclassLevel) {
              setClassesFeatures((c) => [...c, featureSet]);
            }
          });
        });
      }
    );
  }, [char]);

  const formatText = useCallback(
    (text: String) => {
      if (char !== undefined) {
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
    [char, history]
  );

  const getPicture = useCallback(() => {
    if (char !== undefined) {
      if (char.pic === "" || char.pic === null) {
        return "";
      }
      return char.pic;
    }
    return "";
  }, [char]);

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
            <b>{char.name}</b>
          </Name>

          <PropWrapper>
            <Prop>
              <PropTitle>Level:</PropTitle>
              {char.level}
            </Prop>
            <Prop>
              <PropTitle>Player:</PropTitle>
              {char.player}
            </Prop>
            <Prop>
              <PropTitle>Race:</PropTitle>
              {char.race}
            </Prop>
            {char.classes &&
              char.classes.map((classSet: ClassSet, index: number) => {
                return (
                  <PropWrapper key={index}>
                    <Prop>{classSet.level}</Prop>
                    <Prop>{classSet.classe}</Prop>
                    <Prop>{classSet.subclasse}</Prop>
                  </PropWrapper>
                );
              })}
            <Prop>
              <PropTitle>Background:</PropTitle>
              {char.background}
            </Prop>
            <Prop>
              <PropTitle>Alignment:</PropTitle>
              {char.alignment}
            </Prop>
          </PropWrapper>
          <PropWrapper>
            <Prop>
              <PropTitle>Str:</PropTitle>
              {char.str}
            </Prop>
            <Prop>
              <PropTitle>Dex:</PropTitle>
              {char.dex}
            </Prop>
            <Prop>
              <PropTitle>Con:</PropTitle>
              {char.con}
            </Prop>
            <Prop>
              <PropTitle>Int:</PropTitle>
              {char.int}
            </Prop>
            <Prop>
              <PropTitle>Wis:</PropTitle>
              {char.wis}
            </Prop>
            <Prop>
              <PropTitle>Cha:</PropTitle>
              {char.cha}
            </Prop>
          </PropWrapper>
        </View>
        <MinView>
          <StatProp>
            <RadarChart
              cx={120}
              cy={120}
              outerRadius={80}
              width={240}
              height={240}
              data={[
                {
                  subject: "Str",
                  A: char.str,
                  fullMark: 40,
                },
                {
                  subject: "Dex",
                  A: char.dex,
                  fullMark: 40,
                },
                {
                  subject: "Con",
                  A: char.con,
                  fullMark: 40,
                },
                {
                  subject: "Int",
                  A: char.int,
                  fullMark: 40,
                },
                {
                  subject: "Wis",
                  A: char.wis,
                  fullMark: 40,
                },
                {
                  subject: "Cha",
                  A: char.cha,
                  fullMark: 40,
                },
              ]}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#8000ff" }} />
              <PolarRadiusAxis
                angle={90}
                domain={[0, "dataMax"]}
                axisLine={false}
                tick={false}
              />
              <Radar
                name="Mike"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </StatProp>
        </MinView>
        <TabBar
          children={[
            "General",
            "Race",
            "Classes",
            "Spells",
            "Gears",
            "Magic Items",
            "Monsters",
          ]}
          onChange={(tab: string) => setTab(tab)}
        />
        {activeTab === "Classes" && (
          <View>
            <PropWrapper>
              {classesFeatures &&
                classesFeatures
                  .sort((f1, f2) => f1.level - f2.level)
                  .map((featureSet: FeatureSet) => {
                    return featureSet.features.map(
                      (feature: Feature, index: number) => {
                        return (
                          <Text key={index}>
                            <PropTitle>{feature.name}:</PropTitle>
                            {formatText(feature.text)}
                          </Text>
                        );
                      }
                    );
                  })}
            </PropWrapper>
          </View>
        )}
      </CenterWrapper>
    </>
  );
};

export default CharView;

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

const MinView = styled(View)`
  min-width: 0;
  max-width: max-content;
`;

const ImageView = styled(MinView)`
  justify-content: center;
  flex: 1 1 100px;
  min-width: max-content;
`;

const TextPart = styled.span`
  white-space: pre-line;
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

const StatProp = styled(Prop)`
  max-width: max-content;
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 20px);
  margin: 0 0 5px 0;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
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

const SubcharLink = styled(Link)`
  font-size: 16px;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
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
  max-width: 200px;
  max-height: 250px;
`;
const Empty = styled.div``;
