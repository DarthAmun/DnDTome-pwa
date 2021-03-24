import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Spell from "../../../data/Spell";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faMortarPestle,
  faHistory,
  faPowerOff,
  faUser,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { stringToColour } from "../../../services/ColorService";

interface $Props {
  spell: Spell;
}

const SpellTile = ({ spell }: $Props) => {
  const formatTime = useCallback(() => {
    if (spell !== undefined) {
      let words = spell.time.split(",");
      return words[0];
    }
    return "";
  }, [spell]);

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

  const formatComponents = useCallback(() => {
    if (spell !== undefined) {
      let words = spell.components.split("(");
      if (words.length > 1) {
        return words[0] + "*";
      }
      return words[0];
    }
    return "";
  }, [spell]);

  const formatDuration = useCallback(() => {
    if (spell !== undefined) {
      let search = spell.duration.toLowerCase();
      if (search.includes("concentration")) {
        if (search.includes("concentration, ")) {
          let words = spell.duration.replace("Concentration,", "").trim();
          return words;
        } else {
          let words = spell.duration.replace("Concentration", "").trim();
          return words;
        }
      }
      return spell.duration;
    }
    return "";
  }, [spell]);

  const getPicture = useCallback(() => {
    if (spell !== undefined) {
      if (spell.picBase64 !== "" && spell.picBase64 !== null && spell.picBase64 !== undefined) {
        return spell.picBase64;
      } else if (spell.pic !== "" && spell.pic !== null && spell.pic !== undefined) {
        return spell.pic;
      }
    }
    return "";
  }, [spell]);

  return (
    <Tile to={"/spell-detail/id/" + spell.id}>
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
          {formatTime()}
        </Prop>
        <Prop>
          <Icon icon={faHourglassHalf} />
          {formatDuration()}
        </Prop>
        <Prop>
          <Icon icon={faPowerOff} transform={{ rotate: 42 }} />
          {spell.range}
        </Prop>
        <Prop>
          <Icon icon={faMortarPestle} />
          {formatComponents()}
        </Prop>
        <WideProp>
          <Icon icon={faUser} />
          {spell.classes}
        </WideProp>
        <WideProp>
          <Icon icon={faLink} />
          {spell.sources}
        </WideProp>
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
  border-radius: 10px;
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
      return stringToColour(props.school);
    }
  }};
`;

const Level = styled.div`
  float: right;

  padding: 10px;
  margin: 5px;
  width: 20px;
  height: 20px;

  line-height: 20px;
  text-align: center;

  border-radius: 30px;
  border-bottom: solid 1px ${({ theme }) => theme.main.highlight};
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.tile.headerColor};
  text-align: center;
  border-radius: 5px;
`;

const ImageName = styled.div`
  height: 30px;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.tile.headerColor};
  text-align: center;
  border-radius: 50px 5px 5px 50px;
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
  height: 12px;
  width: calc(50% - 22.5px);
  margin: 0 0 5px 5px;
  float: left;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:nth-child(odd) {
  margin: 0 0 5px 0px;
  }
}
`;

const WideProp = styled(Prop)`
  margin: 0 0 5px 0px;
  width: calc(100% - 20px);
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
