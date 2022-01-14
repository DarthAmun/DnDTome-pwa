import { ReactNodeArray } from "react";
import reactStringReplace from "react-string-replace";
import { Tag, Popover, Whisper } from "rsuite";
import styled from "styled-components";
import DiceRoller from "../components/general/DiceRoller";
import LinkCheck from "../components/general/LinkCheck";
import EntityTile from "../components/generic/EntityTile";

export const formating = (text: string) => {
  console.time("formatting");
  let checkedText = format(text);
  console.timeEnd("formatting");
  return checkedText;
};

const format = (text: string): JSX.Element[] => {
  let newNodeArray: JSX.Element[] = [];
  let matchedCoordinates: { tag: string; endtag: string; start: number; stop: number }[] = [];
  let found: string[] | null = text.match(/(<[^>]*>)/gm);
  if (found !== null) {
    matchedCoordinates = replaceNode(text, found).sort((a, b) => a.start - b.start);
    console.log(matchedCoordinates);
    while (matchedCoordinates.length > 0) {
      newNodeArray = [
        ...newNodeArray,
        makeRactNodes(text, matchedCoordinates, (tags) => {
          matchedCoordinates = [...matchedCoordinates].filter((coord) => {
            return !tags.includes(coord);
          });
        }),
      ];
    }
  }
  return newNodeArray;
};

const makeRactNodes = (
  text: String,
  matchedCoordinates: { tag: string; endtag: string; start: number; stop: number }[],
  removeProcessedTags: (
    tags: { tag: string; endtag: string; start: number; stop: number }[]
  ) => void
) => {
  let coo: { tag: string; endtag: string; start: number; stop: number } | undefined =
    matchedCoordinates.shift();
  if (coo !== undefined) {
    const [start, stop] = [coo.start, coo.stop];
    const tag = coo.tag;
    const endtag = coo.endtag;

    if (tag === "<br>") {
      let Elm: any = tag.replaceAll("<", "").replaceAll("/", "").replaceAll(">", "");
      return <Elm key={start}></Elm>;
    } else {
      let textPart = text.substring(start + tag.length, stop - endtag.length);

      let nodeParts = tag.split(" ");
      let classes: string = "";
      if (nodeParts.length > 1) {
        if (nodeParts[1].startsWith("class=")) {
          classes = nodeParts[1].split("=")[1].replaceAll('"', "").replace(">", "");
        }
      }
      let Elm: any = nodeParts[0].replaceAll("<", "").replaceAll("/", "").replaceAll(">", "");

      let subMatchedCoordinates = [...matchedCoordinates].filter((coord) => {
        return start < coord.start && stop > coord.stop;
      });
      removeProcessedTags(subMatchedCoordinates);

      if (subMatchedCoordinates.length > 0) {
        let stopIndex = 0;
        let subs: any[] = [];
        let subClone = [...subMatchedCoordinates];
        subMatchedCoordinates.forEach((subCoo, i) => {
          let preText = textPart.substring(stopIndex, subCoo.start - start - tag.length);
          let checkedText = formatTable(preText);
          checkedText = formatLink(checkedText);

          stopIndex = subCoo.stop - start - tag.length;
          subs = [...subs, checkedText, makeRactNodes(text, subClone, removeProcessedTags)];
        });
        let postText = textPart.substring(stopIndex, textPart.length);
        let checkedText = formatTable(postText);
        checkedText = formatLink(checkedText);
        subs = [...subs, checkedText];
        return (
          <Elm key={start} className={classes}>
            {subs}
          </Elm>
        );
      } else {
        let checkedText = formatTable(textPart);
        checkedText = formatLink(checkedText);
        return (
          <Elm key={start} className={classes}>
            {checkedText}
          </Elm>
        );
      }
    }
  }
  return <></>;
};

const replaceNode = (text: string, found: string[]) => {
  let replaceFound = [...found];
  let matchedCoordinates: { tag: string; endtag: string; start: number; stop: number }[] = [];
  let i: number = 0;

  console.log(found);
  while (replaceFound.length > 0) {
    let firstNode = replaceFound[i];
    if (firstNode === "<br>") {
      let start = 0;
      matchedCoordinates.forEach((coo) => {
        if (coo.tag === firstNode) {
          if (coo.start >= start) start = coo.start + 1;
        }
      });
      matchedCoordinates.push({
        tag: firstNode,
        endtag: firstNode,
        start: text.indexOf(firstNode, start),
        stop: text.indexOf(firstNode, start) + firstNode.length,
      });
      replaceFound.splice(i, 1);
      i = 0;
    } else {
      let closeFirstNode = closeTag(firstNode);
      if (replaceFound[i + 1] === closeFirstNode) {
        let [start, stop] = [0, 0];
        matchedCoordinates.forEach((coo) => {
          if (coo.tag === firstNode) {
            if (coo.start >= start) start = coo.start + 1;
            if (coo.stop > stop) stop = coo.stop + 1;
          }
        });
        matchedCoordinates.push({
          tag: firstNode,
          endtag: closeFirstNode,
          start: text.indexOf(firstNode, start),
          stop: text.indexOf(closeFirstNode, stop) + closeFirstNode.length,
        });
        replaceFound.splice(i, 2);
        i = 0;
      } else i++;
    }
  }
  return matchedCoordinates;
};

const closeTag = (node: string) => {
  let nodeParts = node.split(" ");
  if (nodeParts.length > 1) return nodeParts[0].replace("<", "</") + ">";
  return nodeParts[0].replace("<", "</");
};

const formatLink = (text: string | ReactNodeArray): ReactNodeArray => {
  return reactStringReplace(text, /\[\[(\w*\.[\s\S]*?)\]\]/gm, (match, i) => {
    const linkParts: string[] = match.split(".");
    let entityName = linkParts[0];
    let nameSource = linkParts[1];
    let [name, sources] = nameSource.split("|");
    if (entityName === "dice") {
      return (
        <Whisper
          key={match + i}
          preventOverflow
          trigger={["hover", "click"]}
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
        trigger={["hover", "click"]}
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

const formatTable = (text: string | ReactNodeArray): ReactNodeArray => {
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
