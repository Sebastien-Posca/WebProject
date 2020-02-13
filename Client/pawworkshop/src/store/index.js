import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import plugins from './reducers/plugins';


const logger = createLogger({
    // predicate: (getState, action) => action.type !== '',
    collapsed: (getState, action) => action.type !== '',
});

const store = createStore(plugins, applyMiddleware(logger));

export default store