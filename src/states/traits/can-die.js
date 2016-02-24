import {Timer} from 'phaser';

import {getGame} from 'core/game';

export default state => {
  const game = getGame();

  return Object.assign({}, state, {
    die() {
      state.getPlayer().die();

      game.time.events.add(Timer.SECOND * 1, () => {
        game.state.restart();
      });
    }
  });
};
