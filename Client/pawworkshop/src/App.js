import React from 'react';
import Plugin from './component/plugins/Plugin';
import Workshop from './component/shop/workshop/Workshop';
import PluginSummary from './component/plugins/plugin-summary/PluginSummary';
import TestPlugin from './component/plugins/test-plugin/TestPlugin';
import store from './store/index';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch,} from 'react-router-dom';
import {Provider} from 'react-redux';
import NavigationBar from './component/core/navigation-bar/NavigationBar';
import UnitTestPlugin from "./component/plugins/unit-test-plugin/UnitTestPlugin";

function App() {
    return (
        <div className="App">

            <Provider store={store}>
                <Router>
                    <NavigationBar/>

                    <Switch>

                        <Route path="/form">
                            <Plugin/>
                        </Route>

                        <Route path="/testPlugin/:idPlugin">
                            <TestPlugin/>
                        </Route>
                        <Route path="/unitTestPlugin/:idPlugin">
                            <UnitTestPlugin/>
                        </Route>

                        <Route path="/workshop">
                            <Workshop/>
                        </Route>

                        <Route path="/product/:id">
                            <PluginSummary/>
                        </Route>

                        <Route path="/">
                            <Redirect to={"/workshop"}/>
                        </Route>

                    </Switch>
                </Router>
            </Provider>

        </div>
    );
}

export default App;
