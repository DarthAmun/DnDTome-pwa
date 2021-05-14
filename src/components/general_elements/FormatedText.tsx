import React, { ReactNodeArray, useCallback, useEffect, useState } from "react";
import reactStringReplace from "react-string-replace";
import { useHistory } from "react-router";
import styled from "styled-components";
import LinkCheck from "./LinkCheck";
import { useWebhook } from "../../hooks/webhookHook";
import { rollCommand } from "../../services/DiceService";
import { formatDiscordText, sendEmbedMessage, sendMessage } from "../../services/DiscordService";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import IconButton from "../form_elements/IconButton";

interface $Props {
  text: string;
}

const FormatedText = ({ text }: $Props) => {
  let webhook = useWebhook();
  const [json, setJson] = useState<string>("");
  const [formatedTextParts, setFormatedParts] = useState<ReactNodeArray>();
  let history = useHistory();

  useEffect(() => {
    if (webhook !== undefined) {
      let newText = formatDiscordText(text);
      if (newText.length >= 2000) {
        newText = newText.substring(0, 1997) + "...";
      }
      let newJson = {
        username: webhook.name + " (DnDTome)",
        content: newText,
      };
      setJson(JSON.stringify(newJson));
    }
  }, [text, webhook]);

  const rollDiscord = useCallback(
    (command: string, adv: boolean, dis: boolean) => {
      if (!command.includes("d")) {
        let newCommand = "d20" + command;
        let value = parseInt(command.replaceAll("+", ""));
        const { result, text, rolls } = rollCommand(newCommand);
        const { result: result2, rolls: rolls2 } = rollCommand(newCommand);

        let krit = false;
        if (!adv && !dis && result - value === 20) krit = true;
        else if (adv && (result - value === 20 || result2 - value === 20)) krit = true;
        else if (dis && result - value === 20 && result2 - value === 20) krit = true;

        let fail = false;
        if (!adv && !dis && result - value === 1) fail = true;
        else if (adv && result - value === 1 && result - value === 1) fail = true;
        else if (dis && (result - value === 1 || result - value === 1)) fail = true;

        let rollString = "d20" + rolls + rolls2 + command;
        rollString += adv ? "adv" : "";
        rollString += dis ? "dis" : "";

        if (result !== undefined && webhook !== undefined) {
          if (adv) {
            let resultText =
              result >= result2
                ? "**" + result + "** ~~" + result2 + "~~"
                : "~~" + result + "~~ **" + result2 + "**";
            sendMessage(
              webhook,
              resultText +
                " " +
                text +
                (fail ? " :red_circle:" : "") +
                (krit ? " :green_circle:" : "") +
                " ||" +
                rollString +
                "||"
            );
          } else if (dis) {
            let resultText =
              result >= result2
                ? "~~" + result + "~~ **" + result2 + "**"
                : "**" + result + "** ~~" + result2 + "~~";
            sendMessage(
              webhook,
              resultText +
                " " +
                text +
                (fail ? " :red_circle:" : "") +
                (krit ? " :green_circle:" : "") +
                " ||" +
                rollString +
                "||"
            );
          } else {
            sendMessage(
              webhook,
              result +
                " " +
                text +
                (fail ? " :red_circle:" : "") +
                (krit ? " :green_circle:" : "") +
                " ||" +
                rollString +
                "||"
            );
          }
        }
      } else {
        const { result, text, rolls } = rollCommand(command);
        const { result: result2, rolls: rolls2 } = rollCommand(command);

        let rollString = command + rolls + rolls2;
        rollString += adv ? " adv" : "";
        rollString += dis ? " dis" : "";

        if (result !== undefined && webhook !== undefined) {
          if (adv) {
            let resultText =
              result >= result2
                ? "**" + result + "** ~~" + result2 + "~~"
                : "~~" + result + "~~ **" + result2 + "**";
            sendMessage(webhook, resultText + " " + text + " ||" + rollString + "||");
          } else if (dis) {
            let resultText =
              result >= result2
                ? "~~" + result + "~~ **" + result2 + "**"
                : "**" + result + "** ~~" + result2 + "~~";
            sendMessage(webhook, resultText + " " + text + " ||" + rollString + "||");
          } else {
            sendMessage(webhook, result + " " + text + " ||" + rollString + "||");
          }
        }
      }
    },
    [webhook]
  );

  const formatLink = useCallback(
    (text: string | ReactNodeArray): ReactNodeArray => {
      return reactStringReplace(text, /\[\[(\w*\.[\s\S]*?)\]\]/gm, (match, i) => {
        const linkParts: string[] = match.split(".");
        let entityName = linkParts[0];
        let nameSource = linkParts[1];
        let [name, sources] = nameSource.split("|");
        if (entityName === "dice") {
          if (nameSource.startsWith("+")) {
            nameSource = nameSource.replace("+", "");
            [name, sources] = nameSource.split("|");
          }
          return (
            <TextPart key={match + i}>
              <DiscordPart onClick={() => rollDiscord(name, false, false)}>
                <LinkCheck type={entityName} /> {nameSource}
              </DiscordPart>
              <Adv onClick={() => rollDiscord(name, true, false)}>Adv</Adv>
              <Dis onClick={() => rollDiscord(name, false, true)}>Dis</Dis>
            </TextPart>
          );
        }
        if (entityName === "class" || entityName === "subclass") entityName += "e";
        return (
          <Link
            key={match + i}
            onClick={() => history.push("/" + entityName + "-detail/name/" + nameSource)}
          >
            <LinkCheck type={entityName} /> {name}
            {sources !== undefined ? ` (${sources})` : ""}
          </Link>
        );
      });
    },
    [history, rollDiscord]
  );

  const formatTable = useCallback(
    (text: string): ReactNodeArray => {
      return reactStringReplace(
        text,
        /\|\|tableStart\|\|([\s\S]*?)\|\|tableEnd\|\|/gm,
        (match, i) => {
          const tableRows: string[] = match.split("||");
          let isHead = true;
          return (
            <table key={match + i}>
              <tbody key={match + i}>
                {tableRows.map((row: string, index: number) => {
                  if (row.includes("|")) {
                    if (isHead) {
                      isHead = false;
                      const cells = row.split("|");
                      return (
                        <tr key={match + i + index}>
                          {cells.map((cell: string, index: number) => {
                            return <TableHeadProp key={index}>{cell}</TableHeadProp>;
                          })}
                        </tr>
                      );
                    } else {
                      const cells = row.split("|");
                      return (
                        <tr key={match + i + index}>
                          {cells.map((cell: string, index: number) => {
                            return <TableProp key={index}>{formatLink(cell)}</TableProp>;
                          })}
                        </tr>
                      );
                    }
                  } else {
                    return <></>;
                  }
                })}
              </tbody>
            </table>
          );
        }
      );
    },
    [formatLink]
  );

  useEffect(() => {
    let checkedText = formatTable(text);
    checkedText = formatLink(checkedText);
    setFormatedParts(checkedText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormatedTextContainer>
      {webhook !== undefined && text !== "" && (
        <IconButton
          style={{
            backgroundColor: "#7289da",
            float: "right",
            padding: "5px",
          }}
          icon={faDiscord}
          onClick={() => sendEmbedMessage(webhook, json)}
        />
      )}
      {formatedTextParts}
    </FormatedTextContainer>
  );
};

export default FormatedText;

const FormatedTextContainer = styled.div`
  line-height: 20px;
  white-space: pre-line;
`;

const Link = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 14px;
  padding: 0px 5px 0px 5px;
  margin: 1px;
  cursor: pointer;
  white-space: pre;
`;

const DiscordPart = styled(Link)`
  background-color: #7289da;
  color: white;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;
const Adv = styled(Link)`
  background-color: #7289da;
  color: white;
  border-radius: 0px;
`;
const Dis = styled(Link)`
  background-color: #7289da;
  color: white;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

const TextPart = styled.span`
  white-space: pre-line;
`;

const TableHeadProp = styled.th`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  border-radius: 5px;
  padding: 2px 5px 2px 5px;
`;

const TableProp = styled.td`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  border-radius: 5px;
  padding: 5px;
  text-align: center;
`;
