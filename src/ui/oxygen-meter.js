import {Sprite} from 'phaser';

import {getGame} from 'core/game';

/**
 * @param {Player} player
 */
export default player => {
  return new OxygenMeter(getGame(), player);
};

export class OxygenMeter extends Sprite {
  /**
   * @param {Phaser.Game} game
   * @param {Player} player
   */
  constructor(game, player) {
    super(game, 14, 10, 'oxygen-meter', 0);

    this.game = game;
    this.player = player;

    this.fixedToCamera = true;
    this.game.add.existing(this);

    this.progressBar = game.add.sprite(1, 5, 'oxygen-meter', 1);
    this.addChild(this.progressBar);
  }

  update() {
    const percentage = this.player.getComponent('needsOxygen').getOxygenAsPercentage();
    const factor = percentage / 100;

    this.progressBar.width = 112 * factor;
  }
}
