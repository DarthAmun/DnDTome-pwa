import React, {useState} from "react";
import { MemoryRouter, Switch, Route } from "react-router";
import Home from "./components/Home";
import SpellOverview from "./components/Spells/SpellOverview";
import Theme from "./components/Theme";

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  return (
    <Theme>
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/spell-overview" component={SpellOverview}></Route>
        </Switch>
      </MemoryRouter>
    </Theme>
  );
};

export default App;
