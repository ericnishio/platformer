import createStore from './core/store';
import createGame from './core/game';

const store = createStore();

createGame(store);
