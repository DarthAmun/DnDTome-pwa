import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router";
import { MyThemeProvider } from "./components/theme/MyThemeProvider";
import { CompleteLoadingSpinner } from "./components/Loading";
import AppWrapper from "./components/AppWrapper";
import { HashRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

const ToEntity = lazy(() => import("./components/general_elements/details/ToEntity"));
const EntityOverview = lazy(() => import("./components/general_elements/EntityOverview"));

const IdToChar = lazy(() => import("./components/entities/chars/details/link_wrapper/IdToChar"));
const NameToChar = lazy(
  () => import("./components/entities/chars/details/link_wrapper/NameToChar")
);
const CharLab = lazy(() => import("./components/entities/chars/lab/CharLab"));
const IdToEncounter = lazy(
  () => import("./components/entities/encounters/details/link_wrapper/IdToEncounter")
);
const NameToEncounter = lazy(
  () => import("./components/entities/encounters/details/link_wrapper/NameToEncounter")
);
const EncounterRoom = lazy(() => import("./components/entities/encounters/details/EncounterRoom"));
const Help = lazy(() => import("./components/help/Help"));
const Home = lazy(() => import("./components/home/Home"));
const Options = lazy(() => import("./components/options/Options"));
const Statistics = lazy(() => import("./components/statistics/Statistics"));

interface $ErrorProps {
  error: any;
}

const ErrorFallback = ({ error }: $ErrorProps) => {
  return (
    <ErrorWrapper>
      <Error>
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
      </Error>
    </ErrorWrapper>
  );
};

const App = () => {
  return (
    <MyThemeProvider>
      <HashRouter>
        <AppWrapper>
          <Suspense fallback={<CompleteLoadingSpinner />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/home" component={Home}></Route>
                <Route path="/spell-detail/name/:name" component={ToEntity}></Route>
                <Route path="/spell-detail/id/:id" component={ToEntity}></Route>
                <Route path="/spell-overview" component={EntityOverview}></Route>
                <Route path="/gear-detail/name/:name" component={ToEntity}></Route>
                <Route path="/gear-detail/id/:id" component={ToEntity}></Route>
                <Route path="/gear-overview" component={EntityOverview}></Route>
                <Route path="/item-detail/name/:name" component={ToEntity}></Route>
                <Route path="/item-detail/id/:id" component={ToEntity}></Route>
                <Route path="/item-overview" component={EntityOverview}></Route>
                <Route path="/monster-detail/name/:name" component={ToEntity}></Route>
                <Route path="/monster-detail/id/:id" component={ToEntity}></Route>
                <Route path="/monster-overview" component={EntityOverview}></Route>
                <Route path="/race-detail/name/:name" component={ToEntity}></Route>
                <Route path="/race-detail/id/:id" component={ToEntity}></Route>
                <Route path="/race-overview" component={EntityOverview}></Route>
                <Route path="/subrace-detail/name/:name" component={ToEntity}></Route>
                <Route path="/subrace-detail/id/:id" component={ToEntity}></Route>
                <Route path="/classe-detail/name/:name" component={ToEntity}></Route>
                <Route path="/classe-detail/id/:id" component={ToEntity}></Route>
                <Route path="/classe-overview" component={EntityOverview}></Route>
                <Route path="/subclasse-detail/name/:name" component={ToEntity}></Route>
                <Route path="/subclasse-detail/id/:id" component={ToEntity}></Route>
                <Route path="/char-detail/name/:name" component={NameToChar}></Route>
                <Route path="/char-detail/id/:id" component={IdToChar}></Route>
                <Route path="/char-overview" component={EntityOverview}></Route>
                <Route path="/char-lab" component={CharLab}></Route>
                <Route path="/encounter-detail/name/:name" component={NameToEncounter}></Route>
                <Route path="/encounter-detail/id/:id" component={IdToEncounter}></Route>
                <Route path="/encounter-overview" component={EntityOverview}></Route>
                <Route path="/encounter-room" component={EncounterRoom}></Route>
                <Route path="/book-detail/name/:name" component={ToEntity}></Route>
                <Route path="/book-detail/id/:id" component={ToEntity}></Route>
                <Route path="/book-overview" component={EntityOverview}></Route>
                <Route path="/selection-detail/name/:name" component={ToEntity}></Route>
                <Route path="/selection-detail/id/:id" component={ToEntity}></Route>
                <Route path="/selection-overview" component={EntityOverview}></Route>
                <Route path="/randomTable-detail/name/:name" component={ToEntity}></Route>
                <Route path="/randomTable-detail/id/:id" component={ToEntity}></Route>
                <Route path="/randomTable-overview" component={EntityOverview}></Route>
                <Route path="/campaign-detail/name/:name" component={ToEntity}></Route>
                <Route path="/campaign-detail/id/:id" component={ToEntity}></Route>
                <Route path="/campaign-overview" component={EntityOverview}></Route>
                <Route path="/quest-detail/name/:name" component={ToEntity}></Route>
                <Route path="/quest-detail/id/:id" component={ToEntity}></Route>
                <Route path="/quest-overview" component={EntityOverview}></Route>
                <Route path="/group-detail/name/:name" component={ToEntity}></Route>
                <Route path="/group-detail/id/:id" component={ToEntity}></Route>
                <Route path="/group-overview" component={EntityOverview}></Route>
                <Route path="/npc-detail/name/:name" component={ToEntity}></Route>
                <Route path="/npc-detail/id/:id" component={ToEntity}></Route>
                <Route path="/npc-overview" component={EntityOverview}></Route>
                <Route path="/world-detail/name/:name" component={ToEntity}></Route>
                <Route path="/world-detail/id/:id" component={ToEntity}></Route>
                <Route path="/world-overview" component={EntityOverview}></Route>
                <Route path="/event-detail/name/:name" component={ToEntity}></Route>
                <Route path="/event-detail/id/:id" component={ToEntity}></Route>
                <Route path="/event-overview" component={EntityOverview}></Route>
                <Route path="/location-detail/name/:name" component={ToEntity}></Route>
                <Route path="/location-detail/id/:id" component={ToEntity}></Route>
                <Route path="/location-overview" component={EntityOverview}></Route>
                <Route path="/feat-detail/name/:name" component={ToEntity}></Route>
                <Route path="/feat-detail/id/:id" component={ToEntity}></Route>
                <Route path="/feat-overview" component={EntityOverview}></Route>
                <Route path="/background-detail/name/:name" component={ToEntity}></Route>
                <Route path="/background-detail/id/:id" component={ToEntity}></Route>
                <Route path="/background-overview" component={EntityOverview}></Route>
                <Route path="/note-detail/name/:name" component={ToEntity}></Route>
                <Route path="/note-detail/id/:id" component={ToEntity}></Route>
                <Route path="/note-overview" component={EntityOverview}></Route>
                <Route path="/statistics" component={Statistics}></Route>
                <Route path="/options" component={Options}></Route>
                <Route path="/help" component={Help}></Route>
              </Switch>
            </ErrorBoundary>
          </Suspense>
        </AppWrapper>
      </HashRouter>
    </MyThemeProvider>
  );
};

export default App;

const ErrorWrapper = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Error = styled.div`
  flex: 1 1 20em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;
  max-width: 200px;
  padding: 10px;

  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: space-between;
`;
