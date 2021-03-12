import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faLink, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Npc from "../../../../data/campaign/Npc";
import { useWebhook } from "../../../../hooks/webhookHook";
import { sendEmbedMessage } from "../../../../services/DiscordService";
import TextButton from "../../../form_elements/TextButton";
import FormatedText from "../../../general_elements/FormatedText";
import P2PSender from "../../../p2p/P2PSender";
import CharView from "../../chars/details/CharView";
import MonsterView from "../../monsters/details/MonsterView";

interface $Props {
  npc: Npc;
}

const NpcView = ({ npc }: $Props) => {
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
              name: npc.name,
              icon_url: npc.pic,
            },
            image: {
              url: npc.pic,
            },
          },
        ],
      };
      setJson(JSON.stringify(newJson));
    }
  }, [npc, webhook]);

  const getPicture = useCallback(() => {
    if (npc !== undefined) {
      if (npc.pic === "" || npc.pic === null) {
        return "";
      }
      return npc.pic;
    }
    return "";
  }, [npc]);

  return (
    <CenterWrapper>
      <View>
        {getPicture() !== "" ? (
          <ImageName>
            <Image pic={getPicture()}></Image>
            <b>{npc.name}</b>
          </ImageName>
        ) : (
          <Name>
            <b>{npc.name}</b>
          </Name>
        )}

        <PropWrapper>
          <Text>
            <FormatedText text={npc.description} />
          </Text>
          <Text>
            <PropTitle>Traits: </PropTitle>
            <FormatedText text={npc.traits} />
          </Text>
          <Prop>
            <Icon icon={faLink} />
            {npc.sources}
          </Prop>
        </PropWrapper>
        <PropWrapper>
          {webhook !== undefined && npc.pic !== "" && (
            <TextButton
              style={{
                backgroundColor: "#7289da",
              }}
              text={`Show ${npc.name} image`}
              icon={faDiscord}
              onClick={() => sendEmbedMessage(webhook, json)}
            />
          )}
          {npc.monster && !send && (
            <TextButton
              text={`Send ${npc.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={npc} mode={"THIS"} />}
        </PropWrapper>
      </View>
      {npc.monster && (
        <View>
          <MonsterView monster={npc.monster} isNpc />
        </View>
      )}
      {npc.char && (
        <View>
          <CharView character={npc.char} modifications={true} isNpc />
        </View>
      )}
    </CenterWrapper>
  );
};

export default NpcView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex-start: center;
  align-items: flex-start;
`;

const View = styled.div`
  flex: 1 1 100%;
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
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

const Text = styled.div`
  height: auto;
  width: 100%;
  margin: 2px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
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
