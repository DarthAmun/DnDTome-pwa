import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

interface $Props {
  text: string;
}

const FormatedText = ({ text }: $Props) => {
  const [formatedText, setFormatedText] = useState<JSX.Element>();
  let history = useHistory();

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
              const link: string =
                "/" + linkParts[0] + "-detail/name/" + linkParts[1];
              formattedParts.push(
                <TextPart key={index}>
                  <Link onClick={() => history.push(link)}>{linkParts[1]}</Link>
                  <TextPart>{codePart[1]}</TextPart>
                </TextPart>
              );
            } else {
              if (part !== "")
                formattedParts.push(<TextPart key={index}>{part}</TextPart>);
            }
          });
          console.log(formattedParts);
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
                            return (
                              <TableHeadProp key={index}>{cell}</TableHeadProp>
                            );
                          })}
                        </tr>
                      );
                    } else {
                      const cells = row.split("|");
                      return (
                        <tr key={index}>
                          {cells.map((cell: string, index: number) => {
                            return (
                              <TableProp key={index}>
                                {formatLink(cell)}
                              </TableProp>
                            );
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

  useEffect(() => {
    if (text !== undefined) {
      let formatedText = formatTable(text);
      setFormatedText(formatedText);
    }
  }, [text, history, formatTable]);

  return <>{formatedText}</>;
};

export default FormatedText;

const Link = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 14px;
  padding: 0px 5px 0px 5px;
  cursor: pointer;
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
