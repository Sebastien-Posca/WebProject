import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import plugins from './reducers/plugins';
import loggedUser from './reducers/loggedUser';



const combination = combineReducers({ plugins, loggedUser });

const logger = createLogger({
    // predicate: (getState, action) => action.type !== '',
    collapsed: (getState, action) => action.type !== '',
});

const store = createStore(combination, applyMiddleware(logger));

export default store