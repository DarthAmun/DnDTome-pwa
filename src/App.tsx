import React from "react";
import { MemoryRouter, Switch, Route } from "react-router";
import Home from "./components/Home";
import SpellOverview from "./components/Spells/SpellOverview";
import { MyThemeProvider } from "./components/MyThemeProvider";

const App = () => {
  return (
    <MyThemeProvider>
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/spell-overview" component={SpellOverview}></Route>
        </Switch>
      </MemoryRouter>
    </MyThemeProvider>
  );
};

export default App;
