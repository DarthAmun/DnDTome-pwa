import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router";
import { MyThemeProvider as ThemeProvider } from "./components/theme/MyThemeProvider";
import { CompleteLoadingSpinner } from "./components/general/Loading";
import AppWrapper from "./components/general/AppWrapper";
import { HashRouter } from "react-router-dom";
import "rsuite/dist/styles/rsuite-dark.min.css";
import Spell from "./data/Spell";

const ToEntity = lazy(() => import("./components/general_elements/details/ToEntity"));
const EntityOverview = lazy(() => import("./components/general_elements/EntityOverview"));

const Home = lazy(() => import("./components/pages/Home"));
const Menu = lazy(() => import("./components/pages/Menu"));
const Group = lazy(() => import("./components/pages/Group"));

const SpellTile = lazy(() => import("./components/entities/spell/SpellTile"));

const App = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppWrapper>
          <Suspense fallback={<CompleteLoadingSpinner />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/menu" component={Menu} />
              <Route exact path="/group" component={Group} />
              <Route path="/spell-detail/name/:name" component={ToEntity} />
              <Route path="/spell-detail/id/:id" component={ToEntity} />
              <Route
                path="/spell-overview"
                component={() => (
                  <EntityOverview entityName={"spell"} Entity={Spell} Tile={SpellTile} />
                )}
              />
            </Switch>
          </Suspense>
        </AppWrapper>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
