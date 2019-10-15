import './assets/css/App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Options from './components/Options';

import LeftNav from './components/LeftNav';

class PageLayout extends Component {
  render() {
    return (
      <div className="App">
        <LeftNav />
        <div id="content">
          {this.props.children}
        </div>
        <div id="credits">by DarthAmun</div>
      </div>
    );
  }
}

class DebugRouter extends Router {
  constructor(props){
    super(props);
    console.log('initial history is: ', JSON.stringify(this.history, null,2))
    this.history.listen((location, action)=>{
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
    });
  }
}

class App extends Component {
  render() {
    return (
      <DebugRouter>
        <Switch>
          <Route path="/options" render={() => {
            return <PageLayout><Options /></PageLayout>
          }} />
          <Route path="/" render={() => {
            return <div className="App homeDrag">
              <div id="content">
                <Home />
              </div>
              <div id="credits">by DarthAmun</div>
            </div>
          }} />
        </Switch>
      </DebugRouter>
    );
  }
}

export default App;