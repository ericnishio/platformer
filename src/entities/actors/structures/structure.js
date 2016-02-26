import Actor from 'entities/actors/actor';

export default class Structure extends Actor {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   * @param {string} spritesheet
   * @param {number} tileIndex
   */
  constructor(game, x, y, spritesheet, tileIndex) {
    super(game, x, y, spritesheet, tileIndex);

    this.anchor.setTo(0, 0.5);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 280;
  }
}