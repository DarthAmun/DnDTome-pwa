import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Bar } from "@iftek/react-chartjs-3";
import {
  reciveAllPromise,
  reciveAttributeSelectionPromise,
} from "../../../services/DatabaseService";
import { LocalLoadingSpinner } from "../../Loading";
import Item from "../../../data/Item";

const RarityVsMagicBonusChart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [generalCounts, setGeneralCounts] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  }>();

  useEffect(() => {
    makeSchoolsData();
  }, []);

  const makeSchoolsData = async () => {
    let items: Item[] = (await reciveAllPromise("items")).filter(
      (item) =>
        item.rarity !== undefined && item.rarity.trim() !== "" && item.magicBonus !== undefined
    );
    const rarities = (await reciveAttributeSelectionPromise("items", "rarity"))
      .map((rarity) => rarity.toString())
      .filter((rarity) => rarity !== undefined && rarity.trim() !== "");
    const magicBoni = (await reciveAttributeSelectionPromise("items", "magicBonus"))
      .map((attunment) => attunment.toString())
      .filter((attunment) => attunment !== undefined);

    let promList: { x: string; y: number; value: number }[] = [];
    items.forEach((item: Item) => {
      if (item.rarity !== undefined && item.rarity.trim() !== "" && item.magicBonus !== undefined) {
        let x = item.rarity;
        let y = magicBoni.indexOf(item.magicBonus.toString());
        let prom: { x: string; y: number; value: number } = promList.filter(
          (prom) => prom.x === x && prom.y === y
        )[0];
        let index = promList.indexOf(prom);

        if (prom !== undefined) {
          promList[index] = { ...promList[index], value: promList[index].value + 1 };
        } else {
          promList.push({
            x: x,
            y: y,
            value: 1,
          });
        }
      }
    });

    let counts: { label: string; data: number[]; backgroundColor: string }[] = [];
    magicBoni.forEach((magicBonis) => {
      counts.push({
        label: "+" + magicBonis,
        data: new Array(rarities.length),
        backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
    });
    promList.forEach((count) => {
      counts[count.y].data[rarities.indexOf(count.x)] = count.value;
    });

    setGeneralCounts({
      labels: rarities,
      datasets: counts,
    });
    setLoading(false);
  };

  return (
    <OptionSection>
      <SelectionTitle>Rarity x Magic Bonus Ratio</SelectionTitle>
      {!loading && generalCounts !== undefined && (
        <div style={{ width: "100%", paddingBottom: "10px" }}>
          <Bar data={generalCounts} options={{}} legend={{ display: false }} />
        </div>
      )}
      {loading && <LocalLoadingSpinner />}
    </OptionSection>
  );
};

export default RarityVsMagicBonusChart;

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
