import { useCallback } from "react";
import { FaHistory, FaHourglassHalf, FaMortarPestle, FaUser, FaLink } from "react-icons/fa";
import { GiBullseye } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Tag, TagGroup } from "rsuite";
import styled from "styled-components";

import Spell from "../../../data/Spell";
import { stringToColour } from "../../../services/ColorService";

interface $Props {
  entity: Spell;
}

const SpellTile = ({ entity }: $Props) => {
  const formatTime = useCallback(() => {
    if (entity !== undefined) {
      let words = entity.time.split(",");
      return words[0];
    }
    return "";
  }, [entity]);

  const formatLevel = useCallback(() => {
    if (entity !== undefined) {
      if (entity.level === 0) {
        return "C";
      }
      return entity.level;
    }
    return "";
  }, [entity]);

  const hasRitual = useCallback(() => {
    if (entity !== undefined) {
      if (entity.ritual) {
        return <div className="icon">R</div>;
      }
    }
    return "";
  }, [entity]);

  const hasConcentration = useCallback(() => {
    if (entity !== undefined) {
      let search = entity.duration.toLowerCase();
      if (search.includes("concentration")) {
        return <div className="icon">C</div>;
      }
    }
    return "";
  }, [entity]);

  const formatComponents = useCallback(() => {
    if (entity !== undefined) {
      let words = entity.components.split("(");
      if (words.length > 1) {
        return words[0] + "*";
      }
      return words[0];
    }
    return "";
  }, [entity]);

  const formatDuration = useCallback(() => {
    if (entity !== undefined) {
      let search = entity.duration.toLowerCase();
      if (search.includes("concentration")) {
        if (search.includes("concentration, ")) {
          let words = entity.duration.replace("Concentration,", "").trim();
          return words;
        } else {
          let words = entity.duration.replace("Concentration", "").trim();
          return words;
        }
      }
      return entity.duration;
    }
    return "";
  }, [entity]);

  const getPicture = useCallback(() => {
    if (entity !== undefined) {
      if (entity.picBase64 !== "" && entity.picBase64 !== null && entity.picBase64 !== undefined) {
        return entity.picBase64;
      } else if (entity.pic !== "" && entity.pic !== null && entity.pic !== undefined) {
        return entity.pic;
      }
    }
    return "";
  }, [entity]);

  return (
    <Tile to={`/spell-detail/${entity.id}`}>
      <School school={entity.school}>{entity.school}</School>

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
          <b>{entity.name}</b>
        </ImageName>
      ) : (
        <Name>
          <b>{entity.name}</b>
        </Name>
      )}

      <PropWrapper>
        <Prop>
          <FaHistory />
          {formatTime()}
        </Prop>
        <Prop>
          <FaHourglassHalf />
          {formatDuration()}
        </Prop>
        <Prop>
          <GiBullseye />
          {entity.range}
        </Prop>
        <Prop>
          <FaMortarPestle />
          {formatComponents()}
        </Prop>
        <ClassProp>
          <FaUser />
          <Tags>
            {entity.classes.map((classe: string, index: number) => (
              <Tag key={index}>{classe}</Tag>
            ))}
          </Tags>
        </ClassProp>
        <WideProp>
          <FaLink />
          {entity.sources}
        </WideProp>
      </PropWrapper>
    </Tile>
  );
};

export default SpellTile;

const Tile = styled(Link)`
  flex: 1 1 20em;
  max-width: 300px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.secondColor};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.mainColor};
  overflow: hidden;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
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
  background-color: ${({ theme }) => theme.mainColor};
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
  width: 40px;
  height: 40px;

  line-height: 20px;
  text-align: center;

  border-radius: 30px;
  border-bottom: solid 1px ${({ theme }) => theme.highlight};
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.textColor};
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
  color: ${({ theme }) => theme.textColor};
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
  height: 30px;
  width: calc(50% - 22.5px);
  margin: 0 0 5px 5px;
  float: left;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.secondTextColor};
  border-radius: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:nth-child(odd) {
    margin: 0 0 5px 0px;
  }

  svg {
    margin-right: 5px;
    width: 12px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.highlight};
  }
`;

const WideProp = styled(Prop)`
  margin: 0 0 5px 0px;
  width: calc(100% - 20px);
  display: flex;
`;

const ClassProp = styled(WideProp)`
  height: auto;
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
  border: 3px solid ${({ theme }) => theme.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;

const Tags = styled(TagGroup)`
  width: inherit;
  white-space: normal;
`;
