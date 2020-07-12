import React from "react";
import { MemoryRouter, Switch, Route } from "react-router";
import { MyThemeProvider } from "./components/Theme/MyThemeProvider";
import SpellOverview from "./components/Spells/SpellOverview";
import Options from "./components/Options/Options";
import IdToSpell from "./components/Spells/Detail/LinkWrapper/IdToSpell";
import NameToSpell from "./components/Spells/Detail/LinkWrapper/NameToSpell";
import NameToGear from "./components/Gear/Detail/LinkWrapper/NameToGear";
import IdToGear from "./components/Gear/Detail/LinkWrapper/IdToGear";
import GearOverview from "./components/Gear/GearOverview";

const App = () => {
  return (
    <MyThemeProvider>
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Options}></Route>
          <Route path="/spell-detail/name/:name" component={NameToSpell}></Route>
          <Route path="/spell-detail/id/:id" component={IdToSpell}></Route>
          <Route path="/spell-overview" component={SpellOverview}></Route>
          <Route path="/gear-detail/name/:name" component={NameToGear}></Route>
          <Route path="/gear-detail/id/:id" component={IdToGear}></Route>
          <Route path="/gear-overview" component={GearOverview}></Route>
          <Route path="/options" component={Options}></Route>
        </Switch>
      </MemoryRouter>
    </MyThemeProvider>
  );
};

export default App;
