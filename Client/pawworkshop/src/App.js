import React from 'react';
import Plugin from './component/Plugin';
import Workshop from './component/Workshop';
import MainMenu from './component/MainMenu';
import TestPlugin from './component/TestPlugin';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
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

          <Route path="/">
            <MainMenu />
          </Route>

        </Switch>
      </Router>


    </div>
  );
}

export default App;
