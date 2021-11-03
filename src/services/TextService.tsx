import { ReactNodeArray } from "react";
import reactStringReplace from "react-string-replace";
import { Tag, Popover, Whisper } from "rsuite";
import styled from "styled-components";
import DiceRoller from "../components/general/DiceRoller";
import LinkCheck from "../components/general/LinkCheck";
import EntityTile from "../components/generic/EntityTile";

export const formating = (text: string) => {
  let checkedText = formatTable(text);
  checkedText = formatLink(checkedText);
  return checkedText;
};

const formatLink = (textArray: string | ReactNodeArray): ReactNodeArray => {
  return reactStringReplace(textArray, /\[\[(\w*\.[\s\S]*?)\]\]/gm, (match, i) => {
    const linkParts: string[] = match.split(".");
    let entityName = linkParts[0];
    let nameSource = linkParts[1];
    let [name, sources] = nameSource.split("|");
    if (entityName === "dice") {
      return (
        <Whisper
          key={match + i}
          preventOverflow
          trigger="hover"
          speaker={
            <Popover full style={{ width: 200 }}>
              <DiceRoller dice={nameSource} />
            </Popover>
          }
          placement="auto"
          enterable
        >
          <Tag size={"sm"} color="red">
            <LinkCheck type={entityName} /> {nameSource}
          </Tag>
        </Whisper>
      );
    }
    if (entityName === "class" || entityName === "subclass") entityName += "e";
    return (
      <Whisper
        key={match + i}
        preventOverflow
        trigger="hover"
        speaker={
          <Popover full style={{ maxWidth: 300 }}>
            <EntityTile entityName={entityName} name={name} sources={sources} />
          </Popover>
        }
        placement="auto"
        enterable
      >
        <Tag size={"sm"} color="red">
          <LinkCheck type={entityName} /> {name}
          {sources !== undefined ? ` (${sources})` : ""}
        </Tag>
      </Whisper>
    );
  });
};

const formatTable = (text: string): ReactNodeArray => {
  return reactStringReplace(text, /\|\|tableStart\|\|([\s\S]*?)\|\|tableEnd\|\|/gm, (match, i) => {
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
  });
};

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
