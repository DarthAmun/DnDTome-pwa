import React from "react";
import styled from "styled-components";
import Spell from "../../Data/Spell";

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
      return <b>C</b>;
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
        let words = value.replace("Concentration, ", "");
        return words;
      } else {
        let words = value.replace("Concentration", "");
        return words;
      }
    }
    return value;
  };

  const getPicture = () => {
    if (spell.pic === "" || spell.pic === null) {
      return "";
    }
    return <Image style={style}></Image>;
  };

  const style = {
    backgroundImage: `url(${getPicture()})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <Tile>
      <School school={spell.school}>{spell.school}</School>
      <Level>{formatLevel(spell.level)}</Level>
      {hasRitual(spell.ritual)}
      {hasConcentration(spell.duration)}

      <Name>
        {getPicture()}
        <b>{spell.name}</b>
      </Name>

      <Prop>
        <b>Time: </b>
        {formatTime(spell.time)}
      </Prop>
      <Prop>
        <b>Duration: </b>
        {formatDuration(spell.duration)}
      </Prop>
      <Prop>
        <b>Range: </b>
        {spell.range}
      </Prop>
      <Prop>
        <b>Comp.: </b>
        {formatComponents(spell.components)}
      </Prop>
    </Tile>
  );
};

export default SpellTile;

const Tile = styled.div`
  width: 200px;
  height: 250px;
  float: left;
  color: ${({ theme }) => theme.tile.color};
  text-align: center;
  margin: 5px;
  border-radius: 3px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  opacity: 0;
  animation-name: zoomIn;
  animation-duration: 300ms;
  transition-duration: 300ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  box-shadow: var(--boxshadow);
  cursor: pointer;

  @keyframes zoomIn {
    from {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
`;

type SchoolType = {
  school?: string;
};

const School = styled.div<SchoolType>`
  height: auto;
  float: left;
  padding: 10px;
  font-size: 12px;
  line-height: 30px;
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
  box-shadow: var(--boxshadow-inset);
  border-radius: 30px;
  margin: 5px;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  font-size: 14px;
  border-top: var(--card-seperator-line);
  border-bottom: var(--card-seperator-line);
  width: calc(100% - 20px);
  color: var(--card-title-color);
  text-align: left;
`;

const Image = styled.div`
  margin-right: 10px;
  height: 37px;
  width: 37px;
  float: left;
  border-radius: 100px;
  border: 3px solid #8000ff;
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
`;

const Prop = styled.div`
  height: auto;
  width: calc(100% - 20px);
  float: left;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
`;
