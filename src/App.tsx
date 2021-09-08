import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router";
import { MyThemeProvider as ThemeProvider } from "./components/theme/MyThemeProvider";
import { P2PProvider } from "./components/p2p/P2PProvider";
import { CompleteLoadingSpinner } from "./components/general/Loading";
import AppWrapper from "./components/general/AppWrapper";
import { HashRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import "rsuite/dist/styles/rsuite-dark.min.css";

const ToEntity = lazy(() => import("./components/general_elements/details/ToEntity"));
const EntityOverview = lazy(() => import("./components/general_elements/EntityOverview"));

const Home = lazy(() => import("./components/pages/Home"));
const Menu = lazy(() => import("./components/pages/Menu"));
const Group = lazy(() => import("./components/pages/Group"));

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
    <P2PProvider>
      <ThemeProvider>
        <HashRouter>
          <AppWrapper>
            <Suspense fallback={<CompleteLoadingSpinner />}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/home" component={Home}></Route>
                  <Route exact path="/menu" component={Menu}></Route>
                  <Route exact path="/group" component={Group}></Route>
                  <Route path="/spell-detail/name/:name" component={ToEntity}></Route>
                  <Route path="/spell-detail/id/:id" component={ToEntity}></Route>
                  <Route path="/spell-overview" component={EntityOverview}></Route>
                </Switch>
              </ErrorBoundary>
            </Suspense>
          </AppWrapper>
        </HashRouter>
      </ThemeProvider>
    </P2PProvider>
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
