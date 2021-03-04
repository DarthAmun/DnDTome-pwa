import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import React, { useEffect, useState, useCallback } from "react";
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
  const [formatedText, setFormatedText] = useState<JSX.Element>();
  let history = useHistory();

  useEffect(() => {
    if (webhook !== undefined) {
      let newText = formatDiscordText(text);
      if (newText.length >= 2000) {
        newText = newText.substring(0, 1997) + "...";
      }
      console.log(newText);
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
    (command: string) => {
      if (!command.includes("d")) {
        let newCommand = "d20" + command;
        let value = parseInt(command.replaceAll("+", ""));
        const { result, text } = rollCommand(newCommand);

        let krit = false;
        if (result - value === 20) krit = true;
        let fail = false;
        if (result - value === 1) fail = true;

        let rollString = "d20(`" + (result - value) + "`)" + command;
        if (result !== undefined && webhook !== undefined) {
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
      } else {
        const { result, text } = rollCommand(command);
        if (result !== undefined && webhook !== undefined) {
          sendMessage(webhook, result + " " + text + " ||" + command + "||");
        }
      }
    },
    [webhook]
  );

  const formatLink = useCallback(
    (text: string) => {
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
                  <TextPart key={index}>
                    <DiscordPart onClick={() => rollDiscord(linkParts[1])}>
                      <LinkCheck type={linkParts[0]} name={linkParts[1]} /> {linkParts[1]}
                    </DiscordPart>
                    <TextPart>{codePart[1]}</TextPart>
                  </TextPart>
                );
              } else {
                if (linkEntity === "class" || linkEntity === "subclass") linkEntity += "e";
                const link: string = "/" + linkEntity + "-detail/name/" + linkParts[1];
                formattedParts.push(
                  <TextPart key={index}>
                    <Link onClick={() => history.push(link)}>
                      <LinkCheck type={linkParts[0]} name={linkParts[1]} /> {linkParts[1]}
                    </Link>
                    <TextPart>{codePart[1]}</TextPart>
                  </TextPart>
                );
              }
            } else {
              if (part !== "") formattedParts.push(<TextPart key={index}>{part}</TextPart>);
            }
          });
          return <>{formattedParts}</>;
        } else {
          return <TextPart>{text}</TextPart>;
        }
      }
    },
    [history]
  );

  const formatTable = useCallback(
    (textPart: string) => {
      if (textPart.includes("||table||")) {
        const table: string[] = text.split("||table||");
        const tableRows: string[] = table[1].split("||");
        let isHead = true;
        return (
          <>
            {formatLink(table[0])}
            <table>
              <tbody>
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
            {formatLink(table[2])}
          </>
        );
      } else {
        return formatLink(textPart);
      }
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

const FormatedTextContainer = styled.div``;

const Link = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 14px;
  padding: 0px 5px 0px 5px;
  cursor: pointer;
  white-space: pre;
`;

const DiscordPart = styled(Link)`
  background-color: #7289da;
  color: white;
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
