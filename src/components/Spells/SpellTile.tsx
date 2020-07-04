import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Spell from "../../Data/Spell";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faMortarPestle,
  faHistory,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

interface $Props {
  spell: Spell;
}

const SpellTile = ({ spell }: $Props) => {
  const formatTime = (value: string) => {
    let words = value.split(",");
    return words[0];
  };

  const formatLevel = (value: number) => {
    if (value === 0) {
      return "C";
    }
    return value;
  };

  const hasRitual = (value: number) => {
    if (value === 1) {
      return <div className="icon">R</div>;
    }
    return "";
  };

  const hasConcentration = (value: string) => {
    let search = value.toLowerCase();
    if (search.includes("concentration")) {
      return <div className="icon">C</div>;
    }
    return "";
  };

  const formatComponents = (value: string) => {
    let words = value.split("(");
    if (words.length > 1) {
      return words[0] + "*";
    }
    return words[0];
  };

  const formatDuration = (value: string) => {
    let search = value.toLowerCase();
    if (search.includes("concentration")) {
      if (search.includes("concentration, ")) {
        let words = value.replace("Concentration,", "").trim();
        return words;
      } else {
        let words = value.replace("Concentration", "").trim();
        return words;
      }
    }
    return value;
  };

  const getPicture = () => {
    if (spell.pic === "" || spell.pic === null) {
      return "";
    }
    return spell.pic;
  };

  return (
    <Tile to={"/spell-detail/" + spell.id}>
      <School school={spell.school}>{spell.school}</School>

      <Flag>
        <b>{hasConcentration(spell.duration)}</b>
      </Flag>
      <Flag>
        <b>{hasRitual(spell.ritual)}</b>
      </Flag>

      <Level>
        <b>{formatLevel(spell.level)}</b>
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
          {formatTime(spell.time)}
        </Prop>
        <Prop>
          <Icon icon={faHourglassHalf} />
          {formatDuration(spell.duration)}
        </Prop>
        <Prop>
          <Icon icon={faPowerOff} transform={{ rotate: 42 }} />
          {spell.range}
        </Prop>
        <Prop>
          <Icon icon={faMortarPestle} />
          {formatComponents(spell.components)}
        </Prop>
      </PropWrapper>
    </Tile>
  );
};

export default SpellTile;

const Tile = styled(Link)`
  flex: 1 1 15em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;
  cursor: pointer;
`;

type SchoolType = {
  school?: string;
};

const School = styled.div<SchoolType>`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 0px 0px 10px 0px;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);
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
  float: left;
  padding: 10px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  float: right;
  text-align: center;
  border-top-right-radius: 3px;
  box-shadow: inset 0px 0px 10px -2px rgba(0, 0, 0, 0.4);
  border-radius: 30px;
  margin: 5px;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 10px 10px 10px 10px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
`;

const ImageName = styled.div`
  height: 30px;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 50px 10px 10px 50px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 10px);
  float: left;
  padding: 5px 5px 0 5px;
  display: flex;
  flex-wrap: wrap;
`;

const Prop = styled.div`
  height: auto;
  width: calc(50% - 25px);
  margin: 0 0 5px 5px;
  float: left;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  border-radius: 10px 10px 10px 10px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;

const Flag = styled.div`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  margin-left: 5px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 0px 0px 10px 10px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
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
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
