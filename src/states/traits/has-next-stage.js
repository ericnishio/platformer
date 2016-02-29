import {Timer} from 'phaser';

import StageClear from 'states/stage-clear';

/**
 * @param {GameState} state
 * @param {Object} options
 * @return {Object}
 */
export default (state, options) => {
  const trait = {
    win() {
      if (!trait.isVictorious()) {
        trait.victorious = true;

        console.log('You beat the stage.');

        state.game.time.events.add(Timer.SECOND * 1.5, () => {
          state.game.state.start('StageClear', true, false, {
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
      return trait.victorious;
    }
  };

  state.game.state.add('StageClear', StageClear, false);

  return trait;
};
