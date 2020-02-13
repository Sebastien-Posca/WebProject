import React from 'react';
import Plugin from './component/plugins/Plugin';
import Workshop from './component/shop/workshop/Workshop';
import MainMenu from './component/core/main-menu/MainMenu';
import TestPlugin from './component/plugins/test-plugin/TestPlugin';
import './App.css';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';

function App() {
    return (
        <div className="App">

            <Router>

                <Switch>

                    <Route path="/form">

                        <Plugin/>

                    </Route>

                    <Route path="/testPlugin">
                        <TestPlugin/>
                    </Route>

                    <Route path="/workshop">
                        <Workshop/>
                    </Route>

                    <Route path="/">
                        <MainMenu/>
                    </Route>

                </Switch>
            </Router>


        </div>
    );
}

export default App;
