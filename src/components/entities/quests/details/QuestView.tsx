import React, { useCallback, useEffect, useState } from "react";
import Quest from "../../../../data/campaign/Quest";
import styled from "styled-components";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import FormatedText from "../../../general_elements/FormatedText";
import TextButton from "../../../form_elements/TextButton";
import P2PSender from "../../../p2p/P2PSender";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useWebhook } from "../../../../hooks/webhookHook";
import { formatDiscordText, sendEmbedMessage } from "../../../../services/DiscordService";

interface $Props {
  quest: Quest;
}

const QuestView = ({ quest }: $Props) => {
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
              name: quest.name,
              icon_url: quest.pic,
            },
            fields: [
              {
                name: "Descritption",
                value: quest.description ? formatDiscordText(quest.description) : "-",
              },
              {
                name: "Reward",
                value: quest.rewards ? formatDiscordText(quest.rewards) : "-",
              },
            ],
          },
        ],
      };
      setJson(JSON.stringify(newJson));
    }
  }, [quest, webhook]);

  const getPicture = useCallback(() => {
    if (quest !== undefined) {
      if (quest.picBase64 !== "" && quest.picBase64 !== null && quest.picBase64 !== undefined) {
        return quest.picBase64;
      } else if (quest.pic !== "" && quest.pic !== null && quest.pic !== undefined) {
        return quest.pic;
      }
    }
    return "";
  }, [quest]);

  return (
    <CenterWrapper>
      <View>
        {getPicture() !== "" ? (
          <ImageName>
            <Image pic={getPicture()}></Image>
            <b>{quest.name}</b>
          </ImageName>
        ) : (
          <Name>
            <b>{quest.name}</b>
          </Name>
        )}

        <PropWrapper>
          <Text>
            <FormatedText text={quest.description} />
          </Text>
          <Text>
            <FormatedText text={quest.rewards} />
          </Text>
          <Prop>
            <FormatedText text={quest.followQuest} />
          </Prop>
        </PropWrapper>
        <PropWrapper>
          {webhook !== undefined && (
            <TextButton
              style={{
                backgroundColor: "#7289da",
              }}
              text={`Show ${quest.name}`}
              icon={faDiscord}
              onClick={() => sendEmbedMessage(webhook, json)}
            />
          )}
          {!send && (
            <TextButton
              text={`Send ${quest.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={quest} mode={"THIS"} />}
        </PropWrapper>
      </View>
    </CenterWrapper>
  );
};

export default QuestView;

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
  color: ${({ theme }) => theme.tile.color};
  max-width: 100%;
  height: auto;
  margin: 2px;
  float: left;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  const style = {
    backgroundImage: `url('${pic}')`,
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
