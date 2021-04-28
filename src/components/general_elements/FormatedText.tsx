import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useWebhook } from "../../hooks/webhookHook";
import { rollCommand } from "../../services/DiceService";
import { formatDiscordText, sendEmbedMessage, sendMessage } from "../../services/DiscordService";
import IconButton from "../form_elements/IconButton";
import LinkCheck from "./LinkCheck";

interface $Props {
  text: string;
}

const FormatedText = ({ text }: $Props) => {
  let webhook = useWebhook();
  const [json, setJson] = useState<string>("");
  const [formatedText, setFormatedText] = useState<JSX.Element[]>();
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

  const cut = (str: string, cutStart: number, cutEnd: number) => {
    return str.substr(0, cutStart) + str.substr(cutEnd + 1);
  };

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
    (text: string, index: number): JSX.Element => {
      if (text !== undefined) {
        if (text.includes("[[") && text.includes("]]")) {
          const parts = text.split("[[");
          let formattedParts: any[] = [];
          parts.forEach((part: string, index: number) => {
            if (part.includes("]]")) {
              const codePart: string[] = part.split("]]");
              const linkParts: string[] = codePart[0].split(".");
              let linkEntity = linkParts[0];
              if (linkEntity === "dice") {
                formattedParts.push(
                  <TextPart key={"TextPart" + index}>
                    <DiscordPart onClick={() => rollDiscord(linkParts[1], false, false)}>
                      <LinkCheck type={linkParts[0]} name={linkParts[1]} /> {linkParts[1]}
                    </DiscordPart>
                    <Adv onClick={() => rollDiscord(linkParts[1], true, false)}>Adv</Adv>
                    <Dis onClick={() => rollDiscord(linkParts[1], false, true)}>Dis</Dis>
                    <TextPart>{codePart[1]}</TextPart>
                  </TextPart>
                );
              } else {
                if (linkEntity === "class" || linkEntity === "subclass") linkEntity += "e";
                if (linkParts[1].includes("|")) {
                  const entityParts = linkParts[1].split("|");
                  const link: string =
                    "/" +
                    linkEntity +
                    "-detail/name/" +
                    entityParts[0] +
                    "?source=" +
                    entityParts[1];
                  formattedParts.push(
                    <TextPart key={"TextPart" + index}>
                      <Link onClick={() => history.push(link)}>
                        <LinkCheck type={linkParts[0]} name={entityParts[0]} /> {entityParts[0]} (
                        {entityParts[1]})
                      </Link>
                      <TextPart>{codePart[1]}</TextPart>
                    </TextPart>
                  );
                } else {
                  const link: string = "/" + linkEntity + "-detail/name/" + linkParts[1];
                  formattedParts.push(
                    <TextPart key={"TextPart" + index}>
                      <Link onClick={() => history.push(link)}>
                        <LinkCheck type={linkParts[0]} name={linkParts[1]} /> {linkParts[1]}
                      </Link>
                      <TextPart>{codePart[1]}</TextPart>
                    </TextPart>
                  );
                }
              }
            } else {
              if (part !== "") formattedParts.push(<TextPart key={index}>{part}</TextPart>);
            }
          });
          return <>{formattedParts}</>;
        } else if (text.length > 0) {
          return <TextPart key={"TextPart" + index}>{text}</TextPart>;
        }
      }
      return <></>;
    },
    // eslint-disable-next-line
    [history]
  );

  const formatTable = useCallback(
    (textPart: string): JSX.Element[] => {
      if (textPart.includes("||tableStart||")) {
        let newTable: JSX.Element[] = [];
        const table: string[] = text.split("||tableStart||");

        table.forEach((textPart: string, index: number) => {
          if (textPart.includes("||tableEnd||")) {
            const tableEnd = textPart.split("||tableEnd||");
            const tableRows: string[] = tableEnd[0].split("||");
            let isHead = true;
            newTable.push(
              <table key={"table" + index}>
                <tbody key={"tbody" + index}>
                  {tableRows.map((row: string, index: number) => {
                    if (row.includes("|")) {
                      if (isHead) {
                        isHead = false;
                        const cells = row.split("|");
                        return (
                          <tr key={index}>
                            {cells.map((cell: string, index: number) => {
                              return <TableHeadProp key={index}>{cell}</TableHeadProp>;
                            })}
                          </tr>
                        );
                      } else {
                        const cells = row.split("|");
                        return (
                          <tr key={index}>
                            {cells.map((cell: string, index: number) => {
                              return <TableProp key={index}>{formatLink(cell, index)}</TableProp>;
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
            newTable.push(formatLink(tableEnd[1], index));
          } else {
            newTable.push(formatLink(table[0], index));
          }
        });
        return newTable;
      }
      return [formatLink(textPart, 0)];
    },
    [text, formatLink]
  );

  const formatText = useCallback(
    (textPart: string) => {
      while (textPart.includes("{{")) {
        const cutStart = textPart.indexOf("{{");
        const cutEnd = textPart.indexOf("}}") + 1;
        textPart = cut(textPart, cutStart, cutEnd);
      }
      return formatTable(textPart);
    },
    [formatTable]
  );

  useEffect(() => {
    if (text !== undefined) {
      let formatedText = formatText(text);
      setFormatedText(formatedText);
    }
  }, [text, history, formatText]);

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
      {formatedText}
    </FormatedTextContainer>
  );
};

export default FormatedText;

const FormatedTextContainer = styled.div`
  line-height: 20px;
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
