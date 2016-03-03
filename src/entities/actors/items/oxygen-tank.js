import Item, {TYPE_POWERUP} from './item';

export default class OxygenTank extends Item {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'items-1x1-1', 0);

    this.className = 'OxygenTank';
    this.itemType = TYPE_POWERUP;

    this.effects.pickup = this.game.add.audio('powerup1', 1, false);
  }

  /**
   * @inheritdoc
   */
  handleCollision(actor) {
    super.handleCollision(actor);

    if (actor.getComponent('needsOxygen')) {
      this.kill();
      this.effects.pickup.play();
      actor.getComponent('needsOxygen').increaseOxygenBy(50);
    }
  }
}
