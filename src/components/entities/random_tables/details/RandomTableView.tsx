import React, { useState } from "react";
import styled from "styled-components";
import RandomTable from "../../../../data/RandomTable";

import { faArrowRight, faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextButton from "../../../form_elements/TextButton";
import FormatedText from "../../../general_elements/FormatedText";

interface $Props {
  randomTable: RandomTable;
}

const RandomTableView = ({ randomTable }: $Props) => {
  const [rand, setRand] = useState<number>(-1);

  const rollForRandom = () => {
    const min = 1;
    let max = 10;
    const lastRowValues = randomTable.rows[randomTable.rows.length - 1].value;
    if (lastRowValues.includes("-")) {
      let range = lastRowValues.trim().split("-");
      max = +range[1];
    } else if (lastRowValues.includes("–")) {
      let range = lastRowValues.trim().split("–");
      max = +range[1];
    } else {
      max = +lastRowValues;
    }
    const rand = Math.round(min + Math.random() * (max - min));
    setRand(rand);
  };

  return (
    <CenterWrapper>
      <Name>
        <b>{randomTable.name}</b>
      </Name>
      <View>
        <TextButton
          text={"Roll"}
          icon={faDice}
          onClick={() => rollForRandom()}
        />
        {rand >= 0 && (
          <Prop>
            {rand} <Icon icon={faArrowRight} />
            {randomTable.rows.map((row: { value: string; cells: string }) => {
              if (row.value.includes("-")) { // normal -
                let range = row.value.trim().split("-");
                const min: number = +range[0];
                const max: number = +range[1];
                if (min <= rand && rand <= max)
                  return <FormatedText text={row.cells} />;
              } else if (row.value.includes("–")) { // – used by DnDBeyond 
                let range = row.value.trim().split("–");
                const min: number = +range[0];
                const max: number = +range[1];
                if (min <= rand && rand <= max)
                  return <FormatedText text={row.cells} />;
              } else {
                const valueNumber = +row.value;
                if (valueNumber === rand)
                  return <FormatedText text={row.cells} />;
              }
              return <></>;
            })}
          </Prop>
        )}
      </View>
      <View>
        <table>
          <tbody>
            <tr>
              <TableHeadProp>Number</TableHeadProp>
              {randomTable.header &&
                randomTable.header
                  .split(",")
                  .map((cell: string, index: number) => {
                    return <TableHeadProp key={index}>{cell}</TableHeadProp>;
                  })}
            </tr>
            {randomTable.rows &&
              randomTable.rows.map(
                (row: { value: string; cells: string }, index: number) => {
                  return (
                    <tr key={index}>
                      <TableProp key={index}>{row.value}</TableProp>
                      {row.cells
                        .split("|")
                        .map((cell: string, index: number) => {
                          return (
                            <TableProp key={index}>
                              <FormatedText text={cell} />
                            </TableProp>
                          );
                        })}
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </View>
    </CenterWrapper>
  );
};

export default RandomTableView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 600px;
  padding: 5px;
  margin: 5px;
  height: 100%;
  max-width: calc(100% - 20px);

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px 5px 10px 5px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.tile.color};
  text-align: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const TableHeadProp = styled.th`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  border-radius: 5px;
  padding: 10px;
`;

const TableProp = styled.td`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  border-radius: 5px;
  padding: 5px;
  text-align: left;
`;

const Prop = styled.div`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  box-sizing: content-box;
  text-align: center;

  height: ${({ theme }) => theme.buttons.height};
  line-height: ${({ theme }) => theme.buttons.height};s
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;
