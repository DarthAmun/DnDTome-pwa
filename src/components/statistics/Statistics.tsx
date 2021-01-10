import React, { useState } from "react";
import styled from "styled-components";

import AppWrapper from "../AppWrapper";
import TabBar from "../general_elements/TabBar";
import CostRatioChart from "./gear/CostRatioChart";
import DamageRatioChart from "./gear/DamageRatioChart";
import GearTypeRatioChart from "./gear/GearTypeRatioChart";
import WeightRatioChart from "./gear/WeightRatioChart";
import AmountOfEntitiesChart from "./general/AmountOfEntitiesChart";
import AttunmentRatioChart from "./items/AttunmentRatioChart";
import BaseRatioChart from "./items/BaseRatioChart";
import ItemTypeRatioChart from "./items/ItemTypeRatioChart";
import MagicBonusRatioChart from "./items/MagicBonusRatioChart";
import RarityRatioChart from "./items/RarityRatioChart";
import CrRatioChart from "./monsters/CrRatioChart";
import LegendaryRatioChart from "./monsters/LegendaryRatioChart";
import MonsterTypeRatioChart from "./monsters/MonsterTypeRatioChart";
import ActionsRatioChart from "./spells/ActionsRatioChart";
import LevelRatioChart from "./spells/LevelRatioChart";
import RitualRatioChart from "./spells/RitualRatioChart";
import SchoolsRatioChart from "./spells/SchoolsRatioChart";

const Statistics = () => {
  const [activeTab, setTab] = useState<string>("General");

  return (
    <AppWrapper>
      <TabBar
        children={["General", "Spells", "Gears", "Magic Items", "Monsters"]}
        onChange={(tab: string) => setTab(tab)}
        activeTab={activeTab}
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
          <LegendaryRatioChart />
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
