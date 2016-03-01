import {Timer} from 'phaser';

import {getGame} from 'core/game';

/**
 * @param {GameState} parent
 * @return {Object}
 */
export default parent => {
  const hasPlayer = parent.getComponent('hasPlayer');

  if (!hasPlayer) {
    throw Error('Parent of canDie must have component hasPlayer');
  }

  const game = getGame();

  const component = {
    die() {
      hasPlayer.getPlayer().die();

      game.time.events.add(Timer.SECOND * 1, () => {
        game.state.restart();
      });
    },

    update() {
      if (hasPlayer.getPlayer().alive && !hasPlayer.getPlayer().getComponent('needsOxygen').hasOxygen()) {
        console.log('You ran out of oxygen.');

        component.die();
      }
    }
  };

  parent._components.canDie = component;

  return component;
};
