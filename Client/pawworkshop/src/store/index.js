import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import plugins from './reducers/plugins';
import loggedUser from './reducers/loggedUser';



const combination = combineReducers({ plugins, loggedUser });

// const persistedState = localStorage.getItem('loggedUser') ? {
//     loggedUser: localStorage.getItem('loggedUser')
// } :
//     {};

const logger = createLogger({
    // predicate: (getState, action) => action.type !== '',
    collapsed: (getState, action) => action.type !== '',
});

const store = createStore(combination, applyMiddleware(logger));

// let currentValue;
// store.subscribe(() => {
//     const previousValue = currentValue;
//     currentValue = store.getState().loggedUser;
//     if (currentValue.userProfil) {
//         if (currentValue !== previousValue) {
//             localStorage.setItem('loggedUser', JSON.stringify(currentValue));
//         }
//     }
// })
export default store