import { combineReducers, createStore } from 'redux';
import players from './reducers/players';

const reducers = combineReducers({
  players,
});
// eslint-disable-next-line
export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
