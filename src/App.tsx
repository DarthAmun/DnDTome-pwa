import * as React from "react";
import { MemoryRouter, Switch, Route } from "react-router";
import Home from "./components/Home";
import SpellOverview from "./components/Spells/SpellOverview";

const App = () => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/spell-overview">
          <SpellOverview />
        </Route>
      </Switch>
    </MemoryRouter>
  );
};

export default App;
