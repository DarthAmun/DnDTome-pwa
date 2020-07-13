import React, { useCallback } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Monster from "../../../Data/Monster";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faRunning,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  GiResize,
  GiAngelOutfit,
  GiLifeBar,
  GiWeightLiftingUp,
  GiRunningNinja,
  GiMuscleFat,
  GiBrain,
  GiWisdom,
  GiDiscussion,
} from "react-icons/gi";
import { MdRecordVoiceOver, MdRemoveRedEye } from "react-icons/md";

interface $Props {
  monster: Monster;
}

const MonsterView = ({ monster }: $Props) => {
  let history = useHistory();

  const isLegendary = useCallback(() => {
    if (monster !== undefined) {
      if (monster.lAblt.trim() !== "" || monster.sAblt.includes("Legendary")) {
        return "L";
      }
    }
    return "";
  }, [monster]);

  const formatText = useCallback(
    (text: String) => {
      if (monster !== undefined) {
        let parts: string[] = text.split("[[");
        return parts.map((part: string, index: number) => {
          if (part.includes("]]")) {
            const codePart: string[] = part.split("]]");
            const linkParts: string[] = codePart[0].split(".");
            const link: string = "/monster-detail/name/" + linkParts[1];
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
    },
    [monster, history]
  );

  const getPicture = useCallback(() => {
    if (monster !== undefined) {
      if (monster.pic === "" || monster.pic === null) {
        return "";
      }
      return monster.pic;
    }
    return "";
  }, [monster]);

  return (
    <CenterWrapper>
      <View>
        <Type>
          {monster.type}{" "}
          {monster.subtype.trim() !== "" ? "(" + monster.subtype + ")" : ""}
        </Type>

        <Flag>
          <b>{isLegendary()}</b>
        </Flag>

        <CR>
          <b>{monster.cr}</b>
        </CR>
        {getPicture() !== "" ? (
          <ImageName>
            <Image pic={getPicture()}></Image>
            <b>{monster.name}</b>
          </ImageName>
        ) : (
          <Name>
            <b>{monster.name}</b>
          </Name>
        )}

        <PropWrapper>
          <Prop>
            <GiResize />
            {monster.size}
          </Prop>
          <Prop>
            <GiAngelOutfit />
            {monster.alignment}
          </Prop>
          <Prop>
            <Icon icon={faRunning} />
            {monster.speed}
          </Prop>
          <Prop>
            <MdRemoveRedEye />
            {monster.senses}
          </Prop>
          <Prop>
            <MdRecordVoiceOver />
            {monster.lang}
          </Prop>
          <Prop>
            <Icon icon={faShieldAlt} />
            {monster.ac}
          </Prop>
          <Prop>
            <GiLifeBar />
            {monster.hp}
          </Prop>
          <Prop>
            <GiWeightLiftingUp />
            {monster.str}
          </Prop>
          <Prop>
            <GiRunningNinja />
            {monster.dex}
          </Prop>
          <Prop>
            <GiMuscleFat />
            {monster.con}
          </Prop>
          <Prop>
            <GiBrain />
            {monster.int}
          </Prop>
          <Prop>
            <GiWisdom />
            {monster.wis}
          </Prop>
          <Prop>
            <GiDiscussion />
            {monster.cha}
          </Prop>
          {monster.savingThrows && <Prop>{monster.savingThrows}</Prop>}
          {monster.skills && <Prop>{monster.skills}</Prop>}
          {monster.dmgVulnerabilitie && (
            <Prop>{monster.dmgVulnerabilitie}</Prop>
          )}
          {monster.dmgResistance && <Prop>{monster.dmgResistance}</Prop>}
          {monster.dmgImmunities && <Prop>{monster.dmgImmunities}</Prop>}
          {monster.conImmunities && <Prop>{monster.conImmunities}</Prop>}
          {monster.ablt && <Text>{formatText(monster.ablt)}</Text>}
          {monster.sAblt && <Text>{formatText(monster.sAblt)}</Text>}
          {monster.lAblt && <Text>{formatText(monster.lAblt)}</Text>}
          <Prop>
            <Icon icon={faLink} />
            {monster.sources}
          </Prop>
        </PropWrapper>
      </View>
    </CenterWrapper>
  );
};

export default MonsterView;

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

const CR = styled.div`
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

const Type = styled.div`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  line-height: 30px;
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
