import {combineReducers, createStore} from 'redux';

import player from 'stores/player-reducer';

const rootReducer = combineReducers({player});

export default () => {
  return createStore(rootReducer);
};
