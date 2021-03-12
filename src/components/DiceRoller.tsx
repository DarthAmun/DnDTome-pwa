import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import styled from "styled-components";
import { useWebhook } from "../hooks/webhookHook";
import { rollCommand } from "../services/DiceService";
import { sendEmbedMessage } from "../services/DiscordService";
import IconButton from "./form_elements/IconButton";
import StringField from "./form_elements/StringField";
import TextButton from "./form_elements/TextButton";

const DiceRoller = () => {
  let webhook = useWebhook();
  const [field, setField] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);

  const roll = () => {
    if (field !== "") {
      const { text, result, rolls } = rollCommand(field);
      const resultText = field + ": " + result + rolls.replaceAll("`", "") + " " + text;
      setResults((r) => [resultText, ...r]);
    }
  };

  const sendToDiscord = (result: string) => {
    if (webhook !== undefined) {
      let newJson = {
        username: webhook.name + " (DnDTome)",
        embeds: [
          {
            fields: [
              {
                name: "Roll",
                value: result.replaceAll("(", "||(`").replaceAll(")", "`)||"),
              },
            ],
          },
        ],
      };

      sendEmbedMessage(webhook, JSON.stringify(newJson));
    }
  };

  return (
    <DiceRollerConatiner>
      <StringField
        value={field}
        label="Roll Command"
        onChange={setField}
        placeholder={"e.g. 2d8+3"}
      />
      <TextButton text={"Roll"} icon={faDice} onClick={() => roll()} />
      <ResultContainer>
        {results.length > 0 &&
          results.map((result: string, index: number) => {
            return (
              <RollResult key={index}>
                {index === 0 ? <b>{result}</b> : result}
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
                    onClick={() => sendToDiscord(result)}
                  />
                )}
              </RollResult>
            );
          })}
      </ResultContainer>
    </DiceRollerConatiner>
  );
};

export default DiceRoller;

const DiceRollerConatiner = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  z-index: 1000;

  padding: 10px;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.input.backgroundColor};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ResultContainer = styled.div`
  flex: 1 1 100%;
  max-height: 200px;
  overflow-y: scroll;
  margin: 5px;
`;

const RollResult = styled.div`
  flex: 1 1 100%;
  padding: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin-bottom: 3px;
`;
