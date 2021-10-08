import { lazy, Suspense } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { MyThemeProvider as ThemeProvider } from "./components/theme/MyThemeProvider";
import { HashRouter } from "react-router-dom";
import { CustomProvider, Loader } from "rsuite";
import AppWrapper from "./components/general/AppWrapper";
import Spell from "./data/Spell";
import Gear from "./data/Gear";

const ToEntity = lazy(() => import("./components/generic/details/ToEntity"));
const EntityOverview = lazy(() => import("./components/generic/EntityOverview"));
const EntityBuilder = lazy(() => import("./components/generic/details/EntityBuilder"));

const Home = lazy(() => import("./components/pages/Home"));
const Group = lazy(() => import("./components/pages/Group"));
const Options = lazy(() => import("./components/pages/Options"));

const SpellTile = lazy(() => import("./components/entities/spell/SpellTile"));
const SpellSearch = lazy(() => import("./components/entities/spell/SpellSearch"));
const SpellDetail = lazy(() => import("./components/entities/spell/SpellDetail"));

const GearDetail = lazy(() => import("./components/entities/gear/GearDetail"));
const GearSearch = lazy(() => import("./components/entities/gear/GearSearch"));
const GearTile = lazy(() => import("./components/entities/gear/GearTile"));

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
                <Route exact path="/group" component={Group} />
                <Route exact path="/options" component={Options} />
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
                <Route
                  path="/gear-detail/:name"
                  component={(match: RouteComponentProps<TParams>) => (
                    <ToEntity
                      entityName={"gear"}
                      Entity={Gear}
                      EntityDetails={GearDetail}
                      match={match}
                    />
                  )}
                />
                <Route
                  path="/gear-detail/:id"
                  component={(match: RouteComponentProps<TParams>) => (
                    <ToEntity
                      entityName={"gear"}
                      Entity={Gear}
                      EntityDetails={GearDetail}
                      match={match}
                    />
                  )}
                />
                <Route
                  path="/gear-builder"
                  component={() => (
                    <EntityBuilder entityName={"gear"} EntityDetails={GearDetail} Entity={Gear} />
                  )}
                />
                <Route
                  path="/gear-overview"
                  component={() => (
                    <EntityOverview
                      entityName={"gear"}
                      Entity={Gear}
                      Tile={GearTile}
                      Search={GearSearch}
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
