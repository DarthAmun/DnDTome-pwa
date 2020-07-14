import React, { useCallback } from "react";
import { useHistory } from "react-router";
import Race from "../../../../Data/Race";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faCoins,
  faWeightHanging,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
interface $Props {
  race: Race;
}

const RaceView = ({ race }: $Props) => {
  let history = useHistory();

  const formatText = useCallback(() => {
    if (race !== undefined) {
      let text = race.speed;
      let parts: string[] = text.split("[[");
      return parts.map((part: string, index: number) => {
        if (part.includes("]]")) {
          const codePart: string[] = part.split("]]");
          const linkParts: string[] = codePart[0].split(".");
          const link: string = "/race-detail/name/" + linkParts[1];
          return (
            <span key={index}>
              <Link onClick={() => history.push(link)}>{linkParts[1]}</Link>
              {codePart[1]}
            </span>
          );
        } else {
          return <span key={index}>{part}</span>;
        }
      });
    }
    return "";
  }, [race, history]);

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
      <View>
        {getPicture() !== "" ? (
          <ImageName>
            <Image pic={getPicture()}></Image>
            <b>{race.name}</b>
          </ImageName>
        ) : (
          <Name>
            <b>{race.name}</b>
          </Name>
        )}

        <PropWrapper>
          <Prop>
            <Icon icon={faCoins} />
            {race.abilityScores}
          </Prop>
          <Prop>
            <Icon icon={faWeightHanging} />
            {race.age}
          </Prop>
          <Prop>{race.alignment}</Prop>
          <Prop>{race.size}</Prop>
          <Prop>{race.speed}</Prop>
          <Prop>{race.lang}</Prop>
          <Prop>
            <Icon icon={faLink} />
            {race.sources}
          </Prop>
        </PropWrapper>
      </View>
    </CenterWrapper>
  );
};

export default RaceView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  max-width: 800px;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
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

const ImageName = styled.div`
  height: 30px;
  float: left;
  padding: 10px;
  margin: 5px 5px 10px 5px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 50px 5px 5px 50px;
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
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 30px);
  margin: 10px 5px 5px 5px;
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
  const style = {
    backgroundImage: `url(${pic})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  if (pic !== "") {
    return <ImageElm style={style}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.div`
  margin: -10px 5px -10px -10px;
  height: 47px;
  width: 47px;
  float: left;
  border-radius: 100px;
  border: 3px solid ${({ theme }) => theme.main.highlight};
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
