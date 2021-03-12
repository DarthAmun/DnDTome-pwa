import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import styled from "styled-components";
import Char from "../../data/chars/Char";
import { useWebhook } from "../../hooks/webhookHook";
import { rollCommand } from "../../services/DiceService";
import { sendEmbedMessage } from "../../services/DiscordService";
import IconButton from "../form_elements/IconButton";

interface $RollableProps {
  char?: Char;
  title: string;
  value?: string | number;
  rolledValue: number;
}

const RollableProp = ({ char, title, value, rolledValue }: $RollableProps) => {
  let webhook = useWebhook();

  const rollDiscord = () => {
    let rollString: string = "";
    let roll: number = 0;

    if (rolledValue >= 0) {
      const { result, text, rolls } = rollCommand("1d20+" + rolledValue);
      roll = result;
      rollString = "d20" + rolls + "+" + rolledValue + text;
    } else {
      const { result, text, rolls } = rollCommand("1d20" + rolledValue);
      roll = result;
      rollString = "d20" + rolls + rolledValue + text;
    }

    console.log(roll, rollString);

    let krit = false;
    if (roll - rolledValue === 20) krit = true;
    let fail = false;
    if (roll - rolledValue === 1) fail = true;

    if (rollString !== "" && webhook !== undefined) {
      const newName =
        char !== undefined
          ? rolledValue >= 0
            ? title + "(+" + rolledValue + ")"
            : title + "(" + rolledValue + ")"
          : title;
      rollString = char !== undefined ? rollString : "";
      let newJson = {
        username: webhook.name + " (DnDTome)",
        embeds: [
          {
            author: {
              name: char !== undefined ? char.name : "???",
              icon_url: char !== undefined ? char.pic : "",
            },
            fields: [
              {
                name: newName,
                value:
                  roll +
                  (fail ? " :red_circle:" : "") +
                  (krit ? " :green_circle:" : "") +
                  (rollString !== "" ? " ||" + rollString + "||" : ""),
              },
            ],
          },
        ],
      };
      sendEmbedMessage(webhook, JSON.stringify(newJson));
    }
  };

  return (
    <PropText
      onClick={() => rollDiscord()}
      style={{ cursor: webhook !== undefined ? "pointer" : "default" }}
    >
      <PropTitle>{title}:</PropTitle>
      {value !== undefined ? value + " " : ""}
      {value !== undefined
        ? "(" + (rolledValue >= 0 ? "+" + rolledValue : rolledValue) + ")"
        : rolledValue}
      {webhook !== undefined && (
        <IconButton
          style={{
            backgroundColor: "#7289da",
            float: "right",
            padding: "5px",
            height: "10px",
            lineHeight: "10px",
            fontSize: "10px",
            margin: "0px",
            marginLeft: "5px",
          }}
          icon={faDiscord}
        />
      )}
    </PropText>
  );
};

export default RollableProp;

const PropText = styled.div`
  flex: 2 2 auto;
  height: auto;
  margin: 2px;
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
