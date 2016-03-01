import {Timer} from 'phaser';

import StageClear from 'states/stage-clear';

/**
 * @param {GameState} parent
 * @param {Object} options
 * @return {Object}
 */
export default (parent, options) => {
  const component = {
    win() {
      if (!component.isVictorious()) {
        component.victorious = true;

        console.log('You beat the stage.');

        parent.game.time.events.add(Timer.SECOND * 1.5, () => {
          parent.game.state.start('StageClear', true, false, {
            id: options.id,
            class: options.class
          });
        });
      }
    },

    /**
     * Checks if the stage has been beaten.
     * @return {boolean}
     */
    isVictorious() {
      return component.victorious;
    }
  };

  parent.game.state.add('StageClear', StageClear, false);

  parent._components.hasNextStage = component;

  return component;
};
