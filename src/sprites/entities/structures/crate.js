import Structure from './structure';

export default class Crate extends Structure {
  /**
   * @param {Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'terrain-1x1-1', 1);

    this.name = 'Crate';
    this.anchor.setTo(0, 0);

    this.body.immovable = true;
    this.body.allowGravity = false;

    this.effects.destroy = this.game.add.audio('explosion1', 1, false);
  }

  /**
   * @inheritdoc
   */
  handleCollision(entity) {
    super.handleCollision(entity);
  }
}
