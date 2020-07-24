import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { reciveAllFiltered } from "../../../../Database/DbService";
import Race from "../../../../Data/Races/Race";
import Trait from "../../../../Data/Races/Trait";
import Subrace from "../../../../Data/Races/Subrace";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { GiUpgrade } from "react-icons/gi";

interface $Props {
  race: Race;
}

const RaceView = ({ race }: $Props) => {
  const [subraces, setSubraces] = useState<Subrace[]>([]);
  let history = useHistory();

  useEffect(() => {
    reciveAllFiltered(
      "subraces",
      [{ fieldName: "type", value: race.name }],
      (results: any[]) => {
        setSubraces(results);
      }
    );
  }, [race]);

  const formatText = useCallback(
    (text: String) => {
      if (race !== undefined) {
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
    [race, history]
  );

  const getPicture = useCallback(() => {
    if (race !== undefined) {
      if (race.pic === "" || race.pic === null) {
        return "";
      }
      return race.pic;
    }
    return "";
  }, [race]);

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
          <b>{race.name}</b>
        </Name>
        <PropWrapper>
          <Prop>
            <GiUpgrade />
            {race.abilityScores}
          </Prop>
          <Text>
            <PropTitle>Age:</PropTitle>
            {formatText(race.age)}
          </Text>
          <Text>
            <PropTitle>Alignment:</PropTitle>
            {formatText(race.alignment)}
          </Text>
          <Text>
            <PropTitle>Size:</PropTitle>
            {formatText(race.size)}
          </Text>
          <Text>
            <PropTitle>Speed:</PropTitle>
            {formatText(race.speed)}
          </Text>
          <Text>
            <PropTitle>Language:</PropTitle>
            {formatText(race.lang)}
          </Text>
          {subraces.length !== 0 && (
            <Text>
              <PropTitle>Subraces:</PropTitle>
              {subraces.map((subrace: Subrace, index: number) => {
                const link: string = "/subrace-detail/id/" + subrace.id;
                return (
                  <SubraceLink key={index} onClick={() => history.push(link)}>
                    {subrace.name}
                  </SubraceLink>
                );
              })}
            </Text>
          )}
          <Prop>
            <Icon icon={faLink} />
            {race.sources}
          </Prop>
        </PropWrapper>
      </View>
      {race.traits.map((trait: Trait, index: number) => {
        return (
          <View>
            <TraitWrapper key={index}>
              <TraitName>{trait.name}</TraitName>
              <TraitLevel>{trait.level}</TraitLevel>
              <TraitText>{formatText(trait.text)}</TraitText>
            </TraitWrapper>
          </View>
        );
      })}
    </CenterWrapper>
  );
};

export default RaceView;

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

const TraitWrapper = styled(PropWrapper)``;
const TraitName = styled.div`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
  flex: 3 3 auto;
`;
const TraitLevel = styled(TraitName)`
  flex: 1 1 auto;
`;
const TraitText = styled(TraitName)`
  flex: 4 4 auto;
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

const SubraceLink = styled(Link)`
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
