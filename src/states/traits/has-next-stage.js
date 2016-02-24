import {Timer} from 'phaser';

import StageClear from 'states/stage-clear';

export default (state, options) => {
  const trait = Object.assign({}, state, {
    win() {
      if (!this.isVictorious()) {
        this.victorious = true;

        console.log('You beat the stage.');

        this.game.time.events.add(Timer.SECOND * 1.5, () => {
          this.game.state.start('StageClear', true, false, {
            nextStageName: options.stageName,
            nextStageClass: options.stageClass
          });
        });
      }
    },

    /**
     * Checks if the stage has been beaten.
     * @return {boolean}
     */
    isVictorious() {
      return this.victorious;
    }
  });

  state.game.state.add('StageClear', StageClear, false);

  return trait;
};
