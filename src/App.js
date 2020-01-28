import './assets/css/App.css';
import React, { useEffect } from 'react';
import { MemoryRouter, Switch, Route } from 'react-router';
import packageJson from '../package.json';

import ThemeService from './services/ThemeService';

import Home from './components/Home';
import Options from './components/Options';

import SpellOverview from './components/spell/SpellOverview';
import ItemOverview from './components/item/ItemOverview';
import GearOverview from './components/gear/GearOverview';

import AddSpell from './components/add/AddSpell';
import AddItem from './components/add/AddItem';
import AddGear from './components/add/AddGear';

import LeftNav from './components/LeftNav';
import RightNav from './components/RightNav';

const PageLayout = ({ children }) => (
  <div className="App">
    <LeftNav />
    <div id="content">
      {children}
    </div>
    <RightNav />
    <div id="credits">v{packageJson.version} by DarthAmun</div>
  </div>
);

const HomeLayout = ({ children }) => (
  <div className="App homeDrag">
    <div id="content">{children}</div>
    <div id="credits">v{packageJson.version} by DarthAmun</div>
  </div>
);

const LayoutRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

const App = () => {

  useEffect(() => {
    let theme = localStorage.getItem('theme');
    if (theme !== undefined) {
      ThemeService.setTheme(theme);
      ThemeService.applyTheme(theme);
    } else {
      localStorage.setItem('theme', 'light');
    }
  }, []);

  return (
    <MemoryRouter>
      <Switch>
        <LayoutRoute path="/spell-overview" layout={PageLayout} component={SpellOverview} />
        <LayoutRoute path="/item-overview" layout={PageLayout} component={ItemOverview} />
        <LayoutRoute path="/gear-overview" layout={PageLayout} component={GearOverview} />
        <LayoutRoute path="/add-spell" layout={PageLayout} component={AddSpell} />
        <LayoutRoute path="/add-item" layout={PageLayout} component={AddItem} />
        <LayoutRoute path="/add-gear" layout={PageLayout} component={AddGear} />
        <LayoutRoute path="/options" layout={PageLayout} component={Options} />
        <LayoutRoute path="/" layout={HomeLayout} component={Home} />
      </Switch>
    </MemoryRouter >
  );
};

export default App;
