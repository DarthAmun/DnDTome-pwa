import React from "react";
import { MemoryRouter, Switch, Route } from "react-router";
import { MyThemeProvider } from "./components/MyThemeProvider";
import Home from "./components/Home";
import SpellOverview from "./components/Spells/SpellOverview";
import Options from "./components/Options";

const App = () => {
  return (
    <MyThemeProvider>
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/spell-overview" component={SpellOverview}></Route>
          <Route path="/options" component={Options}></Route>
        </Switch>
      </MemoryRouter>
    </MyThemeProvider>
  );
};

export default App;
