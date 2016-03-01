import {Timer} from 'phaser';

import {getGame} from 'core/game';

/**
 * @param {GameState} state
 * @return {Object}
 */
export default state => {
  const game = getGame();

  const trait = {
    die() {
      state.getPlayer().die();

      game.time.events.add(Timer.SECOND * 1, () => {
        game.state.restart();
      });
    }
  };

  state.addToUpdate(
    () => {
      if (state.getPlayer().alive && !state.getPlayer().getComponent('needsOxygen').hasOxygen()) {
        console.log('You ran out of oxygen.');

        trait.die();
      }
    }
  );

  return trait;
};
