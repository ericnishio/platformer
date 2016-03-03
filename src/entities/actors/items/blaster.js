import Item, {TYPE_FIREARM} from './item';

export default class Blaster extends Item {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 'items-1x1-1', 1);

    this.power = 3;
    this.className = 'Blaster';
    this.itemType = TYPE_FIREARM;

    this.effects.pickup = this.game.add.audio('powerup2', 1, false);
  }

  /**
   * @inheritdoc
   */
  handleCollision(actor) {
    super.handleCollision(actor);

    if (actor.getComponent('hasInventory')) {
      this.effects.pickup.play();
      actor.getComponent('hasInventory').addToInventory(this);
      this.kill();
    }
  }
}
