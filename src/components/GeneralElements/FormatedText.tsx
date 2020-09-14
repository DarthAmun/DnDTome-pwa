import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

interface $Props {
  text: string;
}

const FormatedText = ({ text }: $Props) => {
  const [formatedText, setFormatedText] = useState<JSX.Element[]>();
  let history = useHistory();

  const formatTable = useCallback(
    (textPart: string) => {
      if (textPart.includes("||table||")) {
        const table: string[] = text.split("||table||");
        const tableRows: string[] = table[1].split("||");
        let isHead = true;
        return (
          <>
            {table[0]}
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
                            return <TableProp key={index}>{cell}</TableProp>;
                          })}
                        </tr>
                      );
                    }
                  } else {
                    return "";
                  }
                })}
              </tbody>
            </table>
            {table[2]}
          </>
        );
      } else {
        return textPart;
      }
    },
    [text]
  );

  useEffect(() => {
    const parts: string[] = text.split("[[");
    let formatedText = parts.map((part: string, index: number) => {
      if (part.includes("]]")) {
        const codePart: string[] = part.split("]]");
        const linkParts: string[] = codePart[0].split(".");
        const link: string =
          "/" + linkParts[0] + "-detail/name/" + linkParts[1];
        return (
          <TextPart key={index}>
            <Link onClick={() => history.push(link)}>{linkParts[1]}</Link>
            {formatTable(codePart[1])}
          </TextPart>
        );
      } else {
        return <TextPart key={index}>{formatTable(part)}</TextPart>;
      }
    });
    setFormatedText(formatedText);
  }, [text, history, formatTable]);

  return (
    <>
      {formatedText?.map((textElm) => {
        return textElm;
      })}
    </>
  );
};

export default FormatedText;

const Link = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 10px;
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
