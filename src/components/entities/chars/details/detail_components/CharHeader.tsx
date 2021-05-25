import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import styled from "styled-components";
import Char from "../../../../../data/chars/Char";
import ClassSet from "../../../../../data/chars/ClassSet";

interface $Props {
  char: Char;
  isNpc?: boolean;
}

const CharHeader = ({ char, isNpc }: $Props) => {
  let history = useHistory();

  const formatScore = useCallback((score: number) => {
    let mod = Math.floor((score - 10) / 2);
    if (mod >= 0) {
      return "+" + mod;
    } else {
      return mod;
    }
  }, []);

  const getPicture = useCallback(() => {
    if (char !== undefined) {
      if (char.picBase64 !== "" && char.picBase64 !== null && char.picBase64 !== undefined) {
        return char.picBase64;
      } else if (char.pic !== "" && char.pic !== null && char.pic !== undefined) {
        return char.pic;
      }
    }
    return "";
  }, [char]);

  const calcLevel = useCallback(() => {
    let level = 0;
    char.classes.forEach((classe) => {
      level += classe.level;
    });
    return level;
  }, [char.classes]);

  return (
    <>
      {getPicture() !== "" ? (
        <ImageView>
          <Image pic={getPicture()}></Image>
        </ImageView>
      ) : (
        ""
      )}
      <View>
        {!isNpc && (
          <Name>
            <b>{char.name}</b>
          </Name>
        )}

        <PropWrapper>
          <Prop>
            <PropTitle>Level:</PropTitle>
            {calcLevel()}
          </Prop>
          {!isNpc && (
            <>
              <Prop>
                <PropTitle>Player:</PropTitle>
                {char.player}
              </Prop>
              <Prop>
                <PropTitle>Campaign:</PropTitle>
                {char.campaign}
              </Prop>
            </>
          )}
          <Prop>
            <PropTitle>Race:</PropTitle>
            <MainLink onClick={() => history.push(`/race-detail/name/${char.race.race}`)}>
              {char.race.race}
            </MainLink>
          </Prop>
          {char.race.subrace && (
            <Prop>
              <PropTitle>Subrace:</PropTitle>
              <MainLink onClick={() => history.push(`/subrace-detail/name/${char.race.subrace}`)}>
                {char.race.subrace}
              </MainLink>
            </Prop>
          )}
          {char.classes &&
            char.classes.map((classSet: ClassSet, index: number) => {
              return (
                <PropWrapper key={index}>
                  <Prop>
                    <PropTitle>Class Level:</PropTitle>
                    {classSet.level}
                  </Prop>
                  <Prop>
                    <MainLink
                      onClick={() => history.push(`/classe-detail/name/${classSet.classe}`)}
                    >
                      {classSet.classe}
                    </MainLink>
                  </Prop>
                  <Prop>
                    <MainLink
                      onClick={() => history.push(`/subclasse-detail/name/${classSet.subclasse}`)}
                    >
                      {classSet.subclasse}
                    </MainLink>
                  </Prop>
                </PropWrapper>
              );
            })}
          <Prop>
            <PropTitle>Background:</PropTitle>
            <MainLink onClick={() => history.push(`/background-detail/name/${char.background}`)}>
              {char.background}
            </MainLink>
          </Prop>
          <Prop>
            <PropTitle>Alignment:</PropTitle>
            {char.alignment}
          </Prop>
        </PropWrapper>
        <PropWrapper>
          <PropWithProf>
            <PropText>
              <PropTitle>Str:</PropTitle>
              {char.str}{" "}
            </PropText>
            <PropProf>{formatScore(char.str)}</PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Dex:</PropTitle>
              {char.dex}{" "}
            </PropText>
            <PropProf>{formatScore(char.dex)}</PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Con:</PropTitle>
              {char.con}{" "}
            </PropText>
            <PropProf>{formatScore(char.con)}</PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Int:</PropTitle>
              {char.int}{" "}
            </PropText>
            <PropProf>{formatScore(char.int)}</PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Wis:</PropTitle>
              {char.wis}{" "}
            </PropText>
            <PropProf>{formatScore(char.wis)}</PropProf>
          </PropWithProf>
          <PropWithProf>
            <PropText>
              <PropTitle>Cha:</PropTitle>
              {char.cha}{" "}
            </PropText>
            <PropProf>{formatScore(char.cha)}</PropProf>
          </PropWithProf>
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
            <PolarRadiusAxis angle={90} domain={[0, "dataMax"]} axisLine={false} tick={false} />
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </StatProp>
      </MinView>
    </>
  );
};

export default CharHeader;

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
  min-width: max-content;
  max-width: max-content;
`;

const ImageView = styled(MinView)`
  justify-content: center;
  flex: 1 1 100px;
  min-width: max-content;
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

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const PropWithProf = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;

  display: flex;
`;

const PropText = styled.div`
  flex: 2 2 auto;
  height: auto;
  margin: 2px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const PropProf = styled.div`
  flex: 1 1;
  max-width: max-content;
  height: auto;
  margin: 2px;
  padding: 10px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};

  svg {
    width: 20px !important;
    height: 20px !important;
    margin: 0;
  }
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

const MainLink = styled(Link)`
  font-size: 16px;
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
