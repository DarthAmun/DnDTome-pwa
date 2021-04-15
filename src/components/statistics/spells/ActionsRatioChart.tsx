import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Bar } from "@iftek/react-chartjs-3";
import {
  reciveAttributeSelectionPromise,
  recivePromiseByAttributeCount,
} from "../../../services/DatabaseService";
import { LocalLoadingSpinner } from "../../Loading";

const ActionsRatioChart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [generalCounts, setGeneralCounts] = useState<{
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  }>();

  useEffect(() => {
    makeSchoolsData();
  }, []);

  const makeSchoolsData = async () => {
    let times = await reciveAttributeSelectionPromise("spells", "time");

    let newTimes: string[] = [];
    times.forEach((time) => {
      if (!time.toString().startsWith("1 reaction")) {
        newTimes.push(time.toString());
      }
    });

    let promList: { name: string; count: number }[] = [];
    for (const time of newTimes) {
      if (time !== "") {
        const count = await recivePromiseByAttributeCount("spells", "time", time.toString());
        promList.push({
          name: time.toString(),
          count: count,
        });
      }
    }

    let names: string[] = [];
    let counts: number[] = [];
    let colors: string[] = [];
    promList
      .sort((a, b) => b.count - a.count)
      .forEach((count) => {
        names.push(count.name);
        counts.push(count.count);
        colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
      });
    setGeneralCounts({
      labels: names,
      datasets: [
        {
          data: counts,
          backgroundColor: colors,
        },
      ],
    });
    setLoading(false);
  };

  return (
    <OptionSection>
      <SelectionTitle>Time Ratio</SelectionTitle>
      {!loading && generalCounts !== undefined && (
        <div style={{ width: "100%", paddingBottom: "10px" }}>
          <Bar data={generalCounts} options={{}} legend={{ display: false }} />
        </div>
      )}
      {loading && <LocalLoadingSpinner />}
    </OptionSection>
  );
};

export default ActionsRatioChart;

const OptionSection = styled.div`
  flex: 1 1 800px;
  width: calc(100% - 1em);
  max-width: 800px;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
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
