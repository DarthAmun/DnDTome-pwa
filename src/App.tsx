import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router";
import { MyThemeProvider } from "./components/theme/MyThemeProvider";
import { CompleteLoadingSpinner } from "./components/Loading";
import AppWrapper from "./components/AppWrapper";
import { HashRouter } from "react-router-dom";
import ToEntity from "./components/general_elements/details/ToEntity";

const CampaignOverview = lazy(() => import("./components/entities/campaigns/CampaignOverview"));
const CharOverview = lazy(() => import("./components/entities/chars/CharOverview"));
const IdToChar = lazy(() => import("./components/entities/chars/details/link_wrapper/IdToChar"));
const NameToChar = lazy(
  () => import("./components/entities/chars/details/link_wrapper/NameToChar")
);
const CharLab = lazy(() => import("./components/entities/chars/lab/CharLab"));
const ClassOverview = lazy(() => import("./components/entities/classes/ClassOverview"));
const IdToEncounter = lazy(
  () => import("./components/entities/encounters/details/link_wrapper/IdToEncounter")
);
const NameToEncounter = lazy(
  () => import("./components/entities/encounters/details/link_wrapper/NameToEncounter")
);
const EncounterOverview = lazy(() => import("./components/entities/encounters/EncounterOverview"));
const EventOverview = lazy(() => import("./components/entities/events/EventOverview"));
const GearOverview = lazy(() => import("./components/entities/gear/GearOverview"));
const GroupOverview = lazy(() => import("./components/entities/groups/GroupOverview"));
const ItemOverview = lazy(() => import("./components/entities/items/ItemOverview"));
const Library = lazy(() => import("./components/entities/library/Library"));
const LocationOverview = lazy(() => import("./components/entities/locations/LocationOverview"));
const MonsterOverview = lazy(() => import("./components/entities/monsters/MonsterOverview"));
const NpcOverview = lazy(() => import("./components/entities/npcs/NpcOverview"));
const QuestOverview = lazy(() => import("./components/entities/quests/QuestOverview"));
const RaceOverview = lazy(() => import("./components/entities/races/RaceOverview"));
const RandomTableOverview = lazy(
  () => import("./components/entities/random_tables/RandomTableOverview")
);
const SelectionOverview = lazy(() => import("./components/entities/selections/SelectionOverview"));
const SpellOverview = lazy(() => import("./components/entities/spells/SpellOverview"));
const WorldOverview = lazy(() => import("./components/entities/worlds/WorldOverview"));
const Help = lazy(() => import("./components/help/Help"));
const Home = lazy(() => import("./components/home/Home"));
const Options = lazy(() => import("./components/options/Options"));
const Statistics = lazy(() => import("./components/statistics/Statistics"));

const App = () => {
  return (
    <MyThemeProvider>
      <HashRouter>
        <AppWrapper>
          <Suspense fallback={<CompleteLoadingSpinner />}>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/home" component={Home}></Route>
              <Route path="/spell-detail/name/:name" component={ToEntity}></Route>
              <Route path="/spell-detail/id/:id" component={ToEntity}></Route>
              <Route path="/spell-overview" component={SpellOverview}></Route>
              <Route path="/gear-detail/name/:name" component={ToEntity}></Route>
              <Route path="/gear-detail/id/:id" component={ToEntity}></Route>
              <Route path="/gear-overview" component={GearOverview}></Route>
              <Route path="/item-detail/name/:name" component={ToEntity}></Route>
              <Route path="/item-detail/id/:id" component={ToEntity}></Route>
              <Route path="/item-overview" component={ItemOverview}></Route>
              <Route path="/monster-detail/name/:name" component={ToEntity}></Route>
              <Route path="/monster-detail/id/:id" component={ToEntity}></Route>
              <Route path="/monster-overview" component={MonsterOverview}></Route>
              <Route path="/race-detail/name/:name" component={ToEntity}></Route>
              <Route path="/race-detail/id/:id" component={ToEntity}></Route>
              <Route path="/race-overview" component={RaceOverview}></Route>
              <Route path="/subrace-detail/name/:name" component={ToEntity}></Route>
              <Route path="/subrace-detail/id/:id" component={ToEntity}></Route>
              <Route path="/classe-detail/name/:name" component={ToEntity}></Route>
              <Route path="/classe-detail/id/:id" component={ToEntity}></Route>
              <Route path="/classe-overview" component={ClassOverview}></Route>
              <Route path="/subclasse-detail/name/:name" component={ToEntity}></Route>
              <Route path="/subclasse-detail/id/:id" component={ToEntity}></Route>
              <Route path="/char-detail/name/:name" component={NameToChar}></Route>
              <Route path="/char-detail/id/:id" component={IdToChar}></Route>
              <Route path="/char-overview" component={CharOverview}></Route>
              <Route path="/char-lab" component={CharLab}></Route>
              <Route path="/encounter-detail/name/:name" component={NameToEncounter}></Route>
              <Route path="/encounter-detail/id/:id" component={IdToEncounter}></Route>
              <Route path="/encounter-overview" component={EncounterOverview}></Route>
              <Route path="/book-detail/name/:name" component={ToEntity}></Route>
              <Route path="/book-detail/id/:id" component={ToEntity}></Route>
              <Route path="/selection-detail/name/:name" component={ToEntity}></Route>
              <Route path="/selection-detail/id/:id" component={ToEntity}></Route>
              <Route path="/selection-overview" component={SelectionOverview}></Route>
              <Route path="/randomTable-detail/name/:name" component={ToEntity}></Route>
              <Route path="/randomTable-detail/id/:id" component={ToEntity}></Route>
              <Route path="/randomTable-overview" component={RandomTableOverview}></Route>
              <Route path="/campaign-detail/name/:name" component={ToEntity}></Route>
              <Route path="/campaign-detail/id/:id" component={ToEntity}></Route>
              <Route path="/campaign-overview" component={CampaignOverview}></Route>
              <Route path="/quest-detail/name/:name" component={ToEntity}></Route>
              <Route path="/quest-detail/id/:id" component={ToEntity}></Route>
              <Route path="/quest-overview" component={QuestOverview}></Route>
              <Route path="/group-detail/name/:name" component={ToEntity}></Route>
              <Route path="/group-detail/id/:id" component={ToEntity}></Route>
              <Route path="/group-overview" component={GroupOverview}></Route>
              <Route path="/npc-detail/name/:name" component={ToEntity}></Route>
              <Route path="/npc-detail/id/:id" component={ToEntity}></Route>
              <Route path="/npc-overview" component={NpcOverview}></Route>
              <Route path="/world-detail/name/:name" component={ToEntity}></Route>
              <Route path="/world-detail/id/:id" component={ToEntity}></Route>
              <Route path="/world-overview" component={WorldOverview}></Route>
              <Route path="/event-detail/name/:name" component={ToEntity}></Route>
              <Route path="/event-detail/id/:id" component={ToEntity}></Route>
              <Route path="/event-overview" component={EventOverview}></Route>
              <Route path="/location-detail/name/:name" component={ToEntity}></Route>
              <Route path="/location-detail/id/:id" component={ToEntity}></Route>
              <Route path="/location-overview" component={LocationOverview}></Route>
              <Route path="/statistics" component={Statistics}></Route>
              <Route path="/options" component={Options}></Route>
              <Route path="/library" component={Library}></Route>
              <Route path="/help" component={Help}></Route>
            </Switch>
          </Suspense>
        </AppWrapper>
      </HashRouter>
    </MyThemeProvider>
  );
};

export default App;
