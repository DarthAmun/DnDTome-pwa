import React, { lazy, Suspense } from "react";
import { MemoryRouter, Switch, Route } from "react-router";
import { MyThemeProvider } from "./components/theme/MyThemeProvider";
import { CompleteLoadingSpinner } from "./components/Loading";

const CampaignOverview = lazy(() => import("./components/entities/campaigns/CampaignOverview"));
const IdToCampaign = lazy(
  () => import("./components/entities/campaigns/details/link_wrapper/IdToCampaign")
);
const NameToCampaign = lazy(
  () => import("./components/entities/campaigns/details/link_wrapper/NameToCampaign")
);
const CharOverview = lazy(() => import("./components/entities/chars/CharOverview"));
const IdToChar = lazy(() => import("./components/entities/chars/details/link_wrapper/IdToChar"));
const NameToChar = lazy(
  () => import("./components/entities/chars/details/link_wrapper/NameToChar")
);
const CharLab = lazy(() => import("./components/entities/chars/lab/CharLab"));
const ClassOverview = lazy(() => import("./components/entities/classes/ClassOverview"));
const IdToClass = lazy(
  () => import("./components/entities/classes/details/link_wrapper/IdToClass")
);
const NameToClass = lazy(
  () => import("./components/entities/classes/details/link_wrapper/NameToClass")
);
const IdToEncounter = lazy(
  () => import("./components/entities/encounters/details/link_wrapper/IdToEncounter")
);
const NameToEncounter = lazy(
  () => import("./components/entities/encounters/details/link_wrapper/NameToEncounter")
);
const EncounterOverview = lazy(() => import("./components/entities/encounters/EncounterOverview"));
const IdToEvent = lazy(() => import("./components/entities/events/details/link_wrapper/IdToEvent"));
const NameToEvent = lazy(
  () => import("./components/entities/events/details/link_wrapper/NameToEvent")
);
const EventOverview = lazy(() => import("./components/entities/events/EventOverview"));
const IdToGear = lazy(() => import("./components/entities/gear/details/link_wrapper/IdToGear"));
const NameToGear = lazy(() => import("./components/entities/gear/details/link_wrapper/NameToGear"));
const GearOverview = lazy(() => import("./components/entities/gear/GearOverview"));
const IdToGroup = lazy(() => import("./components/entities/groups/details/link_wrapper/IdToGroup"));
const NameToGroup = lazy(
  () => import("./components/entities/groups/details/link_wrapper/NameToGroup")
);
const GroupOverview = lazy(() => import("./components/entities/groups/GroupOverview"));
const IdToItem = lazy(() => import("./components/entities/item/details/link_wrapper/IdToItem"));
const NameToItem = lazy(() => import("./components/entities/item/details/link_wrapper/NameToItem"));
const ItemOverview = lazy(() => import("./components/entities/item/ItemOverview"));
const IdToBook = lazy(() => import("./components/entities/library/details/link_wrapper/IdToBook"));
const NameToBook = lazy(
  () => import("./components/entities/library/details/link_wrapper/NameToBook")
);
const Library = lazy(() => import("./components/entities/library/Library"));
const IdToLocation = lazy(
  () => import("./components/entities/location/details/link_wrapper/IdToLocation")
);
const NameToLocation = lazy(
  () => import("./components/entities/location/details/link_wrapper/NameToLocation")
);
const LocationOverview = lazy(() => import("./components/entities/location/LocationOverview"));
const IdToMonster = lazy(
  () => import("./components/entities/monster/details/link_wrapper/IdToMonster")
);
const NameToMonster = lazy(
  () => import("./components/entities/monster/details/link_wrapper/NameToMonster")
);
const MonsterOverview = lazy(() => import("./components/entities/monster/MonsterOverview"));
const IdToNpc = lazy(() => import("./components/entities/npc/details/link_wrapper/IdToNpc"));
const NameToNpc = lazy(() => import("./components/entities/npc/details/link_wrapper/NameToNpc"));
const NpcOverview = lazy(() => import("./components/entities/npc/NpcOverview"));
const IdToQuest = lazy(() => import("./components/entities/quest/details/link_wrapper/IdToQuest"));
const NameToQuest = lazy(
  () => import("./components/entities/quest/details/link_wrapper/NameToQuest")
);
const QuestOverview = lazy(() => import("./components/entities/quest/QuestOverview"));
const IdToRace = lazy(() => import("./components/entities/races/details/link_wrapper/IdToRace"));
const NameToRace = lazy(
  () => import("./components/entities/races/details/link_wrapper/NameToRace")
);
const RaceOverview = lazy(() => import("./components/entities/races/RaceOverview"));
const IdToRandomTable = lazy(
  () => import("./components/entities/random_tables/details/link_wrapper/IdToRandomTable")
);
const NameToRandomTable = lazy(
  () => import("./components/entities/random_tables/details/link_wrapper/NameToRandomTable")
);
const RandomTableOverview = lazy(
  () => import("./components/entities/random_tables/RandomTableOverview")
);
const IdToSelection = lazy(
  () => import("./components/entities/selections/details/link-wrapper/IdToSelection")
);
const NameToSelection = lazy(
  () => import("./components/entities/selections/details/link-wrapper/NameToSelection")
);
const SelectionOverview = lazy(() => import("./components/entities/selections/SelectionOverview"));
const IdToSpell = lazy(() => import("./components/entities/spells/details/link_wrapper/IdToSpell"));
const NameToSpell = lazy(
  () => import("./components/entities/spells/details/link_wrapper/NameToSpell")
);
const SpellOverview = lazy(() => import("./components/entities/spells/SpellOverview"));
const IdToSubclass = lazy(
  () => import("./components/entities/subclasses/details/link_wrapper/IdToSubclass")
);
const NameToSubclass = lazy(
  () => import("./components/entities/subclasses/details/link_wrapper/NameToSubclass")
);
const IdToSubrace = lazy(
  () => import("./components/entities/subraces/details/link_wrapper/IdToSubrace")
);
const NameToSubrace = lazy(
  () => import("./components/entities/subraces/details/link_wrapper/NameToSubrace")
);
const IdToWorld = lazy(() => import("./components/entities/worlds/details/link_wrapper/IdToWorld"));
const NameToWorld = lazy(
  () => import("./components/entities/worlds/details/link_wrapper/NameToWorld")
);
const WorldOverview = lazy(() => import("./components/entities/worlds/WorldOverview"));
const Help = lazy(() => import("./components/help/Help"));
const Home = lazy(() => import("./components/home/Home"));
const Options = lazy(() => import("./components/options/Options"));
const Statistics = lazy(() => import("./components/statistics/Statistics"));

