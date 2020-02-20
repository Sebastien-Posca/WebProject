import React from 'react';
import Plugin from './component/plugins/Plugin';
import Workshop from './component/shop/workshop/Workshop';
import MainMenu from './component/core/main-menu/MainMenu';
import PluginSummary from './component/PluginSummary';
import TestPlugin from './component/plugins/test-plugin/TestPlugin';
import store from './store/index';
import './App.css';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavigationBar from './component/core/navigation-bar/NavigationBar';

function App() {
    return (
        <div className="App">

            <Provider store={store}>
                <Router>
                    <NavigationBar />

                    <Switch>

                        <Route path="/form">
                            <Plugin />
                        </Route>

                        <Route path="/testPlugin/:id">
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
