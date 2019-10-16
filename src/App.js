import './assets/css/App.css';
import React, { Component } from 'react';
import { MemoryRouter, Switch, Route } from 'react-router';

import packageJson from '../package.json';

import SpellOverview from './components/spell/SpellOverview';
import CharOverview from './components/char/CharOverview';
import ItemOverview from './components/item/ItemOverview';
import MonsterOverview from './components/monster/MonsterOverview';

import CharView from './components/char/CharView';

import Home from './components/Home';
import Options from './components/Options';

import AddSpell from './components/add/AddSpell';
import AddItem from './components/add/AddItem';
import AddMonster from './components/add/AddMonster';

import LeftNav from './components/LeftNav';

class PageLayout extends Component {
  render() {
    return (
      <div className="App">
        <LeftNav />
        <div id="content">
          {this.props.children}
        </div>
        <div id="credits">v{packageJson.version} by DarthAmun</div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/spell-overview" render={() => {
            return <PageLayout><SpellOverview /></PageLayout>
          }} />
          <Route path="/item-overview" render={() => {
            return <PageLayout><ItemOverview /></PageLayout>
          }} />
          <Route path="/monster-overview" render={() => {
            return <PageLayout><MonsterOverview /></PageLayout>
          }} />
          <Route path="/char-overview" render={() => {
            return <PageLayout><CharOverview /></PageLayout>
          }} />
          <Route path="/char/:id" render={props => {
            return <PageLayout><CharView {...props}/></PageLayout>
          }} />
          <Route path="/add-spell" render={() => {
            return <PageLayout><AddSpell /></PageLayout>
          }} />
          <Route path="/add-item" render={() => {
            return <PageLayout><AddItem /></PageLayout>
          }} />
          <Route path="/add-monster" render={() => {
            return <PageLayout><AddMonster /></PageLayout>
          }} />
          <Route path="/options" render={() => {
            return <PageLayout><Options /></PageLayout>
          }} />
          <Route path="/" render={() => {
            return <div className="App homeDrag">
              <div id="content">
                <Home />
              </div>
              <div id="credits">v{packageJson.version} by DarthAmun</div>
            </div>
          }} />
        </Switch>
      </MemoryRouter>
    );
  }
}

export default App;