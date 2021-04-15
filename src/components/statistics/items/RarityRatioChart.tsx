import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Doughnut } from "@iftek/react-chartjs-3";
import {
  reciveAttributeSelectionPromise,
  recivePromiseByAttributeCount,
} from "../../../services/DatabaseService";
import { LocalLoadingSpinner } from "../../Loading";

const RarityRatioChart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [generalCounts, setGeneralCounts] = useState<{
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  }>();

  useEffect(() => {
    makeSchoolsData();
  }, []);

  const makeSchoolsData = async () => {
    const rarities = await reciveAttributeSelectionPromise("items", "rarity");

    let promList: { name: string; count: number }[] = [];
    for (const rarity of rarities) {
      if (rarity !== undefined) {
        const count = await recivePromiseByAttributeCount("items", "rarity", rarity.toString());
        promList.push({
          name: rarity.toString(),
          count: count,
        });
      }
    }

    let names: string[] = [];
    let counts: number[] = [];
    let colors: string[] = [];
    promList.forEach((count) => {
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
      <SelectionTitle>Rarity Ratio</SelectionTitle>
      {!loading && generalCounts !== undefined && (
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "10px",
          }}
        >
          <Doughnut
            data={generalCounts}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>
      )}
      {loading && <LocalLoadingSpinner />}
    </OptionSection>
  );
};

export default RarityRatioChart;

const OptionSection = styled.div`
  flex: 1 1 auto;
  max-width: 30em;
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
