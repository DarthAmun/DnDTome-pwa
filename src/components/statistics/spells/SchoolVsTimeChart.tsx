import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Bubble } from "@iftek/react-chartjs-3";
import {
  reciveAllPromise,
  reciveAttributeSelectionPromise,
} from "../../../services/DatabaseService";
import { LocalLoadingSpinner } from "../../Loading";
import Spell from "../../../data/Spell";
import { Tick } from "chart.js";

const SchoolVsTimeChart = () => {
  const [xLabels, setXLabels] = useState<string[]>([]);
  const [yLabels, setYLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [generalCounts, setGeneralCounts] = useState<{
    datasets: { data: { x: number; y: number }[]; backgroundColor: string[] }[];
  }>();

  useEffect(() => {
    makeSchoolsData();
  }, []);

  const makeSchoolsData = async () => {
    let spells: Spell[] = await reciveAllPromise("spells");
    const schools = (await reciveAttributeSelectionPromise("spells", "school")).map((school) =>
      school.toString()
    );
    const times = (await reciveAttributeSelectionPromise("spells", "time"))
      .map((time) => time.toString())
      .filter((time) => !time.startsWith("1 reaction"));

    setXLabels(times);
    setYLabels(schools);

    let promList: { x: number; y: number; r: number }[] = [];
    let colors: string[] = [];
    spells.forEach((spell: Spell) => {
      if (!spell.time.startsWith("1 reaction")) {
        let x = times.indexOf(spell.time);
        let y = schools.indexOf(spell.school);
        let prom: { x: number; y: number; r: number } = promList.filter(
          (prom) => prom.x === x && prom.y === y
        )[0];
        let index = promList.indexOf(prom);

        if (prom !== undefined) {
          promList[index] = { ...promList[index], r: promList[index].r + 1 };
        } else {
          promList.push({
            x: x,
            y: y,
            r: 1,
          });
          colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
        }
      }
    });

    promList = promList.map((prom) => {
      return { ...prom, r: (prom.r / spells.length) * 200 };
    });

    setGeneralCounts({
      datasets: [
        {
          data: promList,
          backgroundColor: colors,
        },
      ],
    });
    setLoading(false);
  };

  return (
    <OptionSection>
      <SelectionTitle> School x Time Ratio</SelectionTitle>
      {!loading && generalCounts !== undefined && (
        <div style={{ width: "100%", paddingBottom: "10px" }}>
          <Bubble
            data={generalCounts}
            options={{
              scales: {
                x: {
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (tickValue: number | string, index: number, ticks: Tick[]) {
                      return xLabels[tickValue];
                    },
                  },
                },

                y: {
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (tickValue: number | string, index: number, ticks: Tick[]) {
                      return yLabels[tickValue];
                    },
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem: any) {
                      return xLabels[tooltipItem.xLabel] + " x " + yLabels[tooltipItem.yLabel];
                    },
                  },
                },
              },
            }}
            legend={{ display: false }}
          />
        </div>
      )}
      {loading && <LocalLoadingSpinner />}
    </OptionSection>
  );
};

export default SchoolVsTimeChart;

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
