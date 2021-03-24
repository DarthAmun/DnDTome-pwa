import React, { useState } from "react";
import styled from "styled-components";

import TabBar from "../general_elements/TabBar";
import CostRatioChart from "./gear/CostRatioChart";
import DamageRatioChart from "./gear/DamageRatioChart";
import GearTypeRatioChart from "./gear/GearTypeRatioChart";
import WeightVsCostsChart from "./gear/WeightVsCostsChart";
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
import LevelVsSchoolChart from "./spells/LevelVsSchoolChart";
import LevelVsTimeChart from "./spells/LevelVsTimeChart";
import RitualRatioChart from "./spells/RitualRatioChart";
import SchoolsRatioChart from "./spells/SchoolsRatioChart";
import SchoolVsTimeChart from "./spells/SchoolVsTimeChart";
import RarityVsAttunmentChart from "./items/RarityVsAttunmentChart";
import RarityVsMagicBonusChart from "./items/RarityVsMagicBonusChart";

const Statistics = () => {
  const [activeTab, setTab] = useState<string>("General");

  return (
    <>
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
          <SchoolVsTimeChart />
          <LevelVsSchoolChart />
          <LevelVsTimeChart />
        </OptionTab>
      )}
      {activeTab === "Gears" && (
        <OptionTab>
          <GearTypeRatioChart />
          <DamageRatioChart />
          <CostRatioChart />
          <WeightRatioChart />
          <WeightVsCostsChart />
        </OptionTab>
      )}
      {activeTab === "Magic Items" && (
        <OptionTab>
          <RarityRatioChart />
          <AttunmentRatioChart />
          <MagicBonusRatioChart />
          <BaseRatioChart />
          <ItemTypeRatioChart />
          <RarityVsAttunmentChart />
          <RarityVsMagicBonusChart />
        </OptionTab>
      )}
      {activeTab === "Monsters" && (
        <OptionTab>
          <LegendaryRatioChart />
          <MonsterTypeRatioChart />
          <CrRatioChart />
        </OptionTab>
      )}
    </>
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
