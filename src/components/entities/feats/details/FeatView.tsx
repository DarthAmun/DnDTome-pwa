import React, { useEffect, useState } from "react";
import Feat from "../../../../data/Feat";
import styled from "styled-components";

import { faLink, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import FormatedText from "../../../general_elements/FormatedText";
import TextButton from "../../../form_elements/TextButton";
import P2PSender from "../../../p2p/P2PSender";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useWebhook } from "../../../../hooks/webhookHook";
import { formatDiscordText, sendEmbedMessage } from "../../../../services/DiscordService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface $Props {
  feat: Feat;
}

const FeatView = ({ feat }: $Props) => {
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
              name: feat.name,
            },
            fields: [
              {
                name: "Descritption",
                value: feat.description ? formatDiscordText(feat.description) : "-",
              },
              {
                name: "Prerequisite",
                value: feat.prerequisite ? formatDiscordText(feat.prerequisite) : "-",
              },
            ],
          },
        ],
      };
      setJson(JSON.stringify(newJson));
    }
  }, [feat, webhook]);

  return (
    <CenterWrapper>
      <View>
        <Name>
          <b>{feat.name}</b>
        </Name>

        <PropWrapper>
          <Text>
            <FormatedText text={feat.description} />
          </Text>
          <Text>
            <FormatedText text={feat.prerequisite} />
          </Text>
          <Prop>
            <Icon icon={faLink} />
            {feat.sources}
          </Prop>
        </PropWrapper>
        <PropWrapper>
          {webhook !== undefined && (
            <TextButton
              style={{
                backgroundColor: "#7289da",
              }}
              text={`Show ${feat.name}`}
              icon={faDiscord}
              onClick={() => sendEmbedMessage(webhook, json)}
            />
          )}
          {!send && (
            <TextButton
              text={`Send ${feat.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={feat} mode={"THIS"} />}
        </PropWrapper>
      </View>
    </CenterWrapper>
  );
};

export default FeatView;

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

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;
