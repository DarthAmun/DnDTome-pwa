import React from "react";
import { MemoryRouter, Switch, Route } from "react-router";
import CampaignOverview from "./components/entities/campaigns/CampaignOverview";
import IdToCampaign from "./components/entities/campaigns/details/link_wrapper/IdToCampaign";
import NameToCampaign from "./components/entities/campaigns/details/link_wrapper/NameToCampaign";
import CharOverview from "./components/entities/chars/CharOverview";
import IdToChar from "./components/entities/chars/details/link_wrapper/IdToChar";
import NameToChar from "./components/entities/chars/details/link_wrapper/NameToChar";
import CharLab from "./components/entities/chars/lab/CharLab";
import ClassOverview from "./components/entities/classes/ClassOverview";
import IdToClass from "./components/entities/classes/details/link_wrapper/IdToClass";
import NameToClass from "./components/entities/classes/details/link_wrapper/NameToClass";
import IdToEncounter from "./components/entities/encounters/details/link_wrapper/IdToEncounter";
import NameToEncounter from "./components/entities/encounters/details/link_wrapper/NameToEncounter";
import EncounterOverview from "./components/entities/encounters/EncounterOverview";
import IdToGear from "./components/entities/gear/details/link_wrapper/IdToGear";
import NameToGear from "./components/entities/gear/details/link_wrapper/NameToGear";
import GearOverview from "./components/entities/gear/GearOverview";
import IdToItem from "./components/entities/item/details/link_wrapper/IdToItem";
import NameToItem from "./components/entities/item/details/link_wrapper/NameToItem";
import ItemOverview from "./components/entities/item/ItemOverview";
import IdToBook from "./components/entities/library/details/link_wrapper/IdToBook";
import NameToBook from "./components/entities/library/details/link_wrapper/NameToBook";
import Library from "./components/entities/library/Library";
import IdToMonster from "./components/entities/monster/details/link_wrapper/IdToMonster";
import NameToMonster from "./components/entities/monster/details/link_wrapper/NameToMonster";
import MonsterOverview from "./components/entities/monster/MonsterOverview";
import IdToRace from "./components/entities/races/details/link_wrapper/IdToRace";
import NameToRace from "./components/entities/races/details/link_wrapper/NameToRace";
import RaceOverview from "./components/entities/races/RaceOverview";
import IdToRandomTable from "./components/entities/random_tables/details/link_wrapper/IdToRandomTable";
import NameToRandomTable from "./components/entities/random_tables/details/link_wrapper/NameToRandomTable";
import RandomTableOverview from "./components/entities/random_tables/RandomTableOverview";
import IdToSelection from "./components/entities/selections/details/link-wrapper/IdToSelection";
import NameToSelection from "./components/entities/selections/details/link-wrapper/NameToSelection";
import SelectionOverview from "./components/entities/selections/SelectionOverview";
import IdToSpell from "./components/entities/spells/details/link_wrapper/IdToSpell";
import NameToSpell from "./components/entities/spells/details/link_wrapper/NameToSpell";
import SpellOverview from "./components/entities/spells/SpellOverview";
import IdToSubclass from "./components/entities/subclasses/details/link_wrapper/IdToSubclass";
import NameToSubclass from "./components/entities/subclasses/details/link_wrapper/NameToSubclass";
import IdToSubrace from "./components/entities/subraces/details/link_wrapper/IdToSubrace";
import NameToSubrace from "./components/entities/subraces/details/link_wrapper/NameToSubrace";
import Help from "./components/help/Help";
import Home from "./components/home/Home";
import Options from "./components/options/Options";
import Statistics from "./components/statistics/Statistics";
import { MyThemeProvider } from "./components/theme/MyThemeProvider";

const App = () => {
  return (
    <MyThemeProvider>
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route path="/spell-detail/name/:name" component={NameToSpell}></Route>
          <Route path="/spell-detail/id/:id" component={IdToSpell}></Route>
          <Route path="/spell-overview" component={SpellOverview}></Route>
          <Route path="/gear-detail/name/:name" component={NameToGear}></Route>
          <Route path="/gear-detail/id/:id" component={IdToGear}></Route>
          <Route path="/gear-overview" component={GearOverview}></Route>
          <Route path="/item-detail/name/:name" component={NameToItem}></Route>
          <Route path="/item-detail/id/:id" component={IdToItem}></Route>
          <Route path="/item-overview" component={ItemOverview}></Route>
          <Route path="/monster-detail/name/:name" component={NameToMonster}></Route>
          <Route path="/monster-detail/id/:id" component={IdToMonster}></Route>
          <Route path="/monster-overview" component={MonsterOverview}></Route>
          <Route path="/race-detail/name/:name" component={NameToRace}></Route>
          <Route path="/race-detail/id/:id" component={IdToRace}></Route>
          <Route path="/race-overview" component={RaceOverview}></Route>
          <Route path="/subrace-detail/name/:name" component={NameToSubrace}></Route>
          <Route path="/subrace-detail/id/:id" component={IdToSubrace}></Route>
          <Route path="/class-detail/name/:name" component={NameToClass}></Route>
          <Route path="/class-detail/id/:id" component={IdToClass}></Route>
          <Route path="/class-overview" component={ClassOverview}></Route>
          <Route path="/subclass-detail/name/:name" component={NameToSubclass}></Route>
          <Route path="/subclass-detail/id/:id" component={IdToSubclass}></Route>
          <Route path="/char-detail/name/:name" component={NameToChar}></Route>
          <Route path="/char-detail/id/:id" component={IdToChar}></Route>
          <Route path="/char-overview" component={CharOverview}></Route>
          <Route path="/char-lab" component={CharLab}></Route>
          <Route path="/encounter-detail/name/:name" component={NameToEncounter}></Route>
          <Route path="/encounter-detail/id/:id" component={IdToEncounter}></Route>
          <Route path="/encounter-overview" component={EncounterOverview}></Route>
          <Route path="/book-detail/name/:name" component={NameToBook}></Route>
          <Route path="/book-detail/id/:id" component={IdToBook}></Route>
          <Route path="/selection-detail/name/:name" component={NameToSelection}></Route>
          <Route path="/selection-detail/id/:id" component={IdToSelection}></Route>
          <Route path="/selection-overview" component={SelectionOverview}></Route>
          <Route path="/randomTable-detail/name/:name" component={NameToRandomTable}></Route>
          <Route path="/randomTable-detail/id/:id" component={IdToRandomTable}></Route>
          <Route path="/randomTable-overview" component={RandomTableOverview}></Route>
          <Route path="/campaign-detail/name/:name" component={NameToCampaign}></Route>
          <Route path="/campaign-detail/id/:id" component={IdToCampaign}></Route>
          <Route path="/campaign-overview" component={CampaignOverview}></Route>
          <Route path="/statistics" component={Statistics}></Route>
          <Route path="/options" component={Options}></Route>
          <Route path="/library" component={Library}></Route>
          <Route path="/help" component={Help}></Route>
        </Switch>
      </MemoryRouter>
    </MyThemeProvider>
  );
};

export default App;
