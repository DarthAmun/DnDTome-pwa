import React from "react";
import { MemoryRouter, Switch, Route } from "react-router";
import { MyThemeProvider } from "./components/MyThemeProvider";
import SpellOverview from "./components/Spells/SpellOverview";
import Options from "./components/Options";
import SpellDetail from "./components/Spells/SpellDetail";

const App = () => {
  return (
    <MyThemeProvider>
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={SpellOverview}></Route>
          <Route path="/spell-overview" component={SpellOverview}></Route>
          <Route path="/spell-detail/:id" component={SpellDetail}></Route>
          <Route path="/options" component={Options}></Route>
        </Switch>
      </MemoryRouter>
    </MyThemeProvider>
  );
};

export default App;