const App = () => {
  return (
    <MyThemeProvider>
      <MemoryRouter>
        <Suspense fallback={<CompleteLoadingSpinner />}>
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
            <Route path="/quest-detail/name/:name" component={NameToQuest}></Route>
            <Route path="/quest-detail/id/:id" component={IdToQuest}></Route>
            <Route path="/quest-overview" component={QuestOverview}></Route>
            <Route path="/group-detail/name/:name" component={NameToGroup}></Route>
            <Route path="/group-detail/id/:id" component={IdToGroup}></Route>
            <Route path="/group-overview" component={GroupOverview}></Route>
            <Route path="/npc-detail/name/:name" component={NameToNpc}></Route>
            <Route path="/npc-detail/id/:id" component={IdToNpc}></Route>
            <Route path="/npc-overview" component={NpcOverview}></Route>
            <Route path="/world-detail/name/:name" component={NameToWorld}></Route>
            <Route path="/world-detail/id/:id" component={IdToWorld}></Route>
            <Route path="/world-overview" component={WorldOverview}></Route>
            <Route path="/event-detail/name/:name" component={NameToEvent}></Route>
            <Route path="/event-detail/id/:id" component={IdToEvent}></Route>
            <Route path="/event-overview" component={EventOverview}></Route>
            <Route path="/location-detail/name/:name" component={NameToLocation}></Route>
            <Route path="/location-detail/id/:id" component={IdToLocation}></Route>
            <Route path="/location-overview" component={LocationOverview}></Route>
            <Route path="/statistics" component={Statistics}></Route>
            <Route path="/options" component={Options}></Route>
            <Route path="/library" component={Library}></Route>
            <Route path="/help" component={Help}></Route>
          </Switch>
        </Suspense>
      </MemoryRouter>
    </MyThemeProvider>
  );
};

export default App;
