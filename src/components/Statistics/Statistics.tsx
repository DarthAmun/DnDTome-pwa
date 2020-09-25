import React, { useState } from "react";
import styled from "styled-components";

import AppWrapper from "../AppWrapper";
import TabBar from "../GeneralElements/TabBar";
import DamageRatioChart from "./Gear/DamageRatioChart";
import TypeRatioChart from "./Gear/TypeRatioChart";
import AmountOfEntitiesChart from "./General/AmountOfEntitiesChart";
import ActionsRatioChart from "./Spells/ActionsRatioChart";
import LevelRatioChart from "./Spells/LevelRatioChart";
import RitualRatioChart from "./Spells/RitualRatioChart";
import SchoolsRatioChart from "./Spells/SchoolsRatioChart";

const Statistics = () => {
  const [activeTab, setTab] = useState<string>("General");

  return (
    <AppWrapper>
      <TabBar
        children={["General", "Spells", "Gears"]}
        onChange={(tab: string) => setTab(tab)}
      />
      {activeTab === "General" && (
        <OptionTab>
          <AmountOfEntitiesChart />
        </OptionTab>
      )}
      {activeTab === "Spells" && (
        <OptionTab>
          <SchoolsRatioChart />
          <LevelRatioChart />
          <RitualRatioChart />
          <ActionsRatioChart />
        </OptionTab>
      )}
      {activeTab === "Gears" && (
        <OptionTab>
          <TypeRatioChart />
          <DamageRatioChart />
        </OptionTab>
      )}
    </AppWrapper>
  );
};

export default Statistics;

const OptionTab = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
