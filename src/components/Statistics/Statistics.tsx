import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { reciveCountPromise } from "../../Services/DatabaseService";
import AppWrapper from "../AppWrapper";
import TabBar from "../GeneralElements/TabBar";

const Statistics = () => {
  const [activeTab, setTab] = useState<string>("General");
  const [generalCounts, setGeneralCounts] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    makeGeneralCountsData();
  });

  const makeGeneralCountsData = async () => {
    let promList: { name: string; count: number }[] = [];
    promList.push({
      name: "spells",
      count: await reciveCountPromise("spells"),
    });
    promList.push({ name: "gears", count: await reciveCountPromise("gears") });
    promList.push({ name: "items", count: await reciveCountPromise("items") });
    promList.push({
      name: "monsters",
      count: await reciveCountPromise("monsters"),
    });
    promList.push({ name: "races", count: await reciveCountPromise("races") });
    promList.push({
      name: "subraces",
      count: await reciveCountPromise("subraces"),
    });
    promList.push({
      name: "classes",
      count: await reciveCountPromise("classes"),
    });
    promList.push({
      name: "subclasses",
      count: await reciveCountPromise("subclasses"),
    });

    let counts = promList.map((count) => {
      return { name: count.name, value: count.count };
    });
    setGeneralCounts(counts);
  };

  return (
    <AppWrapper>
      <TabBar children={["General"]} onChange={(tab: string) => setTab(tab)} />
      {activeTab === "General" && (
        <General>
          <OptionSection>
            <SelectionTitle>Amount of Entities</SelectionTitle>
            <PieChart width={300} height={200}>
              <Legend
                verticalAlign="top"
                align="right"
                height={36}
                layout="vertical"
              />
              <Pie
                data={generalCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
              />
              <Tooltip />
            </PieChart>
          </OptionSection>
        </General>
      )}
    </AppWrapper>
  );
};

export default Statistics;

const General = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

const OptionTab = styled(General)`
  flex: 1 1 auto;
`;

const OptionSection = styled(General)`
  flex: 1 1 auto;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;
`;

const Button = styled.button`
  flex: 1 1 auto;
  display: inline-block;
  text-decoration: none;
  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  height: 28px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 5px;
  text-align: center;
  font-family: inherit;
  font-size: 14px;
  color: ${({ theme }) => theme.buttons.color};
  cursor: pointer;
  line-height: 26px;
`;

const ExternalLink = styled.a`
  flex: 1 1 auto;
  display: inline-block;
  text-decoration: none;
  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  height: 28px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 5px;
  text-align: center;
  font-family: inherit;
  font-size: 14px;
  color: ${({ theme }) => theme.buttons.color};
  cursor: pointer;
  line-height: 26px;

  &.patreon {
    background-color: rgb(232, 91, 70);
  }
  &.discord {
    background-color: #7289da;
  }
`;

const SelectionTitle = styled.div`
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  min-width: calc(100% - 20px);
  font-weight: bold;
  text-algin: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.input.color};
  background-color: ${({ theme }) => theme.input.backgroundColor};
`;

const SectionRow = styled.div`
  flex: 1 1 auto;
  margin: 5px;
  min-width: calc(100% - 10px);

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
`;

const SectionText = styled.div`
  flex: 1 1 auto;
`;

const Message = styled.div`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  min-width: calc(100% - 20px);
  flex: 1 1 auto;
  padding: 3px;
  margin: 5px;
  border-radius: 5px;
`;
