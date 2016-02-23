import {Sprite} from 'phaser';

export default class Decoration extends Sprite {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   * @param {string} spritesheet
   * @param {number} tileIndex
   */
  constructor(game, x, y, spritesheet, tileIndex) {
    super(game, x, y, spritesheet, tileIndex);

    this.smoothed = false;
    this.anchor.setTo(0.5, 0.5);

    game.add.existing(this);
  }
}
