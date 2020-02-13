import React from 'react';
import Plugin from './component/Plugin';
import Workshop from './component/Workshop';
import MainMenu from './component/MainMenu';
import TestPlugin from './component/TestPlugin';
import PluginSummary from './component/PluginSummary';

import NavigationBar from './component/NavigationBar'
import store from './store/index';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>

          <Switch>

            <Route path="/form">

              <Plugin />

            </Route>

            <Route path="/testPlugin">
              <TestPlugin />
            </Route>

            <Route path="/workshop">
              <Workshop />
            </Route>

            <Route path="/product/:id">
              <PluginSummary />
            </Route>

            <Route path="/">
              <MainMenu />
            </Route>

          </Switch>
        </Router>
      </Provider>

    </div>
  );
}

export default App;
