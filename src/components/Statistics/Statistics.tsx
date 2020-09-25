import React, { useState } from "react";
import styled from "styled-components";

import AppWrapper from "../AppWrapper";
import TabBar from "../GeneralElements/TabBar";
import CostRatioChart from "./Gear/CostRatioChart";
import DamageRatioChart from "./Gear/DamageRatioChart";
import GearTypeRatioChart from "./Gear/GearTypeRatioChart";
import WeightRatioChart from "./Gear/WeightRatioChart";
import AmountOfEntitiesChart from "./General/AmountOfEntitiesChart";
import AttunmentRatioChart from "./Items/AttunmentRatioChart";
import BaseRatioChart from "./Items/BaseRatioChart";
import ItemTypeRatioChart from "./Items/ItemTypeRatioChart";
import MagicBonusRatioChart from "./Items/MagicBonusRatioChart";
import RarityRatioChart from "./Items/RarityRatioChart";
import CrRatioChart from "./Monsters/CrRatioChart";
import MonsterTypeRatioChart from "./Monsters/MonsterTypeRatioChart";
import ActionsRatioChart from "./Spells/ActionsRatioChart";
import LevelRatioChart from "./Spells/LevelRatioChart";
import RitualRatioChart from "./Spells/RitualRatioChart";
import SchoolsRatioChart from "./Spells/SchoolsRatioChart";

const Statistics = () => {
  const [activeTab, setTab] = useState<string>("General");

  return (
    <AppWrapper>
      <TabBar
        children={["General", "Spells", "Gears", "Magic Items", "Monsters"]}
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
          <GearTypeRatioChart />
          <DamageRatioChart />
          <CostRatioChart />
          <WeightRatioChart />
        </OptionTab>
      )}
      {activeTab === "Magic Items" && (
        <OptionTab>
          <RarityRatioChart />
          <AttunmentRatioChart />
          <MagicBonusRatioChart />
          <BaseRatioChart />
          <ItemTypeRatioChart />
        </OptionTab>
      )}
      {activeTab === "Monsters" && (
        <OptionTab>
          <MonsterTypeRatioChart />
          <CrRatioChart />
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
