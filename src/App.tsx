import { lazy, Suspense } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { MyThemeProvider as ThemeProvider } from "./components/theme/MyThemeProvider";
import AppWrapper from "./components/general/AppWrapper";
import { HashRouter } from "react-router-dom";
import Spell from "./data/Spell";
import { CustomProvider, Loader } from "rsuite";

const ToEntity = lazy(() => import("./components/generic/details/ToEntity"));
const EntityOverview = lazy(() => import("./components/generic/EntityOverview"));
const EntityBuilder = lazy(() => import("./components/generic/details/EntityBuilder"));

const Home = lazy(() => import("./components/pages/Home"));
const Menu = lazy(() => import("./components/pages/Menu"));
const Group = lazy(() => import("./components/pages/Group"));

const SpellTile = lazy(() => import("./components/entities/spell/SpellTile"));
const SpellSearch = lazy(() => import("./components/entities/spell/SpellSearch"));
const SpellDetail = lazy(() => import("./components/entities/spell/SpellDetail"));

export type TParams = { name?: string };

const App = () => {
  return (
    <CustomProvider theme="dark">
      <ThemeProvider>
        <HashRouter>
          <AppWrapper>
            <Suspense fallback={<Loader center content="Loading..." />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/menu" component={Menu} />
                <Route exact path="/group" component={Group} />
                <Route
                  path="/spell-detail/:name"
                  component={(match: RouteComponentProps<TParams>) => (
                    <ToEntity
                      entityName={"spell"}
                      Entity={Spell}
                      EntityDetails={SpellDetail}
                      match={match}
                    />
                  )}
                />
                <Route
                  path="/spell-detail/:id"
                  component={(match: RouteComponentProps<TParams>) => (
                    <ToEntity
                      entityName={"spell"}
                      Entity={Spell}
                      EntityDetails={SpellDetail}
                      match={match}
                    />
                  )}
                />
                <Route
                  path="/spell-builder"
                  component={() => (
                    <EntityBuilder
                      entityName={"spell"}
                      EntityDetails={SpellDetail}
                      Entity={Spell}
                    />
                  )}
                />
                <Route
                  path="/spell-overview"
                  component={() => (
                    <EntityOverview
                      entityName={"spell"}
                      Entity={Spell}
                      Tile={SpellTile}
                      Search={SpellSearch}
                    />
                  )}
                />
              </Switch>
            </Suspense>
          </AppWrapper>
        </HashRouter>
      </ThemeProvider>
    </CustomProvider>
  );
};

export default App;
