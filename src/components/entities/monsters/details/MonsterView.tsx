import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Monster from "../../../../data/Monster";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPaperPlane, faRunning, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { GiResize, GiAngelOutfit, GiLifeBar } from "react-icons/gi";
import { MdRecordVoiceOver, MdRemoveRedEye } from "react-icons/md";
import FormatedText from "../../../general_elements/FormatedText";
import TextButton from "../../../form_elements/TextButton";
import P2PSender from "../../../p2p/P2PSender";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useWebhook } from "../../../../hooks/webhookHook";
import { sendEmbedMessage } from "../../../../services/DiscordService";

interface $Props {
  monster: Monster;
}

const MonsterView = ({ monster }: $Props) => {
  let webhook = useWebhook();
  const [json, setJson] = useState<string>("");
  const [send, setSend] = useState<boolean>(false);

  useEffect(() => {
    if (webhook !== undefined) {
      let newJson = {
        username: webhook.name + " (DnDTome)",
        embeds: [
          {
            author: {
              name: monster.name,
              icon_url: monster.pic,
            },
            image: {
              url: monster.pic,
            },
          },
        ],
      };
      setJson(JSON.stringify(newJson));
    }
  }, [monster, webhook]);

  const isLegendary = useCallback(() => {
    if (monster !== undefined) {
      if (monster.lAblt.trim() !== "" || monster.sAblt.includes("Legendary")) {
        return "L";
      }
    }
    return "";
  }, [monster]);

  const getPicture = useCallback(() => {
    if (monster !== undefined) {
      if (monster.pic === "" || monster.pic === null) {
        return "";
      }
      return monster.pic;
    }
    return "";
  }, [monster]);

  const formatCr = useCallback(() => {
    if (monster !== undefined) {
      if (monster.cr === 0.125) {
        return "⅛";
      } else if (monster.cr === 0.25) {
        return "¼";
      } else if (monster.cr === 0.5) {
        return "½";
      } else {
        return monster.cr;
      }
    }
    return "";
  }, [monster]);

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
        <Type>
          {monster.type} {monster.subtype.trim() !== "" ? "(" + monster.subtype + ")" : ""}
        </Type>

        <Flag>
          <b>{isLegendary()}</b>
        </Flag>

        <CR>
          <b>{formatCr()}</b>
        </CR>
        <Name>
          <b>{monster.name}</b>
        </Name>

        <PropWrapper>
          <Prop>
            <PropTitle>Str:</PropTitle>
            {monster.str}
          </Prop>
          <Prop>
            <PropTitle>Dex:</PropTitle>
            {monster.dex}
          </Prop>
          <Prop>
            <PropTitle>Con:</PropTitle>
            {monster.con}
          </Prop>
          <Prop>
            <PropTitle>Int:</PropTitle>
            {monster.int}
          </Prop>
          <Prop>
            <PropTitle>Wis:</PropTitle>
            {monster.wis}
          </Prop>
          <Prop>
            <PropTitle>Cha:</PropTitle>
            {monster.cha}
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
          {monster.savingThrows && <Prop>{monster.savingThrows}</Prop>}
          {monster.skills && (
            <Prop>
              <PropTitle>Skills:</PropTitle>
              {monster.skills}
            </Prop>
          )}
          {monster.dmgVulnerabilitie && <Prop>{monster.dmgVulnerabilitie}</Prop>}
          {monster.dmgResistance && (
            <Prop>
              <PropTitle>Resistance:</PropTitle>
              {monster.dmgResistance}
            </Prop>
          )}
          {monster.dmgImmunities && (
            <Prop>
              <PropTitle>Immunities:</PropTitle>
              {monster.dmgImmunities}
            </Prop>
          )}
          {monster.conImmunities && (
            <Prop>
              <PropTitle>Immunities:</PropTitle>
              {monster.conImmunities}
            </Prop>
          )}
          <Prop>
            <Icon icon={faLink} />
            {monster.sources}
          </Prop>
        </PropWrapper>
        {webhook !== undefined && monster.pic !== "" && (
          <PropWrapper>
            <TextButton
              style={{
                backgroundColor: "#7289da",
              }}
              text={`Show ${monster.name} image`}
              icon={faDiscord}
              onClick={() => sendEmbedMessage(webhook, json)}
            />
          </PropWrapper>
        )}
        <PropWrapper>
          {!send && (
            <TextButton
              text={`Send ${monster.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={monster} mode={"THIS"} />}
        </PropWrapper>
      </View>
      {monster.ablt && (
        <View>
          <Text>
            <PropTitle>Abilities:</PropTitle>
            <FormatedText text={monster.ablt} />
          </Text>
        </View>
      )}
      {monster.sAblt && (
        <View>
          <Text>
            <PropTitle>Spezial Abilities:</PropTitle>
            <FormatedText text={monster.sAblt} />
          </Text>
        </View>
      )}
      {monster.lAblt && (
        <View>
          <Text>
            <PropTitle>Legendary Abilities:</PropTitle>
            <FormatedText text={monster.lAblt} />
          </Text>
        </View>
      )}
    </CenterWrapper>
  );
};

export default MonsterView;

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
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
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
  margin-left: 5px;
  line-height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const PropWrapper = styled.div`
  height: auto;
  float: left;
  width: calc(100% - 6px);
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

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
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
  max-height: 30vh;
  margin-left: auto;
  margin-right: auto;
`;
const Empty = styled.div``;
