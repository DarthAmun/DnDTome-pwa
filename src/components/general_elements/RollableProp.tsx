import React from "react";
import styled from "styled-components";
import Char from "../../data/chars/Char";
import { useWebhook } from "../../hooks/webhookHook";
import { rollCommand } from "../../services/DiceService";
import { sendEmbedMessage } from "../../services/DiscordService";

interface $RollableProps {
  char?: Char;
  title: string;
  value?: string | number;
  rolledValue: number;
}

const RollableProp = ({ char, title, value, rolledValue }: $RollableProps) => {
  let webhook = useWebhook();

  const rollDiscord = (adv: boolean, dis: boolean) => {
    let rollString: string = "";
    let roll: number = 0;
    let roll2: number = 0;

    if (rolledValue >= 0) {
      const { result, text, rolls } = rollCommand("1d20+" + rolledValue);
      const { result: result2, rolls: rolls2 } = rollCommand("1d20+" + rolledValue);
      roll = result;
      roll2 = result2;
      rollString = "d20" + rolls + rolls2 + "+" + rolledValue + text;
    } else {
      const { result, text, rolls } = rollCommand("1d20" + rolledValue);
      const { result: result2, rolls: rolls2 } = rollCommand("1d20" + rolledValue);
      roll = result;
      roll2 = result2;
      rollString = "d20" + rolls + rolls2 + rolledValue + text;
    }
    rollString += adv ? " adv" : "";
    rollString += dis ? " dis" : "";

    let krit = false;
    if (!adv && !dis && roll - rolledValue === 20) krit = true;
    else if (adv && (roll - rolledValue === 20 || roll2 - rolledValue === 20)) krit = true;
    else if (dis && roll - rolledValue === 20 && roll2 - rolledValue === 20) krit = true;

    let fail = false;
    if (!adv && !dis && roll - rolledValue === 1) fail = true;
    else if (adv && roll - rolledValue === 1 && roll2 - rolledValue === 1) fail = true;
    else if (dis && (roll - rolledValue === 1 || roll2 - rolledValue === 1)) fail = true;

    if (rollString !== "" && webhook !== undefined) {
      const newName =
        char !== undefined
          ? rolledValue >= 0
            ? title + "(+" + rolledValue + ")"
            : title + "(" + rolledValue + ")"
          : title;
      rollString = char !== undefined ? rollString : "";
      let resultText = "";
      if (adv) {
        resultText =
          roll >= roll2
            ? "**" + roll + "** ~~" + roll2 + "~~"
            : "~~" + roll + "~~ **" + roll2 + "**";
      } else if (dis) {
        resultText =
          roll >= roll2
            ? "~~" + roll + "~~ **" + roll2 + "**"
            : "**" + roll + "** ~~" + roll2 + "~~";
      } else {
        resultText = "**" + roll + "**";
      }
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
                  resultText +
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
    <PropText>
      <PropTitle
        onClick={() => rollDiscord(false, false)}
        style={{
          cursor: webhook !== undefined ? "pointer" : "default",
        }}
      >
        {title}:
      </PropTitle>
      {value !== undefined ? value + " " : ""}
      {value !== undefined
        ? "(" + (rolledValue >= 0 ? "+" + rolledValue : rolledValue) + ")"
        : rolledValue}
      {webhook !== undefined && (
        <>
          <Dis onClick={() => rollDiscord(false, true)}>Dis</Dis>
          <Adv onClick={() => rollDiscord(true, false)}>Adv</Adv>
        </>
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

const Adv = styled.div`
  text-decoration: none;
  font-size: 14px;
  padding: 0px 5px 0px 5px;
  margin: 1px;
  cursor: pointer;
  white-space: pre;
  float: right;
  z-index: 100;

  background-color: #7289da;
  color: white;
  border-radius: 5px 0px 0px 5px;
`;
const Dis = styled(Adv)`
  border-radius: 0px 5px 5px 0px;
`;
