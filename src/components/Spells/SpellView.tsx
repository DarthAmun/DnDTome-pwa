import React, { useCallback } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faMortarPestle,
  faHistory,
  faPowerOff,
  faUser,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import Spell from "../../Data/Spell";

interface $Props {
  spell: Spell;
}

const SpellView = ({ spell }: $Props) => {
  const formatLevel = useCallback(() => {
    if (spell !== undefined) {
      if (spell.level === 0) {
        return "C";
      }
      return spell.level;
    }
    return "";
  }, [spell]);

  const hasRitual = useCallback(() => {
    if (spell !== undefined) {
      if (spell.ritual === 1) {
        return <div className="icon">R</div>;
      }
    }
    return "";
  }, [spell]);

  const hasConcentration = useCallback(() => {
    if (spell !== undefined) {
      let search = spell.duration.toLowerCase();
      if (search.includes("concentration")) {
        return <div className="icon">C</div>;
      }
    }
    return "";
  }, [spell]);

  const formatText = useCallback(() => {
    if (spell !== undefined) {
      return spell.text;
    }
    return "";
  }, [spell]);

  const getPicture = useCallback(() => {
    if (spell !== undefined) {
      if (spell.pic === "" || spell.pic === null) {
        return "";
      }
      return spell.pic;
    }
    return "";
  }, [spell]);

  return (
    <CenterWrapper>
      <View>
        <School school={spell.school}>{spell.school}</School>

        <Flag>
          <b>{hasConcentration()}</b>
        </Flag>
        <Flag>
          <b>{hasRitual()}</b>
        </Flag>

        <Level>
          <b>{formatLevel()}</b>
        </Level>

        {getPicture() !== "" ? (
          <ImageName>
            <Image pic={getPicture()}></Image>
            <b>{spell.name}</b>
          </ImageName>
        ) : (
          <Name>
            <b>{spell.name}</b>
          </Name>
        )}

        <PropWrapper>
          <Prop>
            <Icon icon={faHistory} />
            {spell.time}
          </Prop>
          <Prop>
            <Icon icon={faHourglassHalf} />
            {spell.duration}
          </Prop>
          <Prop>
            <Icon icon={faPowerOff} transform={{ rotate: 42 }} />
            {spell.range}
          </Prop>
          <Prop>
            <Icon icon={faMortarPestle} />
            {spell.components}
          </Prop>
          <Prop>
            <Icon icon={faUser} />
            {spell.classes}
          </Prop>
          <Prop>
            <Icon icon={faLink} />
            {spell.sources}
          </Prop>
        </PropWrapper>
        <Text>{formatText()}</Text>
      </View>
    </CenterWrapper>
  );
};

export default SpellView;

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

type SchoolType = {
  school?: string;
};

const School = styled.div<SchoolType>`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  line-height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  color: ${(props) => {
    if (props.school === "Necromancy") {
      return "#bef28e";
    } else if (props.school === "Conjuration") {
      return "#fce97a";
    } else if (props.school === "Evocation") {
      return "#db5740";
    } else if (props.school === "Divination") {
      return "#9ebed2";
    } else if (props.school === "Enchantment") {
      return "#ce90ca";
    } else if (props.school === "Transmutation") {
      return "#e19c60";
    } else if (props.school === "Abjuration") {
      return "#278ae4";
    } else if (props.school === "Illusion") {
      return "#8b42f9";
    } else {
      return "white";
    }
  }};
`;

const Level = styled.div`
  height: auto;
  padding: 10px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  float: left;
  text-align: center;
  border-top-right-radius: 3px;
  border-radius: 30px;
  margin: 0px 5px 5px 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
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

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;

const Flag = styled.div`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  margin-left: 5px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
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
