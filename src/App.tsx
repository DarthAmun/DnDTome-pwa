import React from "react";
import { MemoryRouter, Switch, Route } from "react-router";
import { MyThemeProvider } from "./components/Theme/MyThemeProvider";
import SpellOverview from "./components/Spells/SpellOverview";
import Options from "./components/Options";
import SpellDetail from "./components/Spells/SpellDetail";
import LinkToSpell from "./components/Spells/LinkToSpell";

const App = () => {
  return (
    <MyThemeProvider>
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={SpellOverview}></Route>
          <Route path="/spell-detail/linkTo/:name" component={LinkToSpell}></Route>
          <Route path="/spell-detail/:id" component={SpellDetail}></Route>
          <Route path="/spell-overview" component={SpellOverview}></Route>
          <Route path="/options" component={Options}></Route>
        </Switch>
      </MemoryRouter>
    </MyThemeProvider>
  );
};

export default App;
