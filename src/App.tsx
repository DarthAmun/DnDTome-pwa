import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router";
import { MyThemeProvider as ThemeProvider } from "./components/theme/MyThemeProvider";
import { P2PProvider } from "./components/p2p/P2PProvider";
import { CompleteLoadingSpinner } from "./components/general/Loading";
import AppWrapper from "./components/general/AppWrapper";
import { HashRouter } from "react-router-dom";
import "rsuite/dist/styles/rsuite-dark.min.css";

const ToEntity = lazy(() => import("./components/general_elements/details/ToEntity"));
const EntityOverview = lazy(() => import("./components/general_elements/EntityOverview"));

const Home = lazy(() => import("./components/pages/Home"));
const Menu = lazy(() => import("./components/pages/Menu"));
const Group = lazy(() => import("./components/pages/Group"));

const App = () => {
  return (
    <P2PProvider>
      <ThemeProvider>
        <HashRouter>
          <AppWrapper>
            <Suspense fallback={<CompleteLoadingSpinner />}>
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/home" component={Home}></Route>
                <Route exact path="/menu" component={Menu}></Route>
                <Route exact path="/group" component={Group}></Route>
                <Route path="/spell-detail/name/:name" component={ToEntity}></Route>
                <Route path="/spell-detail/id/:id" component={ToEntity}></Route>
                <Route path="/spell-overview" component={EntityOverview}></Route>
              </Switch>
            </Suspense>
          </AppWrapper>
        </HashRouter>
      </ThemeProvider>
    </P2PProvider>
  );
};

export default App;
